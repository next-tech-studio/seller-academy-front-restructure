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
        :dialog-title="sharedStore.edit? 'edit_category':'add_new_category'"
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
            'categoryList',
            payload,
            'panel'
          )
        "
        @update:page="
          sharedStore.getListingItems('categoryList', payload,'panel')
        "
        default-status="active"
        :table-actions="operations"
        @update:items="submitItem"
        @init:form="sharedStore.initForm(dataForm)"
        @edit="
          sharedStore.editListing('edit', dataForm, null, null, null, true, null)
        "
        @navigate:toItem="goToItem"
        @filter="
          sharedStore.getListingItems(
            'categoryList',
            payload,
            'panel'
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
import {useSharedPanelStore} from "@core/stores/sharedPanel";
const sharedStore = useSharedPanelStore();
import { useFilterStore } from "@core/stores/filter";
let filterStore = useFilterStore();
const localePath = useLocalePath();
const { t } = useI18n();
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
    key: "articleCount",
    title: t("articleCount"),
    sortable: false,
    size: "50px",
  },
  { key: "status", title: t("status"), sortable: false, size: "50px" },
  { key: "viewsCount", title: t("viewsCount"), size: "50px" },
  { key: "commentsCount", title: t("commentsCount"), size: "50px" },
  { key: "bookmarksCount", title: t("bookmarksCount"), size: "50px" },
  { key: "operation", title: t("operation"), size: "50px" },
]);
let search = ref("");
let payload = computed(() => {
  return {
    page: page.value,
    search: search.value,
    status: filterStore.filter.status || "",
    sortKey: sharedStore.sortBy[0]?.key || "",
    sortOrder: sharedStore.sortBy[0]?.order || ""
    
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
    hint:true
  },
]);
const openDialog = () => {
  sharedStore.dialog = true;
  sharedStore.initForm(dataForm.value);
};
const onSearch = useDebounceFn(
  async () =>
    await sharedStore.getListingItems(
      "categoryList",
      payload.value,
      "panel"
    ),
  1000,
  {
    maxWait: 5000,
  }
);
const init = () => {
  operations = ref([
    { title: "ویرایش", value: "edit",hasDialog:true, function: categoryList.value.edit },
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
  let formTitle = sharedStore.editForm.find((item) => item.name === "title");
  let formSlug = sharedStore.editForm.find((item) => item.name === "slug");
  let formDescription = sharedStore.editForm.find(
    (item) => item.name === "description"
  );
  if (sharedStore.edit) {
    let itemIndex = sharedStore.listItems.data.findIndex(
      (item) => item.id === sharedStore.currentItem.id
    );
    payload = {
      body: {
        id: sharedStore.currentItem.id,
        title: formTitle.modelValue,
        slug: formSlug.modelValue,
        description: formDescription.modelValue,
        status: sharedStore.currentItem.status,
      },
    };
    $repos.panel.updateCategory(payload).then((res) => {
      Object.assign(sharedStore.listItems.data[itemIndex], res);
      sharedStore.edit = false;
      sharedStore.closeDialog();
    });
  } else {
    payload = {
      body: {
        id:0,
        title: formTitle.modelValue,
        slug: formSlug.modelValue,
        description: formDescription.modelValue,
        status:'active'
      },
    };
    $repos.panel.updateCategory(payload).then((res) => {
      Object.assign(sharedStore.listItems.data, [
        ...sharedStore.listItems.data,
        { ...res },
      ]);
      sharedStore.closeDialog();
    });
  }
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
onMounted(() => {
  init();
  sharedStore.getListingCommon("categoryListCommon", "panel");
  sharedStore.getListingItems(
    "categoryList",
    payload.value,
    "panel"
  );
});
definePageMeta({
  middleware: ["auth"],
  layout: false,
});
</script>

<style></style>
