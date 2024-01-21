export default (request) => ({
  startups(payload) {
    return request(
      {
        name: "startups",
        method: "get",
        path: "/main/startup/all",
        params: null,
        loading: true,
        query: null,
        page: null,
        alert: false,
      },
      payload
    );
  },

  paginatedStartups(id) {
    return request(
      {
        name: "paginatedStartups",
        method: "get",
        path: "/main/startup/list",
        params: null,
        loading: true,
        query: null,
        page: null,
        alert: false,
      },
      payload
    );
  },

  team(payload) {
    return request(
      {
        name: "team",
        method: "get",
        path: "/main/team/دیجی-نکست",
        params: null,
        loading: true,
        query: null,
        page: null,
        alert: false,
      },
      payload
    );
  },

  paginatedTeam(id) {
    return request(
      {
        name: "paginatedTeam",
        method: "get",
        path: "/main/team/list",
        params: null,
        loading: true,
        query: null,
        page: null,
        alert: false,
      },
      payload
    );
  },

  mentors(payload) {
    return request(
      {
        name: "mentors",
        method: "get",
        path: "/main/mentor/all",
        params: null,
        loading: true,
        query: null,
        page: null,
        alert: false,
      },
      payload
    );
  },

  mentorsCategory(payload) {
    return request(
      {
        name: "mentorsCategory",
        method: "get",
        path: "/main/mentor/category",
        params: null,
        loading: true,
        query: null,
        page: null,
        alert: false,
      },
      payload
    );
  },

  paginatedMentors(id) {
    return request(
      {
        name: "paginatedMentors",
        method: "get",
        path: "/main/mentors/list",
        params: null,
        loading: true,
        query: null,
        page: null,
        alert: false,
      },
      payload
    );
  },
  portfoStartUpList() {
    return request({
      name: "startupList",
      method: "get",
      path: `/main/startup/list`,
      params: null,
      loading: true,
      query: null,
      page: null,
      alert: false,
    });
  },
  message(payload) {
    return request(
      {
        name: "message",
        method: "post",
        path: `/main/message/store`,
        params: null,
        loading: true,
        query: null,
        page: null,
        alert: payload.body.alert ?? true,
      },
      payload.body
    );
  },
  upload(payload) {
    return request(
      {
        name: "upload",
        method: "post",
        path: `/main/file/upload`,
        params: null,
        loading: true,
        query: null,
        page: null,
        alert: false,
      },
      payload.body
    );
  },
  startupData(payload) {
    return request(
      {
        name: "paginatedTeam",
        method: "get",
        path: `/main/startup/${payload.slug}`,
        params: null,
        loading: true,
        query: null,
        page: null,
        alert: false,
      },
    );
  },
  homeRelatedArticles() {
    return request({
      name: "all",
      method: "get",
      path: "/home/common",
      loading: true,
      alert: false,
    });
  },
});
