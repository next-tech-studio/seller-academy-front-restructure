<template>
  <NuxtLayout name="sidebar">
    <v-container fluid class="pa-8">
      <app-listing
        ref="answersList"
        :items="sharedStore.listItems"
        :headers="headers"
        :info="sharedStore.listInfo.counts"
        :store="sharedStore"
        listing-title="answers"
        :show-dialog="true"
        :add-new-item="false"
        dialog-start-button-title="add_new_question"
        dialog-title="edit_answer"
        dialog-subtitle="add_new_answer_description"
        v-model:page="payload.page"
        v-model:searchModel="payload.search"
        @update:searchModel="onSearch"
        :filters="filters"
        :group-actions="groupActions"
        @show:dialog="openDialog"
        view-address="/forum/"
        @update:itemStatus="
          sharedStore.changeItemStatus(
            $event,
            'updateAnswerStatus',
            'answersList',
            payload,
            'communityPanel'
          )
        "
        @update:page="
          sharedStore.getListingItems('answersList', payload, 'communityPanel')
        "
        default-status="waiting_for_approval"
        :table-actions="operations"
        @update:items="submitItem"
        @init:form="sharedStore.initForm(dataForm)"
        @edit="
          sharedStore.editListing(
            $event.action,
            dataForm,
            null,
            $event.api,
            'answersList',
            $event.hasDialog,
            payload,
            'communityPanel'
          )
        "
        @navigate:toItem="goToItem"
        @filter="
          sharedStore.getListingItems('answersList', payload, 'communityPanel')
        "
      >
        <template #aText="{ item }">
          <div class="d-flex cursor-pointer">
            <div class="d-flex align-center" style="width: 200px; flex: 0 1 0%">
              <v-checkbox-btn
                true-icon="custom:squareCheck"
                false-icon="custom:square"
                :value="item.item"
                multiple
                v-model="sharedStore.selectedTableItems"
              >
              </v-checkbox-btn>
              <span class="text-truncate text-body-1">{{
                item.item.aText
              }}</span>
            </div>
          </div>
        </template>
        <template #status="{ item, header }">
          <div
            class="text-truncate"
            :style="`width: ${header.header.size} !important`"
          >
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
        <template #question="{ item }">
          <div style="direction: ltr">{{ item.item.question }}</div>
        </template>
        <template #likesCount="{ item, header }">
          <div
            class="d-flex"
            :style="`width: ${header.header.size} !important`"
          >
            <v-icon
              icon="custom:like"
              color="icon-hint-success"
              class="me-3"
            ></v-icon>
            <div v-if="item.item.likesCount != null">
              {{ item.item.likesCount }}
            </div>
            <div v-else>0</div>
          </div>
        </template>
        <template #author="{ item }">
          <div class="d-flex cursor-pointer">
            <v-avatar class="me-2" size="32">
              <v-img :src="item.item.author.avatarUrl"> </v-img>
            </v-avatar>
            <span class="text-truncate text-body-1">{{
              item.item.author.displayName
            }}</span>
          </div>
        </template>
        <template #creationDate="{ item, header }">
          <div
            style="direction: ltr"
            :style="`width: ${header.header.size} !important`"
            class="text-end text-body-1"
          >
            {{ item.item.creationDate }}
          </div>
        </template>
        <template #category="{ item }">
          <span class="text-truncate text-body-1">{{
            item.item.category.title
          }}</span>
        </template>
        <template #dislikesCount="{ item, header }">
          <div
            class="d-flex"
            :style="`width: ${header.header.size} !important`"
          >
            <v-icon
              icon="custom:dislike"
              color="text-primary"
              class="me-3"
            ></v-icon>
            <div v-if="item.item.dislikesCount != null">
              {{ item.item.dislikesCount }}
            </div>
            <div v-else>0</div>
          </div>
        </template>
      </app-listing>
    </v-container>
  </NuxtLayout>
</template>

<script setup>
import { useSharedPanelStore } from "@core/stores/sharedPanel";
import { useFilterStore } from "@core/stores/filter";
const filterStore = useFilterStore();
const sharedStore = useSharedPanelStore();
const localePath = useLocalePath();
const { t } = useI18n();
let page = ref(1);
let answersList = ref(null);
let operations;
let filters;
let groupActions;
let headers = ref([
  {
    align: "start",
    key: "aText",
    sortable: false,
    title: t("title"),
    selectAll: true,
    size: "200px",
  },
  {
    key: "author",
    align: "end",
    title: t("author"),
    size: "50px",
    sortable: false,
  },
  {
    key: "creationDate",
    align: "end",
    title: t("creation_date"),
    size: "120px",
    sortable: false,
  },
  {
    key: "question",
    align: "end",
    title: t("question"),
    size: "200px",
    sortable: false,
  },
  { key: "status", title: t("status"), sortable: false, size: "120px" },
  {
    key: "likesCount",
    align: "end",
    title: t("likes_count"),
    size: "50px",
    sortable: false,
  },
  {
    key: "dislikesCount",
    align: "end",
    title: t("dislikes_count"),
    size: "50px",
    sortable: false,
  },

  { key: "operation", title: t("operation"), size: "50px", sortable: false },
]);
let search = ref("");
const route = useRoute();
let payload = computed(() => {
  return {
    page: page.value,
    category: filterStore.filter?.categories || "",
    status: filterStore.filter?.status || "",
    search: search.value,
    sortKey: sharedStore.sortBy[0]?.key || "",
    sortOrder: sharedStore.sortBy[0]?.order || "",
    creationDateMax: filterStore.filter?.publicationDateMax || "",
    creationDateMin: filterStore.filter?.publicationDateMin || "",
    questionSlug: route.query.questionSlug || "",
  };
});
const UPLOAD_PATH = "/community/questions/attachment";
const { $repos } = useNuxtApp();
let dataForm = ref([
  {
    type: "text-area",
    name: "aText",
    modelValue: ref(""),
    validations: "required",
    label: "answer",
    size: 12,
    rows: 6,
  },
  {
    type: "uploader",
    name: "attachments",
    multiple: true,
    title: "add_picture",
    uploadPath: UPLOAD_PATH,
    modelValue: ref([]),
    size: 1,
    maxImage: 3,
    hasStartButton: false,
    validations: "required",
  },
]);
const openDialog = () => {
  sharedStore.dialog = true;
  sharedStore.initForm(dataForm.value);
};
const onSearch = useDebounceFn(
  async () =>
    await sharedStore.getListingItems(
      "answersList",
      payload.value,
      "communityPanel"
    ),
  1000,
  {
    maxWait: 5000,
  }
);
const init = () => {
  operations = ref([
    {
      title: "ویرایش",
      value: "edit",
      function: answersList.value.edit,
      hasDialog: true,
      api: "",
    },
    {
      title: "پنهان کردن",
      value: "hidden",
      function: answersList.value.changeItemStatus,
    },
    {
      title: " تایید کردن",
      value: "approved",
      function: answersList.value.changeItemStatus,
      hasDialog: false,
    },
  ]);
  groupActions = ref([
    { title: " پنهان کردن", value: "hidden" },
    { title: "منتشر کردن", value: "approved" },

  ]);
  filters = ref([
    { type: "datePicker", title: "choose_date" },
    // {
    //   type: "dropdown",
    //   title: "categories",
    //   items: sharedStore.listInfo?.categories,
    //   key: "title",
    //   value: "slug",
    // },
    {
      type: "dropdown",
      title: "status",
      items: sharedStore.listInfo?.status,
      key: null,
      value: null,
      icon: "custom:dot",
    },
  ]);
};
const submitItem = () => {
  let payload;
  let aText = sharedStore.editForm.find((item) => item.name === "aText");
  let attachments = sharedStore.editForm.find(
    (item) => item.name === "attachments"
  );
  let itemIndex = sharedStore.listItems.data.findIndex(
    (item) => item.id === sharedStore.currentItem.id
  );
  payload = {
    body: {
      id: sharedStore.currentItem.id,
      aText: aText.modelValue,
      questionId: sharedStore.currentItem.id,
      attachments: attachments.modelValue
        ? attachments?.modelValue.map((item) => item.url)
        : [],
    },
  };
  $repos.communityPanel.sendAnswer(payload).then((res) => {
    Object.assign(sharedStore.listItems.data[itemIndex], res.data);
    sharedStore.edit = false;
    sharedStore.closeDialog();
  });
};
const goToItem = () => {
  navigateTo(
    localePath({
      path: "/forum/panel/listings/answers",
    }),
    {
      external: true,
    }
  );
};
onMounted(async () => {
  await sharedStore.getListingCommon("answersListCommon", "communityPanel");
  init();
  await sharedStore.getListingItems(
    "answersList",
    payload.value,
    "communityPanel"
  );
});

definePageMeta({
  middleware: ["auth"],
  layout: false,
});
</script>

<style></style>
