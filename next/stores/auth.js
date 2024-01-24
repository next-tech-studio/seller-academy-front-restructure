import { setCookie } from "h3";
export const useAuthStore = defineStore("auth", {
  state: () => ({
    step: 1,
    user: { loggedIn: false },
    types: [
      {
        id: 1,
        title: "I_am_digikala_seller",
        description: "I_am_digikala_seller_desc",
        is_seller: true,
      },
      {
        id: 2,
        title: "I_am_not_digikala_seller",
        description: "I_am_not_digikala_seller_desc",
        is_seller: false,
      },
    ],
    steps: [
      {
        value: 1,
        title: "login_or_sign_up",
        btnTitle: "continue",
        fields: ["username"],
      },
      {
        value: "A1",
        title: "login_to_account",
        btnTitle: "continue",
        fields: ["username", "password", "forget_password"],
      },
      {
        value: "B1",
        title: "sign_up_to_account",
        btnTitle: "continue",
        fields: ["registrationToken"],
      },
      {
        value: "B2",
        title: "sign_up_to_account",
        btnTitle: "finalize",
        fields: ["first_name", "last_name", "password", "accept_rules"],
      },
      {
        value: "C1",
        title: "forget_password",
        btnTitle: "retrieve_password",
        fields: ["username"],
      },
      {
        value: "C2",
        title: "forget_password",
        btnTitle: "retrieve_password",
        fields: ["resetToken"],
      },
      {
        value: "C3",
        title: "forget_password",
        btnTitle: "change_password",
        fields: ["new_password", "repeat_new_password"],
      },
    ],
    afterLogin: false
  }),
  actions: {
    initUserState() {
      this.user = { loggedIn: false };
    },
    setType(is_seller) {
      if (is_seller) {
        window.open(useRuntimeConfig().public.sellerPanelLoginUrl);
      } else {
        this.setStep(1);
      }
    },
    setStep(step) {
      this.step = step;
    },
    checkUserExists(payload) {
      this.$repos.auth.checkUserExists(payload).then((res) => {
        if (res.userExists) {
          this.setStep("A1");
        } else {
          this.$repos.auth
            .sendRegistrationCode(payload)
            .then(() => this.setStep("B1"));
        }
      });
    },
    login(payload) {
      const { history } = useRouter().options;
      const localePath = useLocalePath()
      const back = history.state.back;
      const path = back || "/";
      this.$repos.auth.login(payload).then((res) => {
        this.user = { ...res, loggedIn: true };
        navigateTo(localePath(path), { external: true });
      });
    },
    validateRegistrationCode(payload) {
      this.$repos.auth.validateRegistrationCode(payload).then(() => {
        this.setStep("B2");
      });
    },
    register(payload) {
      this.$repos.auth.register(payload).then((res) => {
        this.user = res.data;
        this.user.loggedIn = true;
        navigateTo(useLocalePath({ name: "blog" }), { external: true });
      });
    },
    sendResetPasswordCode(payload) {
      this.$repos.auth.sendResetPasswordCode(payload).then((res) => {
        this.setStep("C2");
      });
    },
    validateResetPasswordCode(payload) {
      this.$repos.auth.validateResetPasswordCode(payload).then((res) => {
        this.setStep("C3");
      });
    },
    changePassword(payload) {
      this.$repos.auth.changePassword(payload).then((res) => {
        this.setStep("A1");
      });
    },
    deleteCookie(name) {
      document.cookie = `${name}=; path=/; domain=.edyst.com; expires=${new Date(
        0
      ).toUTCString()}`;
    },
    logout() {
      // this.deleteCookie("sa_access_token");
      this.$repos.auth.logout();
      this.initUserState();
      this.step = 1;
      this.afterLogin = false
    },
  },
  persist: {
    paths: ["user", "afterLogin"],
  },
});
