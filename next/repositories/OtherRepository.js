import uploader from "~/mappers/models/schema/uploader";
export default (request) => ({
  search(payload) {
    return request({
      name: "search",
      method: "get",
      path: "/search",
      query: `?query=${payload}`,
      loading: true,
      alert: false,
    });
  },
  groupSearch(payload) {
    return request({
      name: "search",
      method: "get",
      path: `/articles/find/list`,
      query: `?ids=${payload.ids}`,
      loading: true,
      alert: false,
    });
  },
  uploadFiles(payload, path, multiple = true) {
    return request(
      {
        name: "uploadFiles",
        method: "post",
        path: path,
        loading: true,
        alert: false,
        model: {
          name: uploader,
          collection: multiple,
          pagination: false,
          raw: false,
        },
      },
      payload.body
    );
  },
  forms(payload) {
    return request({
      name: "forms",
      method: "get",
      page: payload.page,
      path: "/forms/list",
      loading: true,
      alert: false,
    });
  },
  getRejectionReasons() {
    return request({
      name: "rejectionReasons",
      method: "get",
      path: "/report/list",
      loading: true,
      alert: false,
    });
  },
  getRolesList() {
    return request({
      name: "roles",
      method: "get",
      path: "/panel/users/ligeneral",
      loading: true,
      alert: false,
    });
  },
  getUserProfileSidebar(payload) {
    return request(
      {
        name: "userProfileSidebar",
        method: "get",
        query: `?userId=${payload}`,
        path: `/kns/user/data`,
        loading: true,
        alert: false,
      },
    );
  },
  getUserPosts(payload) {
    return request(
      {
        name: "userPosts",
        method: "get",
        query: `?userId=${payload}`,
        path: `/kns/user/posts`,
        loading: true,
        alert: false,
      },
    );
  },
});
