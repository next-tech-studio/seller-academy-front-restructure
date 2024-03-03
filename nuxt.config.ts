// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: [process.env.CORE.substring(1), "./forum", "./blog", "./academy"],
  nitro: {
    compressPublicAssets: true,
  }
});
