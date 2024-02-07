import course from "~/mappers/models/schema/course";
import academyProductHomepage from "~/mappers/models/dto/academyProductHomepage";
import chapter from "~/mappers/models/schema/chapter";
import lesson from "~/mappers/models/schema/lesson";

export default (request) => ({
  getHomepageData() {
    return request({
      name: "getHomepageData",
      method: "get",
      path: `/product/index`,
      loading: true,
      alert: false,
      model: { name: academyProductHomepage },
    });
  },
  // getLoggedInHomepageData() {
  //   return request({
  //     name: "getLoggedInHomepageData",
  //     method: "get",
  //     path: `/academy/user/panel`,
  //     loading: true,
  //     alert: false,
  //     model: { name: academyHomepage },
  //   });
  // },
  // QUERY PARAMS: SKILL SINGLE SELECT, INSTRCTOR {ID: 1, TYPE: ''}
  // getCoursesList(payload) {
  //   return request({
  //     name: "getCoursesList",
  //     query: payload.query,
  //     page: payload.page,
  //     method: "get",
  //     path: `/academy/course/list`,
  //     loading: true,
  //     alert: false,
  //     model: { name: course, collection: true, pagination: true },
  //   });
  // },
  // getCourseFilters(payload) {
  //   return request({
  //     name: "getCourseFilters",
  //     method: "get",
  //     path: "/academy/course/filters",
  //     loading: true,
  //     alert: false,
  //   });
  // },
  getProduct(payload) {
    return request({
      name: "getCourse",
      method: "get",
      path: `/product/show/${payload.slug}`,
      loading: true,
      alert: false,
      // model: { name: product },
    });
  },
  // getChapter(payload) {
  //   return request({
  //     name: "getChapter",
  //     method: "get",
  //     path: `/academy/chapter/${payload.slug}`,
  //     loading: true,
  //     alert: false,
  //     model: { name: chapter },
  //   });
  // },
  // getLesson(payload) {
  //   return request({
  //     name: "getLesson",
  //     method: "get",
  //     path: `/academy/lesson/${payload.slug}`,
  //     loading: true,
  //     alert: false,
  //     model: { name: lesson },
  //   });
  // },
  // participateInQuiz(payload) {
  //   return request(
  //     {
  //       name: "participateInQuiz",
  //       method: "post",
  //       path: `/academy/quiz/participate/${payload.quizId}`,
  //       loading: true,
  //       alert: false,
  //     },
  //     payload.body
  //   );
  // },
  // getRooms(payload) {
  //   return request({
  //     name: "getRooms",
  //     method: "get",
  //     path: `/academy/course/room/list/${payload.slug}`,
  //     loading: true,
  //     alert: false,
  //     model: { name: course },
  //   });
  // },
  // getQuizzes(payload) {
  //   return request({
  //     name: "getQuizzes",
  //     method: "get",
  //     path: `/academy/course/quiz/list/${payload.slug}`,
  //     loading: true,
  //     alert: false,
  //     model: { name: course },
  //   });
  // },
  rate(payload) {
    return request(
      {
        name: "rateCourse",
        method: "post",
        path: `/academy/course/rate`,
        loading: true,
        alert: false,
      },
      payload.body
    );
  },
  bookmark(payload) {
    return request(
      {
        name: "bookmarkCourse",
        method: "post",
        path: `/academy/course/bookmark`,
        loading: true,
        alert: false,
      },
      payload
    );
  },
  preRegister(payload) {
    return request(
      {
        name: "preRegister",
        method: "post",
        path: `/product/${payload.slug}/pre_register`,
        loading: true,
        alert: true,
      },
      payload.body
    );
  },
  checkout(payload) {
    return request(
      {
        name: "checkout",
        method: "post",
        path: `/payment/${payload.slug}/checkout`,
        loading: true,
        alert: false,
      },
      payload.body
    );
  }
});
