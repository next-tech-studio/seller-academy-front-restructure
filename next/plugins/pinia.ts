// plugins/myPiniaPlugin.ts
import { PiniaPluginContext } from 'pinia'
// const {$moment} = useNuxtApp()
function pinia({ app, store }: PiniaPluginContext) {
  store.$subscribe((mutation) => {
    // react to store changes
  })
  // console.log('83838',app.config.globalProperties.$moment)
  // Note this has to be typed if you are using TS    
  return { 
    $repos: app.config.globalProperties.$repos,
    $i18n: app.config.globalProperties.$i18n,
    $vuetify: app.config.globalProperties.$vuetify,
    $moment: app.config.globalProperties.$moment,
   }
}

export default defineNuxtPlugin(({ $pinia }) => {
  $pinia.use(pinia)
})