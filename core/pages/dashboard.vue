<template>
  <NuxtLayout name="default">
    <div class="bg-n100">
      <v-container>
        <dashboard-menu
          class="mb-4"
          v-model="tabs"
          @change:route="navigateToTab"
          :menu="menu"
          selected-class="text-secondary-base"
        ></dashboard-menu>
        <div class="d-flex">
          <v-window v-model="tabs" class="rounded-lg me-4" :class="lgAndUp?'w-75':'w-100'">
            <v-window-item :value="tabs">
              <NuxtPage />
            </v-window-item>
          </v-window>
          <div class="w-25 d-lg-block d-none">
            <v-card class="mb-4">
              <v-img
                src="/images/userdashboard/add-post.png"
                :gradient="gradient"
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
            <v-card>
              <v-img
                src="/images/userdashboard/add-question.png"
                :gradient="gradient"
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
            </v-card>
          </div>
        </div>
      </v-container>
    </div>
  </NuxtLayout>
</template>

<script setup>
let tabs = ref(null);
import { useDisplay } from "vuetify";

const { lgAndUp, mdAndUp } = useDisplay();
const localePath = useLocalePath();
const gradient = "0deg,rgba(0, 0, 0, 0.6) 0%,rgba(0, 0, 0, 0.6) 100%";
const menu = ref([
  { title: "user_account", value: "user-account" },
  { title: "rooms", value: "rooms" },
  { title: "courses", value: "courses" },
  { title: "learning_paths", value: "learning-paths" },
  { title: "comments", value: "comments" },
  { title: "posts", value: "posts" },
  { title: "question_and_answer", value: "question-and-answer" },
  { title: "announcement", value: "announcement" },
]);

const navigateToTab = () => {
  navigateTo(localePath({ name: `dashboard-${tabs.value}` }));
};
definePageMeta({
  middleware: ["auth"],
  layout: false,
});
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

