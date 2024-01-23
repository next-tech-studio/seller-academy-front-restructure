import panelTable from "~/mappers/models/schema/panelTable";
import panelRoom from "~/mappers/models/schema/panelRoom";

export default (request) => ({
  questionsList(payload) {
    return request({
      name: "questionsList",
      method: "get",
      query: `?category=${payload?.category}&status=${payload?.status}&publicationDateMin=${payload.publicationDateMin}&publicationDateMax=${payload.publicationDateMax}&search=${payload.search}&sortKey=${payload?.sortKey}&sortOrder=${payload?.sortOrder}`,
      path: `/panel/question/list`,
      loading: true,
      alert: false,
      page: payload.page,
      model: { name: panelTable, collection: true, pagination: true },
    });
  },
  questionListCommon() {
    return request({
      name: "questionCommon",
      method: "get",
      path: `/panel/question/list/common`,
      loading: true,
      alert: false,
    });
  },
  updateQuestionStatus(payload) {
    return request(
      {
        name: "questionStatus",
        method: "put",
        path: `/panel/question/set_status`,
        loading: true,
        alert: false,
      },
      payload.body
    );
  },
  answersList(payload) {
    return request({
      name: "answersList",
      method: "get",
      query: `?status=${payload?.status}&creationDateMin=${payload?.creationDateMin}&creationDateMax=${payload?.creationDateMax}&search=${payload.search}&sortKey=${payload?.sortKey}&sortOrder=${payload?.sortOrder}&questionSlug=${payload?.questionSlug}`,
      path: `/panel/answers/list`,
      loading: true,
      alert: false,
      page: payload.page,
      model: { name: panelTable, collection: true, pagination: true },
    });
  },
  answersListCommon() {
    return request({
      name: "answerCommon",
      method: "get",
      path: `/panel/answers/list/common`,
      loading: true,
      alert: false,
    });
  },
  updateAnswerStatus(payload) {
    return request(
      {
        name: "answerStatus",
        method: "put",
        path: `/panel/answer/set_status`,
        loading: true,
        alert: false,
      },
      payload.body
    );
  },
  sendQuestion(payload) {
    return request(
      {
        name: "updateQuestion",
        method: "put",
        path: `/panel/question/question_edit`,
        loading: true,
        alert: false,
      },
      payload.body
    );
  },
  sendAnswer(payload) {
    return request(
      {
        name: "updateAnswer",
        method: "put",
        path: `/panel/answer/answer_edit`,
        loading: true,
        alert: false,
      },
      payload.body
    );
  },
  // rooms
  roomCommon() {
    return request({
      name: "getRoomCommon",
      method: "get",
      path: `/panel/chat/rooms/create/common`,
      loading: true,
      alert: false,
    });
  },
  roomInfo(payload) {
    return request({
      name: "getRoomInfo",
      method: "get",
      path: `/panel/chat/show/${payload}`,
      loading: true,
      alert: false,
      model: { name: panelRoom, dataPath: "data" },
    });
  },
  updateRoomStatus(payload) {
    return request(
      {
        name: "answerStatus",
        method: "put",
        path: `/panel/chat/set_status`,
        loading: true,
        alert: false,
      },
      payload.body
    );
  },
  saveRoom(payload) {
    return request(
      {
        name: "saveRoom",
        method: "put",
        path: `/panel/chat/rooms/editor-data`,
        loading: true,
        alert: false,
      },
      payload.body
    );
  },
  chatRoomsList(payload) {
    return request(
      {
        name: "chatRoomsList",
        method: "get",
        path: `/panel/chat/rooms/data`,
        loading: true,
        alert: false,
      },
      payload.body
    );
  },
  chatRoomsCommon(payload) {
    return request(
      {
        name: "chatRoomsCommon",
        method: "get",
        path: `/panel/chat/rooms/common`,
        loading: true,
        alert: false,
      },
      payload.body
    );
  },
});
