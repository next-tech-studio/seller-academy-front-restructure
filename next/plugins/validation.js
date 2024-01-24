import Validation from "~~/services/Validation";

export default defineNuxtPlugin(nuxtApp => {
    const validation = new Validation(nuxtApp)
    return {
        provide: {
            rules:validation.getRules,
            submitValidForm: validation.submitValidForm
        }
    }
})