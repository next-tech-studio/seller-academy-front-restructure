<template>
  <div class="bg-background-dark">
    <v-container class="py-6">
      <v-row>
        <v-col cols="12" md="9">
          <question
            @reaction="sendFeedBackQuestion($event)"
            all-in-bottom
            hide-avatar-gp
            :diveded-footer="false"
            bold
            :item="item.question"
          >
            <template #footer>
              <v-divider class="mb-md-4 mb-3"></v-divider>
              <div class="d-flex flex-column flex-md-row">
                <div>
                  <span class="text-body-1">{{
                    $t("do_you_know_the_answer")
                  }}</span>
                  <v-btn
                    color="text-secondary"
                    class="text-body-2"
                    variant="text"
                    @click="showAnswerForm"
                    >{{ $t("answer_to_this_queston") }}</v-btn
                  >
                </div>
                <v-spacer></v-spacer>
                <app-share-in v-if="mdAndUp" />
              </div>
              <question-form
                ref="answerForm"
                :has-preview="false"
                :loading="loading"
                v-model="showAnswer"
                placeholder="your_answer_to_this_question"
                :just-text="true"
                btn-text="send_answer"
                :need-acception="false"
                @submit="sendAnswer"
              />
              <app-share-in v-if="!mdAndUp" class="mt-4" />
            </template>
          </question>
          <v-card
            height="220"
            class="mt-6 d-md-none d-block"
          >
          <v-img cover src="/images/increase_sale_in_dk.jpg"></v-img>
          </v-card>
          <v-card color="transparent" class="my-6">
            <div
              v-if="item?.answers?.length > 0"
              class="d-flex justify-lg-space-between align-center"
            >
              <div class="text-body-1 font-weight-bold text-text-heading mb-2">
                {{ $t("answers") }} ({{ item?.answers?.length }})
              </div>
              <q-a-filter
                v-model="filterToggle"
                :items="filters"
                @filter:items="getSingleQuestion"
              />
            </div>
            <div
              v-for="(answer, index) in item.answers"
              :key="index"
              class="bg-text-light"
              :class="{
                'rounded-t-xl': index == 0,
                'rounded-b-xl': index == item.answers.length - 1,
              }"
            >
              <question
                @reaction="sendFeedBackAnswer($event, answer, index)"
                :bold="false"
                hide-avatar-gp
                all-in-bottom
                :diveded-footer="false"
                :item="answer"
              />
              <v-divider
                v-if="index != item?.answers?.length - 1"
                class="mx-4 my-0"
                color="n500"
              ></v-divider>
            </div>
          </v-card>
          <more-info-card
            v-if="!auth.user.loggedIn"
            @change:state="toLogin"
            url="login"
            :class="{ 'sticky rounded-t-md rounded-b-0': !mdAndUp }"
          />
          <more-info-card
            v-if="auth.user.loggedIn"
            :horizontal="mdAndUp"
            @change:state="questionDialog = true"
            submit-text="submit_question"
          >
            <template #text>
              <div class="d-flex flex-column py-4">
                <div
                  class="text-h5 text-text-light text-lg-start text-center mb-2 mb-lg-0"
                >
                  {{ $t("dont_find_desired_answer") }}
                </div>
                <span class="text-text-light">
                  {{ $t("ask_your_question_to_get_the_desired_answer") }}
                </span>
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
        </v-col>
        <v-col cols="12" md="3">
          <v-card
            height="200"
            class="mb-6 d-none d-md-block"
            color="primary-base"
          >
          <v-img cover src="/images/increase_sale_in_dk.jpg"></v-img>

          </v-card>
          <v-card>
            <v-card-title class="text-body-1 font-weight-bold">
              {{ $t("relevant_questions") }}
            </v-card-title>
            <v-list lines="one" v-if="isClient">
              <v-list-item
                class="py-0"
                density="compact"
                v-for="question in item.relevantQuestions"
                :key="question.title"
                :to="
                  localePath({
                    name: 'forum-question-slug',
                    params: { slug: question.slug },
                  })
                "
              >
                <span class="text-body-1 text-text-secondary">
                  {{ question.title }}
                </span>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { useFilterStore } from "@core/stores/filter";
import { useAuthStore } from "@core/stores/auth";
import { useDisplay } from "vuetify";
let filterStore = useFilterStore();
let questionDialog = ref(false);
let approvalDialog = ref(false);
let similarQuestions = ref([]);
let categories = reactive([]);
let loading = ref(false);
const { mdAndUp } = useDisplay();
const localePath = useLocalePath();
const item = reactive({});
const auth = useAuthStore();
const { $repos } = useNuxtApp();
const route = useRoute();
const answerForm = ref(null);
const { isClient } = useSsrCorrection();
let filterToggle = ref("recent");
let filters = [
  { title: "newest", value: "recent" },
  { title: "most_popular", value: "likes" },
];
const getSingleQuestion = async () => {
  await $repos.community
    .singleQuestion({
      questionSlug: route.params.slug,
      sort: filterStore?.filter.sort,
    })
    .then((res) => {
      Object.assign(item, {
        ...res,
      });
    });
};
const searchQuestionData = async (payload) => {
  await $repos.community.searchQuestions(payload).then((res) => {
    if (res.length == 0)
      similarQuestions.value.splice(0, similarQuestions.value.length);
    Object.assign(similarQuestions.value, res);
  });
};
const toLogin = () => {
  navigateTo(
    localePath({
      name: "login",
    })
  );
};
const onSearch = useDebounceFn(async (e) => await searchQuestionData(e), 500, {
  maxWait: 5000,
});
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
      approvalDialog.value = true;
    });
};
const toQuestion = (item) => {
  navigateTo(
    localePath({ name: "forum-question-slug", params: { slug: item.slug } })
  );
};
Promise.all([
  useAsyncData(async () => await getSingleQuestion()),
  useAsyncData(async () => {
    await $repos.community.questionsCommon().then((res) => {
      Object.assign(categories, res.categories);
    });
  }),
]);
const showAnswerForm = () => {
  if (!auth.user.loggedIn) {
    navigateTo(
      localePath({
        name: "login",
      })
    );
  }
  answerForm.value.showFullCard();
};
const sendFeedBackQuestion = (e) => {
  $repos.community
    .sendFeedbackQuestion({
      questionSlug: route.params.slug,
      body: {
        action: e,
      },
    })
    .then((res) => {
      Object.assign(item.question, { ...res });
    });
};

const sendFeedBackAnswer = (e, answer, index) => {
  $repos.community
    .sendFeedbackAnswer({
      questionSlug: route.params.slug,
      answerId: answer.answerId,
      body: {
        action: e,
      },
    })
    .then((res) => {
      Object.assign(item.answers[index], { ...res });
    });
};

const sendAnswer = (e) => {
  loading.value = true;
  $repos.community
    .sendAnswer({
      questionSlug: route.params.slug,
      body: { text: e.text, attachments: e.attachments },
    })
    .then((res) => {
      Object.assign(item.answers, [res, ...item.answers]);
      loading.value = false;
    });
};

useHead(useHeadTags({
  title: route.params.slug.split('-').join(' ')
}));
</script>

<style lang="scss" scoped></style>
