import comment from "~/mappers/models/schema/comment";

export default (request) => ({
  sectionList(payload) {
    return request(
      {
        name: "list",
        method: "get",
        query: `?type=${payload.type}`,
        path: "/articles/section/list",
        loading: true,
        page: payload.page,
      },
      payload
    );
  },

  sectionCommon(payload) {
    return request(
      {
        name: "list",
        method: "get",
        query: `?type=${payload.type}`,
        path: "/articles/section/common",
        loading: true,
      },
      payload
    );
  }, 

  archiveList(payload) {
    // let query = `?category=${payload.category}&sort=${payload.sort}&tag=${payload.tag}`
    let query = `?type=${payload.type}&sort=${payload.sort}&category=${payload.category}&tag=${payload.tag}`
    return request(
      {
        name: "list",
        method: "get",
        path: "/articles/archive/list",
        query,
        loading: true,
        page: payload.page,
      },
      payload
    );
  },

  archiveCommon(payload) {
    return request(
      {
        name: "list",
        method: "get",
        query: `?type=${payload.type}`,
        path: "/articles/archive/common",
        loading: true,
      },
      payload
    );
  },

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

  comments(payload) {
    return request({
      name: "comments",
      method: "get",
      path: `/article/${payload.slug}/comments`,
      page: payload.page,
      query: payload.parentId ? `?parentId=${payload.parentId}&type=${payload.type}` : `?type=${payload.type}`,
      loading: true,
      alert: false,
    //   model: { name: comment, collection: true, pagination: true },
    });
  },

  addComment(payload) {
    return request(
      {
        name: "addComment",
        method: "post",
        query: `?type=${payload.type}`,
        path: `/article/${payload.slug}/comments`,
        loading: true,
        alert: true,
      },
      payload.body
    );
  },

  reactComment(payload) {
    return request(
      {
        name: "reactComment",
        method: "post",
        query: `?type=${payload.type}`,
        path: `/article/${payload.slug}/comments/${payload.commentId}/feedback`,
        loading: true,
        alert: false,
      },
      payload.body
    );
  },

  articleFeedback(payload) {
    return request(
      {
        name: "articleFeedback",
        method: "post",
        query: `?type=${payload.type}`,
        path: `/article/${payload.slug}/feedback`,
        loading: true,
        alert: false,
      },
      payload.body
    );
  },

  bookmark(payload) {
    return request(
      {
        name: "bookmark",
        method: "post",
        query: `?type=${payload.type}`,
        path: `/article/${payload.slug}/bookmark`,
        loading: true,
        alert: true,
      },
      payload.body
    );
  },
});
