export default (request) => ({
  homeCommon(payload) {
    return request({
      name: "all",
      method: "get",
      // query: `?type=${payload.type}`,
      path: "/home/common",
      loading: true,
      alert: false,
    });
  },
  articleArchive(payload) {
    return request({
      name: "all",
      method: "get",
      path: "/articles/archive/list",
      query: `?category=${payload}&type=${payload.type}`,
      loading: true,
      alert: false,
    });
  },

  article: {
    show(payload) {
      return request({
        name: "show",
        method: "get",
        query: `?type=${payload.type}`,
        path: `/article/${payload.slug}`,
        loading: true,
        alert: false,
      });
    },
    showCategory(payload) {
      return request({
        name: "show",
        method: "get",
        query: `?type=${payload.type}`,
        path: `/articles/category/${payload.slug}/common`,
        loading: true,
        alert: false,
      });
    },
  },
  video: {
    show(payload) {
      return request({
        name: "show",
        method: "get",
        query: `?type=${payload.type}`,
        path: `/video/${payload.slug}`,
        loading: true,
        alert: false,
      });
    },
  },
});
