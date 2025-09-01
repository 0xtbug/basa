/**
 * Language code mappings
 * Maps short language codes to full language names for better AI understanding
 */
export const LANGUAGE_MAPPINGS: Record<string, string> = {
  // Common short codes
  'en': 'English',
  'id': 'Indonesian',
  'zh': 'Chinese',
  'ja': 'Japanese',
  'ko': 'Korean',
  'es': 'Spanish',
  'fr': 'French',
  'de': 'German',
  'it': 'Italian',
  'pt': 'Portuguese',
  'ru': 'Russian',
  'ar': 'Arabic',
  'hi': 'Hindi',
  'th': 'Thai',
  'vi': 'Vietnamese',
  'ms': 'Malay',
  'tl': 'Filipino',
  'nl': 'Dutch',
  'sv': 'Swedish',
  'no': 'Norwegian',
  'da': 'Danish',
  'fi': 'Finnish',
  'pl': 'Polish',
  'tr': 'Turkish',
  'he': 'Hebrew',
  'uk': 'Ukrainian',
  'cs': 'Czech',
  'hu': 'Hungarian',
  'ro': 'Romanian',
  'bg': 'Bulgarian',
  'hr': 'Croatian',
  'sk': 'Slovak',
  'sl': 'Slovenian',
  'et': 'Estonian',
  'lv': 'Latvian',
  'lt': 'Lithuanian',
  'mt': 'Maltese',
  'is': 'Icelandic',
  'ga': 'Irish',
  'cy': 'Welsh',
  'eu': 'Basque',
  'ca': 'Catalan',
  'gl': 'Galician',
  'bn': 'Bengali',
  'ur': 'Urdu',
  'fa': 'Persian',
  'ta': 'Tamil',
  'te': 'Telugu',
  'ml': 'Malayalam',
  'kn': 'Kannada',
  'mr': 'Marathi',
  'gu': 'Gujarati',
  'pa': 'Punjabi',
  'ne': 'Nepali',
  'si': 'Sinhala',
  'my': 'Myanmar',
  'km': 'Khmer',
  'lo': 'Lao',
  'ka': 'Georgian',
  'hy': 'Armenian',
  'az': 'Azerbaijani',
  'kk': 'Kazakh',
  'ky': 'Kyrgyz',
  'uz': 'Uzbek',
  'tg': 'Tajik',
  'mn': 'Mongolian',
  'bo': 'Tibetan',
  'dz': 'Dzongkha',
  'am': 'Amharic',
  'ti': 'Tigrinya',
  'om': 'Oromo',
  'so': 'Somali',
  'sw': 'Swahili',
  'zu': 'Zulu',
  'xh': 'Xhosa',
  'af': 'Afrikaans',
  'sq': 'Albanian',
  'mk': 'Macedonian',
  'sr': 'Serbian',
  'bs': 'Bosnian',
  'me': 'Montenegrin'
} as const;

export class LanguageUtils {
  /**
   * Convert language input to full language name
   * Supports both short codes (id, zh, etc.) and full names
   */
  static normalizeLanguage(input: string): string {
    const lowerInput = input.toLowerCase().trim();

    if (LANGUAGE_MAPPINGS[lowerInput]) {
      return LANGUAGE_MAPPINGS[lowerInput];
    }

    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
  }

  /**
   * Get all supported language codes
   */
  static getSupportedCodes(): string[] {
    return Object.keys(LANGUAGE_MAPPINGS);
  }

  /**
   * Check if a language code is supported
   */
  static isSupportedCode(code: string): boolean {
    return code.toLowerCase() in LANGUAGE_MAPPINGS;
  }
}
