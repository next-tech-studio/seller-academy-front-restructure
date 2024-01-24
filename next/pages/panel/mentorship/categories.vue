<template>
  <NuxtLayout name="sidebar">
    <v-container fluid class="pa-8">
      <app-listing
        ref="categoryList"
        :items="sharedStore.listItems"
        :headers="headers"
        :info="sharedStore.listInfo.counts"
        :store="sharedStore"
        listing-title="categories"
        :show-dialog="true"
        :add-new-item="true"
        dialog-start-button-title="add_new_category"
        :dialog-title="sharedStore.edit?'edit_category':'add_new_category'"
        :group-actions="groupActions"
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
            'sharedPanel'
          )
        "
        @update:page="
          sharedStore.getListingItems('categoryList', payload, 'sharedPanel')
        "
        default-status="deactive"
        :table-actions="operations"
        @update:items="submitItem"
        @init:form="sharedStore.initForm(dataForm)"
        @edit="
          sharedStore.editListing('edit', dataForm, null, null, null, true, null)
        "
        @navigate:toItem="goToItem"
      >
        <template #status="{ item }">
          <div>
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
const filterStore = useFilterStore();
const localePath = useLocalePath();
const { t } = useI18n();
let page = ref(1);
let categoryList = ref(null);
let operations;
let groupActions = ref([
  { title: "فعال کردن", value: "active" },
  { title: "غیرفعال کردن", value: "deactive" },
]);
let headers = ref([
  {
    align: "start",
    key: "title",
    sortable: false,
    title: t("title"),
    selectAll: true,
    size: "150px",
  },
  { key: "slug", title: t("slug"), sortable: false, size: "100px" },
  {
    key: "description",
    title: t("description"),
    sortable: true,
    size: "200px",
  },
  { key: "mentorCount", title: t("mentors_count"), sortable: false, size: "50px" },
  { key: "status", title: t("status"), sortable: false, size: "50px" },
  { key: "operation", title: t("operation"), size: "50px" },
]);
let search = ref("");
let payload = computed(() => {
  return {
    page: page.value,
    search: search.value,
    sortKey: sharedStore.sortBy[0]?.key || "",
    sortOrder: sharedStore.sortBy[0]?.order || "",
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
    hint: true,
  },
  {
    type: "text-area",
    name: "description",
    modelValue: ref(""),
    validations: "required",
    label: "description",
    size: 12,
    hint: true,
  }
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
      "sharedPanel"
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
      title: "فعال کردن",
      value: "active",
      function: categoryList.value.changeItemStatus,
    }
  ]);
};
const submitItem = () => {
  let payload;
  let formTitle = sharedStore.editForm.find((item) => item.name === "title");
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
        description: formDescription.modelValue,
        status: sharedStore.currentItem.status,
        from: "profile"
      },
    };
    $repos.sharedPanel.createCategory(payload).then((res) => {
      Object.assign(sharedStore.listItems.data[itemIndex], res);
      sharedStore.edit = false;
      sharedStore.closeDialog();
    });
  } else {
    payload = {
      body: {
        title: formTitle.modelValue,
        description: formDescription.modelValue,
        from: "profile"
      },
    };
    $repos.sharedPanel.createCategory(payload).then((res) => {
      Object.assign(sharedStore.listItems.data, [
        { ...res },
        ...sharedStore.listItems.data,
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
onMounted(async() => {
  await sharedStore.getListingCommon("categoryListCommon", "sharedPanel");
  init();
  await sharedStore.getListingItems(
    "categoryList",
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
