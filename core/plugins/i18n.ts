import { createI18n } from "vue-i18n";
import fa from "@core/locales/fa";

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    fallbackLocale: 'fa',
    messages: {
      fa,
    },
  });

  vueApp.use(i18n);
});
