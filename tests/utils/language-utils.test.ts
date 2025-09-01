import { LanguageUtils } from '../../src/utils/language-utils';

describe('LanguageUtils.normalizeLanguage', () => {
  it('maps short code to full name', () => {
    expect(LanguageUtils.normalizeLanguage('id')).toBe('Indonesian');
    expect(LanguageUtils.normalizeLanguage('zh')).toBe('Chinese');
  });

  it('passes through and normalizes full names', () => {
    expect(LanguageUtils.normalizeLanguage('french')).toBe('French');
    expect(LanguageUtils.normalizeLanguage('Spanish')).toBe('Spanish');
  });
});

describe('LanguageUtils.isSupportedCode', () => {
  it('returns true for supported codes', () => {
    expect(LanguageUtils.isSupportedCode('fr')).toBe(true);
    expect(LanguageUtils.isSupportedCode('EN')).toBe(true);
  });

  it('returns false for unsupported codes', () => {
    expect(LanguageUtils.isSupportedCode('xx')).toBe(false);
  });
});
