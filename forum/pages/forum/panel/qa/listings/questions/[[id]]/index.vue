<template>
  <NuxtLayout name="sidebar">
    <v-container fluid class="pa-8">
      <app-listing
        ref="questionList"
        :items="sharedStore.listItems"
        :headers="headers"
        :info="sharedStore.listInfo.counts"
        :store="sharedStore"
        listing-title="questions"
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
            'updateQuestionStatus',
            'questionsList',
            payload,
            'communityPanel'
          )
        "
        @update:page="
          sharedStore.getListingItems(
            'questionsList',
            payload,
            'communityPanel'
          )
        "
        default-status="waiting_for_approval"
        :table-actions="operations"
        @update:items="submitItem"
        @init:form="sharedStore.initForm(questionForm)"
        @edit="
          sharedStore.editListing(
            $event.action,
            questionForm,
            answerForm,
            $event.api,
            'questionsList',
            true,
            payload,
            'communityPanel'
          )
        "
        @navigate:toItem="goToItem"
        view-address="/article/category/"
        @filter="
          sharedStore.getListingItems(
            'questionsList',
            payload,
            'communityPanel'
          )
        "
      >
        <template #qText="{ item }">
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
                item.item.qText
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
        <template #answersCount="{ item, header }">
          <div
            :style="`width: ${header.header.size} !important; cursor:pointer`"
            @click="goToAnswers(item.item)"
          >
            {{ item.item.answersCount }}
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
let questionList = ref(null);
let operations;
let filters;
let headers = ref([
  {
    align: "start",
    key: "qText",
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
    key: "category",
    align: "start",
    title: t("category"),
    size: "50px",
    sortable: false,
  },
  {
    key: "answersCount",
    align: "end",
    title: t("answers_count"),
    sortable: true,
    size: "50px",
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
const UPLOAD_PATH = "/community/questions/attachment";
const { $repos } = useNuxtApp();
let questionForm = ref([
  {
    type: "text-area",
    name: "qText",
    modelValue: ref(""),
    validations: "required",
    validations: "required",
    label: "question",
    size: 12,
    rows: 6,
  },
  {
    type: "text-field",
    name: "slug",
    modelValue: ref(""),
    validations: "required",
    label: "slug",
    size: 12,
    hint: "به زبان انگلیسی و بدون فاصله نوشته شود.",
  },
  {
    type: "select",
    name: "category",
    modelValue: ref(""),
    selectValue: "id",
    validations: "required",
    items: computed(() => sharedStore.listInfo?.categories),
    label: "choose_category",
    size: 12,
    hint: false,
  },
  {
    type: "uploader",
    name: "attachments",
    multiple: true,
    maxImage: 3,
    title: "add_picture",
    uploadPath: UPLOAD_PATH,
    modelValue: [],
    size: 1,
    maxImage: 3,
    hasStartButton: false,
    validations: "required",
  },
]);
let answerForm = ref([
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
    modelValue: [],
    size: 1,
    maxImage: 3,
    hasStartButton: false,
    validations: "required",
  },
]);
const openDialog = () => {
  sharedStore.dialog = true;
  sharedStore.initForm(questionForm.value);
};
const onSearch = useDebounceFn(
  async () =>
    await sharedStore.getListingItems(
      "questionsList",
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
      function: questionList.value.edit,
      hasDialog: true,
      api: "",
      repo: "communityPanel",
    },
    {
      title: "حذف کردن",
      value: "deleted",
      icon: "custom:replyTo",
      function: questionList.value.changeItemStatus,
    },
    {
      title: "پنهان کردن",
      value: "hidden",
      function: questionList.value.changeItemStatus,
    },
    {
      title: "پاسخ به پرسش",
      value: "answer",
      function: questionList.value.edit,
      hasDialog: true,
      api: "",
      repo: "communityPanel",
    },
    {
      title: " تایید کردن",
      value: "approved",
      function: questionList.value.changeItemStatus,
      hasDialog: false,
    },
  ]);
  filters = ref([
    { type: "datePicker", title: "choose_date" },
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
    body: { ...body, id: sharedStore.currentItem.id },
  };
  if (sharedStore.edit) {
    let itemIndex = sharedStore.listItems.data.findIndex(
      (item) => item.id === sharedStore.currentItem.id
    );
    $repos.communityPanel.sendQuestion(payload).then((res) => {
      Object.assign(sharedStore.listItems.data[itemIndex], res);
      sharedStore.edit = false;
      sharedStore.closeDialog();
    });
  } else if (!sharedStore.edit && !sharedStore.additionalOperation) {
    $repos.communityPanel.sendQuestion(payload).then((res) => {
      Object.assign(sharedStore.listItems.data, [
        ...sharedStore.listItems.data,
        { ...res },
      ]);
      sharedStore.closeDialog();
    });
  } else {
    payload = {
      body: { ...body, id: 0, questionId: sharedStore.currentItem.id},
    };
    $repos.communityPanel.sendAnswer(payload).then((res) => {
      Object.assign(sharedStore.listItems.data, [
        ...sharedStore.listItems.data,
        { ...res },
      ]);
      sharedStore.closeDialog();
    });
  }
};
const goToItem = (item) => {
  console.log("eurwopeiruwioeruoweirhji", item);
  if (item.status == "approved") {
    navigateTo(
      localePath({
        path: `/forum/question/${item.slug}`,
      }),
      {
        external: true,
      }
    );
  }
};
const goToAnswers = (item) => {
  navigateTo(
    localePath({
      path: `/forum/panel/listings/answers`,
      query: { questionSlug: item.slug },
    }),
    {
      external: true,
    }
  );
};
onMounted(async () => {
  await sharedStore.getListingCommon("questionListCommon", "communityPanel");
  init();
  await sharedStore.getListingItems(
    "questionsList",
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
