export default (request) => ({
  archiveList(payload) {
    return request(
      {
        name: "archiveList",
        method: "get",
        path: "/podcast/archive/list",
        query: `?sort=${payload.sort}`,
        loading: true,
        page: payload.page,
      },
      payload
    );
  },

  show(payload) {
    return request({
      name: "show",
      method: "get",
      path: `/podcast/${payload.slug}`,
      loading: true,
      alert: false,
    });
  },

  comments(payload) {
    return request({
      name: "comments",
      method: "get",
      path: `/podcast/${payload.slug}/comments`,
      page: payload.page,
      query: payload.parentId ? `?parentId=${payload.parentId}` : null,
      loading: true,
      alert: false,
    });
  },

  addComment(payload) {
    return request(
      {
        name: "addComment",
        method: "post",
        path: `/podcast/${payload.slug}/comments`,
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
        path: `/podcast/${payload.slug}/comments/${payload.commentId}/feedback`,
        loading: true,
        alert: false,
      },
      payload.body
    );
  },

  articleFeedback(payload) {
    return request(
      {
        name: "podcastFeedback",
        method: "post",
        path: `/podcast/${payload.slug}/feedback`,
        loading: true,
        alert: false,
      },
      payload.body
    );
  },

  bookmark(payload) {
    return request(
      {
        name: "podcastBookmark",
        method: "post",
        path: `/podcast/${payload.slug}/bookmark`,
        loading: true,
        alert: true,
      },
      payload.body
    );
  },
});
