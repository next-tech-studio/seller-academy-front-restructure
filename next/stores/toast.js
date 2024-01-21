export const useToastStore = defineStore("toast", {
  state: () => ({
    visible: false,
    config: {
      color: '',
      text: '',
      to: '',
      theme: 'dark',
      timeout: 2000
    },
    info: {
      color: 'secondary-lighten2',
      text: 'info',
      theme: 'dark'
    },
    success: {
      color: 'background-success',
      text: 'success',
      theme: 'dark'
    },
    error: {
      color: 'background-error',
      text: 'error',
      theme: 'dark'
    },
  }),
  actions: {
    show(config = this.config, type) {
      this.visible = true
      this.config = {...this.config, ...this[type], ...config}
    },
    hide() {
      this.visible = false
    }
  }
});
