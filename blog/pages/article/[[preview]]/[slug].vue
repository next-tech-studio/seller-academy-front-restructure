<template>
  <v-container fluid class="pa-0 d-flex justify-center">
    <v-sheet
      width="90%"
      class="d-flex"
      color="secondary-base rounded-b"
      :height="smAndDown ? 90 : 110"
    />
  </v-container>
  <v-container class="pt-0 pb-12 position-relative unselectable">
    <article class="d-flex flex-column position-relative">
      <div class="mx-auto d-flex align-center breadcrumb-position">
        <app-breadcrumbs color="text-light" page="article" :data="item" />
        <v-spacer />
        <v-btn
          flat
          width="48"
          size="x-small"
          height="48"
          color="transparent"
          class="text-text-high-emphasis text-caption me-4 py-1 justify-start align-center"
          :class="preview ? 'd-none' : 'd-none d-md-flex'"
          @click="bookmark()"
        >
          <template #append>
            <v-icon
              :icon="
                item.currentUserBookmarked
                  ? 'custom:bookmarkSolid'
                  : 'custom:bookmark'
              "
              color="text-light"
              size="18"
            ></v-icon>
          </template>
        </v-btn>
        <div :class="preview ? 'd-none' : 'd-md-flex align-center d-none'">
          <span style="z-index: 10" class="text-icon-light text-body-2 ml-2"
            >{{ item.minutesToRead }} {{ $t("minutes") }}</span
          >
          <v-icon color="icon-light" icon="custom:book" size="18" />
        </div>
      </div>

      <v-card
        class="article-card"
        :class="mdAndUp ? 'w-75 rounded-lg mx-auto' : 'w-100 rounded-lg'"
      >
        <post-content
          :is-preview="preview"
          @reactto:article="reactArticle"
          :item="item"
        ></post-content>
      </v-card>
    </article>
    <v-row tag="section" v-if="!preview">
      <v-col cols="12" md="12">
        <BecomeSeller />
      </v-col>
      <v-card :class="mdAndUp ? 'w-75 mx-auto' : 'w-100'" cols="12" md="12">
        <v-card-text class="px-4">
          <v-divider class="mt-10 mb-4 d-none d-md-block"></v-divider>
          <app-comment-input
            :reply-to="replyedComment"
            v-model:modelValue="comment"
            @submit="addComment"
            class="pb-1"
          />
          <app-comments
            :is-last-page="page > last_page"
            :items="comments"
            :replies-paginations="repliesPaginations"
            @see:more="getComments"
            @see:replies="getCommentReplies($event)"
            @react="reactComment"
            @reply="replyComment"
          />
        </v-card-text>
      </v-card>
    </v-row>
    <app-content-card-listing
      :content="item.relevantContentCards"
      title="relevant_content"
      :responsive-horizontal="true"
      @to:item="toItem($event)"
      :show-see-more="false"
      :show-filter="false"
    ></app-content-card-listing>
  </v-container>
</template>

<script setup>
// import BecomeSeller from "@core/layouts/components/BecomeSeller.vue";
import { useDisplay } from "vuetify";
const { smAndDown, mdAndUp } = useDisplay();
const { $repos } = useNuxtApp();
const route = useRoute();
let replyedComment = ref({});
let item = reactive({});
let comments = reactive([]);
let comment = ref("");
let repliesPaginations = reactive([]);
let page = ref(1);
let last_page = ref();
const localePath = useLocalePath();
let preview = !!route.params.preview;
const type = computed(() =>
  route.name.includes("podcast") ? "podcast" : "article"
);

useAsyncData(async () => {
  if (!preview) {
    await $repos.blog.article
      .show({
        slug: route.params.slug,
        type: "article",
      })
      .then((res) => {
        Object.assign(item, { ...res, type: "article" });
      });
  }
});

const getComments = () => {
  $repos.article
    .comments({
      page: page.value,
      slug: route.params.slug,
      type: "article",
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
      type: "article",
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
function toItem(e) {
  navigateTo(
    localePath({ name: "article-preview-slug", params: { slug: e.slug } })
  );
}

const bookmark = () => {
  $repos.article
    .bookmark({
      slug: route.params.slug,
      type: "article",
      body: {
        action: item.currentUserBookmarked ? "clear" : "save",
      },
    })
    .then((res) => {
      item.currentUserBookmarked = !item.currentUserBookmarked;
    });
};

const addComment = (e) => {
  $repos.article
    .addComment({
      slug: route.params.slug,
      type: "article",
      body: {
        text: e,
        replyTo: replyedComment.value.id,
      },
    })
    .then((res) => {
      if (replyedComment.value.id) {
        const commentIndex = comments.findIndex(
          (c) => c.id == replyedComment.value.id
        );
        comments[commentIndex].replies.push(res);
      } else {
        Object.assign(comments, [res, ...comments]);
      }
      comment.value = "";
      replyedComment.value = {};
    });
};

const reactComment = (e) => {
  $repos.article
    .reactComment({
      slug: route.params.slug,
      commentId: e.item.id,
      type: "article",
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

const replyComment = ($event) => {
  replyedComment.value = { ...$event };
};

const reactArticle = () => {
  $repos.article
    .articleFeedback({
      slug: route.params.slug,
      body: {
        action: item.currentUserLiked ? "clear" : "like",
      },
      type: "article",
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

const getDraft = () => {
  let payload = { id: route.params.slug, type: type.value };
  $repos.panel.articleData(payload).then((res) => {
    Object.assign(item, { ...res });
  });
};

onMounted(() => {
  if (preview) getDraft();
  else getComments();
});

useHead(useHeadTags(item));
useShema(item, "article");
</script>

<style lang="scss" scoped>
*.unselectable {
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;

  /*
     Introduced in Internet Explorer 10.
     See http://ie.microsoft.com/testdrive/HTML5/msUserSelect/
   */
  -ms-user-select: none;
  user-select: none;
}
.article-card {
  margin-top: -100px;
  @include respond("sm") {
    margin-top: -85px;
  }
}
.breadcrumb-position {
  width: 75%;
  transform: translateY(-90px);

  @include respond("sm") {
    width: 100%;
    transform: translateY(-70px);
  }
}
</style>
