<script setup lang="ts">
import type { Collections } from '@nuxt/content'

definePageMeta({
  layout: false,
})

type DocsCollectionName = Extract<keyof Collections, `docs_${string}`>

const route = useRoute()
const { locale } = useDocusI18n()

const docsCollections = {
  en: 'docs_en',
  vi: 'docs_vi',
} as const satisfies Record<string, DocsCollectionName>

const collectionName = computed<DocsCollectionName>(() => {
  const pathLocale = route.path.split('/')[1] ?? ''
  const currentLocale = pathLocale in docsCollections ? pathLocale : locale.value

  return (currentLocale in docsCollections)
    ? docsCollections[currentLocale as keyof typeof docsCollections]
    : docsCollections.en
})

const { data: page } = await useAsyncData(
  () => `about-us-${route.path}`,
  () => queryCollection(collectionName.value).path(route.path).first() as Promise<Collections[DocsCollectionName] | null>,
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const title = page.value.seo?.title || page.value.title
const description = page.value.seo?.description || page.value.description

useSeo({
  title,
  description,
  type: 'website',
  ogImage: page.value?.seo?.ogImage as string | undefined,
})

if (!page.value?.seo?.ogImage) {
  defineOgImageComponent('Landing', {
    title,
    description,
  })
}
</script>

<template>
  <ContentRenderer
    v-if="page"
    :value="page"
  />
</template>
