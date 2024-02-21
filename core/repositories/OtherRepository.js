import userDashboard from "~/mappers/models/dto/userDashboard";
import uploader from "~/mappers/models/schema/uploader";
import panelTable from "~/mappers/models/schema/panelTable";
import academyHomepage from "../mappers/models/dto/academyHomepage";
export default (request) => ({
  homepage() {
    return request({
      name: "homepage",
      method: "get",
      path: "/homepage",
      loading: true,
      alert: false,
    });
  },
  loggedinHomepage() {
    return request({
      name: "loggedinHomepage",
      method: "get",
      path: "/landing/first",
      loading: true,
      alert: false,
      model: { name: academyHomepage },
    });
  },
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
      model: { name: panelTable, collection: true, pagination: true },
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
  //dashboard
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
  // faqs
  faqs(payload) {
    return request({
      name: "faqs",
      method: "get",
      path: "/faq/list",
      query: `?search=${payload?.search}&categorySlug=${payload.category?.slug}`,
      loading: {show: !payload.search, skeleton: 'loading-indicator'},
      alert: false,
    });
  },
  faqsCommon() {
    return request({
      name: "common",
      method: "get",
      path: "/faq/common",
      loading: true,
      alert: false,
    });
  },
  uploadVideoGenerateId(payload) {
    console.log('payload',payload.body)
    return request(
      {
        name: "arvaneGenerateId",
        method: "post",
        path: "/file/generate",
        loading: true,
        alert: false,
        // headers:{
        //   'Content-Type':'video/mp4',
        //   'Accept':'multipart/form-data'
        // }
      },
      payload.body
    );
  },
  uploadStatus(payload) {
    console.log('payloadssss',payload)
    return request(
      {
        name: "checkStatus",
        method: "post",
        path: "/file/status",
        loading: true,
        alert: false,
        headers:{
          'Content-Type':'application/json',
          'Accept':'application/json'
        }
      },
      payload
    );
  },
  uploadBigFile(payload){
    return request(
      {
        name: "checkStatus",
        method: "post",
        path: "/file/upload/large",
        loading: true,
        alert: false,
      },
      payload
    );
  },
  calculatorCategories(){
    return request(
      {
        name: "categories",
        method: "get",
        path: "/income/common",
        loading: false,
        alert: false,
      },
    );
  }
});
