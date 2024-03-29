import uploader from "~/mappers/models/schema/uploader";
import userDashboard from "~/mappers/models/dto/userDashboard";

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
        loading: false,
        alert: false,
      },
    );
  },
  getUserPosts(payload) {
    return request(
      {
        name: "userPosts",
        method: "get",
        page: payload.page,
        query: `?userId=${payload.id}`,
        path: `/kns/user/posts`,
        loading: false,
        alert: false,
      },
    );
  },
  follow(payload) {
    return request(
      {
        name: "follow_user",
        method: "put",
        path: `/kns/user/follow`,
        loading: true,
        alert: true,
      },
      payload.body
    );
  },
  universalSearch(payload) {
    return request(
      {
        name: "universalSearch",
        method: "get",
        page: payload.page,
        path: `/kns/search/${payload.type}/${payload.keyword}`,
        loading: false,
        alert: false,
      },
    );
  },
  getUserFollowingList(payload) {
    return request(
      {
        name: "userFollowingList",
        method: "get",
        page: payload.page,
        query: `?followingId=${payload.id}`,
        path: `/kns/user/following/list`,
        loading: false,
        alert: false,
      },
    );
  },
  getUserFollowersList(payload) {
    return request(
      {
        name: "userFollowingList",
        method: "get",
        page: payload.page,
        query: `?followerId=${payload.id}`,
        path: `/kns/user/followers/list`,
        loading: false,
        alert: false,
      },
    );
  },
  //user-dashboard
  userInfo() {
    return request({
      name: "userInfo",
      method: "get",
      path: "/panel/user/data",
      loading: true,
      alert: false,
      model: { name: userDashboard },
    });
  },
  editUserInfo(payload) {
    return request(
      {
        name: "editUserInfo",
        method: "put",
        path: "/panel/user/edit-data",
        loading: true,
        alert: false,
      },
      payload.body
    );
  },
  comments(payload) {
    return request({
      name: "dashboardComments",
      method: "get",
      path: "/panel/user/comments/list",
      query: `?data=${payload?.data}&search=${payload?.search}&page=${payload?.page}`,
      loading: true,
      alert: false,
      model: { name: panelTable, collection: true, pagination: true },
    });
  },
  questionAndAnswers(payload) {
    return request({
      name: "dashboardQA",
      method: "get",
      path: "/panel/user/questions/list",
      query: `?data=${payload?.data}&search=${payload?.search}&page=${payload?.page}`,
      loading: true,
      alert: false,
      model: { name: panelTable, collection: true, pagination: true },
    });
  },
  posts(payload) {
    console.log("poossttss", payload);
    return request({
      name: "posts",
      method: "get",
      path: "/panel/user/posts/list",
      query: `?data=${payload?.data}&search=${payload?.search}&page=${payload?.page}`,
      loading: true,
      alert: false,
    });
  },
  rooms(payload) {
    return request({
      name: "rooms",
      method: "get",
      path: "/panel/user/rooms/list",
      query: `?search=${payload?.search}&page=${payload?.page}`,
      loading: true,
      alert: false,
    });
  },
  courses(payload) {
    return request({
      name: "courses",
      method: "get",
      path: "/panel/user/courses/list",
      query: `?data=${payload?.data}&search=${payload?.search}&page=${payload?.page}`,
      loading: true,
      alert: false,
    });
  },
  //
});
