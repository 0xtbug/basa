# Repository Guidelines

## Project Structure & Module Organization
- Source lives in `src/` with: `cli/` (entry + yargs), `core/` (Translator), `services/` (AI adapter), `utils/`, `types/`, `constants/`.
- Build artifacts in `dist/` (compiled JS and type declarations).
- Tests in `tests/**` (Jest). Example MDX content sits at repo root and `examples/`.
- Output naming: `<basename>.<LanguageName><ext>` (e.g., `sample.French.mdx`).
- Supported inputs: `.md`, `.mdx`, `.markdown`, `.mdown`, `.mkdn`, `.mdtxt`, `.mdtext`, `.txt`.

## Build, Test, and Development Commands
- `npm run build`: Compile TypeScript to `dist/` via `tsc`.
- `npm start`: Build then run `dist/cli.js`.
- `npm run dev`: Run CLI directly with `ts-node` (no build).
- `npm test`: Run Jest tests. `npm run coverage` for coverage report.
- Examples: `npm run dev -- sample.mdx -l "fr" -k "<API_KEY>" -o out/` or `node dist/cli.js sample.mdx -l "id" -k "<API_KEY>"`.

## Coding Style & Naming Conventions
- TypeScript (ES2020, CommonJS, strict). Indentation: 2 spaces; semicolons required.
- Filenames: kebab-case (`file-utils.ts`). Classes `PascalCase`; functions/vars `camelCase`.
- Keep CLI concerns in `src/cli/`; reusable logic in `src/core/`, `src/utils/`, `src/services/`.

## Testing Guidelines
- Framework: Jest with `ts-jest` preset.
- Location: `tests/**/*.test.ts`. Name tests after the unit under test.
- Mock AI/network: stub `AIService.translateContent` to avoid external calls.
- Focus: argument parsing (CLI), `FileUtils`, `LanguageUtils`. Run via `npm test`.

## Commit & Pull Request Guidelines
- Commits: Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`, `chore:`). Keep diffs focused.
- PRs: Include purpose, linked issue, steps to validate (commands used), and screenshots of CLI output when UX changes.
- CI gates: ensure `npm run build` and tests pass; update docs/examples on CLI flag or output naming changes.

## Security & Configuration Tips
- Provide API key via `--api-key`. Do not commit secrets. Use `.env.example` as a reference; never commit `.env`.
- Only `.mdx`/`.md` inputs are supported. Use `FileUtils.generateOutputPath` for consistent output paths.

## Global Install & Usage
- Local link for development: `npm run build && npm link`, then run `basa ...`.
- Publish as a global CLI: ensure `bin.basa` points to `dist/cli.js`, bump version, `npm publish`.
