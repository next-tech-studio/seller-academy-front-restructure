export const useGlobalStore = defineStore("global", {
  state: () => ({
    pendingRequest: false,
    loading: false,
    skeletonLoading: true,
    skeleton: "",
    activeRequests: {},
    previousRoute:null,
  }),
  getters: {
    activeRequestsExists: (state) => Object.values(state.activeRequests).includes(true),
  },
});
