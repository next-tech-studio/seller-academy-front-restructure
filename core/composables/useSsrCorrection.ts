export const useSsrCorrection = () => {
  const isClient = ref(false);
  onBeforeMount(() => {
    isClient.value = false; // Set isClient to false during SSR
  });
  onMounted(() => {
    isClient.value = true;
  });

  return {
    isClient
  }
};
