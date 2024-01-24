<template>
  <NuxtLayout name="sidebar">
    <v-container fluid class="pa-8">
      <app-listing
        ref="messagesList"
        :items="sharedStore.listItems"
        :headers="headers"
        :info="sharedStore.listInfo.counts"
        :store="sharedStore"
        :filters="filters"
        listing-title="requests"
        :show-dialog="true"
        hide-group-actions
        dialog-start-button-title="add_new_message"
        dialog-title=""
        save-dialog-title="change_status"
        v-model:page="payload.page"
        v-model:searchModel="payload.search"
        @update:searchModel="onSearch"
        @show:dialog="openDialog"
        @filter="
          sharedStore.getListingItems('messagesList', payload, 'sharedPanel')
        "
        :add-new-item="false"
        :selectable="false"
        dialog-subtitle=""
        @update:itemStatus="
          sharedStore.changeItemStatus(
            $event,
            'updateMessageStatus',
            'messagesList',
            payload,
            'sharedPanel'
          )
        "
        @update:page="
          sharedStore.getListingItems('messagesList', payload, 'sharedPanel')
        "
        default-status="active"
        :table-actions="operations"
        @update:items="submitItem"
        @init:form="sharedStore.initForm(dataForm)"
        @edit="
          sharedStore.editListing(
            'edit',
            dataForm,
            null,
            null,
            null,
            true,
            null
          )
        "
        @navigate:toItem="goToItem"
      >
        <template #formActions>
          <div></div>
        </template>
        <template #user="{ item }">
          <!-- <div class="d-flex align-center justify-start">
            <div>
              <v-checkbox-btn
                true-icon="custom:squareCheck"
                false-icon="custom:square"
                :value="item.item"
                multiple
                v-model="sharedStore.selectedTableItems"
              >
              </v-checkbox-btn>
            </div> -->
          <div>
            <v-avatar
              size="32"
              class="me-1"
              color="n100"
              :image="item?.item?.user?.profile?.avatarUrl"
            ></v-avatar>
            {{ item?.item?.user?.profile?.displayName }}
          </div>
          <!-- </div> -->
        </template>
        <template #mentor="{ item }">
          <div>
            <v-avatar
              size="32"
              class="me-1"
              color="n100"
              :image="item?.item?.mentor?.avatarUrl"
            ></v-avatar>
            {{ item?.item?.mentor?.displayName }}
          </div>
        </template>
        <template #progress="{ item }">
          <div>
            <v-icon
              icon="custom:dot"
              size="12"
              :class="sharedStore.statusColor(item.item.progress)"
              class="me-2"
            />
            <span
              class="text-body-1"
              :class="sharedStore.statusColor(item.item.progress)"
              >{{ $t(item.item.progress) }}</span
            >
          </div>
        </template>
        <template #category="{ item }">
          <span>{{ item?.item?.mentor?.category?.title || "-" }}</span>
        </template>
      </app-listing>
    </v-container>
  </NuxtLayout>
</template>

<script setup>
import { useSharedPanelStore } from "@core/stores/sharedPanel";
const sharedStore = useSharedPanelStore();
import { useFilterStore } from "@core/stores/filter";
import { ref } from "vue";
const filterStore = useFilterStore();
const localePath = useLocalePath();
const { t } = useI18n();
let page = ref(1);
let messagesList = ref(null);
let operations;
let filters;
let headers = ref([
  {
    align: "start",
    key: "user",
    sortable: false,
    title: t("requester"),
  },
  {
    key: "mentor",
    title: t("mentor"),
    sortable: true,
  },
  {
    key: "category",
    title: t("category"),
    sortable: true,
  },
  {
    key: "createAt",
    title: t("request_date"),
    sortable: true,
  },
  {
    key: "progress",
    title: t("progress"),
    sortable: false,
  },
  {
    key: "subject",
    title: t("subject"),
    sortable: true,
  },
  { key: "operation", title: t("operation"), size: "50px" },
]);
let search = ref("");
let payload = computed(() => {
  return {
    page: page.value,
    search: search.value,
    progress: filterStore.filter.progress || "",
    mentor: filterStore.filter.mentors || "",
    sortKey: sharedStore.sortBy[0]?.key || "",
    sortOrder: sharedStore.sortBy[0]?.order || "",
  };
});
const { $repos } = useNuxtApp();
let dataForm = ref([
  {
    type: "label",
    label: "mentor_info",
    modelValue: ref(""),
    color: "primary-base",
    size: 12,
    hint: "",
  },
  {
    type: "label",
    name: "displayName",
    modelValue: ref(""),
    validations: "",
    label: "display_name",
    size: 6,
    hint: false,
    readonly: true,
    dataPath: "mentor",
  },
  {
    type: "label",
    name: "title",
    modelValue: ref(""),
    validations: "",
    label: "category",
    size: 6,
    hint: false,
    readonly: true,
    dataPath: "mentor.category",
  },
  {
    type: "label",
    name: "mobile",
    modelValue: ref(""),
    validations: "",
    label: "mobile",
    size: 6,
    hint: false,
    readonly: true,
    dataPath: "mentor",
  },
  {
    type: "label",
    name: "email",
    modelValue: ref(""),
    validations: "",
    label: "email",
    size: 6,
    hint: false,
    readonly: true,
    dataPath: "mentor",
  },
  {
    type: "divider",
    size: 12,
  },
  {
    type: "label",
    modelValue: ref(""),
    label: "requester_info",
    size: 12,
    hint: false,
    color: "primary-base",
  },
  {
    type: "label",
    name: "displayName",
    modelValue: ref(""),
    validations: "",
    label: "display_name",
    size: 6,
    hint: false,
    readonly: true,
    dataPath: "user.profile",
  },
  {
    type: "label",
    name: "createAt",
    modelValue: ref(""),
    validations: "",
    label: "request_date",
    size: 6,
    hint: false,
    readonly: true,
  },
  {
    type: "label",
    name: "mobile",
    modelValue: ref(""),
    validations: "",
    label: "mobile",
    size: 6,
    hint: false,
    readonly: true,
    dataPath: "user.profile",
  },
  {
    type: "label",
    name: "email",
    modelValue: ref(""),
    validations: "",
    label: "email",
    size: 6,
    hint: false,
    readonly: true,
    dataPath: "user.profile",
  },
  // {
  //   type: "select",
  //   modelValue: ref(""),
  //   name: "progress",
  //   items: computed(() => sharedStore.listInfo?.progress),
  //   label: "status",
  //   size: 12,
  //   hint: false,
  // },
  {
    type: "text-area",
    name: "message",
    modelValue: ref(""),
    size: 12,
    hint: false,
    readonly: true,
    label: "message",
  },
]);
const openDialog = () => {
  sharedStore.dialog = true;
  sharedStore.initForm(dataForm.value);
};
const onSearch = useDebounceFn(
  async () =>
    await sharedStore.getListingItems(
      "messagesList",
      payload.value,
      "sharedPanel"
    ),
  1000,
  {
    maxWait: 5000,
  }
);
const init = () => {
  operations = ref([
    {
      title: "جزئیات",
      text: "جزئیات",
      hasDialog: true,
      function: messagesList.value.edit,
      value: "detail",
      props: { class: "text-light bg-secondary" },
    },
    {
      type: "select",
      title: "جزئیات",
      value: "progress",
      hasDialog: true,
      items: sharedStore.listInfo?.progress,
      function: messagesList.value.edit,
      onChange: ($event) =>
        sharedStore.changeItemStatus(
          $event,
          "updateMessageStatus",
          "messagesList",
          payload.value,
          "sharedPanel"
        ),
    },
  ]);
  filters = ref([
    {
      type: "dropdown",
      title: "mentors",
      items: computed(() => sharedStore.listInfo?.mentors),
      key: "displayName",
      value: "id",
    },
    {
      type: "dropdown",
      title: "progress",
      items: computed(() => sharedStore.listInfo?.progress),
    },
  ]);
};
const submitItem = () => {
  const progress = dataForm.value.find(
    (field) => field.name == "progress"
  ).modelValue;
  $repos.sharedPanel
    .updateMessageStatus({
      body: { progress, ids: [sharedStore.currentItem.id] },
    })
    .then(() => {
      sharedStore.getListingItems("messagesList", payload.value, "sharedPanel");
      sharedStore.closeDialog();
    });
};
const goToItem = () => {
  navigateTo(
    localePath({
      path: "/article/category/" + `${sharedStore.currentItem.slug}`,
    }),
    {
      external: true,
    }
  );
};
onMounted(async () => {
  await sharedStore.getListingCommon("messagesListCommon", "sharedPanel");
  init();
  await sharedStore.getListingItems(
    "messagesList",
    payload.value,
    "sharedPanel"
  );
});
definePageMeta({
  middleware: ["auth"],
  layout: false,
});
</script>

<style></style>
