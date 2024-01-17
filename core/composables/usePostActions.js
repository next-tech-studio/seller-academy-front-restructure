export const usePostActions = (module) => {
  const { $repos } = useNuxtApp();
  const route = useRoute();
  let comments = reactive([]);
  let replyedComment = ref({});
  let comment = ref("");
  let repliesPaginations = reactive([]);
  let page = ref(1);
  let last_page = ref();

  // ===================== COMMENT ====================== //
  const getComments = () => {
    $repos.article
      .comments({
        page: page.value,
        slug: route.params.slug,
        type: module
      })
      .then((res) => {
        Object.assign(comments, [...comments, ...res.data]);
        last_page.value = res.last_page;
        page.value++;

        comments.forEach((comment) => {
          const index = repliesPaginations.findIndex(
            (object) => object.parentId === comment.id
          );
          const pagination = {
            parentId: comment.id,
            last_page: comment.replyLastPage,
          };
          index === -1
            ? repliesPaginations.push({ ...pagination, page: 1 })
            : Object.assign(repliesPaginations[index], {
                ...repliesPaginations[index],
                ...pagination,
              });
        });
      });
  };

  const getCommentReplies = (comment) => {
    const replyIndex = repliesPaginations.findIndex(
      (element) => element.parentId == comment.id
    );
    const commentIndex = comments.findIndex(
      (element) => element.id == comment.id
    );
    $repos.article
      .comments({
        page: repliesPaginations[replyIndex].page + 1,
        slug: route.params.slug,
        parentId: `${comment.id}`,
        type: module
      })
      .then((res) => {
        Object.assign(
          repliesPaginations[replyIndex],
          "page",
          repliesPaginations[replyIndex].page++
        );
        Object.assign(comments[commentIndex].replies, [
          ...comments[commentIndex].replies,
          ...res.data,
        ]);
      });
  };

  const addComment = (e) => {
    $repos.article
      .addComment({
        slug: route.params.slug,
        type: module,
        body: {
          text: e,
          replyTo: replyedComment.value.id,
        },
      })
      .then((res) => {
        // if (replyedComment.value.id) {
        //   const commentIndex = comments.findIndex(
        //     (c) => c.id == replyedComment.value.id
        //   );
        //   comments[commentIndex].replies.push(res);
        // } else {
        //   Object.assign(comments, [res, ...comments]);
        // }
        comment.value = "";
        replyedComment.value = {};
      });
  };

  const replyComment = ($event) => {
    replyedComment.value = { ...$event };
  };

  const reactComment = (e) => {
    $repos.article
      .reactComment({
        slug: route.params.slug,
        commentId: e.item.id,
        type: module,
        body: {
          action: e.action,
        },
      })
      .then((res) => {
        const commentIndex = comments.findIndex((comment) => {
          if (comment?.replies?.length > 0) {
            return (
              comment.replies.some((reply) => reply.id === e.item.id) ||
              comment.id == e.item.id
            );
          } else {
            return comment.id == e.item.id;
          }
        });
        const replyIndex = comments[commentIndex]?.replies.findIndex(
          (reply) => reply.id === e.item.id
        );
        if (replyIndex > -1) {
          Object.assign(
            comments[commentIndex].replies[replyIndex].feedback,
            res.feedback
          );
        } else {
          Object.assign(comments[commentIndex].feedback, res.feedback);
        }
      });
  };

  // ===================== REACTION ===================== //
  const reactPost = (item) => {
    console.log('here is reactPost');
    $repos.article
      .articleFeedback({
        slug: route.params.slug,
        type: module,
        body: {
          action: item.currentUserLiked ? "clear" : "like",
        },
      })
      .then((res) => {
        item.currentUserLiked = !item.currentUserLiked;
        if (res.feedback.currentUserAction == "clear") {
          item.likesCount -= 1;
        } else {
          item.likesCount += 1;
        }
      });
  };

  // ===================== BOOKMARK ===================== //
  const bookmarkPost = (item) => {
    $repos.article
      .bookmark({
        slug: route.params.slug,
        type: module,
        body: {
          action: item.currentUserBookmarked ? "clear" : "save",
        },
      })
      .then((res) => {
        item.currentUserBookmarked = !item.currentUserBookmarked;
      });
  };

  return {
    comments,
    replyedComment,
    comment,
    repliesPaginations,
    page,
    last_page,
    getComments,
    getCommentReplies,
    addComment,
    replyComment,
    reactComment,
    reactPost,
    bookmarkPost,
  };
};
