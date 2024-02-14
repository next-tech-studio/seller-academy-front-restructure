import user from "~/mappers/models/schema/user";

export default (request) => ({
  checkUserExists(payload) {
    return request(
      {
        name: "checkUserExists",
        method: "post",
        path: "/auth/exists",
        loading: true,
        alert: true,
      },
      payload
    );
  },
  login(payload) {
    return request(
      {
        name: "login",
        method: "post",
        path: "/auth/login",
        loading: true,
        model: { name: user },
        alert: true,
      },
      payload
    );
  },
  sendRegistrationCode(payload) {
    return request(
      {
        name: "sendRegistrationCode",
        method: "post",
        path: "/auth/register/generate",
        loading: true,
      },
      payload
    );
  },
  validateRegistrationCode(payload) {
    return request(
      {
        name: "validateRegistrationCode",
        method: "post",
        path: "/auth/register/validate",
        loading: true,
      },
      payload
    );
  },
  register(payload) {
    return request(
      {
        name: "register",
        method: "post",
        path: "/auth/register",
        loading: true,
      },
      payload
    );
  },
  sendResetPasswordCode(payload) {
    return request(
      {
        name: "sendResetPasswordCode",
        method: "post",
        path: "/auth/reset/generate",
        loading: true,
      },
      payload
    );
  },
  validateResetPasswordCode(payload) {
    return request(
      {
        name: "validateResetPasswordCode",
        method: "post",
        path: "/auth/reset/validate",
        loading: true,
      },
      payload
    );
  },
  changePassword(payload) {
    return request(
      {
        name: "changePassword",
        method: "post",
        path: "/auth/change_password",
        loading: true,
      },
      payload
    );
  },
  logOut() {
    return request({
      name: "logOut",
      method: "post",
      path: "/auth/logout",
      loading: true,
    });
  },
});
