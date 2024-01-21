import panelTable from "~/mappers/models/schema/panelTable";
export default (request) => ({
  // Users
  usersList(payload) {
    return request(
      {
        name: "usersList",
        method: "get",
        path: "/panel/user/list",
        query: `?search=${payload?.search}&role=${payload?.role}&type=${payload?.type}&sortKey=${payload?.sortKey}&sortOrder=${payload?.sortOrder}`,
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
  createUser(payload) {
    return request(
      {
        name: "createUser",
        method: "put",
        path: "/panel/user/editor-data",
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
        path: "/panel/user/set-status",
        loading: true,
        alert: false,
      },
      payload.body
    );
  },
  generatePassword() {
    return request({
      name: "generatePassword",
      method: "post",
      path: "/panel/mentor/users/generatePassword",
      loading: true,
      alert: false,
    });
  },

  // Mentors: Messages
  messagesList(payload) {
    console.log('payload', payload);
    return request(
      {
        name: "messagesList",
        method: "get",
        path: "/panel/mentor/message/list",
        query: `?search=${payload?.search}&progress=${payload?.progress}&id=${payload.mentor}`,
        page: payload?.page,
        loading: true,
        alert: false,
        model: { name: panelTable, collection: true, pagination: true },
      },
      payload.body
    );
  },
  messagesListCommon() {
    return request({
      name: "messagesListCommon",
      method: "get",
      path: "/panel/mentor/message/list/common",
      loading: true,
      alert: false,
    });
  },
  updateMessageStatus(payload) {
    return request(
      {
        name: "updateMessageStatus",
        method: "put",
        path: "/panel/mentor/message/set-status",
        loading: true,
        alert: false,
      },
      payload.body
    );
  },

  // Mentors: Categories
  createCategory(payload) {
    return request(
      {
        name: "createCategory",
        method: "put",
        path: "/panel/category/editor-data",
        loading: true,
        alert: false,
      },
      payload.body
    );
  },
  categoryList(payload) {
    return request(
      {
        name: "categoriesList",
        method: "get",
        path: "/panel/category/list",
        query: `?search=${payload?.search}&progress=${payload?.progress}`,
        page: payload?.page,
        loading: true,
        alert: false,
        model: { name: panelTable, collection: true, pagination: true },
      },
      payload.body
    );
  },
  categoryListCommon() {
    return request({
      name: "categoriesListCommon",
      method: "get",
      path: "/panel/category/list/common",
      loading: true,
      alert: false,
    });
  },
  updateCategoryStatus(payload) {
    return request(
      {
        name: "updateCategoryStatus",
        method: "put",
        path: "/panel/category/set-status",
        loading: true,
        alert: false,
      },
      payload.body
    );
  },
});
