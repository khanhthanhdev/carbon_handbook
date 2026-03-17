<script setup lang="ts">
const appConfig = useAppConfig();
const site = useSiteConfig();
const route = useRoute();

const { isEnabled: isAssistantEnabled } = useAssistant();
const { localePath, isEnabled, locales } = useDocusI18n();
const {
  currentLocale,
  homePath,
  alternateLocalePath,
  isMarketingRoute,
  localizeLabel,
} = useMarketingRoute();

const isMenuOpen = ref(false);
const isScrolled = ref(false);

const localeToggleLabel = computed(() =>
  localizeLabel(
    appConfig.marketing?.labels?.switchLocale,
    currentLocale.value === "vi" ? "English" : "Tiếng Việt",
  ),
);

const links = computed(() => []);

function updateScrolled() {
  isScrolled.value =
    window.scrollY > (appConfig.marketing?.headerSolidOffset || 24);
}

function stopTracking() {
  if (!import.meta.client) {
    return;
  }

  window.removeEventListener("scroll", updateScrolled);
  isScrolled.value = false;
}

function startTracking() {
  if (!import.meta.client) {
    return;
  }

  stopTracking();
  updateScrolled();
  window.addEventListener("scroll", updateScrolled, { passive: true });
}

watch(
  () => isMarketingRoute.value,
  (value) => {
    if (!import.meta.client) {
      return;
    }

    if (value) {
      startTracking();
      return;
    }

    stopTracking();
  },
  { immediate: true },
);

watch(
  () => route.path,
  () => {
    isMenuOpen.value = false;
  },
);

onBeforeUnmount(stopTracking);
</script>

<template>
  <header
    v-if="isMarketingRoute"
    class="marketing-header"
    :class="{ 'marketing-header--solid': isScrolled || isMenuOpen }"
  >
    <div class="marketing-shell">
      <div class="marketing-header__bar">
        <NuxtLink :to="homePath" class="marketing-header__brand">
          <AppHeaderLogo class="marketing-header__logo" />
        </NuxtLink>

        <AppHeaderCenter class="hidden lg:flex" />

        <div class="marketing-header__controls">
          <NuxtLink
            :to="alternateLocalePath"
            class="marketing-header__locale marketing-header__locale--desktop"
          >
            {{ localeToggleLabel }}
          </NuxtLink>

          <AppHeaderCTA
            class="marketing-header__cta marketing-header__cta--desktop"
          />

          <UButton
            color="neutral"
            variant="ghost"
            class="marketing-header__menu-toggle lg:hidden"
            :icon="isMenuOpen ? 'i-lucide-x' : 'i-lucide-menu'"
            :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'"
            :aria-expanded="isMenuOpen"
            aria-controls="marketing-mobile-nav"
            @click="isMenuOpen = !isMenuOpen"
          />
        </div>
      </div>

      <Transition name="marketing-header-panel">
        <div
          v-if="isMenuOpen"
          id="marketing-mobile-nav"
          class="marketing-header__panel lg:hidden"
        >
          <AppHeaderCenter mobile @navigate="isMenuOpen = false" />

          <div class="marketing-header__panel-actions">
            <NuxtLink
              :to="alternateLocalePath"
              class="marketing-header__locale marketing-header__locale--mobile"
              @click="isMenuOpen = false"
            >
              {{ localeToggleLabel }}
            </NuxtLink>

            <AppHeaderCTA mobile @click="isMenuOpen = false" />
          </div>
        </div>
      </Transition>
    </div>
  </header>

  <LazyUHeader
    v-else
    :ui="{ center: 'flex-1' }"
    :to="localePath('/')"
    :title="appConfig.header?.title || site.name"
  >
    <AppHeaderCenter />

    <template #title>
      <AppHeaderLogo class="h-6 w-auto shrink-0" />
    </template>

    <template #right>
      <AppHeaderCTA />

      <template v-if="isAssistantEnabled">
        <LazyAssistantChat />
      </template>

      <template v-if="isEnabled && locales.length > 1">
        <ClientOnly>
          <LazyLanguageSelect />

          <template #fallback>
            <div
              class="h-8 w-8 animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800"
            />
          </template>
        </ClientOnly>

        <LazyUSeparator orientation="vertical" class="h-8" />
      </template>

      <LazyUContentSearchButton class="lg:hidden" />

      <ClientOnly>
        <LazyUColorModeButton />

        <template #fallback>
          <div
            class="h-8 w-8 animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800"
          />
        </template>
      </ClientOnly>

      <template v-if="links?.length">
        <UButton
          v-for="(link, index) of links"
          :key="index"
          v-bind="{ color: 'neutral', variant: 'ghost', ...link }"
        />
      </template>
    </template>

    <template #toggle="{ open, toggle }">
      <LazyIconMenuToggle :open="open" class="lg:hidden" @click="toggle" />
    </template>

    <template #body>
      <LazyAppHeaderBody />
    </template>
  </LazyUHeader>
</template>
