<script setup lang="ts">
type PersonPreview = {
  image?: string
  name: string
  role: string
  organization?: string
}

type InstitutionPreview = {
  image?: string
  name: string
  description?: string
}

defineProps<{
  eyebrow: string
  title: string
  description: string
  primaryLabel: string
  primaryTo: string
  people: PersonPreview[]
  supportTitle: string
  supportDescription?: string
  institutions: InstitutionPreview[]
}>()
</script>

<template>
  <LandingSection
    :eyebrow="eyebrow"
    :title="title"
    :description="description"
  >
    <div class="marketing-preview">
      <div class="marketing-preview__people">
        <article
          v-for="person in people"
          :key="person.name"
          class="marketing-card marketing-card--person"
        >
          <img
            v-if="person.image"
            :src="person.image"
            :alt="person.name"
            class="marketing-person__image"
          >

          <div class="marketing-person__body">
            <h3 class="marketing-card__title">
              {{ person.name }}
            </h3>
            <p class="marketing-card__description">
              {{ person.role }}
            </p>
            <p
              v-if="person.organization"
              class="marketing-person__organization"
            >
              {{ person.organization }}
            </p>
          </div>
        </article>
      </div>

      <NuxtLink
        :to="primaryTo"
        class="marketing-button marketing-button--secondary marketing-preview__action"
      >
        {{ primaryLabel }}
      </NuxtLink>

      <div class="marketing-preview__support">
        <div class="marketing-preview__support-intro">
          <h3 class="marketing-preview__support-title">
            {{ supportTitle }}
          </h3>
          <p
            v-if="supportDescription"
            class="marketing-preview__support-description"
          >
            {{ supportDescription }}
          </p>
        </div>

        <div class="marketing-preview__institutions">
          <article
            v-for="institution in institutions"
            :key="institution.name"
            class="marketing-card marketing-card--institution"
          >
            <img
              v-if="institution.image"
              :src="institution.image"
              :alt="institution.name"
              class="marketing-institution__image"
            >

            <div class="marketing-institution__body">
              <p class="marketing-preview__partner-name">
                {{ institution.name }}
              </p>
              <p
                v-if="institution.description"
                class="marketing-preview__partner-description"
              >
                {{ institution.description }}
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>
  </LandingSection>
</template>

<style scoped>
/* Mobile responsive for About Preview */
@media (max-width: 767px) {
  .marketing-preview {
    gap: 1.25rem;
  }

  .marketing-preview__people {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .marketing-card--person {
    max-width: 100%;
  }

  .marketing-preview__action {
    width: 100%;
    justify-content: center;
  }

  .marketing-preview__support {
    padding: 1rem;
  }

  .marketing-preview__support-title {
    font-size: 1.25rem;
    white-space: normal;
  }

  .marketing-preview__support-description {
    white-space: normal;
  }

  .marketing-preview__institutions {
    grid-template-columns: 1fr;
    width: 100%;
  }

  .marketing-card--institution {
    width: 100%;
  }
}

/* Tablet responsive */
@media (min-width: 768px) and (max-width: 959px) {
  .marketing-preview__people {
    grid-template-columns: repeat(2, 1fr);
  }

  .marketing-preview__institutions {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
