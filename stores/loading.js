export const useLoadingStore = defineStore("loading", {
  state: () => ({
    visible: false
  }),
  actions: {
    show() {
      this.visible = true
    },
    hide() {
      this.visible = false
    }
  }
});
