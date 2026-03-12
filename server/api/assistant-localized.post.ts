import type { H3Event } from 'h3'
import { createMCPClient } from '@ai-sdk/mcp'
import { convertToModelMessages, createUIMessageStream, createUIMessageStreamResponse, streamText } from 'ai'
import type { ToolCallPart, ToolSet, UIMessage, UIMessageStreamWriter } from 'ai'

const MAX_STEPS = 10
const SUPPORTED_LOCALES = ['en', 'vi'] as const
const VIETNAMESE_DIACRITICS_RE = /[ăâđêôơưáàảãạắằẳẵặấầẩẫậéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ]/i
const VIETNAMESE_MARKERS = new Set([
  'bạn',
  'ban',
  'bao',
  'các',
  'cac',
  'cần',
  'cho',
  'có',
  'co',
  'của',
  'cua',
  'được',
  'duoc',
  'giải',
  'giai',
  'giúp',
  'giup',
  'hướng',
  'huong',
  'không',
  'khong',
  'là',
  'la',
  'nào',
  'nao',
  'như',
  'nhu',
  'thế',
  'tiếng',
  'tieng',
  'trả',
  'tra',
  'và',
  'va',
  'về',
  've',
  'việt',
  'viet',
  'xin',
])
const ENGLISH_MARKERS = new Set([
  'a',
  'an',
  'and',
  'answer',
  'can',
  'do',
  'docs',
  'documentation',
  'english',
  'explain',
  'for',
  'help',
  'how',
  'in',
  'is',
  'please',
  'should',
  'the',
  'to',
  'use',
  'what',
  'where',
  'why',
  'with',
])

type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]

interface AssistantRequestBody {
  locale?: string
  messages?: UIMessage[]
  path?: string
}

interface LanguageContext {
  lookupLocale: SupportedLocale
  messageLanguage?: SupportedLocale
  pageLocale: SupportedLocale
  responseLocale: SupportedLocale
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function stopWhenResponseComplete({ steps }: { steps: any[] }): boolean {
  const lastStep = steps.at(-1)
  if (!lastStep) return false

  const hasText = Boolean(lastStep.text && lastStep.text.trim().length > 0)
  const hasNoToolCalls = !lastStep.toolCalls || lastStep.toolCalls.length === 0

  if (hasText && hasNoToolCalls) return true

  return steps.length >= MAX_STEPS
}

function isSupportedLocale(locale: unknown): locale is SupportedLocale {
  return typeof locale === 'string' && SUPPORTED_LOCALES.includes(locale as SupportedLocale)
}

function extractLatestUserText(messages: UIMessage[]): string {
  const lastUserMessage = [...messages].reverse().find(message => message.role === 'user')
  if (!lastUserMessage) {
    return ''
  }

  return lastUserMessage.parts
    .filter(part => part.type === 'text')
    .map(part => part.text)
    .join('\n')
    .trim()
}

function detectMessageLanguage(message: string): SupportedLocale | undefined {
  const normalizedMessage = message.trim().toLowerCase()
  if (!normalizedMessage) {
    return undefined
  }

  if (VIETNAMESE_DIACRITICS_RE.test(normalizedMessage)) {
    return 'vi'
  }

  const tokens = normalizedMessage.match(/[a-zA-ZÀ-ỹ]+/g) || []
  if (tokens.length === 0) {
    return undefined
  }

  let vietnameseScore = 0
  let englishScore = 0

  for (const token of tokens) {
    if (VIETNAMESE_MARKERS.has(token)) {
      vietnameseScore += 1
    }

    if (ENGLISH_MARKERS.has(token)) {
      englishScore += 1
    }
  }

  if (vietnameseScore === englishScore) {
    return undefined
  }

  return vietnameseScore > englishScore ? 'vi' : 'en'
}

function inferLocaleFromPath(path?: string): SupportedLocale | undefined {
  if (!path) {
    return undefined
  }

  const locale = path.split('?')[0]?.split('/').filter(Boolean)[0]
  return isSupportedLocale(locale) ? locale : undefined
}

function inferLocaleFromHeader(value?: string): SupportedLocale | undefined {
  if (!value) {
    return undefined
  }

  for (const item of value.split(',')) {
    const locale = item.trim().split(';')[0]?.toLowerCase()
    if (locale === 'vi' || locale?.startsWith('vi-')) {
      return 'vi'
    }

    if (locale === 'en' || locale?.startsWith('en-')) {
      return 'en'
    }
  }

  return undefined
}

function inferLocaleFromReferer(referer?: string): SupportedLocale | undefined {
  if (!referer) {
    return undefined
  }

  try {
    return inferLocaleFromPath(new URL(referer).pathname)
  }
  catch {
    return undefined
  }
}

function getLanguageName(locale: SupportedLocale) {
  return locale === 'vi' ? 'Vietnamese' : 'English'
}

function resolveLanguageContext(
  messages: UIMessage[],
  requestedLocale: string | undefined,
  requestedPath: string | undefined,
  event: H3Event,
): LanguageContext {
  const messageLanguage = detectMessageLanguage(extractLatestUserText(messages))
  const pageLocale = inferLocaleFromPath(requestedPath)
    || (isSupportedLocale(requestedLocale) ? requestedLocale : undefined)
    || inferLocaleFromReferer(getHeader(event, 'referer'))
    || inferLocaleFromHeader(getHeader(event, 'accept-language'))
    || 'en'

  const responseLocale = messageLanguage || pageLocale

  return {
    lookupLocale: responseLocale,
    messageLanguage,
    pageLocale,
    responseLocale,
  }
}

function getSystemPrompt(siteName: string, context: LanguageContext) {
  return `You are a helpful documentation assistant for ${siteName}.

You have tools to search and read documentation pages: list-pages and get-page.
- Use locale "${context.lookupLocale}" when searching for pages
- Read documentation and provide helpful answers to users

**Language:**
- Answer in ${getLanguageName(context.responseLocale)}
- Use the user's language when it's clear they wrote in English or Vietnamese

**Tone:**
- Be helpful, concise, and direct
- Provide actionable guidance`
}

export default defineEventHandler(async (event) => {
  const body = await readBody<AssistantRequestBody>(event)
  const messages = Array.isArray(body.messages) ? body.messages : []
  const config = useRuntimeConfig()
  const siteConfig = getSiteConfig(event)

  const siteName = siteConfig.name || 'Documentation'
  const languageContext = resolveLanguageContext(messages, body.locale, body.path, event)
  const mcpServer = config.assistant.mcpServer
  const isExternalUrl = mcpServer.startsWith('http://') || mcpServer.startsWith('https://')
  const mcpUrl = isExternalUrl
    ? mcpServer
    : import.meta.dev
      ? `http://localhost:3000${mcpServer}`
      : `${getRequestURL(event).origin}${mcpServer}`

  const httpClient = await createMCPClient({
    transport: { type: 'http', url: mcpUrl },
  })
  const mcpTools = await httpClient.tools()

  const stream = createUIMessageStream({
    execute: async ({ writer }: { writer: UIMessageStreamWriter }) => {
      const modelMessages = await convertToModelMessages(messages)
      const result = streamText({
        model: config.assistant.model,
        maxOutputTokens: 4000,
        maxRetries: 2,
        stopWhen: stopWhenResponseComplete,
        system: getSystemPrompt(siteName, languageContext),
        messages: modelMessages,
        tools: mcpTools as ToolSet,
        onStepFinish: ({ toolCalls }: { toolCalls: ToolCallPart[] }) => {
          if (toolCalls.length === 0) return
          writer.write({
            id: toolCalls[0]?.toolCallId,
            type: 'data-tool-calls',
            data: {
              tools: toolCalls.map((toolCall: ToolCallPart) => {
                const args = 'args' in toolCall ? toolCall.args : 'input' in toolCall ? toolCall.input : {}
                return {
                  toolName: toolCall.toolName,
                  toolCallId: toolCall.toolCallId,
                  args,
                }
              }),
            },
          })
        },
      })
      writer.merge(result.toUIMessageStream())
    },
    onFinish: async () => {
      await httpClient.close()
    },
  })

  return createUIMessageStreamResponse({ stream })
})
