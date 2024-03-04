import singleQuestion from "~/mappers/models/dto/singleQuestion";
import chatCommon from "~/mappers/models/dto/chatCommon";
import chatData from "~/mappers/models/dto/chatData";
import questionCommon from "~/mappers/models/dto/questionCommon";
import questionData from "~/mappers/models/dto/questionData";
import user from "~/mappers/models/schema/user";
import question from "~/mappers/models/schema/question";
import room from "~/mappers/models/schema/room";
import roomListPreview from "~/mappers/models/dto/roomListPreview";

export default (request) => ({
  chatCommon(payload) {
    return request({
      name: "chatCommon",
      method: "get",
      path: `/community/chat/${payload.categorySlug}/${payload.chatSlug}/common`,
      loading: true,
      alert: false,
      model: { name: chatCommon },
    });
  },
  chatData(payload) {
    return request({
      name: "chatData",
      method: "get",
      path: `/community/chat/${payload.categorySlug}/${payload.chatSlug}/data`,
      loading: true,
      alert: false,
      page: payload.page,
      model: { name: chatData, raw: false },
    });
  },
  chatMembers(payload) {
    return request({
      name: "chatMembers",
      method: "get",
      path: `/community/chat/${payload.categorySlug}/${payload.chatSlug}/members`,
      loading: true,
      alert: false,
      page: payload.page,
      model: { name: user, collection: true, pagination: true },
    });
  },
  sendMessage(payload) {
    return request(
      {
        name: "sendMessage",
        method: "post",
        path: `/community/chat/${payload.categorySlug}/${payload.chatSlug}/message`,
        loading: true,
        alert: false,
      },
      payload.body
    );
  },
  reactToMessage(payload) {
    return request(
      {
        name: "reactToMessage",
        method: "post",
        path: `/community/chat/reaction`,
        loading: true,
        alert: false,
      },
      payload.body
    );
  },
  questionsData(payload) {
    return request({
      name: "questionsData",
      method: "get",
      path: `/community/homepage/data`,
      query: `?category=${payload.category}&sort=${payload.sort}`,
      loading: true,
      alert: false,
      model: { name: questionData, raw: false },
      page: payload.page,
    });
  },
  questionsCommon(payload) {
    return request({
      name: "questions",
      method: "get",
      path: `/community/homepage/common`,
      loading: true,
      alert: false,
      model: { name: questionCommon },
    });
  },
  sendQuestion(payload) {
    return request(
      {
        name: "sendQuestion",
        method: "post",
        path: `/community/questions/new`,
        loading: true,
        alert: false,
        model: { name: question },
      },
      payload.body
    );
  },
  sendFeedbackQuestion(payload) {
    return request(
      {
        name: "sendAction",
        method: "post",
        path: `/community/questions/${payload.questionSlug}/feedback`,
        loading: true,
        alert: false,
      },
      payload.body
    );
  },
  singleQuestion(payload) {
    return request({
      name: "singleQuestion",
      method: "get",
      path: `/community/question/${payload.questionSlug}`,
      loading: true,
      query: `?sortBy=${payload.sort}`,
      alert: false,
      model: { name: singleQuestion },
    });
  },
  sendAnswer(payload) {
    return request(
      {
        name: "sendAnswer",
        method: "post",
        path: `/community/question/${payload.questionSlug}/answer`,
        loading: true,
        alert: false,
        model: { name: question },
      },
      payload.body
    );
  },
  sendFeedbackAnswer(payload) {
    return request(
      {
        name: "sendAction",
        method: "post",
        path: `/community/questions/${payload.questionSlug}/answer/${payload.answerId}/feedback`,
        loading: true,
        alert: false,
      },
      payload.body
    );
  },
  searchQuestions(payload) {
    return request({
      name: "sendAction",
      method: "get",
      path: "/question/search",
      query: `?query=${payload}`,
      loading: false,
      alert: false,
    });
  },
  getRoomsData(payload) {
    return request({
      name: "getAllRooms",
      method: "get",
      path: "/community/chat/rooms/data",
      query: `?categorySlug=${payload.categorySlug}&search=${payload.search}`,
      loading: true,
      page: payload.page,
      alert: false,
      model: { name: room, collection: true, pagination: true, raw: false },
    });
  },
  getRoomsCommon() {
    return request({
      name: "getRoomsCommon",
      method: "get",
      path: "/community/chat/rooms/common",
      loading: true,
      alert: false,
    });
  },
  removeMessage(payload) {
    return request({
      name: "removeMessage",
      method: "delete",
      path: `/community/chat/message/${payload.id}`,
      loading: true,
      alert: false,
    });
  },
  editDescription(payload) {
    return request(
      {
        name: "editDescription",
        method: "put",
        path: `/community/chat/${payload.categorySlug}/${payload.chatSlug}/editDescription`,
        loading: true,
        alert: false,
      },
      payload.body
    );
  },
  recentChatSideBar() {
    return request({
      name: "recentChatSidebar",
      method: "get",
      path: "/community/chat/recentChatsSidebar",
      loading: true,
      alert: false,
      model: { name: roomListPreview },
    });
  },
  removeMember(payload) {
    return request(
      {
        name: "removeMember",
        method: "post",
        path: `/community/chat/${payload.categorySlug}/${payload.chatSlug}/removeMember`,
        loading: true,
        alert: false,
      },
      payload.body
    );
  },
  getUsersList(payload) {
    return request({
      name: "searchUser",
      method: "get",
      path: `/users/search`,
      query: `?query=${payload.search}`,
      loading: true,
      alert: false,
      model: { name: user, collection: true },
    });
  },
  addNewMember(payload) {
    return request(
      {
        name: "addUser",
        method: "post",
        path: `/community/chat/add/${payload.chatSlug}`,
        loading: true,
        alert: false,
      },
      payload.body
    );
  },
  membershipRequest(payload) {
    return request({
      name: "memberShipRequest",
      method: "post",
      path: `/community/chat/join/${payload}`,
      loading: true,
      alert: false,
    });
  },
  // uploadFiles(payload, path) {
  //     return request({
  //         name: 'uploadFiles',
  //         method: 'post',
  //         path: path,
  //         loading: true,
  //         alert: false,

  //     }, payload.body)
  // }
});
