export const useRequestFormStore = defineStore("requestForm", {
  state: () => ({
    form: {
      first_name: null,
      last_name: null,
      subject: null,
      message: null,
      file: null,
      file_url: null,
      type: null, //team, startup
      id: null,
      email:null
    },
  }),
  actions: {
    setForm(form) {
      this.form = { ...this.form, ...form };
    },
    setAll(obj, val) {
      Object.keys(obj).forEach((k) => (obj[k] = val));
    },
    upload(file) {
      let formData = new FormData();
      formData.append("file", file);
      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      this.$repos.main
        .upload({ body: formData })
        .then((res) => (this.form.file_url = res.data));
    },
    send(extraData = {}) {
      return this.$repos.main
        .message({ body: {...this.form, ...extraData} })
        .then(() => this.setAll(this.form, null));
    },
  },
});
