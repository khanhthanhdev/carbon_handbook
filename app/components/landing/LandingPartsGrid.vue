<script setup lang="ts">
type PartItem = {
  icon?: string
  label?: string
  title: string
  description: string
  to: string
}

defineProps<{
  eyebrow: string
  title: string
  description: string
  items: PartItem[]
}>()

const { currentLocale } = useMarketingRoute()
const sectionLabel = computed(() => currentLocale.value === 'vi' ? 'Mở phần này' : 'Open section')
</script>

<style scoped>
/* Mobile responsive for parts grid */
@media (max-width: 639px) {
  .marketing-card-grid--parts {
    gap: 0.75rem;
  }

  .marketing-card--link {
    min-height: auto;
    padding: 1rem;
  }

  .marketing-card--link .marketing-card__title {
    font-size: 1rem;
  }

  .marketing-card--link .marketing-card__description {
    font-size: 0.875rem;
  }
}

/* Tablet responsive */
@media (min-width: 640px) and (max-width: 959px) {
  .marketing-card-grid--parts {
    gap: 0.875rem;
  }
}
</style>

<template>
  <LandingSection
    id="whats-inside"
    align="center"
    :eyebrow="eyebrow"
    :title="title"
    :description="description"
  >
    <div class="marketing-card-grid marketing-card-grid--parts">
      <NuxtLink
        v-for="item in items"
        :key="item.title"
        :to="item.to"
        class="marketing-card marketing-card--link"
      >
        <div class="marketing-card__header">
          <span class="marketing-card__icon">
            <UIcon :name="item.icon || 'i-lucide-book-open'" />
          </span>
          <span
            v-if="item.label"
            class="marketing-card__label"
          >
            {{ item.label }}
          </span>
        </div>

        <div class="marketing-card__body">
          <h3 class="marketing-card__title">
            {{ item.title }}
          </h3>
          <p class="marketing-card__description">
            {{ item.description }}
          </p>
        </div>

        <div class="marketing-card__footer">
          <span>{{ sectionLabel }}</span>
          <UIcon name="i-lucide-arrow-up-right" />
        </div>
      </NuxtLink>
    </div>
  </LandingSection>
</template>
