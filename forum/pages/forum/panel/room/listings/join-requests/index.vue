<template>
  <NuxtLayout name="sidebar">
    <v-container fluid class="pa-8">
      <app-listing
        ref="requestsList"
        :items="sharedStore.listItems"
        :headers="headers"
        :info="sharedStore.listInfo.counts"
        :filters="filters"
        :store="sharedStore"
        listing-title="join_requests"
        v-model:page="payload.page"
        v-model:searchModel="payload.search"
        @update:searchModel="onSearch"
        edit-address="blog-panel-post-id-draft"
        view-address="/article/"
        default-status="inactive"
        @update:itemStatus="
          sharedStore.changeItemStatus(
            $event,
            'updateJoinRequestStatus',
            'joinRequestList',
            payload,
            'communityPanel'
          )
        "
        :show-dialog="false"
        @update:page="
          sharedStore.getListingItems(
            'joinRequestList',
            payload,
            'communityPanel'
          )
        "
        @filter="
          sharedStore.getListingItems(
            'joinRequestList',
            payload,
            'communityPanel'
          )
        "
        @edit="edit"
        :group-actions="groupActions"
        :table-actions="operations"
        @navigate:toItem="goToItem"
      >
        <template #room="{ item }">
          <div class="d-flex cursor-pointer" v-if="item.item.room.title">
            <div
              class="d-flex align-center justify-start"
              :style="`width: ${item.size} !important; flex: 0 1 0%`"
            >
              <v-checkbox
                true-icon="custom:squareCheck"
                false-icon="custom:square"
                :value="item.item"
                multiple
                v-model="sharedStore.selectedTableItems"
                hide-details
              >
                <template #label>
                  <v-btn
                    variant="text"
                    :ripple="false"
                    class="text-truncate text-body-1"
                    >{{ item?.item?.room?.title }}</v-btn
                  >
                </template>
              </v-checkbox>
            </div>
          </div>
        </template>
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
        <template #user="{ item }">
          <span class="text-body-2">{{ $t(item.item.user.displayName) }}</span>
        </template>
      </app-listing>
    </v-container>
  </NuxtLayout>
</template>

<script setup>
import { useFilterStore } from "~/stores/filter";
import { useSharedPanelStore } from "~/stores/sharedPanel";
const sharedStore = useSharedPanelStore();
const { $repos } = useNuxtApp();
let filterStore = useFilterStore();
const { t } = useI18n();
let operations;
let groupActions = ref([
  { title: "تایید کردن", value: "active" },
  { title: "رد کردن", value: "inactive" },
]);
const requestsList = ref(null);
let search = ref("");
let filters = ref([]);
let page = ref(1);
let headers = ref([
  {
    align: "start",
    key: "room",
    sortable: false,
    title: t("room"),
    selectAll: true,
    size: "250px",
  },
  {
    key: "creationDate",
    title: t("creation_date"),
    sortable: false,
    size: "200px",
  },
  { key: "user", title: t("user"), sortable: true },
  { key: "status", title: t("status"), sortable: false },
  { key: "operation", title: t("operation"), sortable: false },
]);
const route = useRoute();
const localePath = useLocalePath();
const init = () => {
  operations = ref([
    {
      title: "تایید کردن",
      value: "accept",
      function: requestsList.value.changeItemStatus,
    },
    {
      title: "رد کردن",
      value: "reject",
      function: requestsList.value.changeItemStatus,
    },
  ]);
  filters = ref([
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
const edit = () => {
  navigateTo(
    localePath({
      name: `forum-panel-room-create-id`,
      params: { id: sharedStore.currentItem.id },
    })
  );
};
const onSearch = useDebounceFn(
  async () =>
    await sharedStore.getListingItems(
      "joinRequestList",
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
    "joinRequestCommon",
    "communityPanel",
    payload.value
  );
  init();
  await sharedStore.getListingItems(
    "joinRequestList",
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
