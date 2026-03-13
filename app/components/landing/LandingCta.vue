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

<style scoped>
/* Mobile responsive for CTA */
@media (max-width: 639px) {
  .marketing-cta {
    padding: 1.25rem;
    gap: 1.25rem;
  }

  .marketing-cta__actions {
    width: 100%;
    flex-direction: column;
  }

  .marketing-cta__actions .marketing-button {
    width: 100%;
  }

  .marketing-inline-footer {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.75rem;
  }

  .marketing-inline-footer__links {
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem 0.75rem;
  }
}

/* Tablet responsive */
@media (min-width: 640px) and (max-width: 959px) {
  .marketing-cta {
    padding: 1.5rem;
  }
}
</style>
