<template>
  <v-card :title="$t('comments')" class="px-6 py-4">
    <dashboard-menu
      v-model="tabs"
      :menu="menu"
      selected-class="text-high-emphasis"
      :grow="false"
    ></dashboard-menu>
    <v-window v-model="tabs" class="pa-4">
      <v-window-item value="myComments">
        <app-responsive-table
          ref="commentsList"
          :items="myComments"
          v-model:page="payload.page"
          :table-actions="operations"
          :headers="headers"
          @navigateTo:item="navigateToItem"
          :responsive-headers="responsiveHeaders"
          @update:page="getComments"
        >
          <template #status="{ item }">
            <div class="text-truncate">
              <v-icon
                icon="custom:dot"
                size="12"
                :class="sharedStore.statusColor(item.item.status)"
                class="me-2"
              />
              <span
                class="text-body-1"
                :class="sharedStore.statusColor(item.item.status)"
                >{{ $t(item.item.status) }}</span
              >
            </div>
          </template>
          <template #article="{ item }">
            <div class="text-truncate">
              <span class="text-body-1">{{ $t(item.item.article.title) }}</span>
            </div>
          </template>
        </app-responsive-table>
      </v-window-item>
      <v-window-item value="othersComments">
        <app-responsive-table
          ref="commentsList"
          :table-actions="operations"
          :items="othersComments"
          v-model:page="payload.page"
          :headers="headers"
          @navigateTo:item="navigateToItem"
          @update:page="getComments"
        >
          <template #status="{ item }">
            <div class="text-truncate">
              <v-icon
                icon="custom:dot"
                size="12"
                :class="sharedStore.statusColor(item.item.status)"
                class="me-2"
              />
              <span
                class="text-body-1"
                :class="sharedStore.statusColor(item.item.status)"
                >{{ $t(item.item.status) }}</span
              >
            </div>
          </template>
          <template #article="{ item }">
            <div class="text-truncate">
              <span class="text-body-1">{{ $t(item.item.article.title) }}</span>
            </div>
          </template></app-responsive-table
        >
      </v-window-item>
    </v-window>
  </v-card>
</template>
<script setup>
import { useSharedPanelStore } from "@core/stores/sharedPanel";
const sharedStore = useSharedPanelStore();
const localePath = useLocalePath();
let myComments = ref({});
let othersComments = ref({});
let commentsList = ref(null);
let tabs = ref(null);
const { t } = useI18n();
const { $repos } = useNuxtApp();
let page = ref(1);
let search = ref("");
let tabType = ref("my");
let operations;
const menu = ref([
  { title: "my_comments", value: "myComments" },
  { title: "others_comments", value: "othersComments" },
]);
let payload = computed(() => {
  return {
    page: page.value,
    search: search.value,
    data: tabType.value,
  };
});
const headers = ref([
  {
    align: "start",
    key: "title",
    sortable: false,
    title: t("title"),
    minWidth: "250px",
  },
  {
    align: "start",
    key: "article",
    sortable: false,
    title: t("relatedArticle"),
    minWidth: "100x",
  },
  {
    align: "start",
    key: "status",
    sortable: false,
    title: t("status"),
    minWidth: "100x",
  },
  {
    align: "start",
    key: "createdAt",
    sortable: false,
    title: t("time"),
    minWidth: "100x",
  },
  { key: "operation", title: t("operation"), size: "100px" },
]);
let responsiveHeaders = ref([
  "author.avatarUrl",
  "author.displayName",
  "title",
  "article.title",
  "status",
  "creationDate",
]);
const init = async () => {
  operations = ref([
    {
      title: "مشاهده‌ی پست",
      value: "edit",
      function: commentsList.value?.navigateToItem,
    },
  ]);
};
const getComments = async () => {
  console.log(tabType.value);
  await $repos.other.comments(payload.value).then((res) => {
    if (tabType.value == "my") Object.assign(myComments.value, res);
    else Object.assign(othersComments.value, res);
  });
};
const navigateToItem = (e) => {
  navigateTo(localePath({ path: `/${e.type}/${e.slug}` }), {
    external: true,
  });
};
watch(
  tabs,
  (newValue) => {
    console.log(newValue);
    tabType.value = newValue == "myComments" ? "my" : "their";
    getComments();
  },
  { deep: true }
);
onMounted(async () => {
  getComments();
  await nextTick();
  init();
});
</script>
