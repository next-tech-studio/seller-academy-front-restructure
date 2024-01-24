import FileDownload from "js-file-download";
import { useToastStore } from "~/stores/toast";
import { useAuthStore } from "~/stores/auth";

class HttpRequest {
  constructor(app) {
    this.me = app._route.query.me || 1;
    this.notifier = app.$notifier;
    this.toast = useToastStore();
    this.headers = { Authorization: useAuthStore().user.token };
  }

  post(url, payload = {}, alert = false) {
    try {
      return new Promise((resolve, reject) => {
        $fetch(url, {
          method: "POST",
          body: payload,
          credentials: "include",
          headers: this.headers
        })
          .then((resp) => {
            if (alert) this.toast.show({ text: resp.message }, "success");
            resolve(resp);
          })
          .catch((err) => {
            if (alert) this.toast.show({ text: err.response._data.message }, "error");
            reject(err);
          });
      });
    } catch (e) {}
  }

  put(url, payload = {}, alert = false) {
    try {
      return new Promise((resolve, reject) => {
        $fetch(url, {
          method: "PUT",
          body: payload,
          credentials: "include",
          headers: this.headers
        })
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            this.toast.show({ text: err.response._data.message }, "error");
            reject(err);
          });
      });
    } catch (e) {}
  }

  delete(url, payload = {}, alert = false) {
    try {
      return new Promise((resolve, reject) => {
        $fetch(url, {
          method: "DELETE",
          body: payload,
          credentials: "include",
          headers: this.headers
        })
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            this.toast.show({ text: err.response._data.message }, "error");
            reject(err);
          });
      });
    } catch (e) {}
  }

  get(url, alert = false) {
    try {
      return new Promise((resolve, reject) => {
        $fetch(url, { credentials: "include", headers: this.headers })
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            this.toast.show({ text: err.response._data.message }, "error");
            reject(err);
          });
      });
    } catch (e) {}
  }

  download(url, type, alert = false) {
    try {
      return new Promise((resolve, reject) => {
        $fetch(url, {
          responseType: "blob",
          headers: this.headers
        })
          .then((resp) => {
            FileDownload(resp.data, "file." + type);
            if (alert)
              this.notifier.showMessage({
                message: resp.data.message,
                color: "success",
              });
            resolve();
          })
          .catch((err) => {
            if (!url.includes("checkLogin")) {
              this.toast.show({ text: "validation.unauthorized" }, "error");
            }
            this.toast.show({ text: err.response._data.message }, "error");
            reject(err);
          });
      });
    } catch (e) {}
  }
}

export default HttpRequest;
