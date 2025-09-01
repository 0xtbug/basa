# Basa (ᮘᮞ)
> _In Sundanese, Basa (ᮘᮞ) means “language.”_

<img src="https://github.com/user-attachments/assets/b4aad845-197b-40fa-bb2a-cf989289dea4" width="800px" />

AI-powered Markdown translator using Google Gemini. Basa translates `.md`/`.mdx` (and common markdown variants) while preserving formatting, code blocks, and links. It can process single or multiple files and writes outputs with a clear naming pattern.

## Install
- Global: `npm i -g @0xtbug/basa`
- Node: `>= 16`

## Usage
```
basa [files...] -l <language> -k <API_KEY>
```
- Input: `.md`, `.mdx`, `.markdown`, `.mdown`, `.mkdn`, `.mdtxt`, `.mdtext`, `.txt`

Notes
- `-o/--output` is optional.
  - Single file: if omitted, the translated file is written next to the input file.
  - Multiple files: if omitted, each translated file is written next to its source; if provided, treat `-o` as an output directory.

Examples
- Single file: `basa sample.mdx -l fr -k "$GEMINI_API_KEY"`
- Multiple files (positional): `basa a.mdx b.md -l id -k "$GEMINI_API_KEY" -o out/`
- With flags: `basa -f a.mdx -f b.md -l zh -k "$GEMINI_API_KEY"`
- Multiple languages (space-separated): `basa sample.mdx -l zh id th in -k "$GEMINI_API_KEY"`
- Multiple languages (comma-separated): `basa sample.mdx -l zh,id,th,in -k "$GEMINI_API_KEY"`

Run `basa --help` for full options.

## Development
- Clone: `git clone https://github.com/0xtbug/basa`
- Install deps: `npm install`
- Dev CLI: `npm run dev -f sample.mdx -l fr -k "<API_KEY>"`
- Build: `npm run build`
- Local link: `npm run build && npm link` then run `basa ...`

## Testing
- Run tests: `npm test`
- Coverage: `npm run coverage`

## Project Structure
- `src/cli/`: CLI (yargs) entry and parsing
- `src/core/`: Translator orchestration
- `src/services/`: AI adapter (Gemini)
- `src/utils/`: File/language/loading helpers
- `src/constants/` and `src/types/`

## Contributing
Please read Repository Guidelines in `AGENTS.md` for coding style, test conventions, and PR requirements.
