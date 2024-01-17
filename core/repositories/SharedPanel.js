import panelTable from "~/mappers/models/schema/panelTable";
export default (request) => ({
  getForms(payload) {
    return request({
      name: "getForms",
      method: "get",
      page: payload?.page,
      path: `/panel/forms`,
      loading: true,
      alert: false,
      model: { name: panelTable, collection: true, pagination: true },
    });
  },
  submitForm(payload) {
    return request(
      {
        name: "submitForm",
        method: "post",
        path: `/panel/forms/create`,
        loading: true,
        alert: false,
      },
      payload.body
    );
  },
  deleteForm(payload) {
    return request({
      name: "deleteForm",
      method: "delete",
      path: `/panel/forms/${payload}`,
      loading: true,
      alert: false,
    });
  },
  updateForm(payload) {
    console.log('paylooaaaaddddddddd',payload)
    return request(
      {
        name: "updateForm",
        method: "put",
        path: `/panel/forms/editor_data`,
        loading: true,
        alert: false,
      },
      payload.body
    );
  },
  //panel
  usersList(payload) {
    return request(
      {
        name: "usersList",
        method: "get",
        path: "/panel/users/data",
        query: `?search=${payload?.search}&role=${payload?.role}&sortKey=${payload?.sortKey}&sortOrder=${payload?.sortOrder}`,
        page: payload?.page,
        loading: true,
        alert: false,
        model: { name: panelTable, collection: true, pagination: true },
      },
      payload.body
    );
  },
  usersListCommon() {
    return request({
      name: "usersListCommon",
      method: "get",
      path: "/panel/users/common",
      loading: true,
      alert: false,
    });
  },
  createUser(payload) {
    return request(
      {
        name: "createUser",
        method: "post",
        path: "/panel/users/create",
        loading: true,
        alert: false,
      },
      payload.body
    );
  },
  updateUserStatus(payload) {
    return request(
      {
        name: "updateUserStatus",
        method: "put",
        path: "/panel/users/set_status",
        loading: true,
        alert: false,
      },
      payload.body
    );
  },
  generatePassword() {
    return request(
      {
        name: "createUser",
        method: "post",
        path: "/panel/users/generatePassword",
        loading: true,
        alert: false,
      },
    );
  },

});
