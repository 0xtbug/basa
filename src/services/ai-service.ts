import { GoogleGenAI } from '@google/genai';
import { LoadingUtils } from '../utils/loading-utils';
import { ERROR_MESSAGES } from '../constants';

export class AIService {
  private genAI: GoogleGenAI;
  private model: string;

  constructor(apiKey: string, model = 'gemini-2.5-flash-lite') {
    if (!apiKey) {
      throw new Error(ERROR_MESSAGES.NO_API_KEY);
    }

    this.genAI = new GoogleGenAI({ apiKey: apiKey });
    this.model = model;
  }

  /**
   * Translate content using Gemini AI
   */
  async translateContent(content: string, targetLanguage: string): Promise<string> {
    const prompt = this.buildTranslationPrompt(content, targetLanguage);
    const spinnerId = `translate-${Date.now()}`;

    try {
      LoadingUtils.start(spinnerId, `🤖 Translating content to ${targetLanguage}...`);

      const response = await this.genAI.models.generateContent({
        model: this.model,
        contents: prompt,
      });

      LoadingUtils.succeed(spinnerId, `✅ Translation to ${targetLanguage} completed`);
      return response.text || '';
    } catch (error) {
      LoadingUtils.fail(spinnerId, `❌ Translation to ${targetLanguage} failed`);
      throw new Error(ERROR_MESSAGES.TRANSLATION_FAILED((error as Error).message));
    }
  }

  /**
   * Build translation prompt
   */
  private buildTranslationPrompt(content: string, targetLanguage: string): string {
    return `Please translate the following markdown content to ${targetLanguage}.
Preserve all markdown formatting and keep any code blocks, links, and special characters intact.
Only translate the text content. Please translate the text to match natural expressions in the target language:

${content}`;
  }
}
