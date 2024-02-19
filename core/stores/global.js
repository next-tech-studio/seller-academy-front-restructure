export const useGlobalStore = defineStore("global", {
  state: () => ({
    pendingRequest: false,
    loading: false,
    skeletonLoading: false,
    skeleton: "",
    activeRequests: {},
  }),
  getters: {
    activeRequestsExists: (state) => Object.values(state.activeRequests).includes(true),
  },
});
