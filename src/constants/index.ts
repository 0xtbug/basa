export const DEFAULT_MODEL = 'gemini-2.5-flash-lite';
export const SUPPORTED_EXTENSIONS = ['.md', '.mdx', '.markdown', '.mdown', '.mkdn', '.mdtxt', '.mdtext', '.txt'] as const;

export const ERROR_MESSAGES = {
  NO_API_KEY: 'Gemini API key is required. Use --api-key option to provide your API key.',
  FILE_NOT_EXISTS: (path: string) => `Input file does not exist: ${path}`,
  UNSUPPORTED_FILE_TYPE: (ext: string) => `Unsupported file type: ${ext}. Supported: ${SUPPORTED_EXTENSIONS.join(', ')}.`,
  READ_FILE_FAILED: (path: string, error: string) => `Failed to read file ${path}: ${error}`,
  WRITE_FILE_FAILED: (path: string, error: string) => `Failed to write file ${path}: ${error}`,
  TRANSLATION_FAILED: (error: string) => `Translation failed: ${error}`,
} as const;
