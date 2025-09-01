import path from 'path';
import { FileUtils } from '../../src/utils/file-utils';

describe('FileUtils.validateFileExtension', () => {
  it('accepts markdown family extensions', () => {
    expect(FileUtils.validateFileExtension('a.mdx')).toBe(true);
    expect(FileUtils.validateFileExtension('a.md')).toBe(true);
    expect(FileUtils.validateFileExtension('a.markdown')).toBe(true);
    expect(FileUtils.validateFileExtension('a.mdown')).toBe(true);
    expect(FileUtils.validateFileExtension('a.mkdn')).toBe(true);
    expect(FileUtils.validateFileExtension('a.mdtxt')).toBe(true);
    expect(FileUtils.validateFileExtension('a.mdtext')).toBe(true);
    expect(FileUtils.validateFileExtension('a.txt')).toBe(true);
  });

  it('rejects non-markdown extensions', () => {
    expect(FileUtils.validateFileExtension('a.js')).toBe(false);
    expect(FileUtils.validateFileExtension('a.ts')).toBe(false);
  });
});

describe('FileUtils.generateOutputPath', () => {
  it('generates path alongside source by default', () => {
    const p = FileUtils.generateOutputPath('/docs/sample.mdx', 'French');
    expect(p).toBe(path.join('/docs', 'sample.French.mdx'));
  });

  it('generates path inside provided outputDir', () => {
    const p = FileUtils.generateOutputPath('/docs/sample.mdx', 'id', '/out');
    expect(p).toBe(path.join('/out', 'sample.id.mdx'));
  });
});
