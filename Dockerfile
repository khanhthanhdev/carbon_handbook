FROM oven/bun:1 AS build
WORKDIR /app

ARG NUXT_SITE_URL
ARG AI_GATEWAY_API_KEY
ARG STUDIO_GITHUB_CLIENT_ID
ARG STUDIO_GITHUB_CLIENT_SECRET

ENV NUXT_SITE_URL=${NUXT_SITE_URL}
ENV AI_GATEWAY_API_KEY=${AI_GATEWAY_API_KEY}
ENV STUDIO_GITHUB_CLIENT_ID=${STUDIO_GITHUB_CLIENT_ID}
ENV STUDIO_GITHUB_CLIENT_SECRET=${STUDIO_GITHUB_CLIENT_SECRET}

COPY package.json bun.lock ./

# Skip install scripts to avoid compiling native optional packages during image build.
RUN bun install --frozen-lockfile --ignore-scripts

COPY . .

RUN bun run build

FROM node:22-bookworm-slim AS production
WORKDIR /app

ENV NODE_ENV=production
ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=3000

COPY --from=build --chown=node:node /app/.output /app/.output

USER node

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
