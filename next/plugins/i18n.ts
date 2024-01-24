import { createI18n } from "vue-i18n";
import fa from "@core/locales/fa";
import en from "@core/locales/en"

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
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
      }
    ],
    fallbackLocale: 'fa',
    messages: {
      fa,
      en
    },
  });
  
  vueApp.use(i18n);
});
