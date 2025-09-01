import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { Translator } from '../core/translator';
import { LoadingUtils } from '../utils/loading-utils';
import { LanguageUtils } from '../utils/language-utils';
import { CLIArguments, TranslationResult } from '../types/interfaces';
import { ERROR_MESSAGES } from '../constants';

export class CLI {
  async run(): Promise<void> {
    const argv = await this.setupYargs();

    try {
      const translator = new Translator({
        apiKey: argv['api-key'],
        model: argv.model,
      });

      const inputFiles = this.parseInputFiles(argv);
      const languages = this.parseLanguages(argv);
      const normalizedLanguages = languages.map((l) => LanguageUtils.normalizeLanguage(l));

      console.log(`\n🌍 Basa - Powered by Gemini AI`);
      console.log(`📋 Target Languages: ${normalizedLanguages.join(', ')}`);
      console.log(`📂 Files to translate: ${inputFiles.length}`);
      inputFiles.forEach((file, index) => {
        console.log(`   ${index + 1}. ${file}`);
      });
      console.log(`🤖 Model: ${argv.model}\n`);

      const results = await this.executeTranslations(translator, inputFiles, normalizedLanguages, argv.output);

      this.printResults(results);
    } catch (error) {
      LoadingUtils.stopAll();
      console.error('❌ Error:', (error as Error).message);
      process.exit(1);
    }
  }

  private async setupYargs() {
    return yargs(hideBin(process.argv))
      .usage('Usage: $0 [files...] -l <languages> -k <api-key> [options]')
      .option('files', {
        alias: 'f',
        describe: 'Input MDX/MD files (can use -f file1 file2 or "file1,file2")',
        type: 'array',
        string: true,
      })
      .option('language', {
        alias: 'l',
        describe: 'Target languages: use comma-separated (zh,id,th,in) or space-separated (zh id th in) after -l',
        type: 'string',
        array: true,
        demandOption: true,
      })
      .option('output', {
        alias: 'o',
        describe: 'Optional: output file path (single file, default: next to input) or output directory (multiple files, default: next to each input)',
        type: 'string',
      })
      .option('api-key', {
        alias: 'k',
        describe: 'Gemini API key',
        type: 'string',
        demandOption: true,
      })
      .option('model', {
        alias: 'm',
        describe: 'Gemini model to use (default: gemini-2.5-flash-lite)',
        type: 'string',
        default: 'gemini-2.5-flash-lite',
      })
     .help()
      .alias('help', 'h')
      .parseAsync() as Promise<any>;
  }

  private parseInputFiles(argv: any): string[] {
    let files: string[] = [];

    if (argv.files && argv.files.length > 0) {
      files = argv.files.flatMap((f: string) => {
        if (f.includes(',')) {
          return f.split(',').map(file => file.trim());
        }
        return [f.trim()];
      });
    }

    if (argv._ && argv._.length > 0) {
      const positionalFiles = argv._.filter((arg: any) => typeof arg === 'string' && arg.trim().length > 0);
      files = [...files, ...positionalFiles];
    }

    return [...new Set(files.filter(file => file && file.trim().length > 0))];
  }

  private parseLanguages(argv: any): string[] {
    const raw = argv.language;
    const arr = Array.isArray(raw) ? raw : [raw];
    const split = arr.flatMap((l: string) => (typeof l === 'string' ? l.split(',') : [])).map((s: string) => s.trim()).filter(Boolean);
    return [...new Set(split)];
  }

  private async executeTranslations(
    translator: Translator,
    inputFiles: string[],
    languages: string[],
    output?: string
  ): Promise<TranslationResult[]> {
    const allResults: TranslationResult[] = [];
    for (const lang of languages) {
      if (inputFiles.length === 1) {
        const result = await translator.translateFile({
          inputPath: inputFiles[0],
          targetLanguage: lang,
          outputPath: output,
        });
        allResults.push(result);
      } else {
        const results = await translator.translateMultipleFiles({
          inputPaths: inputFiles,
          targetLanguage: lang,
          outputDir: output,
        });
        allResults.push(...results);
      }
    }
    return allResults;
  }

  private printResults(results: TranslationResult[]): void {
    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);

    console.log('\n📊 ===== TRANSLATION SUMMARY =====');
    console.log(`✅ Successfully translated: ${successful.length} file(s)`);

    if (failed.length > 0) {
      console.log(`❌ Failed: ${failed.length} file(s)`);
      console.log('\n💥 Failed Files:');
      failed.forEach(f => {
        console.log(`   ❌ ${f.inputPath}: ${f.error}`);
      });
    }

    if (successful.length > 0) {
      console.log('\n🎉 Successfully Translated:');
      successful.forEach(s => {
        console.log(`   ✅ ${s.inputPath} → ${s.outputPath}`);
      });
    }

    console.log('\n🎯 Translation process completed!\n');
  }
}
