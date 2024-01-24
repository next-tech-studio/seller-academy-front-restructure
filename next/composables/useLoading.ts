export const useLoading = () => {
  const loading = ref(false);
  const nuxtApp = useNuxtApp();

  nuxtApp.hook("page:start", () => {
    loading.value = true;
  });

  nuxtApp.hook("page:finish", () => {
    loading.value = false;
    console.log(loading.value);
  });

  return {
    loading,
  };
};
