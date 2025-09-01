import path from 'path';
import { AIService } from '../services/ai-service';
import { FileUtils } from '../utils/file-utils';
import { LoadingUtils } from '../utils/loading-utils';
import {
  TranslationResult,
  TranslationOptions,
  FileTranslationOptions,
  MultipleFileTranslationOptions
} from '../types/interfaces';
import { ERROR_MESSAGES, DEFAULT_MODEL } from '../constants';

export class Translator {
  private aiService: AIService;

  constructor(options: TranslationOptions) {
    this.aiService = new AIService(options.apiKey, options.model || DEFAULT_MODEL);
  }

  /**
   * Translate a single MDX file
   */
  async translateFile(options: FileTranslationOptions): Promise<TranslationResult> {
    const { inputPath, targetLanguage, outputPath } = options;
    const spinnerId = `file-${Date.now()}`;

    try {
      await this.validateInputFile(inputPath);

      LoadingUtils.start(spinnerId, `📖 Reading file: ${path.basename(inputPath)}`);
      const originalContent = await FileUtils.readFile(inputPath);
      LoadingUtils.update(spinnerId, `🔄 Processing ${path.basename(inputPath)} for ${targetLanguage} translation`);

      const translatedContent = await this.aiService.translateContent(
        originalContent,
        targetLanguage
      );

      const finalOutputPath = outputPath || FileUtils.generateOutputPath(
        inputPath,
        targetLanguage
      );

      await FileUtils.writeFile(finalOutputPath, translatedContent);
      LoadingUtils.stop(spinnerId);

      return {
        success: true,
        inputPath,
        outputPath: finalOutputPath,
        targetLanguage,
      };
    } catch (error) {
      LoadingUtils.fail(spinnerId, `❌ Failed to translate ${path.basename(inputPath)}`);
      console.error(`Error translating file ${inputPath}:`, (error as Error).message);
      return {
        success: false,
        inputPath,
        error: (error as Error).message,
      };
    }
  }

  /**
   * Translate multiple files
   */
  async translateMultipleFiles(
    options: MultipleFileTranslationOptions
  ): Promise<TranslationResult[]> {
    const { inputPaths, targetLanguage, outputDir } = options;
    const results: TranslationResult[] = [];
    const totalFiles = inputPaths.length;

    console.log(`\n🚀 Starting batch translation of ${totalFiles} files to ${targetLanguage}\n`);

    for (let i = 0; i < inputPaths.length; i++) {
      const inputPath = inputPaths[i];
      const fileProgress = `[${i + 1}/${totalFiles}]`;

      console.log(`${fileProgress} Processing: ${path.basename(inputPath)}`);

      const outputPath = outputDir
        ? FileUtils.generateOutputPath(inputPath, targetLanguage, outputDir)
        : undefined;

      const result = await this.translateFile({
        inputPath,
        targetLanguage,
        outputPath,
      });

      results.push(result);
    }

    return results;
  }

  /**
   * Validate input file
   */
  private async validateInputFile(inputPath: string): Promise<void> {
    const fileExists = await FileUtils.fileExists(inputPath);
    if (!fileExists) {
      throw new Error(ERROR_MESSAGES.FILE_NOT_EXISTS(inputPath));
    }

    const isValidExtension = FileUtils.validateFileExtension(inputPath);
    if (!isValidExtension) {
      const ext = path.extname(inputPath).toLowerCase();
      throw new Error(ERROR_MESSAGES.UNSUPPORTED_FILE_TYPE(ext));
    }
  }
}
