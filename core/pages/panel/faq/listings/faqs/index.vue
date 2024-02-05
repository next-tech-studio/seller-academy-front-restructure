<template>
  <NuxtLayout name="sidebar">
    <v-container fluid class="pa-8">
      <app-listing
        ref="faqList"
        :items="sharedStore.listItems"
        :headers="headers"
        :info="sharedStore.listInfo.counts"
        :store="sharedStore"
        listing-title="frequently_asked_questions"
        :show-dialog="true"
        :add-new-item="true"
        dialog-start-button-title="add_new_question"
        :dialog-title="
          sharedStore.edit
            ? 'edit_question'
            : sharedStore.additionalOperation
            ? 'add_new_answer'
            : 'add_new_question'
        "
        :dialog-subtitle="
          sharedStore.additionalOperation
            ? 'add_new_answer_description'
            : 'add_new_question_description'
        "
        v-model:page="payload.page"
        v-model:searchModel="payload.search"
        @update:searchModel="onSearch"
        :filters="filters"
        @show:dialog="openDialog"
        slug-generator-title="qText"
        @update:itemStatus="
          sharedStore.changeItemStatus(
            $event,
            'updateFAQStatus',
            'faqsList',
            payload,
            'sharedPanel'
          )
        "
        @update:page="
          sharedStore.getListingItems('faqsList', payload, 'sharedPanel')
        "
        default-status="active"
        :table-actions="operations"
        @update:items="submitItem"
        @init:form="sharedStore.initForm(questionForm)"
        @edit="
          sharedStore.editListing(
            $event.action,
            questionForm,
            answerForm,
            $event.api,
            'faqsList',
            true,
            payload,
            'sharedPanel'
          )
        "
        @navigate:toItem="goToItem"
        view-address="/article/category/"
        @filter="
          sharedStore.getListingItems('faqsList', payload, 'sharedPanel')
        "
      >
        <template #question="{ item }">
          <div class="d-flex cursor-pointer" @click="goToItem(item.item)">
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
                item.item.question
              }}</span>
            </div>
          </div>
        </template>
        <template #status="{ item, header }">
          <div
            class="text-truncate"
            :class="sharedStore.statusColor(item.item.status)"
            :style="`width: ${header.header.size} !important`"
          >
            <v-icon icon="custom:dot" size="12" class="me-2" />
            <span class="text-body-1">{{ $t(item.item.status) }}</span>
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
let faqList = ref(null);
let operations;
let filters;
let headers = ref([
  {
    align: "start",
    key: "question",
    sortable: false,
    title: t("question"),
    selectAll: true,
    size: "200px",
  },
  {
    key: "answer",
    align: "start",
    title: t("answer"),
    size: "120px",
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
    key: "category",
    align: "start",
    title: t("category"),
    size: "50px",
    sortable: false,
  },
  { key: "status", title: t("status"), sortable: false, size: "120px" },
  { key: "operation", title: t("operation"), size: "50px" },
]);
let search = ref("");
let payload = computed(() => {
  return {
    page: page.value,
    category: filterStore.filter?.categories || "",
    status: filterStore.filter?.status || "",
    search: search.value,
    publicationDateMax: filterStore.filter?.publicationDateMax || "",
    publicationDateMin: filterStore.filter?.publicationDateMin || "",
    sortKey: sharedStore.sortBy[0]?.key || "",
    sortOrder: sharedStore.sortBy[0]?.order || "",
  };
});

const { $repos } = useNuxtApp();
let questionForm = ref([
  {
    type: "text-area",
    name: "question",
    modelValue: ref(""),
    validations: "required",
    label: "question",
    size: 12,
    rows: 6,
  },
  {
    type: "text-area",
    name: "answer",
    modelValue: ref(""),
    validations: "required",
    label: "answer",
    size: 12,
    rows: 6,
  },
  {
    type: "select",
    name: "categoryId",
    modelValue: ref(""),
    selectValue: "id",
    validations: "required",
    items: computed(() => sharedStore.listInfo?.categories),
    label: "choose_category",
    size: 12,
    hint: false,
  },
  {
    type: "checkbox",
    name: "isFrequent",
    modelValue: ref(""),
    label: "is_this_faq_frequent_in_this_category",
    size: 12,
    rows: 6,
  },
]);
const openDialog = () => {
  sharedStore.dialog = true;
  sharedStore.initForm(questionForm.value);
};
const onSearch = useDebounceFn(
  async () =>
    await sharedStore.getListingItems("faqsList", payload.value, "sharedPanel"),
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
      function: faqList.value.edit,
      hasDialog: true,
      api: "",
      repo: "sharedPanel",
    },
    {
      title: "حذف کردن",
      value: "deleted",
      icon: "custom:replyTo",
      function: faqList.value.changeItemStatus,
    },
    {
      title: "پنهان کردن",
      value: "hidden",
      function: faqList.value.changeItemStatus,
    },
  ]);
  filters = ref([
    {
      type: "dropdown",
      title: "categories",
      items: sharedStore.listInfo?.categories,
      key: "title",
      value: "slug",
    },
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
  let body = {};

  sharedStore.editForm.forEach((field) => {
    body[field.name] = sharedStore.editForm.find(
      (item) => item.name === field.name
    )?.modelValue;
  });
  if (body.attachments)
    body.attachments = body.attachments.map((item) => item.id);
  payload = {
    body: { ...body, id: sharedStore.currentItem.id || 0 },
  };
  if (sharedStore.edit) {
    let itemIndex = sharedStore.listItems.data.findIndex(
      (item) => item.id === sharedStore.currentItem.id
    );

    $repos.sharedPanel.updateFAQ(payload).then((res) => {
      Object.assign(sharedStore.listItems.data[itemIndex], res.data);
      sharedStore.edit = false;
      sharedStore.closeDialog();
    });
  } else {
    $repos.sharedPanel.updateFAQ(payload).then((res) => {
      Object.assign(sharedStore.listItems.data, [
        ...sharedStore.listItems.data,
        { ...res.data },
      ]);
      sharedStore.closeDialog();
    });
  }
};
onMounted(async () => {
  await sharedStore.getListingCommon("faqsListCommon", "sharedPanel");
  init();
  await sharedStore.getListingItems("faqsList", payload.value, "sharedPanel");
});
definePageMeta({
  middleware: ["auth"],
  layout: false,
});
</script>

<style></style>
