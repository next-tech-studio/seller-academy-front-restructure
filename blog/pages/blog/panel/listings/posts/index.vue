<template>
  <NuxtLayout name="sidebar">
    <v-container fluid class="pa-8">
      <app-listing
        ref="postList"
        :items="sharedStore.listItems"
        :headers="computedItem.headers"
        :info="sharedStore.listInfo.counts"
        :filters="filters"
        :store="sharedStore"
        :listing-title="computedItem.title"
        v-model:page="payload.page"
        v-model:searchModel="payload.search"
        @update:searchModel="onSearch"
        edit-address="blog-panel-post-id-draft"
        view-address="/article/"
        default-status="draft"
        @update:itemStatus="
          sharedStore.changeItemStatus(
            $event,
            'updateArticleStatus',
            'articleListData',
            payload,
            'panel'
          )
        "
        :show-dialog="false"
        @update:page="
          sharedStore.getListingItems(
            'articleListData',
            payload,
            'panel'
          )
        "
        @filter="
          sharedStore.getListingItems(
            'articleListData',
            payload,
            'panel'
          )
        "
        @edit="edit"
        :table-actions="operations"
        @navigate:toItem="goToItem"
      >
        <template #status="{ item }">
          <div class="text-truncate" style="width: 100px">
            <v-icon
              icon="custom:dot"
              size="12"
              :class="sharedStore.statusColor(item.item.status)"
              class="me-2"
            />
            <span
              class="text-body-2"
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
import { useFilterStore } from "@core/stores/filter";
import { useSharedPanelStore } from "@core/stores/sharedPanel";
const sharedStore = useSharedPanelStore();
let filterStore = useFilterStore();
const { $repos } = useNuxtApp();
// let panel = usePanelStore();
const { t } = useI18n();
let operations;
const postList = ref(null);
let search = ref("");
let filters = ref([]);
let page = ref(1);
let headers = ref([
  {
    align: "start",
    key: "title",
    sortable: false,
    title: t("title"),
    selectAll: true,
    size: "250px",
  },
  { key: "author", title: t("author"), sortable: false, size: "100px" },
  { key: "publicationDate", title: t("publicationDate"), sortable: true },
  { key: "category", title: t("category"), sortable: false },
  { key: "status", title: t("status"), sortable: false },
  { key: "viewsCount", title: t("viewsCount") },
  { key: "commentsCount", title: t("commentsCount") },
  { key: "bookmarksCount", title: t("bookmarksCount") },
  { key: "operation", title: t("operation") },
]);
const route = useRoute();
const type = computed(() =>
  route.name.includes("podcast") ? "podcast" : "article"
);
const localePath = useLocalePath();
const init = () => {
  operations = ref([
    { title: "ویرایش", value: "edit",hasDialog:true, function: postList.value.edit },
    {
      title: "حذف کردن",
      value: "deleted",
      function: postList.value.changeItemStatus,
    },
    {
      title: "پنهان کردن",
      value: "hidden",
      function: postList.value.changeItemStatus,
    },
  ]);
  filters = ref([
    {
      type: "dropdown",
      title: "authors",
      items: sharedStore.listInfo?.authors,
      key: "displayName",
      value: null,
    },
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
const computedItem = computed(() => {
  let item;
  if (type.value == "podcast") {
    item = {
      title: "podcasts",
      filters: filters.value.filter((f) => f.title != "categories"),
      headers: headers.value.filter((h) => h.key != "category"),
    };
  } else {
    item = {
      title: "posts",
      filters: filters.value,
      headers: headers.value,
    };
  }

  return item;
});
let payload = computed(() => {
  return {
    page: page.value,
    authorId: filterStore.filter?.authors?.id || "",
    authorType: filterStore.filter?.authors?.type || "",
    categorySlug: filterStore.filter?.categories || "",
    status: filterStore.filter?.status || "",
    search: search.value,
    sortKey: sharedStore.sortBy[0]?.key || "",
    sortOrder: sharedStore.sortBy[0]?.order || "",
    publicationDateMax: filterStore.filter?.publicationDateMax || "",
    publicationDateMin: filterStore.filter?.publicationDateMin || "",
    type: type.value,
  };
});
const edit = () => {
  console.log(
    "edit",
    `blog-panel-${type.value == "podcast" ? "podcast" : "post"}-id-draft`,
    sharedStore.currentItem.id
  );
  navigateTo(
    localePath({
      name: `blog-panel-${
        type.value == "podcast" ? "podcast" : "post"
      }-id-draft`,
      params: { id: sharedStore.currentItem.id },
    })
  );
};
const goToItem = () => {
  if (panel.currentItem.status === "draft") {
    navigateTo(
      localePath({
        path: "/article/preview/" + `${sharedStore.currentItem.id}`,
      }),
      {
        external: true,
      }
    );
  } else {
    navigateTo(
      localePath({ path: "/artricle/" + `${sharedStore.currentItem.slug}` }),
      {
        external: true,
      }
    );
  }
};
const onSearch = useDebounceFn(async () => await sharedStore.getListingItems(
    "articleListData",
    payload.value,
    "panel"
  ), 1000, {
  maxWait: 5000,
});
// const changeItemStatus = (e) => {
//   let payload = { body: { status: e.action, ids: e.id }, type: type.value };
//   $repos.panel.updateArticleStatus(payload).then(() => getItems());
// };
// onMounted(() => {
//   getItems();
//   getCommon();
// });
onMounted(async () => {
  await sharedStore.getListingCommon(
    "articleListCommon",
    "panel",
    payload.value
  );
  init();
  await sharedStore.getListingItems(
    "articleListData",
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
