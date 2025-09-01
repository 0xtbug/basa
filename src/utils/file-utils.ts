import { promises as fs } from 'fs';
import path from 'path';
import { LoadingUtils } from './loading-utils';
import { SUPPORTED_EXTENSIONS, ERROR_MESSAGES } from '../constants';

export class FileUtils {
  /**
   * Check if file exists
   */
  static async fileExists(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Validate file extension
   */
  static validateFileExtension(filePath: string): boolean {
    const ext = path.extname(filePath).toLowerCase();
    return SUPPORTED_EXTENSIONS.includes(ext as typeof SUPPORTED_EXTENSIONS[number]);
  }

  /**
   * Read file content
   */
  static async readFile(filePath: string): Promise<string> {
    try {
      return await fs.readFile(filePath, 'utf-8');
    } catch (error) {
      throw new Error(ERROR_MESSAGES.READ_FILE_FAILED(filePath, (error as Error).message));
    }
  }

  /**
   * Write file content
   */
  static async writeFile(filePath: string, content: string): Promise<void> {
    const spinnerId = `write-${Date.now()}`;

    try {
      LoadingUtils.start(spinnerId, `📝 Saving translated file...`);

      // Ensure output directory exists
      const outputDir = path.dirname(filePath);
      await fs.mkdir(outputDir, { recursive: true });

      await fs.writeFile(filePath, content, 'utf-8');

      LoadingUtils.succeed(spinnerId, `💾 File saved to: ${filePath}`);
    } catch (error) {
      LoadingUtils.fail(spinnerId, `❌ Failed to save file: ${filePath}`);
      throw new Error(ERROR_MESSAGES.WRITE_FILE_FAILED(filePath, (error as Error).message));
    }
  }

  /**
   * Generate output file path
   */
  static generateOutputPath(
    inputPath: string,
    targetLanguage: string,
    outputDir?: string
  ): string {
    const parsedPath = path.parse(inputPath);
    const outputFileName = `${parsedPath.name}.${targetLanguage}${parsedPath.ext}`;

    if (outputDir) {
      return path.join(outputDir, outputFileName);
    }

    return path.join(parsedPath.dir, outputFileName);
  }
}
