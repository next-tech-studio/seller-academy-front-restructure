<template>
  <NuxtLayout name="default">
    <div class="bg-n100">
      <v-container>
        <client-only>
          <dashboard-menu
            class="mb-4"
            v-model="tabs"
            @change:route="navigateToTab"
            :to="{ name: `dashboard-${tabs}` }"
            :menu="menu"
            selected-class='text-secondary-base'
          ></dashboard-menu>
        </client-only>
        <div class="d-flex">
          <v-window
            v-model="tabs"
            class="rounded-lg me-lg-4 me-0"
            :class="lgAndUp ? 'w-75' : 'w-100'"
          >
            <v-window-item :value="tabs">
              <NuxtPage />
            </v-window-item>
          </v-window>
          <div class="w-25 d-lg-block d-none">
            <v-card class="mb-4">
              <v-img
                src="/images/userdashboard/add-post.png"
                :gradient="gradient"
                alt="add post image"
              >
                <div
                  class="text-text-light d-flex flex-column justify-end h-100 align-center pa-4"
                >
                  <p class="text-h3">
                    {{ $t("add_new_post") }}
                  </p>
                  <p class="text-caption text-center mb-2">
                    {{ $t("add_new_post_dashboard_description") }}
                  </p>
                  <v-btn :text="$t('add_new_post')" variant="outlined" /></div
              ></v-img>
            </v-card>
            <!-- <v-card>
              <v-img
                src="/images/userdashboard/add-question.png"
                :gradient="gradient"
                alt="add question image"
              >
                <div
                  class="text-text-light d-flex flex-column justify-end h-100 align-center pa-4"
                >
                  <p class="text-h3">
                    {{ $t("question_and_answer") }}
                  </p>
                  <p class="text-caption text-center mb-2">
                    {{ $t("question_and_answer_dashboard_description") }}
                  </p>
                  <v-btn :text="$t('question_and_answer')" variant="outlined" />
                </div>
              </v-img>
            </v-card> -->
          </div>
        </div>
      </v-container>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { useDisplay } from "vuetify";
const { t } = useI18n();
const route = useRoute();
let tabs = ref("posts");
const { lgAndUp, mdAndUp } = useDisplay();
const localePath = useLocalePath();
const gradient = "0deg,rgba(0, 0, 0, 0.6) 0%,rgba(0, 0, 0, 0.6) 100%";
const menu = ref([
  { title: "user_account", value: "user-account" },
  // { title: "rooms", value: "rooms" },
  { title: "courses", value: "courses" },
  { title: "comments", value: "comments" },
  { title: "posts", value: "posts" },
  // { title: "question_and_answer", value: "question-and-answer" },
  // { title: "announcement", value: "announcement" },
]);

const navigateToTab = () => {
  navigateTo(localePath({ name: `dashboard-${tabs.value}` }));
};
onMounted(() => {
  tabs.value = route.fullPath.split("/").pop();
});
definePageMeta({
  middleware: ["auth"],
  layout: false,
});


useHead(
  useHeadTags({
    title: t("user_dashboard"),
  })
);
</script>

<style lang="scss" scoped>
.gradient-card {
  height: 422px;
  &-post {
    background: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.6) 0%,
        rgba(0, 0, 0, 0.6) 100%
      ),
      url("../public/images/userdashboard/add-post.png"),
      lightgray 50% / cover no-repeat !important;
  }
  &-question {
    background: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.6) 0%,
        rgba(0, 0, 0, 0.6) 100%
      ),
      url("../public/images/userdashboard/add-question.png"),
      lightgray 50% / cover no-repeat !important;
  }
  background-size: cover !important;
  overflow: hidden;
}
</style>
