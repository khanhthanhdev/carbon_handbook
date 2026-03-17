export default defineNuxtRouteMiddleware((to) => {
  if (to.hash === '#book') {
    return navigateTo('/en/', { redirectCode: 301 })
  }
})
