<template>
  <NuxtLayout name="sidebar">
    <v-container fluid class="pa-8">
      <app-listing
        ref="instructorList"
        :items="sharedStore.listItems"
        :headers="headers"
        :info="sharedStore.listInfo.counts"
        :store="sharedStore"
        listing-title="instructors"
        :show-dialog="false"
        hide-group-actions
        :add-new-item="false"
        dialog-start-button-title="add_new_instructor"
        :dialog-title="
          sharedStore.edit ? 'edit_instructor' : 'add_new_instructor'
        "
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
            'instructorsList',
            payload,
            'academyPanel'
          )
        "
        @update:page="sharedStore.getListingItems('instructorList', payload)"
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
        <template #status="{ item }">
          <div
            class="text-truncate"
            style="width: 80px"
            :class="sharedStore.statusColor(item.item?.status)"
          >
            <v-icon icon="custom:dot" size="12" class="me-2" />
            <span class="text-body-1">{{ $t(item.item?.status) }}</span>
          </div>
        </template>
        <template #rate="{ item }">
          <div class="d-flex">
            <v-icon
              icon="custom:star"
              color="text-hint-caution"
              class="me-3"
            ></v-icon>
            <div v-if="item.item.rate != null">
              {{ item.item.rate }}
            </div>
            <div v-else>0</div>
          </div>
        </template>
        <template #displayName="{ item }">
          <div class="d-flex cursor-pointer">
            <div class="d-flex align-center" style="width: 200px; flex: 0 1 0%">
              <v-avatar class="me-2" size="32">
                <v-img :src="item.item.avatarUrl"> </v-img>
              </v-avatar>
              <span class="text-truncate text-body-1">{{
                item.item.displayName
              }}</span>
            </div>
          </div>
        </template>
        <template #commentCount="{ item }">
          <div class="d-flex">
            <v-icon icon="custom:comment" class="me-3"></v-icon>
            <div v-if="item.item.rate != null">
              {{ item.item.rate }}
            </div>
            <div v-else>0</div>
          </div>
        </template>
      </app-listing>
    </v-container>
  </NuxtLayout>
</template>

<script setup>
import { useSharedPanelStore } from "~/stores/sharedPanel";
const sharedStore = useSharedPanelStore();
const { t } = useI18n();
let page = ref(1);
let instructorList = ref(null);
let operations;
let headers = ref([
  {
    align: "start",
    key: "displayName",
    checkAll: true,
    sortable: false,
    title: t("display_name"),
    size: "150px",
  },
  {
    key: "description",
    title: t("description"),
    sortable: false,
    size: "100px",
  },
  { key: "status", title: t("status"), sortable: false, size: "50px" },
  {
    key: "commentCount",
    title: t("comments_count"),
    size: "50px",
    sortable: true,
  },
  {
    key: "courseCount",
    title: t("course_count"),
    size: "50px",
    sortable: true,
  },
  {
    key: "rate",
    title: t("rate"),
    size: "50px",
    sortable: true,
  },
  // { key: "operation", title: t("operation"), size: "50px" },
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
const openDialog = () => {
  sharedStore.dialog = true;
  sharedStore.initForm(dataForm.value);
};
const onSearch = useDebounceFn(
  async () =>
    await sharedStore.getListingItems(
      "instructorsList",
      payload.value,
      "academyPanel"
    ),
  1000,
  {
    maxWait: 5000,
  }
);
// const init = () => {

// };
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
    $repos.academyPanel.updateCategory(payload).then((res) => {
      Object.assign(sharedStore.listItems.data[itemIndex], res);
      sharedStore.edit = false;
      sharedStore.closeDialog();
    });
  } else {
    payload = {
      body: {
        title: formTitle.modelValue,
        slug: formSlug.modelValue,
        description: formDescription.modelValue,
      },
    };
    $repos.academyPanel.updateCategory(payload).then((res) => {
      Object.assign(sharedStore.listItems.data, [
        ...sharedStore.listItems.data,
        { ...res },
      ]);
      sharedStore.closeDialog();
    });
  }
};
// const goToItem = () => {
//   navigateTo(
//     localePath({
//       path: "/article/category/" + `${sharedStore.currentItem.slug}`,
//     }),
//     {
//       external: true,
//     }
//   );
// };
onMounted(async () => {
  await sharedStore.getListingCommon("instructorsListCommon", "academyPanel");
  // init();
  await sharedStore.getListingItems(
    "instructorsList",
    payload.value,
    "academyPanel"
  );
});
definePageMeta({
  middleware: ["auth"],
  layout: false,
});
</script>

<style></style>
