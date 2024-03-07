// plugins/previous-route.js

import { ref, watch } from 'vue'
import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin((nuxtApp) => {
  const currentRoute = ref(null)
  const previousRoute = ref(null)

  watch(() => nuxtApp.vueApp.config.globalProperties.$route, (newRoute, oldRoute) => {
    if (oldRoute) {
      previousRoute.value = oldRoute
    }
    currentRoute.value = newRoute
  }, { deep: true })

  return {
    provide: {
        previousRoute
    }
}
})