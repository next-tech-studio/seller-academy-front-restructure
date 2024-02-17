<template>
  <NuxtLayout name="sidebar">
    <v-container fluid class="pa-8">
      <app-listing
        ref="roomsList"
        :items="sharedStore.listItems"
        :headers="headers"
        :info="sharedStore.listInfo.counts"
        :filters="filters"
        :store="sharedStore"
        listing-title="rooms"
        v-model:page="payload.page"
        v-model:searchModel="payload.search"
        @update:searchModel="onSearch"
        edit-address="blog-panel-post-id-draft"
        view-address="/article/"
        default-status="inactive"
        @update:itemStatus="
          sharedStore.changeItemStatus(
            $event,
            'updateRoomStatus',
            'chatRoomsList',
            payload,
            'communityPanel'
          )
        "
        :show-dialog="false"
        @update:page="
          sharedStore.getListingItems(
            'chatRoomsList',
            payload,
            'communityPanel'
          )
        "
        @filter="
          sharedStore.getListingItems(
            'chatRoomsList',
            payload,
            'communityPanel'
          )
        "
        @edit="edit"
        :group-actions="groupActions"
        :table-actions="operations"
        @navigate:toItem="goToItem"
      >
        <template #status="{ item }">
          <div
            class="text-truncate"
            style="width: 100px"
            :class="sharedStore.statusColor(item.item.status)"
          >
            <v-icon icon="custom:dot" size="12" class="me-2" />
            <span class="text-body-2">{{ $t(item.item.status) }}</span>
          </div>
        </template>
        <template #category="{ item }">
          <span class="text-body-2">{{ $t(item.item.category.title) }}</span>
        </template>
        <template #isPrivate="{ item }">
          <span class="text-body-2">{{
            item.item.isPrivate ? $t("private") : $t("public")
          }}</span>
        </template>
      </app-listing>
    </v-container>
  </NuxtLayout>
</template>

<script setup>
import { useFilterStore } from "@core/stores/filter";
import { useSharedPanelStore } from "@core/stores/sharedPanel";
const sharedStore = useSharedPanelStore();
const { $repos } = useNuxtApp();
let filterStore = useFilterStore();
const { t } = useI18n();
let operations;
let groupActions = ref([
  { title: "فعال کردن", value: "active" },
  { title: "غیر‌فعال کردن", value: "inactive" },
]);
const roomsList = ref(null);
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
  { key: "isPrivate", title: t("is_private"), sortable: false, size: "100px" },
  { key: "memberCount", title: t("members_count"), sortable: true },
  { key: "category", title: t("category"), sortable: false },
  { key: "status", title: t("status"), sortable: false },
  { key: "operation", title: t("operation") },
]);
const route = useRoute();
const type = computed(() =>
  route.name.includes("podcast") ? "podcast" : "article"
);
const localePath = useLocalePath();
const init = () => {
  operations = ref([
    {
      title: "ویرایش",
      value: "edit",
      hasDialog: true,
      function: roomsList.value.edit,
    },
    {
      title: "غیرفعال کردن",
      value: "active",
      function: roomsList.value.changeItemStatus,
    },
    {
      title: "پرطرفدارترین‌ها",
      value: "most_popular",
      function: updateMostPopular,
    },
  ]);
  filters = ref([
    {
      type: "dropdown",
      title: "categorySlug",
      items: sharedStore.listInfo?.categories,
      key: "title",
      value: "slug",
    },
  ]);
};
let payload = computed(() => {
  return {
    page: page.value,
    categorySlug: filterStore.filter?.categorySlug || "",
    status: filterStore.filter?.status || "",
    search: search.value,
    sortKey: sharedStore.sortBy[0]?.key || "",
    sortOrder: sharedStore.sortBy[0]?.order || "",
  };
});
const updateMostPopular = (item, action) => {
  $repos.communityPanel
    .saveRoom({
      body: {
        // id: item.id,
        // slug: item.slug,
        // categoryId: item.category.id,
        ...item,
        members: item.members.map(x => x.id),
        mostPopular: !item.mostPopular,
      },
    })
    .then(() => {
      sharedStore.getListingItems(
        "chatRoomsList",
        payload.value,
        "communityPanel"
      );
    });
};
const edit = () => {
  navigateTo(
    localePath({
      name: `forum-panel-room-create-id`,
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
const onSearch = useDebounceFn(
  async () =>
    await sharedStore.getListingItems(
      "chatRoomsList",
      payload.value,
      "communityPanel"
    ),
  1000,
  {
    maxWait: 5000,
  }
);
onMounted(async () => {
  await sharedStore.getListingCommon(
    "chatRoomsCommon",
    "communityPanel",
    payload.value
  );
  init();
  await sharedStore.getListingItems(
    "chatRoomsList",
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
