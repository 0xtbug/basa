import { CLI } from '../../src/cli/index';

// Mock Translator used by CLI to avoid filesystem/AI
jest.mock('../../src/core/translator', () => {
  return {
    Translator: class {
      async translateFile({ inputPath, targetLanguage }: { inputPath: string; targetLanguage: string }) {
        return { success: true, inputPath, outputPath: `${inputPath}.${targetLanguage}.mdx`, targetLanguage };
      }
      async translateMultipleFiles({ inputPaths, targetLanguage }: { inputPaths: string[]; targetLanguage: string }) {
        return inputPaths.map((p) => ({ success: true, inputPath: p, outputPath: `${p}.${targetLanguage}.mdx`, targetLanguage }));
      }
    }
  };
});

describe('CLI argument handling', () => {
  const originalArgv = process.argv.slice(0);

  afterEach(() => {
    process.argv = originalArgv.slice(0);
  });

  it('supports positional files', async () => {
    process.argv = ['node', 'cli', 'a.mdx', 'b.mdx', '-l', 'fr', '-k', 'x'];
    const cli = new CLI();
    await cli.run();
    // If no throw, parsing worked and mocked translator returned
  });

  it('supports -f flags and comma-separated lists', async () => {
    process.argv = ['node', 'cli', '-f', 'a.mdx,b.mdx', '-f', 'c.mdx', '-l', 'id', '-k', 'x'];
    const cli = new CLI();
    await cli.run();
  });
});
