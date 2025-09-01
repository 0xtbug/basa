declare module '@google/genai' {
  export interface GenerateContentRequest {
    model: string;
    contents: string;
  }

  export interface GenerateContentResponse {
    text?: string;
  }

  export interface Models {
    generateContent(request: GenerateContentRequest): Promise<GenerateContentResponse>;
  }

  export interface GoogleGenAIConfig {
    apiKey: string;
  }

  export class GoogleGenAI {
    models: Models;

    constructor(config: GoogleGenAIConfig);
  }
}
