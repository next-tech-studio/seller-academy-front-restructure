// plugins/myPiniaPlugin.ts
import { PiniaPluginContext } from 'pinia'

function pinia({ app, store }: PiniaPluginContext) {
  store.$subscribe((mutation) => {
    // react to store changes
  })

  // Note this has to be typed if you are using TS  
  return { $repos: app.config.globalProperties.$repos }
}

export default defineNuxtPlugin(({ $pinia }) => {
  $pinia.use(pinia)
})