<script setup lang="ts">
const appConfig = useAppConfig()
const site = useSiteConfig()

const props = defineProps<{
  eyebrow: string
  title: string
  description: string
  primaryLabel: string
  primaryTo: string
  secondaryLabel: string
  secondaryTo: string
}>()

const { localizeLabel } = useMarketingRoute()

const socialLinks = computed(() => [
  ...Object.entries(appConfig.socials || {}).map(([key, url]) => ({
    label: key,
    to: url as string,
  })),
])

const footerNote = computed(() => localizeLabel(appConfig.marketing?.labels?.footerNote, site.name))
</script>

<template>
  <LandingSection
    tone="cta"
    align="center"
    :eyebrow="props.eyebrow"
    :title="props.title"
    :description="props.description"
  >
    <div class="marketing-cta">
      <div class="marketing-cta__actions">
        <NuxtLink
          :to="props.primaryTo"
          class="marketing-button marketing-button--primary"
        >
          {{ props.primaryLabel }}
        </NuxtLink>

        <NuxtLink
          :to="props.secondaryTo"
          class="marketing-button marketing-button--secondary"
        >
          {{ props.secondaryLabel }}
        </NuxtLink>
      </div>

      <div class="marketing-inline-footer">
        <div>
          <p class="marketing-inline-footer__title">
            {{ site.name }}
          </p>
          <p class="marketing-inline-footer__note">
            {{ footerNote }}
          </p>
        </div>

        <div
          v-if="socialLinks.length"
          class="marketing-inline-footer__links"
        >
          <a
            v-for="(link, index) in socialLinks"
            :key="index"
            :href="link.to"
            target="_blank"
            rel="noreferrer"
            class="marketing-inline-footer__link"
          >
            {{ link.label }}
          </a>
        </div>
      </div>
    </div>
  </LandingSection>
</template>
