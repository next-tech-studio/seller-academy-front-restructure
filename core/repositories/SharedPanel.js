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
    return request(
      {
        name: "updateForm",
        method: "put",
        path: `/panel/forms/editor_data`,
        loading: true,
        alert: false,
      },
      payload
    );
  },
  //panel
  usersList(payload) {
    return request(
      {
        name: "usersList",
        method: "get",
        path: "/panel/user/list",
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
      path: "/panel/user/list/common",
      loading: true,
      alert: false,
    });
  },
  updateUser(payload) {
    return request(
      {
        name: "updateUser",
        method: "put",
        path: `/panel/users/${payload.id}/edit`,
        loading: true,
        alert: false,
      },
      payload
    );
  },
  createUser(payload) {
    console.log("userPayload", payload);
    return request(
      {
        name: "createUser",
        method: "put",
        path: "/panel/user/editor-data",
        loading: true,
        alert: false,
      },
      payload
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
    return request({
      name: "createUser",
      method: "post",
      path: "/panel/users/generatePassword",
      loading: true,
      alert: false,
    });
  },
  //faqs
  faqsList(payload) {
    return request(
      {
        name: "faqsList",
        method: "get",
        path: "/panel/faq/list",
        query: `?search=${payload?.search}&sortKey=${payload?.sortKey}&categorySlug=${payload.category}&status=${payload.status}&sortOrder=${payload?.sortOrder}`,
        page: payload?.page,
        loading: true,
        alert: false,
        model: { name: panelTable, collection: true, pagination: true },
      },
      payload.body
    );
  },
  faqsListCommon(payload) {
    return request({
      name: "faqsListCommon",
      method: "get",
      path: "/panel/faq/common",
      loading: true,
      alert: false,
    });
  },
  updateFAQ(payload) {
    return request(
      {
        name: "updateFAQ",
        method: "put",
        path: "/panel/faq/edit-data",
        loading: true,
        alert: false,
        model: { name: panelTable, dataPath: "data" },
      },
      payload.body
    );
  },
  updateFAQStatus(payload) {
    return request(
      {
        name: "updateFAQ",
        method: "put",
        path: "/panel/faq/set_status",
        loading: true,
        alert: false,
      },
      payload.body
    );
  },
  rolesList(payload) {
    return request({
      name: "rolesList",
      method: "get",
      query: `?search=${payload?.search}&permissions=${payload?.permissions}& sortKey=${payload?.sortKey}&sortOrder=${payload?.sortOrder}`,
      path: "/panel/roles/list",
      loading: true,
      alert: false,
      model: { name: panelTable, collection: true, pagination: true },
    });
  },
  rolesListCommon(payload) {
    return request({
      name: "rolesListCommon",
      method: "get",
      path: "/panel/roles/list/common",
      loading: true,
      alert: false,
    });
  },
  updateRole(payload) {
    return request(
      {
        name: "updateRole",
        method: "put",
        path: "/panel/roles/editor-data",
        loading: true,
        alert: false,
        model: { name: panelTable, dataPath: "data" },
      },
      payload
    );
  },
  updateRoleStatus(payload) {
    return request(
      {
        name: "updateRoleStatus",
        method: "put",
        path: "/panel/roles/set-status",
        loading: true,
        alert: false,
      },
      payload.body
    );
  },
});
