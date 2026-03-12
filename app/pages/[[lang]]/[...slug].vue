<script setup lang="ts">
import { kebabCase } from 'scule'
import type { ContentNavigationItem, Collections } from '@nuxt/content'
import { findPageHeadline } from '@nuxt/content/utils'

const route = useRoute()
const { locale, t } = useDocusI18n()
const appConfig = useAppConfig()
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')
const { shouldPushContent: shouldHideToc } = useAssistant()

type DocsCollectionName = Extract<keyof Collections, `docs_${string}`>
type DocsPage = Collections[DocsCollectionName]

const docsCollections = {
  en: 'docs_en',
  vi: 'docs_vi',
} as const satisfies Record<string, DocsCollectionName>
definePageMeta({
  layout: 'docs',
})

const collectionName = computed<DocsCollectionName>(() => {
  const currentLocale = locale.value

  return currentLocale in docsCollections
    ? docsCollections[currentLocale as keyof typeof docsCollections]
    : docsCollections.en
})

const [{ data: page }, { data: surround }] = await Promise.all([
  useAsyncData(kebabCase(route.path), () =>
    queryCollection(collectionName.value).path(route.path).first() as Promise<DocsPage | null>),
  useAsyncData(`${kebabCase(route.path)}-surround`, () => {
    return queryCollectionItemSurroundings(collectionName.value, route.path, {
      fields: ['description'],
    })
  }),
])

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const title = page.value.seo?.title || page.value.title
const description = page.value.seo?.description || page.value.description

const headline = ref(findPageHeadline(navigation?.value, page.value?.path))
const breadcrumbs = computed(() => findPageBreadcrumbs(navigation?.value, page.value?.path || ''))
const pageLinks = computed(() => page.value?.links ?? [])
const surroundLinks = computed(() => surround.value ?? [])
const tocLinks = computed(() => page.value?.body?.toc?.links ?? [])
const isLocalizedHomePage = computed(() => {
  const localizedRoots = Object.keys(docsCollections).map(localeCode => `/${localeCode}`)

  return localizedRoots.includes(page.value?.path ?? '')
})

useSeo({
  title,
  description,
  type: 'article',
  modifiedAt: (page.value as unknown as Record<string, unknown>).modifiedAt as string | undefined,
  breadcrumbs,
})
watch(() => navigation?.value, () => {
  headline.value = findPageHeadline(navigation?.value, page.value?.path) || headline.value
})

defineOgImageComponent('Docs', {
  headline: headline.value,
})

const github = computed(() => {
  if (!appConfig.github?.url?.trim()) {
    return null
  }

  return appConfig.github
})

const editLink = computed(() => {
  if (!github.value) {
    return
  }

  return [
    github.value.url,
    'edit',
    github.value.branch,
    github.value.rootDir,
    'content',
    `${page.value?.stem}.${page.value?.extension}`,
  ].filter(Boolean).join('/')
})
const issueLink = computed(() => github.value ? `${github.value.url}/issues/new/choose` : undefined)

// Add the page path to the prerender list
addPrerenderPath(`/raw${route.path}.md`)
</script>

<template>
  <UPage
    v-if="page"
    :key="`page-${shouldHideToc}`"
    class="docs-article-page"
  >
    <UPageHeader
      v-if="!isLocalizedHomePage"
      :title="page.title"
      :description="page.description"
      :headline="headline"
      :ui="{
        wrapper: 'flex-row items-start flex-wrap justify-between gap-3',
      }"
    >
      <template #links>
        <UButton
          v-for="(link, index) in pageLinks"
          :key="index"
          size="xs"
          v-bind="link"
        />

        <DocsPageHeaderLinks />
      </template>
    </UPageHeader>

    <UPageBody>
      <ContentRenderer
        v-if="page"
        :value="page"
      />

      <USeparator v-if="editLink || issueLink">
        <div
          class="flex items-center gap-2 text-sm text-muted"
        >
          <UButton
            v-if="editLink"
            variant="link"
            color="neutral"
            :to="editLink"
            target="_blank"
            icon="i-lucide-pen"
            :ui="{ leadingIcon: 'size-4' }"
          >
            {{ t('docs.edit') }}
          </UButton>
          <span v-if="editLink && issueLink">{{ t('common.or') }}</span>
          <UButton
            v-if="issueLink"
            variant="link"
            color="neutral"
            :to="issueLink"
            target="_blank"
            icon="i-lucide-alert-circle"
            :ui="{ leadingIcon: 'size-4' }"
          >
            {{ t('docs.report') }}
          </UButton>
        </div>
      </USeparator>
      <UContentSurround :surround="surroundLinks" />
    </UPageBody>

    <template
      v-if="tocLinks.length && !shouldHideToc"
      #right
    >
      <UContentToc
        highlight
        :title="appConfig.toc?.title || t('docs.toc')"
        :links="tocLinks"
      >
        <template #bottom>
          <DocsAsideRightBottom />
        </template>
      </UContentToc>
    </template>
  </UPage>
</template>
