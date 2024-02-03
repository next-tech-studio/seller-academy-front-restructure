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
        config.plugins.push(
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
});
