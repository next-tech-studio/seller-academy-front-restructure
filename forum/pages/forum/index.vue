<template>
  <div class="bg-background-dark">
    <v-img
      class="d-none d-lg-block"
      src="/images/community_header.webp"
    ></v-img>
    <v-container class="d-lg-none">
      <div class="d-flex justify-space-between align-center">
        <span class="text-body-1 font-weight-bold align-center">{{
          $t("suggested_rooms")
        }}</span>
        <v-btn
          class="px-0 text-button animated"
          variant="text"
          color="text-secondary"
          >{{ $t("see_more") }}</v-btn
        >
      </div>
    </v-container>
    <app-switch-wrapper class="pa-0 ps-3 d-lg-none me-0" one-side-margin>
      <client-only>
        <v-slide-group>
          <v-slide-group-item
            v-for="(item, index) in suggestedChatRooms"
            :key="index"
            :value="item.slug"
          >
            <div class="me-2">
              <room-card
                :max-width="296"
                :item="item"
                @to:item="toRoom"
              ></room-card>
            </div>
          </v-slide-group-item>
        </v-slide-group>
      </client-only>
    </app-switch-wrapper>
    <v-container>
      <v-row>
        <v-col class="pb-0">
          <div class="bg-white rounded-md">
            <rooms-list
              :title="
                authStore.user.loggedIn && authUser?.user?.roles[0] == 'seller'
                  ? `${$t('your_rooms')} (${userChatRoomsCount})`
                  : `${$t('your_rooms')}`
              "
              :items="rooms"
              subtitle-key="subtitle"
              :show-alternative="
                !authStore.user.loggedIn ||
                !authUser?.user?.roles[0] == 'seller'
              "
              @to:item="toRoom"
              @more="toRoomList"
            >
              <template #append-title>
                <app-avatar-group v-if="!mdAndUp && rooms.length && authStore.user.loggedIn" class="me-3" :members="rooms" size="24px" />
              </template>
            </rooms-list>
            <rooms-list
              v-if="
                !authStore.user.loggedIn && authUser?.user?.roles[0] != 'seller'
              "
              :title="`${$t('most_visited_rooms')}`"
              :items="rooms"
              subtitle-key="subtitle"
              @to:item="toRoom"
              @more="toRoomList"
            />
          </div>
        </v-col>
        <v-col cols="12" lg="9" class="pt-0">
          <div class="d-lg-flex d-none justify-space-between align-center my-1">
            <span class="text-body-1 font-weight-bold align-center">{{
              $t("suggested_rooms")
            }}</span>
            <v-btn
              class="px-0 text-button animated"
              variant="text"
              color="text-secondary"
              :to="localePath({ name: 'forum-room-list' })"
              >{{ $t("see_more") }}</v-btn
            >
          </div>
          <v-row class="mb-4 d-none d-lg-flex">
            <v-col
              v-for="(item, index) in suggestedChatRooms"
              :key="index"
              cols="12"
              lg="4"
            >
              <room-card :item="item" @to:item="toRoom"></room-card>
            </v-col>
          </v-row>
          <more-info-card
            v-if="!authStore.user.loggedIn"
            @change:state="toLogin"
            url="login"
            :class="{'sticky rounded-t-md rounded-b-0': !mdAndUp}"
          />
          <more-info-card
            v-if="authStore.user.loggedIn"
            @change:state="questionDialog = true"
            submit-text="submit_question"
            :class="{'sticky rounded-t-md rounded-b-0 w-100': !mdAndUp}"
            ><template #text>
              <div class="d-flex align-center w-100">
                <span class="text-h5 text-text-light text-center">{{
                  $t("ask_or_search")
                }}</span>
              </div>
            </template>
          </more-info-card>
          <QuestionDialog
            v-model:dialog="questionDialog"
            :similarQuestions="similarQuestions"
            :categories="categories"
            @submit="sendQuestion"
            @to:item="toQuestion"
            @search="onSearch"
          />
          <QuestionApproval v-model:dialog="approvalDialog" />
          <Questions
            :items="questions"
            :categories="categories"
            @react:message="sendFeedBack($event)"
            @load:more="getQuestionData"
            @to:item="toQuestion"
            :is-last-page="lastPage"
            @filter:questions="getQuestionData(1)"
          ></Questions>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { useAuthStore } from "@core/stores/auth";
import { useFilterStore } from "@core/stores/filter";
import { useDisplay } from "vuetify";
let filterStore = useFilterStore();
const { $repos } = useNuxtApp();
const {mdAndUp} = useDisplay()
const authStore = useAuthStore();
let page = reactive(1);
let total_pages = reactive();
let questions = reactive([]);
let rooms = reactive([]);
let userRooms = reactive([]);
let suggestedChatRooms = reactive([]);
let categories = reactive([]);
let newQuestion = ref(false);
let lastPage = ref(false);
let similarQuestions = ref([]);
let userChatRoomsCount = ref(0);
let publicRoomsCount = 0;
let questionDialog = ref(false);
let approvalDialog = ref(false);
const localePath = useLocalePath();
const { t } = useI18n();

const sendQuestion = (e) => {
  $repos.community
    .sendQuestion({
      body: {
        text: e.text,
        categorySlug: e.categorySlug,
        attachments: e.attachments,
      },
    })
    .then((res) => {
      Object.assign(questions, [{ ...res }, ...questions]);
      newQuestion.value = true;
      approvalDialog.value = newQuestion.value ? true : false;
    });
};
const sendFeedBack = (e) => {
  $repos.community
    .sendFeedbackQuestion({
      questionSlug: e.questionSlug,
      body: {
        action: e.action,
      },
    })
    .then((res) => {
      Object.assign(questions[e.index], { ...res });
    });
};

const getQuestionData = async (currentPage) => {
  if (currentPage) {
    page = currentPage;
    questions.splice(0, questions.length);
  }
  // Object.assign(filter, e);
  await $repos.community
    .questionsData({
      page,
      sort: filterStore?.filter.sort,
      category: filterStore?.filter.category?.join(",") || "",
    })
    .then((res) => {
      Object.assign(questions, [...questions, ...res.data]);
      questionDialog.value = false;
      lastPage.value =
        res.pagination.lastPage === res.pagination.currentPage ? true : false;
      total_pages = res.total;
      if (res.total != page) page++;
    });
};

const searchQuestionData = async (payload) => {
  await $repos.community.searchQuestions(payload).then((res) => {
    if (res.length == 0)
      similarQuestions.value.splice(0, similarQuestions.value.length);
    Object.assign(similarQuestions.value, res);
  });
};
const onSearch = useDebounceFn(async (e) => await searchQuestionData(e), 500, {
  maxWait: 5000,
});
const toQuestion = (item) => {
  navigateTo(
    localePath({ name: "forum-question-slug", params: { slug: item.slug } })
  );
};
const toRoom = (item) => {
  navigateTo(
    localePath({
      name: "forum-room-slug",
      params: { slug: item?.slug },
      query: {
        category: item?.category?.slug,
        roomId: item?.roomId,
      },
    })
  );
};
const toLogin = () => {
  navigateTo(
    localePath({
      name: "login",
    })
  );
};

const toRoomList = () => {
  navigateTo(
    localePath({
      name: "forum-room-list",
    })
  );
};

Promise.all([
  useAsyncData(async () => await getQuestionData()),
  useAsyncData(async () => {
    await $repos.community.questionsCommon().then((res) => {
      Object.assign(suggestedChatRooms, res.suggestedChatRooms);
      Object.assign(rooms, res.rooms);
      Object.assign(userRooms, res.userRooms);
      Object.assign(categories, res.categories);
      userChatRoomsCount.value = res.userChatRoomsCount;
    });
  }),
]);

useHead(
  useHeadTags({
    title: t("forum"),
    description: "",
    type: "website",
  })
);
</script>

<style lang="scss" scoped>
.sticky {
  position: fixed; 
  bottom: 0; 
  right: 0; 
  z-index: 1;
}
</style>
