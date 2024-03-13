<template>
  <NuxtLayout name="sidebar">
    <v-container fluid class="pa-8">
      <app-listing
        ref="studentsList"
        :items="store.listItems"
        :headers="headers"
        :info="store.listInfo.counts"
        :store="store"
        listing-title="students"
        :show-dialog="false"
        :add-new-item="false"
        v-model:page="payload.page"
        v-model:searchModel="payload.search"
        @update:searchModel="onSearch"
        @update:page="
          store.getListingItems('studentsList', payload, 'academyPanel')
        "
        default-status="active"
        :table-actions="operations"
        @init:form="store.initForm(dataForm)"
        @edit="certificates"
      >
        <template #displayName="{ item }">
          <div class="d-flex cursor-pointer">
            <div class="d-flex align-center" style="width: 200px; flex: 0 1 0%">
              <v-checkbox-btn
                true-icon="custom:squareCheck"
                false-icon="custom:square"
                :value="item.item"
                multiple
                v-model="store.selectedTableItems"
              >
              </v-checkbox-btn>
              <v-avatar class="me-2" size="32">
                <v-img :src="item.item.avatarUrl"> </v-img>
              </v-avatar>
              <span class="text-truncate text-body-1">{{
                item.item.displayName
              }}</span>
            </div>
          </div>
        </template>
        <template #status="{ item }">
          <div class="text-truncate" style="width: 80px">
            <v-icon
              icon="custom:dot"
              size="12"
              :class="store.statusColor(item.item.status)"
              class="me-2"
            />
            <span
              class="text-body-1"
              :class="store.statusColor(item.item.status)"
              >{{ $t(item.item.status) }}</span
            >
          </div>
        </template>
      </app-listing>
    </v-container>
  </NuxtLayout>
</template>

<script setup>
// import { useAcademyStore } from "@core/stores/academy";
import { useSharedPanelStore } from "~/stores/sharedPanel";
// const sharedStore = useSharedPanelStore();
let store = useSharedPanelStore();
const localePath = useLocalePath();
const { t } = useI18n();
let page = ref(1);
let studentsList = ref(null);
let operations;
let headers = ref([
  {
    align: "start",
    key: "displayName",
    sortable: false,
    title: t("display_name"),
    selectAll: true,
    size: "200px",
  },
  {
    align: "start",
    key: "role",
    sortable: false,
    title: t("user_type"),
    selectAll: false,
    size: "200px",
  },
  {
    align: "start",
    key: "necessary_count",
    sortable: true,
    title: t("necessary_count"),
    selectAll: false,
    size: "200px",
  },
  {
    align: "start",
    key: "done_count",
    sortable: true,
    title: t("done_count"),
    selectAll: false,
    size: "200px",
  },
  {
    align: "start",
    key: "progress_count",
    sortable: true,
    title: t("progress_count"),
    selectAll: false,
    size: "200px",
  },
  {
    align: "start",
    key: "bookmark_count",
    sortable: true,
    title: t("bookmark_count"),
    selectAll: false,
    size: "200px",
  },
  { key: "operation", title: t("operation"), size: "50px", sortable: false },
]);
let search = ref("");
let payload = computed(() => {
  return {
    page: page.value,
    search: search.value,
    sortKey: store.sortBy[0]?.key || "",
    sortOrder: store.sortBy[0]?.order || "",
  };
});
const { $repos } = useNuxtApp();
let dataForm = ref([
  {
    type: "text-field",
    name: "title",
    modelValue: ref(""),
    validations: "required",
    label: "title",
    size: 12,
    hint: "به زبان فارسی و بدون استفاده از هیچ کاراکتری نوشته شود.",
  },
  {
    type: "text-field",
    name: "description",
    modelValue: ref(""),
    size: 12,
    label: "related_descriptions",
  },
]);
const openDialog = () => {
  store.dialog = true;
  store.initForm(dataForm.value);
};
const onSearch = useDebounceFn(
  async () =>
    await store.getListingItems("studentsList", payload.value, "academyPanel"),
  1000,
  {
    maxWait: 5000,
  }
);
const init = () => {
  operations = ref([
    {
      title: "ویرایش",
      value: "certificate",
      function: studentsList.value.edit,
    },
  ]);
};
onMounted(() => {
  init();
  store.getListingCommon("studentsListCommon", "academyPanel");
  store.getListingItems("studentsList", payload.value, "academyPanel");
});
definePageMeta({
  middleware: ["auth"],
  layout: false,
});

const certificates = () => {
  navigateTo(localePath({ name: "academy-panel-listings-certificates" }));
};
</script>

<style></style>
