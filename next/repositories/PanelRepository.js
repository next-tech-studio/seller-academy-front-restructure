import editorCommon from "~/mappers/models/dto/editorCommon";
import editorData from "~/mappers/models/dto/editorData";
import panelTable from "~/mappers/models/schema/panelTable";
import panelCommentTable from "~/mappers/models/schema/panelCommentTable";

export default (request) => ({
  editorCommon(payload) {
    return request({
      name: "editorCommon",
      method: "get",
      query: `?type=${payload.type}`,
      path: "/article_editor/common",
      loading: true,
      alert: false,
      model: { name: editorCommon },
    });
  },
  articleData(payload) {
    return request({
      name: "articleData",
      method: "get",
      query: `?type=${payload.type}`,
      path: `/article_editor/data/${payload.id}`,
      loading: true,
      alert: false,
      model: { name: editorData },
    });
  },
  saveDraft(payload) {
    return request(
      {
        name: "saveDraft",
        method: "put",
        query: `?type=${payload.type}`,
        path: "/article_editor/data",
        loading: true,
        alert: true,
      },
      payload.body
    );
  },
  tagList(payload) {
    return request({
      name: "tagList",
      method: "get",
      path: "/panel/tags/list",
      loading: true,
      query: `?search=${payload.search}&status=${payload.status}&sortKey=${payload?.sortKey}&sortOrder=${payload?.sortOrder}`,
      page: payload.page,
      alert: false,
    });
  },
  tagListCommon(payload) {
    return request({
      name: "tagListCommon",
      method: "get",
      // query: `?type=${payload.type}`,
      path: "/panel/tag/common",
      loading: true,
      alert: false,
    });
  },
  // addTag(payload) {
  //   return request(
  //     {
  //       name: "tagList",
  //       method: "post",
  //       query: `?type=${payload.type}`,
  //       path: "/panel/tags/create",
  //       loading: true,
  //       alert: false,
  //     },
  //     payload.body
  //   );
  // },
  updateTag(payload) {
    return request(
      {
        name: "updateTag",
        method: "put",
        // query: `?type=${payload.type}`,
        path: "/panel/tags/update",
        loading: true,
        alert: false,
      },
      payload.body
    );
  },
  updateTagStatus(payload) {
    return request(
      {
        name: "updateTagStatus",
        method: "put",
        path: "/panel/tags/set_status",
        loading: true,
        alert: false,
      },
      payload.body
    );
  },
  updateArticleStatus(payload) {
    console.log('72272772',payload.type)
    return request(
      {
        name: "articleStatus",
        method: "put",
        query: `?type=${payload.type}`,
        path: "/panel/articles/set_status",
        loading: true,
        alert: true,
      },
      payload.body
    );
  },
  articleListData(payload) {
    return request({
      name: "articleList",
      method: "get",
      path: "/panel/articles/data",
      loading: true,
      alert: false,
      query: `?authorId=${payload?.authorId}&authorType=${payload?.authorType}&categorySlug=${payload?.categorySlug}&status=${payload?.status}&publicationDateMin=${payload.publicationDateMin}&publicationDateMax=${payload.publicationDateMax}&search=${payload.search}&type=${payload.type}&sortKey=${payload?.sortKey}&sortOrder=${payload?.sortOrder}`,
      page: payload.page,
      model: { name: panelTable, collection: true, pagination: true },
    });
  },
  articleListCommon(payload) {
    return request({
      name: "articleListCommon",
      method: "get",
      query: `?type=${payload.type}`,
      path: "/panel/articles/common",
      loading: true,
      alert: false,
    });
  },
  categoryList(payload) {
    return request({
      name: "categoryList",
      method: "get",
      path: "/panel/categories/list",
      loading: true,
      alert: false,
      query: `?search=${payload.search}&status=${payload.status}&sortKey=${payload?.sortKey}&sortOrder=${payload?.sortOrder}`,
      page: payload.page,
    });
  },
  categoryListCommon() {
    return request({
      name: "categoryListCommon",
      method: "get",
      path: "/panel/category/common",
      loading: true,
      alert: false,
    });
  },
  updateCategory(payload) {
    return request(
      {
        name: "updateCategory",
        method: "put",
        path: "/panel/categories/update",
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
        path: "/panel/categories/set_status",
        loading: true,
        alert: true,
      },
      payload.body
    );
  },
  commentList(payload) {
    return request({
      name: "commentList",
      method: "get",
      path: "/panel/articles/comments/data",
      loading: true,
      alert: false,
      query: `?search=${payload.search}&status=${payload.status}&sortKey=${payload?.sortKey}&sortOrder=${payload?.sortOrder}`,
      page: payload.page,
      model: { name: panelCommentTable, collection: true, pagination: true },
    });
  },
  commentListCommon(payload) {
    return request({
      name: "commentListCommon",
      method: "get",
      // query: `?type=${payload.type}`,
      path: "/panel/articles/comments/common",
      loading: true,
      alert: false,
    });
  },
  updateCommentStatus(payload) {
    return request(
      {
        name: "commentStatus",
        method: "put",
        path: "/panel/articles/comments/update",
        loading: true,
        alert: false,
      },
      payload.body
    );
  },
  updateCommentText(payload) {
    return request(
      {
        name: "commentText",
        method: "put",
        query: `?type=${payload.type}`,
        path: `/panel/articles/comments/${payload.id}`,
        loading: true,
        alert: false,
      },
      payload.body
    );
  },
});
