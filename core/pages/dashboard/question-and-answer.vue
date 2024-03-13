<template>
  <v-card :title="$t('questions')" class="px-6 py-4">
    <dashboard-menu
      v-model="tabs"
      :menu="menu"
      selected-class="text-high-emphasis"
      :grow="false"
    ></dashboard-menu>
    <v-window v-model="tabs" class="pa-4">
      <v-window-item value="myQuestions">
        <app-responsive-table
          ref="questionsList"
          :items="questions"
          v-model:page="payload.page"
          :table-actions="operations"
          :headers="myHeaders"
          @navigateTo:item="navigateToItem"
          :responsive-headers="responsiveHeaders"
          @update:page="getQuestions"
          :has-expansion-body="false"
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
          <template #author="{ item }">
            <div class="text-truncate">
              <span class="text-body-1">{{
                $t(item.item.author.displayName)
              }}</span>
            </div>
          </template>
        </app-responsive-table>
      </v-window-item>
      <v-window-item value="othersQuestions">
        <app-responsive-table
          ref="questionsList"
          :table-actions="operations"
          :items="answers"
          v-model:page="payload.page"
          @navigateTo:item="navigateToItem"
          :headers="othersHeaders"
          :responsive-headers="responsiveHeaders"
          @update:page="getQuestions"
          :has-expansion-body="false"
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
          <template #author="{ item }">
            <div class="text-truncate">
              <v-avatar
                :image="item.item.author.avatarUrl"
                size="24"
                class="me-2"
              />

              <span class="text-body-1">{{
                $t(item.item.author.displayName)
              }}</span>
            </div>
          </template></app-responsive-table
        >
      </v-window-item>
    </v-window>
  </v-card>
</template>
<script setup>
import { useSharedPanelStore } from "~/stores/sharedPanel";
const sharedStore = useSharedPanelStore();
const localePath = useLocalePath();
let questions = ref({});
let answers = ref({});
let questionsList = ref(null);
let tabs = ref(null);
const { t } = useI18n();
const { $repos } = useNuxtApp();
let page = ref(1);
let search = ref("");
let tabType = ref("my");
let operations;
const menu = ref([
  { title: "my_questions", value: "myQuestions" },
  { title: "others_questions", value: "othersQuestions" },
]);
let payload = ref({
  page: page.value,
  search: search.value,
  data: tabType.value,
});
const othersHeaders = ref([
  {
    align: "start",
    key: "author",
    sortable: false,
    title: t("author"),
    minWidth: "50px",
    maxWidth: "50px",
    headerProps: {
      class: "text-body-2 font-weight-bold text-text-low-emphasis",
    },
  },
  {
    align: "start",
    key: "qText",
    sortable: false,
    title: t("questionText"),
    minWidth: "75px",
    maxWidth: "100px",
    headerProps: {
      class: "text-body-2 font-weight-bold text-text-low-emphasis",
    },
  },
  {
    align: "start",
    key: "status",
    sortable: false,
    title: t("status"),
    minWidth: "75px",
    headerProps: {
      class: "text-body-2 font-weight-bold text-text-low-emphasis",
    },
  },
  {
    align: "start",
    key: "creationDate",
    sortable: false,
    title: t("time"),
    minWidth: "100x",
    headerProps: {
      class: "text-body-2 font-weight-bold text-text-low-emphasis",
    },
  },
  {
    key: "operation",
    title: t("operation"),
    size: "100px",
    headerProps: {
      class: "text-body-2 font-weight-bold text-text-low-emphasis",
    },
  },
]);

const myHeaders = ref([
  {
    align: "start",
    key: "qText",
    sortable: false,
    title: t("questionText"),
    minWidth: "75px",
    maxWidth: "100px",
    headerProps: {
      class: "text-body-2 font-weight-bold text-text-low-emphasis",
    },
  },
  {
    align: "start",
    key: "status",
    sortable: false,
    title: t("status"),
    minWidth: "75px",
    headerProps: {
      class: "text-body-2 font-weight-bold text-text-low-emphasis",
    },
  },
  {
    align: "start",
    key: "creationDate",
    sortable: false,
    title: t("time"),
    minWidth: "100x",
    headerProps: {
      class: "text-body-2 font-weight-bold text-text-low-emphasis",
    },
  },
  {
    key: "operation",
    title: t("operation"),
    size: "100px",
    headerProps: {
      class: "text-body-2 font-weight-bold text-text-low-emphasis",
    },
  },
]);

let responsiveHeaders = ref([
  "author.avatarUrl",
  "author.displayName",
  "qText",
  "status",
  "creationDate",
]);
const init = async () => {
  operations = ref([
    {
      title: "مشاهده‌ی پرسش",
      value: "edit",
      function: questionsList.value?.navigateToItem,
    },
  ]);
};
const getQuestions = () => {
  console.log("payload", payload.value);
  $repos.other.questionAndAnswers(payload.value).then((res) => {
    if (tabType.value == "my") Object.assign(questions.value, res);
    else Object.assign(answers.value, res);
  });
};
watch(
  tabs,
  (newTab) => {
    console.log(newTab);
    tabType.value = newTab == "myQuestions" ? "my" : "their";
    getQuestions();
  },
  { deep: true }
);
const navigateToItem = (e) => {
  navigateTo(localePath({ path: `/forum/question/${e.slug}` }), {
    external: true,
  });
};
onMounted(async () => {
  getQuestions();
  await nextTick();
  init();
});
</script>
