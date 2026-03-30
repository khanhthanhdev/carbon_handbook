# Carbon Market Handbook

Carbon Market Handbook is a bilingual Docus site for Vietnamese SMEs. It covers carbon-credit fundamentals, Vietnamese policy, emissions accounting, project implementation, finance, governance, and international case studies in both English and Vietnamese.

## Features

- English and Vietnamese documentation with locale-prefixed routes
- Docus assistant UI with floating input and page-level "Explain with AI"
- Built-in MCP server at `/mcp` for AI agents
- Automatic `llms.txt` generation through Docus
- Nuxt 4, Nuxt Content, Nuxt UI, and Tailwind CSS 4

## Development

```bash
bun install
bun run dev
```

The site runs at `http://localhost:3000`.

## AI Assistant Setup

The project wires the Docus assistant module through `nuxt.config.ts` and configures project-specific starter questions in `app/app.config.ts`.
The rendered assistant panel is overridden in-project so chat requests include the active locale and page path, allowing the assistant to answer in the user's current language (`en` or `vi`) while preferring matching locale content from the MCP tools.

To enable the assistant locally, set an AI SDK Gateway key:

```bash
cp .env.example .env.local
```

Add this value to `.env.local`:

```bash
AI_GATEWAY_API_KEY=your_gateway_key
# Optional but recommended for deployed builds
NUXT_SITE_URL=https://docs.example.com
```

With that key present, the site exposes:

- `/mcp` for Model Context Protocol tools
- `/llms.txt` for machine-readable documentation discovery
- `/api/assistant-localized` for the locale-aware assistant chat API used by the UI
- `/__docus__/assistant` for the assistant chat API

Without `AI_GATEWAY_API_KEY`, the assistant UI is disabled automatically by Docus.
Set `NUXT_SITE_URL` to the deployed documentation URL so `llms.txt`, sitemap metadata, and assistant site references use the correct domain.

## Content Structure

```text
content/
├── en/
└── vi/
```

Each locale contains six sections covering concepts, implementation, finance, support tools, governance, and international experience.

## Build

```bash
bun run build
```

## Docker Deployment

The repository includes a production `Dockerfile`, a `compose.yml` stack, and a Caddy reverse proxy for simple VPS deployments with automatic HTTPS.

### Files

- `Dockerfile`: multi-stage build for the Nuxt/Nitro server output
- `compose.yml`: app + Caddy services
- `deploy/Caddyfile`: reverse proxy from Caddy to the Nitro app
- `.env.production.example`: production environment template

### Prepare Production Env

```bash
cp .env.production.example .env.production
```

Set these values in `.env.production`:

- `DOMAIN`: the public hostname pointed at your VPS, for example `docs.example.com`
- `NUXT_SITE_URL`: the final public URL, for example `https://docs.example.com`
- `AI_GATEWAY_API_KEY`: optional, but required if you want the assistant enabled
- `STUDIO_GITHUB_CLIENT_ID` and `STUDIO_GITHUB_CLIENT_SECRET`: optional, only for Nuxt Studio in production

`NUXT_SITE_URL` and the assistant-related env vars are consumed during the Nuxt build, so deploy with `docker compose --env-file .env.production ...` rather than setting them only after the image is built.

### Deploy On A VPS

1. Install Docker Engine and the Docker Compose plugin on the VPS.
2. Point your domain’s DNS `A` or `AAAA` record to the VPS.
3. Open inbound ports `80` and `443` in the VPS firewall or cloud security group.
4. Copy the project to the server.
5. Start the stack:

```bash
docker compose --env-file .env.production up -d --build
```

6. Check status and logs:

```bash
docker compose ps
docker compose logs -f app
docker compose logs -f caddy
```

Caddy will obtain and renew TLS certificates automatically once the domain resolves to the VPS and ports `80` and `443` are reachable.

### Updating The Deployment

After pulling new code on the VPS:

```bash
docker compose --env-file .env.production up -d --build
```

If you change only Caddy config:

```bash
docker compose restart caddy
```
