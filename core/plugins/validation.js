import Validation from "~~/services/Validation";

export default defineNuxtPlugin((nuxtApp) => {
  const validation = new Validation(nuxtApp);
//   console.log("appppppp", nuxtApp.$i18n.t('course_title'));
  return {
    provide: {
      rules: validation.getRules,
      submitValidForm: validation.submitValidForm,
    },
  };
});
