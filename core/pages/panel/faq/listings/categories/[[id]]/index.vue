<template>
  <NuxtLayout name="sidebar">
    <v-container fluid class="pa-8">
      <app-listing
        ref="categoryList"
        :items="sharedStore.listItems"
        :headers="headers"
        :info="sharedStore.listInfo.counts"
        :store="sharedStore"
        :filters="filters"
        listing-title="categories"
        :show-dialog="true"
        :add-new-item="true"
        dialog-start-button-title="add_new_category"
        :dialog-title="sharedStore.edit ? 'edit_category' : 'add_new_category'"
        v-model:page="payload.page"
        v-model:searchModel="payload.search"
        @update:searchModel="onSearch"
        @show:dialog="openDialog"
        dialog-subtitle="add_new_category_description"
        view-address="/article/category/"
        @update:itemStatus="
          sharedStore.changeItemStatus(
            $event,
            'updateCategoryStatus',
            'categoriesList',
            payload,
            'communityPanel'
          )
        "
        @update:page="
          sharedStore.getListingItems(
            'categoriesList',
            payload,
            'communityPanel'
          )
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
        @filter="
          sharedStore.getListingItems(
            'categoriesList',
            payload,
            'communityPanel'
          )
        "
      >
        <template #status="{ item }">
          <div class="text-truncate" style="width: 80px">
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
      </app-listing>
    </v-container>
  </NuxtLayout>
</template>

<script setup>
import { useSharedPanelStore } from "~/stores/sharedPanel";
const sharedStore = useSharedPanelStore();
import { useFilterStore } from "~/stores/filter";
let filterStore = useFilterStore();
const localePath = useLocalePath();
const { t } = useI18n();
const UPLOAD_PATH = "/panel/articles/inline_media";
let page = ref(1);
let filters;
let categoryList = ref(null);
let operations;
let headers = ref([
  {
    align: "start",
    key: "title",
    sortable: false,
    title: t("title"),
    selectAll: true,
    size: "250px",
  },
  { key: "slug", title: t("slug"), sortable: false, size: "100px" },
  {
    key: "description",
    title: t("description"),
    sortable: true,
    size: "100px",
  },
  {
    key: "questionsCount",
    title: t("related_questions_count"),
    sortable: false,
    size: "50px",
  },
  { key: "status", title: t("status"), sortable: false, size: "50px" },
  { key: "viewsCount", title: t("viewsCount"), size: "50px" },
  { key: "operation", title: t("operation"), size: "50px", sortable: false },
]);
let search = ref("");
let payload = computed(() => {
  return {
    page: page.value,
    search: search.value,
    status: filterStore.filter.status || "",
    sortKey: sharedStore.sortBy[0]?.key || "",
    sortOrder: sharedStore.sortBy[0]?.order || "",
    type: "faq",
  };
});
const { $repos } = useNuxtApp();
let dataForm = ref([
  {
    type: "uploader",
    name: "avatarUrl",
    uploadPath: UPLOAD_PATH,
    modelValue: ref({}),
    size: 1,
    multiple: false,
    maxImage: 1,
    validations: "required",
    hasStartButton: true,
    roundImages: "md",
  },
  {
    type: "text-field",
    name: "title",
    modelValue: ref(""),
    validations: "required",
    label: "title",
    size: 11,
    hint: "به زبان فارسی و بدون استفاده از هیچ کاراکتری نوشته شود.",
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
    type: "text-field",
    name: "description",
    modelValue: ref(""),
    size: 12,
    label: "related_descriptions",
    hint: true,
  },
]);
const openDialog = () => {
  sharedStore.dialog = true;
  sharedStore.initForm(dataForm.value);
};
const onSearch = useDebounceFn(
  async () =>
    await sharedStore.getListingItems(
      "categoriesList",
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
      hasDialog: true,
      function: categoryList.value.edit,
    },
    {
      title: "حذف کردن",
      value: "deleted",
      function: categoryList.value.changeItemStatus,
    },
    {
      title: "پنهان کردن",
      value: "hidden",
      function: categoryList.value.changeItemStatus,
    },
  ]);
  filters = ref([
    {
      type: "dropdown",
      title: "status",
      items: computed(() => sharedStore.listInfo?.status),
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
  if (body.avatarUrl) body.avatarUrl = body.avatarUrl.url;
  payload = {
    body: { ...body, id: sharedStore.currentItem.id || 0, status: "active" },
    type: "faq",
  };
  if (sharedStore.edit) {
    let itemIndex = sharedStore.listItems.data.findIndex(
      (item) => item.id === sharedStore.currentItem.id
    );
    $repos.communityPanel.updateCategory(payload).then((res) => {
      Object.assign(sharedStore.listItems.data[itemIndex], res);
      sharedStore.edit = false;
      sharedStore.closeDialog();
    });
  } else {
    $repos.communityPanel.updateCategory(payload).then((res) => {
      Object.assign(sharedStore.listItems.data, [
        { ...res.data },
        ...sharedStore.listItems.data,
      ]);
      sharedStore.closeDialog();
    });
  }
};
const goToFaq = (item) => {
  navigateTo(
    localePath({
      path: `/panel/faq/listings/faqs`,
      query: { questionSlug: item.slug },
    }),
    {
      external: true,
    }
  );
};
onMounted(() => {
  init();
  sharedStore.getListingCommon("categoriesListCommon", "communityPanel", {
    type: "faq",
  });
  sharedStore.getListingItems(
    "categoriesList",
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
