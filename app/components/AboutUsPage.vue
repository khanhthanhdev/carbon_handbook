<script setup lang="ts">
import {
  getAboutPageContent,
  type AboutLocale,
} from '../data/about'

const { locale, switchLocalePath } = useDocusI18n()
const appConfig = useAppConfig()

const currentLocale = computed<AboutLocale>(() => locale.value === 'vi' ? 'vi' : 'en')
const content = computed(() => getAboutPageContent(currentLocale.value))
const handbookPath = computed(() => {
  const paths = appConfig.marketing?.handbookPaths as Partial<Record<AboutLocale, string>> | undefined

  return paths?.[currentLocale.value] || `/${currentLocale.value}`
})
const alternateLocalePath = computed(() => {
  const targetLocale: AboutLocale = currentLocale.value === 'vi' ? 'en' : 'vi'

  return (switchLocalePath(targetLocale) as string | undefined) || `/${targetLocale}/about-us`
})
</script>

<template>
  <div class="about-page">
    <!-- Hero -->
    <!-- <LandingSection
      :eyebrow="content.copy.hero.eyebrow"
      :title="content.copy.hero.title"
      :description="content.copy.hero.description"
      align="center"
    >
      <div class="about-hero-actions">
        <NuxtLink
          :to="handbookPath"
          class="marketing-button marketing-button--primary"
        >
          {{ content.copy.hero.primaryAction }}
        </NuxtLink>
        <NuxtLink
          :to="alternateLocalePath"
          class="marketing-button marketing-button--secondary"
        >
          {{ content.copy.hero.secondaryAction }}
        </NuxtLink>
      </div>

      <div class="about-hero-meta">
        <div class="about-hero-meta__card">
          <p class="about-hero-meta__label">
            {{ content.copy.hero.summaryTitle }}
          </p>
          <p class="about-hero-meta__text">
            {{ content.copy.hero.summaryDescription }}
          </p>
        </div>

        <div class="about-hero-meta__row">
          <div class="about-hero-meta__card">
            <p class="about-hero-meta__label">
              {{ content.copy.hero.institutionsLabel }}
            </p>
            <ul class="about-hero-meta__list">
              <li
                v-for="partner in content.partners"
                :key="partner.name"
              >
                {{ partner.name }}
              </li>
            </ul>
          </div>

          <div class="about-hero-meta__card">
            <p class="about-hero-meta__label">
              {{ content.copy.hero.focusLabel }}
            </p>
            <ul class="about-hero-meta__list">
              <li
                v-for="area in content.focusAreas"
                :key="area.title"
              >
                {{ area.title }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </LandingSection> -->

    <!-- Leadership -->
    <LandingSection
      :eyebrow="content.copy.leaders.eyebrow"
      :title="content.copy.leaders.title"
      :description="content.copy.leaders.description"
      align="center"
    >
      <div class="marketing-preview__people">
        <article
          v-for="member in content.coChairs"
          :key="member.name"
          class="marketing-card marketing-card--person"
        >
          <component
            :is="member.profileUrl ? 'a' : 'div'"
            class="about-person-link"
            :href="member.profileUrl"
            :target="member.profileUrl ? '_blank' : undefined"
            :rel="member.profileUrl ? 'noreferrer' : undefined"
          >
            <img
              v-if="member.image"
              :src="member.image"
              :alt="`${member.name} ${content.copy.mockupLabel.toLowerCase()}`"
              class="marketing-person__image"
            >
            <div class="marketing-person__body">
              <h3 class="marketing-card__title">
                {{ member.name }}
              </h3>
              <p class="marketing-card__description">
                {{ member.title }}
              </p>
              <p
                v-if="member.organization"
                class="marketing-person__organization"
              >
                {{ member.organization }}
              </p>
            </div>
          </component>
        </article>
      </div>
    </LandingSection>

    <!-- Editors -->
    <LandingSection
      :eyebrow="content.copy.editors.eyebrow"
      :title="content.copy.editors.title"
      align="center"
    >
      <div class="about-editors-grid">
        <article
          v-for="member in content.editors"
          :key="member.name"
          class="marketing-card about-editor-card"
        >
          <component
            :is="member.profileUrl ? 'a' : 'div'"
            class="about-editor-link"
            :href="member.profileUrl"
            :target="member.profileUrl ? '_blank' : undefined"
            :rel="member.profileUrl ? 'noreferrer' : undefined"
          >
            <div class="about-editor-avatar">
              {{ member.initials }}
            </div>
            <h3 class="marketing-card__title">
              {{ member.name }}
            </h3>
            <p class="marketing-card__description">
              {{ member.title }}
            </p>
            <p
              v-if="member.organization"
              class="marketing-card__description"
            >
              {{ member.organization }}
            </p>
          </component>
        </article>
      </div>
    </LandingSection>

    <!-- Focus Areas -->
    <LandingSection
      :eyebrow="content.copy.focus.eyebrow"
      :title="content.copy.focus.title"
      tone="contrast"
      align="center"
    >
      <div class="about-focus-grid">
        <article
          v-for="item in content.focusAreas"
          :key="item.icon"
          class="marketing-card about-focus-card"
        >
          <div class="about-focus-icon">
            <UIcon :name="item.icon" />
          </div>
          <h3 class="marketing-card__title">
            {{ item.title }}
          </h3>
          <p class="marketing-card__description">
            {{ item.description }}
          </p>
        </article>
      </div>
    </LandingSection>

    <!-- Partners -->
    <LandingSection
      :eyebrow="content.copy.partners.eyebrow"
      :title="content.copy.partners.title"
      align="center"
    >
      <div class="about-partners-grid-new">
        <article
          v-for="partner in content.partners"
          :key="partner.name"
          class="about-partner-card-new"
        >
          <component
            :is="partner.website ? 'a' : 'div'"
            class="about-partner-card-new__link"
            :href="partner.website"
            :target="partner.website ? '_blank' : undefined"
            :rel="partner.website ? 'noreferrer' : undefined"
          >
            <img
              class="about-partner-card-new__image"
              :src="partner.image"
              :alt="`${partner.name} ${content.copy.mockupLabel.toLowerCase()}`"
            >
            <h3 class="about-partner-card-new__name">
              {{ partner.name }}
            </h3>
          </component>
        </article>
      </div>
    </LandingSection>

    <!-- Contact CTA -->
    <LandingSection
      tone="default"
      align="center"
      :eyebrow="content.copy.contact.eyebrow"
      :title="content.copy.contact.title"
    >
      <div class="marketing-contact">
        <div class="marketing-contact__item">
          <UIcon name="i-lucide-mail" class="marketing-contact__icon" />
          <a :href="`mailto:${content.contactEmail}`" class="marketing-contact__link">
            {{ content.contactEmail }}
          </a>
        </div>
      </div>
    </LandingSection>
  </div>
</template>

<style scoped>
.about-page {
  position: relative;
  padding: clamp(1.1rem, 2vw, 1.8rem) 0 4rem;
  background:
    radial-gradient(circle at top left, rgba(243, 223, 154, 0.42), transparent 24rem),
    radial-gradient(circle at 88% 8%, rgba(190, 231, 234, 0.46), transparent 22rem),
    linear-gradient(180deg, var(--marketing-bg) 0%, var(--marketing-bg) 100%);
}

.about-page::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(90deg, rgba(18, 34, 22, 0.04) 1px, transparent 1px),
    linear-gradient(rgba(18, 34, 22, 0.03) 1px, transparent 1px);
  background-size: 32px 32px;
  mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.42), transparent 88%);
}

/* Make LandingSection backgrounds transparent on about page for continuous look */
.about-page :deep(.marketing-section) {
  background: transparent;
  padding-top: 2.5rem;
  padding-bottom: 2.5rem;
}

.about-page :deep(.marketing-section--contrast) {
  background: transparent;
}

.about-page :deep(.marketing-section--cta) {
  background: transparent;
}

/* Add subtle dividers between sections */
.about-page :deep(.marketing-section + .marketing-section) {
  position: relative;
}

.about-page :deep(.marketing-section + .marketing-section::before) {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: var(--marketing-shell);
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(14, 34, 14, 0.08), transparent);
}

.about-hero-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
}

.about-hero-meta {
  display: grid;
  gap: 0.9rem;
  max-width: 42rem;
  margin: 0 auto;
}

.about-hero-meta__row {
  display: grid;
  gap: 0.9rem;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
}

.about-hero-meta__card {
  padding: 1.1rem 1.15rem;
  border: 1px solid var(--marketing-border);
  border-radius: 1.35rem;
  background: rgba(255, 255, 255, 0.55);
  box-shadow: 0 14px 28px rgba(28, 40, 31, 0.06);
}

.about-hero-meta__label {
  margin: 0;
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--marketing-text);
}

.about-hero-meta__text {
  margin: 0.7rem 0 0;
  font-size: 0.94rem;
  color: var(--marketing-muted);
  line-height: 1.75;
}

.about-hero-meta__list {
  padding-left: 1rem;
  margin: 0.75rem 0 0;
  font-size: 0.92rem;
  color: var(--marketing-muted);
  line-height: 1.75;
}

.about-hero-meta__list li + li {
  margin-top: 0.45rem;
}

.about-person-link {
  display: block;
  height: 100%;
  text-decoration: none;
  color: inherit;
}

.about-editors-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(165px, 1fr));
}

.about-editor-card {
  padding: 0;
}

.about-editor-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.65rem;
  height: 100%;
  padding: 1.1rem 0.9rem;
  text-align: center;
  text-decoration: none;
  color: inherit;
}

.about-editor-card:nth-child(3n + 1) {
  background: linear-gradient(180deg, rgba(244, 235, 195, 0.55) 0%, rgba(255, 255, 255, 0.7) 100%);
}

.about-editor-card:nth-child(3n + 2) {
  background: linear-gradient(180deg, rgba(208, 237, 238, 0.55) 0%, rgba(255, 255, 255, 0.7) 100%);
}

.about-editor-card:nth-child(3n) {
  background: linear-gradient(180deg, rgba(214, 238, 211, 0.55) 0%, rgba(255, 255, 255, 0.7) 100%);
}

.about-editor-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(71, 193, 99, 0.92) 0%, rgba(145, 220, 160, 0.82) 100%);
  color: #fff;
  font-size: 0.92rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.about-focus-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.about-focus-card:nth-child(3n + 1) {
  background: linear-gradient(180deg, rgba(244, 235, 195, 0.55) 0%, rgba(255, 255, 255, 0.7) 100%);
}

.about-focus-card:nth-child(3n + 2) {
  background: linear-gradient(180deg, rgba(208, 237, 238, 0.55) 0%, rgba(255, 255, 255, 0.7) 100%);
}

.about-focus-card:nth-child(3n) {
  background: linear-gradient(180deg, rgba(214, 238, 211, 0.55) 0%, rgba(255, 255, 255, 0.7) 100%);
}

.about-focus-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 0.95rem;
  background: var(--marketing-accent-soft);
  color: var(--marketing-accent);
  font-size: 1.25rem;
  margin-bottom: 0.4rem;
}

.about-partner-link {
  display: block;
  height: 100%;
  text-decoration: none;
  color: inherit;
}

.about-partners-grid-new {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.about-partner-card-new {
  display: block;
  height: 100%;
  text-decoration: none;
  color: inherit;
  border-radius: 1.35rem;
  overflow: hidden;
  transition: transform 180ms ease, box-shadow 180ms ease;
}

.about-partner-card-new:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 44px rgba(28, 40, 31, 0.1);
}

.about-partner-card-new__image {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: contain;
  background: rgba(255, 255, 255, 0.96);
  border-radius: 1.35rem;
}

.about-partner-card-new__name {
  margin: 1rem 0 0;
  font-size: 1.1rem;
  font-weight: 700;
  text-align: center;
  color: var(--marketing-text);
}

.marketing-contact {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: clamp(1.2rem, 2vw, 1.6rem);
  border: 1px solid var(--marketing-border);
  border-radius: 1.6rem;
  background: rgba(255, 255, 255, 0.55);
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

@media (max-width: 639px) {
  .about-hero-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .about-hero-actions > * {
    width: 100%;
  }
}
</style>
