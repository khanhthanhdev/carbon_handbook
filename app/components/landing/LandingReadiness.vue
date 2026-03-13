<script setup lang="ts">
type ReadinessItem = {
  title: string
  description: string
}

defineProps<{
  eyebrow: string
  title: string
  description: string
  items: ReadinessItem[]
}>()

const { currentLocale } = useMarketingRoute()
const outcomeLabel = computed(() => currentLocale.value === 'vi' ? 'Năng lực' : 'Outcome')
</script>

<style scoped>
.marketing-card__description {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Mobile responsive for Readiness */
@media (max-width: 639px) {
  .marketing-readiness {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .marketing-card--readiness {
    padding: 1rem;
  }

  .marketing-card--readiness .marketing-card__title {
    font-size: 1rem;
  }

  .marketing-card--readiness .marketing-card__description {
    font-size: 0.875rem;
    white-space: normal;
    text-overflow: clip;
  }

  .marketing-card__label {
    font-size: 0.65rem;
  }
}

/* Tablet responsive */
@media (min-width: 640px) and (max-width: 959px) {
  .marketing-readiness {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.875rem;
  }
}
</style>

<template>
  <LandingSection
    tone="contrast"
    align="center"
    :eyebrow="eyebrow"
    :title="title"
    :description="description"
  >
    <div class="marketing-readiness">
      <article
        v-for="item in items"
        :key="item.title"
        class="marketing-card marketing-card--readiness"
      >
        <p class="marketing-card__label">
          {{ outcomeLabel }}
        </p>
        <h3 class="marketing-card__title">
          {{ item.title }}
        </h3>
        <p class="marketing-card__description">
          {{ item.description }}
        </p>
      </article>
    </div>
  </LandingSection>
</template>
