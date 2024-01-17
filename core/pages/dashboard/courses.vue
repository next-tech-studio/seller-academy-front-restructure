<template>
  <v-card :title="$t('your_courses')">
    <dashboard-menu
      v-model="tabs"
      :menu="menu"
      selected-class="text-high-emphasis"
      :grow="false"
    ></dashboard-menu>
    <v-window v-model="tabs" class="pa-4">
      <v-window-item value="necessary">
        <app-card-horizontal
          v-for="(item, index) in necessary"
          :key="index"
          :item="item"
          variant="text"
        >
          <template #actions>
            <div class="d-flex flex-column align-center">
              <p class="text-body-1 text-text-heading">
                {{ $t("resolve_account_suspension") }}
              </p>
              <v-btn
                :block="!lgAndUp"
                class="mt-3 text-button"
                width="168"
                variant="flat"
                color="primary-base"
                >{{ $t("go_to_course") }}</v-btn
              >
            </div>
          </template>
        </app-card-horizontal>
      </v-window-item>
      <v-window-item value="inProgress">
        <app-card-horizontal
          v-for="(item, index) in inProgress"
          :key="index"
          :item="item"
          variant="text"
        ></app-card-horizontal>
      </v-window-item>
      <v-window-item value="done">
        <app-card-horizontal
          v-for="(item, index) in done"
          :key="index"
          :item="item"
          variant="text"
        ></app-card-horizontal>
      </v-window-item>
      <v-window-item value="bookmark">
        <app-card-horizontal
          v-for="(item, index) in bookmark"
          :key="index"
          :item="item"
          variant="text"
        ></app-card-horizontal>
      </v-window-item>
    </v-window>
  </v-card>
</template>
<script setup>
import { useSharedPanelStore } from "@core/stores/sharedPanel";
import { useDisplay } from "vuetify";
const sharedStore = useSharedPanelStore();
const localePath = useLocalePath();
const { mdAndUp, lgAndUp } = useDisplay();
let necessary = ref({});
let inProgress = ref({});
let done = ref({});
let bookmark = ref({});
let tabs = ref(null);
const { $repos } = useNuxtApp();
let page = ref(1);
let search = ref("");
let tabType = ref("necessary");
const menu = ref([
  { title: "necessary", value: "necessary" },
  { title: "in_progress", value: "inProgress" },
  { title: "done", value: "done" },
  { title: "bookmarked_courses", value: "bookmark" },
]);
let payload = computed(() => {
  return { page: page.value, search: search.value, data: tabType.value };
});
const getCourses = () => {
  console.log("courses", payload.value);
  $repos.other.courses(payload.value).then((res) => {
    if (tabType.value == "necessary") Object.assign(necessary.value, res.data);
    else if (tabType.value == "inProgress")
      Object.assign(inProgress.value, res.data);
    else if (tabType.value == "done") Object.assign(done.value, res.data);
    else Object.assign(bookmark.value, res.data);
  });
};
watch(
  tabs,
  (newTab) => {
    console.log(newTab);
    tabType.value =
      newTab == "necessary"
        ? "necessary"
        : newTab == "inProgress"
        ? "inProgress"
        : newTab == "done"
        ? "done"
        : "bookmark";
    console.log("kdkdkdkdk", tabType.value);
    getCourses();
  },
  { deep: true }
);
const navigateToItem = (e) => {
  navigateTo(localePath({ path: `/forum/question/${e.slug}` }), {
    external: true,
  });
};
onMounted(() => {
  getCourses();
});
</script>
