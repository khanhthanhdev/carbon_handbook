import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

function loadLocalEnv(fileName: string) {
  const filePath = resolve(process.cwd(), fileName)
  if (!existsSync(filePath)) {
    return
  }

  for (const line of readFileSync(filePath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) {
      continue
    }

    const separatorIndex = trimmed.indexOf('=')
    if (separatorIndex === -1) {
      continue
    }

    const key = trimmed.slice(0, separatorIndex).trim()
    const rawValue = trimmed.slice(separatorIndex + 1).trim()

    if (!key || process.env[key]) {
      continue
    }

    process.env[key] = rawValue.replace(/^['"]|['"]$/g, '')
  }
}

// Ensure local env files are available before Docus assistant modules read process.env.
loadLocalEnv('.env')
loadLocalEnv('.env.local')

const siteUrl = process.env.NUXT_SITE_URL

export default defineNuxtConfig({
  extends: ['docus'],
  site: {
    name: 'Carbon Credits Guide',
    ...(siteUrl ? { url: siteUrl } : {}),
  },
  fonts: {
    defaults: {
      subsets: ['latin', 'vietnamese'],
      styles: ['normal'],
      weights: [400, 500, 600, 700, 800],
    },
    families: [
      {
        name: 'Manrope',
        provider: 'google',
      },
    ],
  },
  icon: {
    provider: 'server',
    fallbackToApi: false,
  },
  llms: {
    domain: siteUrl || 'http://localhost:3000',
    title: 'Carbon Credits Guide',
    description: 'Comprehensive carbon credit documentation for Vietnamese SMEs',
    full: {
      title: 'Carbon Credits Guide',
      description: 'Comprehensive carbon credit documentation for Vietnamese SMEs',
    },
  },
  modules: ['docus/modules/assistant', '@nuxtjs/i18n', '@nuxt/fonts', '@nuxt/hints', '@nuxtjs/seo'],
  css: ['~/assets/css/main.css'],
  assistant: {
    mcpServer: '/mcp',
    model: 'alibaba/qwen-3-32b',
  },
  i18n: {
    defaultLocale: 'en',
    vueI18n: 'i18n.config.ts',
    locales: [{
      code: 'en',
      name: 'English',
    }, {
      code: 'vi',
      name: 'Tiếng Việt',
    }],
  },
  mcp: {
    enabled: true,
  },
  devtools: {
    enabled: false,
  },
})
