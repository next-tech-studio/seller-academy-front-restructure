export const useGlobalStore = defineStore("global", {
    state: () => ({ 
        pendingRequest:false,
        skeletonLoading: false,
        skeleton: '',
    }),
  });
  