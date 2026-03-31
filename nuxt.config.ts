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

const siteUrl = process.env.NUXT_SITE_URL || 'http://localhost:3000'

export default defineNuxtConfig({
  extends: ['docus'],
  site: {
    name: 'Carbon Market Handbook for Vietnamese SMEs',
    description: 'Comprehensive carbon market handbook for Vietnam SMEs - carbon credits, MRV, green finance, emissions trading, and net zero pathways',
    url: siteUrl,
    defaultLocale: 'en',
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
    domain: siteUrl,
    title: 'Carbon Market Handbook',
    description: 'Comprehensive carbon market documentation for Vietnamese SMEs',
    full: {
      title: 'Carbon Market Handbook for SMES',
      description: 'Comprehensive carbon market documentation for Vietnamese SMEs',
    },
  },
  sitemap: {
    enabled: true,
    cacheMaxAgeSeconds: 3600,
    defaultSitemapsChunkSize: 1000,
  },
  robots: {
    groups: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/_studio', '/api'],
      },
    ],
  },
  schemaOrg: {
    identity: {
      type: 'Organization',
      name: 'Carbon Market Handbook',
      url: siteUrl,
      logo: '/logo.png',
      sameAs: [],
    },
  },
  modules: [
    'docus/modules/assistant',
    '@nuxtjs/i18n',
    '@nuxt/fonts',
    '@nuxt/hints',
    '@nuxtjs/seo',
    'nuxt-studio',
    '@vercel/analytics',
    '@vercel/speed-insights',
  ],
  css: ['~/assets/css/main.css'],
  assistant: {
    mcpServer: '/mcp',
    model: 'google/gemini-2.5-flash-lite',
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
    skipSettingLocaleOnNavigate: true,
  },
  routeRules: {
    '/_studio/**': { isr: false },
  },
  studio: {
    repository: {
      provider: 'github',
      owner: 'khanhthanhdev',
      repo: 'carbon_handbook',
      branch: 'main',
    },

  },
  mcp: {
    enabled: true,
  },
  devtools: {
    enabled: false,
  },
})
