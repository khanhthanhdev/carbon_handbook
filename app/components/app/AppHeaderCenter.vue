<script setup lang="ts">
defineProps<{
  mobile?: boolean;
}>();

defineEmits<{
  navigate: [];
}>();

const { isMarketingRoute, isLandingRoute, isAboutRoute, navItems } =
  useMarketingRoute();

function isActive(id: string) {
  if (id === "about") {
    return isAboutRoute.value;
  }

  if (id === "whats-inside") {
    return isLandingRoute.value;
  }

  return false;
}
</script>

<template>
  <nav
    v-if="isMarketingRoute"
    class="marketing-nav"
    :class="mobile ? 'marketing-nav--mobile' : 'marketing-nav--desktop'"
    aria-label="Marketing"
  >
    <NuxtLink
      v-for="item in navItems"
      :key="item.id"
      :to="item.to"
      class="marketing-nav__link"
      :class="{
        'marketing-nav__link--active': isActive(item.id),
        'marketing-nav__link--mobile': mobile,
      }"
      @click="$emit('navigate')"
    >
      {{ item.label }}
    </NuxtLink>
  </nav>

  <LazyUContentSearchButton
    v-else
    :collapsed="false"
    class="w-full"
    variant="soft"
    :ui="{
      leadingIcon: 'size-4 mr-1',
    }"
  />
</template>
