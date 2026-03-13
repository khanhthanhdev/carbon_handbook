<script setup lang="ts">
const appConfig = useAppConfig()
const site = useSiteConfig()
const { handbookPath, isAboutRoute, isMarketingRoute, localizeLabel } = useMarketingRoute()

const footerNote = computed(() => localizeLabel(appConfig.marketing?.labels?.footerNote, site.name))
const socialLinks = computed(() => [
  ...Object.entries(appConfig.socials || {}).map(([key, url]) => ({
    icon: `i-simple-icons-${key}`,
    to: url as string,
    target: '_blank',
    'aria-label': `${key} social link`,
  })),
].filter(Boolean))
</script>

<template>
  <footer
    v-if="isMarketingRoute && isAboutRoute"
    class="marketing-footer"
  >
    <div class="marketing-shell marketing-footer__inner">
      <div class="marketing-footer__copy">
        <AppHeaderLogo class="h-8 w-auto" />
        <p class="marketing-footer__note">
          {{ footerNote }}
        </p>
      </div>

      <div class="marketing-footer__actions">
        <NuxtLink
          :to="handbookPath"
          class="marketing-button marketing-button--secondary"
        >
          {{ localizeLabel(appConfig.marketing?.labels?.exploreHandbook, 'Explore the handbook') }}
        </NuxtLink>

        <div
          v-if="socialLinks.length"
          class="flex items-center gap-2"
        >
          <UButton
            v-for="(link, index) in socialLinks"
            :key="index"
            size="sm"
            v-bind="{ color: 'neutral', variant: 'ghost', ...link }"
          />
        </div>
      </div>
    </div>
  </footer>

  <UFooter v-else-if="!isMarketingRoute">
    <template #left>
      <AppFooterLeft />
    </template>

    <template #right>
      <AppFooterRight />
    </template>
  </UFooter>
</template>
