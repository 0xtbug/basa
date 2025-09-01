export interface TranslationResult {
  success: boolean;
  inputPath: string;
  outputPath?: string;
  targetLanguage?: string;
  error?: string;
}

export interface TranslationOptions {
  apiKey: string;
  model?: string;
}

export interface FileTranslationOptions {
  inputPath: string;
  targetLanguage: string;
  outputPath?: string;
}

export interface MultipleFileTranslationOptions {
  inputPaths: string[];
  targetLanguage: string;
  outputDir?: string;
}

export interface CLIArguments {
  files: string[];
  language: string[];
  output?: string;
  'api-key': string;
  model?: string;
}
