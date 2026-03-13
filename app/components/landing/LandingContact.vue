<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  email: string
  address: string
}>()
</script>

<template>
  <LandingSection
    tone="default"
    align="center"
    :eyebrow="eyebrow"
    :title="title"
  >
    <div class="marketing-contact">
      <div class="marketing-contact__item">
        <UIcon name="i-lucide-mail" class="marketing-contact__icon" />
        <a :href="`mailto:${email}`" class="marketing-contact__link">
          {{ email }}
        </a>
      </div>
      <div class="marketing-contact__item">
        <UIcon name="i-lucide-map-pin" class="marketing-contact__icon" />
        <p class="marketing-contact__text">
          {{ address }}
        </p>
      </div>
    </div>
  </LandingSection>
</template>

<style scoped>
.marketing-contact {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: clamp(1.2rem, 2vw, 1.6rem);
  border: 1px solid var(--marketing-border);
  border-radius: 1.6rem;
  background: rgba(255, 255, 255, 0.88);
  box-shadow: 0 14px 28px rgba(28, 40, 31, 0.06);
}

.marketing-contact__item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.marketing-contact__icon {
  flex-shrink: 0;
  width: 1.2rem;
  height: 1.2rem;
  color: var(--marketing-accent);
}

.marketing-contact__link {
  color: var(--marketing-text);
  text-decoration: none;
  font-weight: 600;
}

.marketing-contact__link:hover {
  color: var(--marketing-accent);
}

.marketing-contact__text {
  margin: 0;
  color: var(--marketing-muted);
}

/* Mobile responsive for Contact */
@media (max-width: 639px) {
  .marketing-contact {
    padding: 1rem;
    width: 100%;
  }

  .marketing-contact__item {
    width: 100%;
    justify-content: center;
  }

  .marketing-contact__link {
    font-size: 0.95rem;
    word-break: break-word;
  }

  .marketing-contact__text {
    font-size: 0.9rem;
  }
}
</style>
