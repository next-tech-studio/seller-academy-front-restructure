export const useLocaleStore = defineStore("locale", {
  state: () => ({
    locale: "fa",
    startupSlug:{}
  }),
  actions: {
    setLocale(locale, context = this) {
      this.locale = locale;
      this.$i18n.locale = locale 
      this.$vuetify.locale.current = locale;
      const root = document.documentElement;
      root.style.setProperty('--font-family', locale == 'en' ? 'Roboto' : 'IRANYekanX');
    },
  },
  persist: {
    // paths: ['locale']
  }
});
