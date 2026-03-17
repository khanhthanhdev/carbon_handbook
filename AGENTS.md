# Repository Guidelines

## Project Structure & Module Organization

This repository is a Nuxt 4 + Docus documentation site for the Carbon Market Handbook. Keep app code in `app/`, content in `content/`, server handlers in `server/`, and static files in `public/`.

- `app/components/`: Vue UI components such as `AboutUsPage.vue` and assistant overrides.
- `app/pages/`: route entries, including localized pages.
- `app/composables/`, `app/utils/`, `app/data/`: shared logic and content-backed helpers.
- `content/en/` and `content/vi/`: bilingual handbook content. Section folders use numeric prefixes, for example `01.part-1-...`, and article files follow `NN.slug.md`.
- `server/api/assistant-localized.post.ts`: locale-aware assistant endpoint.

## Build, Test, and Development Commands

Use Bun for local work:

- `bun install`: install dependencies.
- `bun run dev`: start the local Docus site at `http://localhost:3000`.
- `bun run build`: build the production app.
- `bun run generate`: generate the static site output.
- `bun run preview`: preview the built site locally.

## Coding Style & Naming Conventions

Follow the existing Nuxt/Vue conventions:

- Use TypeScript where applicable and prefer `<script setup lang="ts">` in Vue SFCs.
- Keep indentation to 2 spaces in Vue, TypeScript, and Markdown frontmatter.
- Prefer `PascalCase` for component filenames, `camelCase` for composables/utilities, and kebab-like slugs with numeric ordering for content files.
- Match the repository’s existing quote and import style instead of introducing a new formatter pattern. No dedicated ESLint or Prettier config is checked in.

## Testing Guidelines

There is no dedicated automated test suite in the current repo. Treat build validation as the minimum check:

- Run `bun run build` before opening a PR.
- For UI or content changes, also verify affected pages in `bun run dev`.
- When editing handbook content, update both `content/en/` and `content/vi/` unless the change is intentionally locale-specific.

## Commit & Pull Request Guidelines

Recent commits use short, imperative subjects such as `Add landing page, about us section` and `Enable Nuxt Studio and remove GitHub links`. Keep commits focused and descriptive.

PRs should include:

- a brief summary of user-facing changes,
- linked issues or context when relevant,
- screenshots for layout or content presentation changes,
- confirmation that `bun run build` passed.

## Security & Configuration Tips

Copy `.env.example` to `.env.local` for local setup. Keep secrets such as `AI_GATEWAY_API_KEY` out of version control, and set `NUXT_SITE_URL` for deployed environments so SEO, `llms.txt`, and assistant metadata resolve correctly.
