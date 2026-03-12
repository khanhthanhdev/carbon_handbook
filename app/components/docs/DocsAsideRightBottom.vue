<script setup lang="ts">
const route = useRoute()

const pageUrl = route.path
const appConfig = useAppConfig()
const { locale, t } = useDocusI18n()
const { isEnabled, open } = useAssistant()

const explainPromptMessages: Record<string, string> = {
  en: 'Explain the page {url}',
  vi: 'Giải thích trang {url}',
}

function getExplainPrompt(url: string) {
  const template = explainPromptMessages[locale.value] || explainPromptMessages.en
  return template.replace('{url}', url)
}

const showExplainWithAi = computed(() => {
  return isEnabled.value && appConfig.assistant?.explainWithAi !== false
})

const explainIcon = computed(() => appConfig.assistant?.icons?.explain || 'i-lucide-brain')
</script>

<template>
  <div
    v-if="appConfig.toc?.bottom?.links?.length || showExplainWithAi"
    class="hidden lg:block space-y-6"
  >
    <USeparator type="dashed" />

    <UPageLinks
      v-if="appConfig.toc?.bottom?.links?.length"
      :title="appConfig.toc?.bottom?.title || t('docs.links')"
      :links="appConfig.toc?.bottom?.links"
    />

    <USeparator
      v-if="appConfig.toc?.bottom?.links?.length && showExplainWithAi"
      type="dashed"
    />

    <UButton
      v-if="showExplainWithAi"
      :icon="explainIcon"
      :label="t('assistant.explainWithAi')"
      size="sm"
      variant="link"
      class="p-0 text-sm"
      color="neutral"
      @click="open(getExplainPrompt(pageUrl), true)"
    />
  </div>
</template>
