// plugins/myPiniaPlugin.ts
import { PiniaPluginContext } from "pinia";

function pinia({ app, store }: PiniaPluginContext) {
  store.$subscribe((mutation) => {
    // react to store changes
  });
  console.log('3333344444444',app.config.globalProperties)
  // Note this has to be typed if you are using TS
  return {
    $repos: app.config.globalProperties.$repos,
    $t: app.config.globalProperties.$t,
  };
}

export default defineNuxtPlugin(({ $pinia }) => {
  $pinia.use(pinia);
});
