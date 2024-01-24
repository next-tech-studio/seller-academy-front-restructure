import panelTable from "~/mappers/models/schema/panelTable";
import panelCommentTable from "~/mappers/models/schema/panelCommentTable";

export default (request) => ({
  getCourseCreationCommon() {
    return request({
      name: "getCourseCreationCommon",
      method: "get",
      path: `/academy/panel/course_editor/common`,
      loading: true,
      alert: false,
    });
  },
  createCourse(payload) {
    return request(
      {
        name: "createCourse",
        method: "put",
        path: `/academy/panel/course_editor/data`,
        loading: true,
        alert: false,
      },
      payload.body
    );
  },
  getCreatedCourse(payload) {
    return request({
      name: "getCourse",
      method: "get",
      path: `/academy/panel/course/${payload.id}`,
      loading: true,
      alert: false,
    });
  },
  createChapter(payload) {
    return request(
      {
        name: "submitChapter",
        method: "put",
        path: "/academy/panel/chapter_editor/data",
        loading: true,
        alert: false,
      },
      payload.body
    );
  },
  getChaptersList(payload) {
    return request({
      name: "getChapters",
      method: "get",
      path: `/academy/panel/chapter/list/${payload.courseId}`,
      loading: true,
      alert: false,
    });
  },
  editCreateLesson(payload) {
    return request(
      {
        name: "editCreateLesson",
        method: "put",
        path: `/academy/panel/lesson_editor/data`,
        loading: true,
        alert: false,
      },
      payload.body
    );
  },
  deleteChapter(payload) {
    return request({
      name: "deleteChapter",
      method: "delete",
      path: `/academy/panel/chapter/${payload}`,
      loading: true,
      alert: false,
    });
  },
  deleteLesson(payload) {
    return request({
      name: "deleteLesson",
      method: "delete",
      path: `/academy/panel/lesson/${payload}`,
      loading: true,
      alert: false,
    });
  },
  getCoursesData(payload) {
    return request({
      name: "coursesData",
      method: "get",
      query: `?categorySlug=${payload?.category}&instructorId=${payload?.instructor}&status=${payload?.status}&search=${payload?.search}&sortKey=${payload?.sortKey}&sortOrder=${payload?.sortOrder}`,
      path: `/academy/panel/course/list`,
      loading: true,
      alert: false,
      page: payload.page,
      model: { name: panelTable, collection: true, pagination: true },
    });
  },
  getCourseListCommon() {
    return request({
      name: "coursesCommon",
      method: "get",
      path: `/academy/panel/course/list/common`,
      loading: true,
      alert: false,
    });
  },
  updateCourseStatus(payload) {
    return request(
      {
        name: "courseStatus",
        method: "put",
        path: "/academy/panel/set_status",
        loading: true,
        alert: false,
      },
      payload.body
    );
  },
  commentList(payload) {
    return request({
      name: "commentList",
      method: "get",
      path: "/academy/panel/comment/list",
      loading: true,
      alert: false,
      query: `?search=${payload?.search}&status=${payload.status}&sortKey=${payload?.sortKey}&sortOrder=${payload?.sortOrder}`,
      page: payload.page,
      model: { name: panelCommentTable, collection: true, pagination: true },
    });
  },
  commentListCommon() {
    return request({
      name: "commentListCommon",
      method: "get",
      path: "/academy/panel/comment/list/common",
      loading: true,
      alert: false,
    });
  },
  updateCommentStatus(payload) {
    return request(
      {
        name: "commentStatus",
        method: "put",
        path: "/academy/panel/comment/status",
        loading: true,
        alert: false,
      },
      payload.body
    );
  },
  categoryList(payload) {
    return request({
      name: "categoryList",
      method: "get",
      path: "/academy/panel/category/list",
      loading: true,
      alert: false,
      query: `?search=${payload.search}&sortKey=${payload?.sortKey}&sortOrder=${payload?.sortOrder}`,
      page: payload.page,
    });
  },
  categoryListCommon() {
    return request({
      name: "categoryListCommon",
      method: "get",
      path: "/academy/panel/category/list/common",
      loading: true,
      alert: false,
    });
  },
  updateCategory(payload) {
    return request(
      {
        name: "updateCategory",
        method: "put",
        path: "/academy/panel/category_editor/data",
        loading: true,
        alert: false,
      },
      payload.body
    );
  },
  updateCategoryStatus(payload) {
    return request(
      {
        name: "updateCategoryStatus",
        method: "put",
        path: "/academy/panel/category/status",
        loading: true,
        alert: false,
      },
      payload.body
    );
  },
  skillsList(payload) {
    return request({
      name: "skillsList",
      method: "get",
      path: "/academy/panel/skill/list",
      loading: true,
      alert: false,
      query: `?search=${payload?.search}&sortKey=${payload?.sortKey}&sortOrder=${payload?.sortOrder}`,
      page: payload.page,
    });
  },
  skillsListCommon() {
    return request({
      name: "skillsListCommon",
      method: "get",
      path: "/academy/panel/skill/list/common",
      loading: true,
      alert: false,
    });
  },
  updateSkill(payload) {
    return request(
      {
        name: "updateSkill",
        method: "put",
        path: "/academy/panel/skill_editor/data",
        loading: true,
        alert: false,
      },
      payload.body
    );
  },
  updateSkillStatus(payload) {
    return request(
      {
        name: "updateSkillStatus",
        method: "put",
        path: "/academy/panel/skill/status",
        loading: true,
        alert: false,
      },
      payload.body
    );
  },
  studentsList(payload) {
    return request({
      name: "studentsList",
      method: "get",
      path: "/academy/panel/students/list",
      loading: true,
      alert: false,
      query: `?search=${payload?.search}&sortKey=${payload?.sortKey}&sortOrder=${payload?.sortOrder}`,
      page: payload.page,
      model: { name: panelTable, collection: true, pagination: true },
    });
  },
  studentsListCommon() {
    return request({
      name: "studentsListCommon",
      method: "get",
      path: "/academy/panel/students/list/common",
      loading: true,
      alert: false,
    });
  },
  instructorsList(payload) {
    return request({
      name: "instructorsList",
      method: "get",
      path: "/academy/panel/instructor/list",
      loading: true,
      alert: false,
      query: `?search=${payload?.search}&sortKey=${payload?.sortKey}&sortOrder=${payload?.sortOrder}`,
      page: payload.page,
    });
  },
  instructorsListCommon() {
    return request({
      name: "instructorsListCommon",
      method: "get",
      path: "/academy/panel/instructor/list/common",
      loading: true,
      alert: false,
    });
  },
  certificatesList(payload) {
    return request({
      name: "certificatesList",
      method: "get",
      path: "/academy/panel/certificate/list",
      loading: true,
      alert: false,
      query: `?search=${payload?.search}&sortKey=${payload?.sortKey}&sortOrder=${payload?.sortOrder}`,
      page: payload.page,
    });
  },
  certificatesListCommon() {
    return request({
      name: "certificatesListCommon",
      method: "get",
      path: "/academy/panel/certificate/common",
      loading: true,
      alert: false,
    });
  },
});
