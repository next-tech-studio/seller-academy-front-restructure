import vuetify from "vite-plugin-vuetify";
import { createResolver } from "@nuxt/kit";
const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
  alias: {
    "@core": resolve("./"),
  },
  app: {
    head: {
      title: process.env.APP_NAME
    },
    pageTransition: { name: "page" },
    layoutTransition: { name: "page" },
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
    resolve: {
      dedupe: ["vue"],
    },
    // build: {
    //   rollupOptions: {
    //     output: {
    //       manualChunks(id) {
    //         if (id.includes("node_modules")) {
    //           return id
    //             .toString()
    //             .split("node_modules/")[1]
    //             .split("/")[0]
    //             .toString();
    //         }
    //       },
    //     },
    //   },
    // },
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
    "@nuxt/content",
    "@pinia-plugin-persistedstate/nuxt",
    // "nuxt-gtag",
  ],
  // gtag: {
  //   id: 'G-T58G88TMTD'
  // },
  // content: {
  //   api: {
  //     baseURL: '/next/content'
  //   }
  // },
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
      {
        code: "en",
        name: "English",
        dir: "ltr",
        file: "en.js",
      },
    ],
    defaultLocale: "fa",
    lazy: true,
    langDir: "locales",
    strategy: "no_prefix",
  },
  // Docs: https://nuxt.com/docs/guide/concepts/rendering
  // routeRules: {
  //   "/": { redirect: "/blog" },
  //   "/panel/**": { ssr: false },
  // },
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
      needAuth: process.env.NEED_AUTH,
      followFeature: process.env.FOLLOW_FEATURE
    },
  },
  // schemaOrg: {
  //   host: process.env.PUBLIC_SITE_URL,
  // },
  imports: {
    dirs: [
      // ...scan all modules within given directory
      "composables/**",
    ],
  },
});
