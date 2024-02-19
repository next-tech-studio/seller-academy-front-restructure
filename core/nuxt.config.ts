import vuetify from "vite-plugin-vuetify";
import { createResolver } from "@nuxt/kit";
const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
  alias: {
    "@core": resolve("./"),
  },
  app: {
    pageTransition: { name: "page" },
    layoutTransition: { name: "page" },
    head: {
      link: [
        {
          rel: "apple-touch-icon",
          href: "/apple-touch-icon.png",
        },
      ],
      meta: [
        {
          name: "theme-color",
          content: "#000000",
        },
      ],
    },
  },

  build: {
    transpile: ["vuetify"],
  },
  sourcemap: {
    server: false,
    client: false,
  }, // DELETE THIS FILE AFTER UPSTREAM ISSUE GETS RESOLVED: https://github.com/vuetifyjs/vuetify-loader/issues/290
  vite: {
    ssr: {
      noExternal: ["vuetify"], // add the vuetify vite plugin
    },
    define: {
      "process.env.DEBUG": false,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@core/assets/styles/main.scss";',
        },
      },
    },
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          },
        },
      },
    },
  },
  cssSourceMap: false,
  modules: [
    async (options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) =>
        config?.plugins?.push(
          vuetify({
            styles: { configFile: resolve("assets/styles/vuetify.scss") },
          })
        )
      );
    },
    "@nuxtjs/i18n",
    "nuxt-schema-org",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@vite-pwa/nuxt",
  ],
  pinia: {
    autoImports: ["defineStore"],
  },
  i18n: {
    locales: [
      {
        code: "fa",
        name: "Farsi",
        dir: "rtl",
        file: "fa.js",
      },
    ],
    // vueI18n: './i18n.config.ts',
    defaultLocale: "fa",
    lazy: true,
    langDir: "locales",
    strategy: "no_prefix",
    onBeforeLanguageSwitch: (oldLocale, newLocale, isInitialSetup, context) => {
      const locale =
        context.i18n.locales.find((l) => l.code === newLocale) || {};
      const isRTL = locale.dir === "rtl";
      if (isInitialSetup) {
        context.app.vuetify.preset.rtl = isRTL; // <--- makes vuetify direction work on initial page load
      }
      context.app.vuetify.framework.lang.current = locale.langCode;
      context.app.vuetify.framework.rtl = isRTL;
    },
  },
  // Docs: https://nuxt.com/docs/guide/concepts/rendering
  routeRules: {
    // "/": { redirect: "/blog" },
    "/panel/**": { ssr: false },
  },
  runtimeConfig: {
    public: {
      appName: process.env.APP_NAME,
      apiBase: process.env.API_BASE_URL || "/api",
      siteUrl: process.env.PUBLIC_SITE_URL,
      sellerPanelLoginUrl: process.env.SELLER_PANEL_LOGIN_URL,
      docker: process.env.DOCKER,
      baseURL: "/blog",
      domain: process.env.DOMAIN,
      gtagId: process.env.GTAGID,
      pusherKey: process.env.PUSHER_KEY,
      pusherWsHost: process.env.PUSHER_WSHOST,
      pusherWsPort: process.env.PUSHER_WSPORT,
      pusherForceTLS: process.env.PUSHER_FORCETLS,
    },
  },
  schemaOrg: {
    host: process.env.PUBLIC_SITE_URL,
  },
  imports: {
    dirs: [
      // ...scan all modules within given directory
      "composables/**",
    ],
  },
  // pwa: {
  //   manifest: {
  //     name: "Seller Hub",
  //     short_name: "Seller Hub",
  //     start_url: "/",
  //     lang: "fa-IR",
  //     display: "standalone",
  //     description: "Seller Hub, A Community For Digikala's Sellers",
  //     theme_color: "#ffffff",
  //     background_color: "#ffffff",
  //     orientation: "any",
  //     prefer_related_applications: true,
  //     icons: [
  //       {
  //         src: "icons/android-chrome-192x192.png",
  //         sizes: "192x192",
  //         type: "image/png",
  //       },
  //       {
  //         src: "icons/android-chrome-512x512.png",
  //         sizes: "512x512",
  //         type: "image/png",
  //       },
  //       {
  //         src: "icons/android-chrome-512x512.png",
  //         sizes: "512x512",
  //         type: "image/png",
  //         purpose: "any",
  //       },
  //       {
  //         src: "icons/android-chrome-512x512.png",
  //         sizes: "512x512",
  //         type: "image/png",
  //         purpose: "maskable",
  //       },
  //     ],
  //   },
  //   registerType: "autoUpdate",
  //   workbox: {
  //     // globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
  //     runtimeCaching: [
  //       {
  //         urlPattern: `${process.env.API_BASE_URL}/.*`,
  //         handler: "NetworkFirst",
  //         options: {
  //           cacheName: "my-api-cache",
  //           expiration: {
  //             maxAgeSeconds: 60 * 60 * 24 * 7, // 1 week
  //           },
  //         },
  //       },
  //     ],
  //   },
  //   client: {
  //     installPrompt: true,
  //     // you don't need to include this: only for testing purposes
  //     // if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
  //     periodicSyncForUpdates: 20,
  //   },
  //   devOptions: {
  //     enabled: true,
  //     suppressWarnings: true,
  //     navigateFallbackAllowlist: [/^\/$/],
  //     type: "module",
  //   },
  // },
});
