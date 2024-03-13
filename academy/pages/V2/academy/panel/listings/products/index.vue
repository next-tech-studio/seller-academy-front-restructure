<template>
  <NuxtLayout name="sidebar">
    <v-container fluid class="px-0 py-8">
      <app-listing
        ref="coursesList"
        :items="sharedStore.listItems"
        :headers="headers"
        has-extra-button
        :download-url="downloadUrl"
        extra-button-title="download_excel"
        :info="sharedStore.listInfo.counts"
        :store="sharedStore"
        listing-title="products"
        v-model:page="payload.page"
        v-model:searchModel="payload.search"
        @update:searchModel="onSearch"
        dialog-subtitle="add_new_course_description"
        view-address="/academy/course/"
        @update:page="
          sharedStore.getListingItems(
            'getCoursesData',
            payload,
            'academyProductPanel'
          )
        "
        @update:itemStatus="changeItemStatus"
        @update:items="submitItem"
        @navigate:toItem="goToItem"
        @filter="
          sharedStore.getListingItems(
            'getCoursesData',
            payload,
            'academyProductPanel'
          )
        "
        @edit="goToPageBuilder"
        :filters="filters"
        :table-actions="operations"
        @download:excel="
          sharedStore.downloadExcel('downloadProcuts', 'academyProductPanel', {
            type: 'xlsx',
          })
        "
        default-status="draft"
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
        <template #instructor="{ item }">
          <div>{{ item.item.instructor.displayName }}</div>
        </template>
        <template #category="{ item }">
          <div>{{ item.item.category.title }}</div>
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
        <template #startAt="{ item }">
          <div style="direction: ltr; white-space: nowrap" class="text-end">
            {{ item.item.startAt }}
          </div>
        </template>
        <template #endAt="{ item }">
          <div style="direction: ltr; white-space: nowrap" class="text-end">
            {{ item.item.endAt }}
          </div>
        </template>
        <template #registers="{ item }">
          <v-btn
            :to="{
              name: 'academy-panel-listings-products-slug-registers',
              params: { slug: item?.item?.slug },
            }"
            flat
            color="primary-base"
            >{{ $t("see") }}</v-btn
          >
        </template>
      </app-listing>
    </v-container>
  </NuxtLayout>
</template>

<script setup>
import { useSharedPanelStore } from "~/stores/sharedPanel";
import { useLocaleStore } from "~/stores/locale";
const localeStore = useLocaleStore();
const sharedStore = useSharedPanelStore();
import { useFilterStore } from "~/stores/filter";
let filterStore = useFilterStore();
const localePath = useLocalePath();
const { t } = useI18n();
const { $repos } = useNuxtApp();
const config = useRuntimeConfig();
const downloadUrl = computed(
  () =>
    config.public.apiBase + `/${localeStore.locale}/api/panel/product/export`
);
let page = ref(1);
let coursesList = ref(null);
let search = ref("");
let filters;
let operations;
let payload = computed(() => {
  return {
    page: page.value,
    search: search.value,
    status: filterStore.filter.status || "",
    instructor: filterStore.filter.instructor || "",
    category: filterStore.filter.categories || "",
  };
});
let headers = ref([
  {
    align: "start",
    key: "title",
    sortable: false,
    title: t("title"),
    selectAll: true,
    size: "250px",
  },
  {
    key: "startAt",
    title: t("course_start_date"),
    sortable: false,
    size: "100px",
  },
  {
    key: "endAt",
    title: t("course_end_date"),
    sortable: false,
    size: "100px",
  },
  { key: "status", title: t("status"), sortable: false, size: "300px" },
  {
    key: "category",
    title: t("category"),
    sortable: false,
    size: "100px",
  },
  {
    key: "capacity",
    title: t("capacity"),
    sortable: false,
    size: "50px",
  },
  {
    key: "platform",
    title: t("platform"),
    sortable: false,
    size: "100px",
  },
  {
    key: "price",
    title: t("price"),
    sortable: false,
    size: "100px",
  },
  {
    key: "likesCount",
    title: t("likes_count"),
    sortable: false,
    size: "100px",
  },
  { key: "registers", title: t("registers"), size: "50px" },
  { key: "operation", title: t("operation"), size: "50px", sortable: false },
]);
const init = () => {
  operations = ref([
    {
      title: "edit",
      value: "edit",
      hasDialog: true,
      function: coursesList.value.edit,
    },
    {
      title: "حذف کردن",
      value: "deleted",
      function: coursesList.value.changeItemStatus,
    },
    {
      title: "انتشار",
      value: "published",
      function: coursesList.value.changeItemStatus,
    },
    {
      title: "پنهان کردن",
      value: "hidden",
      function: coursesList.value.changeItemStatus,
    },
  ]);
  filters = ref([
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
const goToPageBuilder = () => {
  navigateTo(
    localePath({
      path:
        "/academy/panel/product/" +
        `${sharedStore.currentItem.id}` +
        "/general",
    }),
    {
      external: true,
    }
  );
};
const onSearch = useDebounceFn(
  async () =>
    await sharedStore.getListingItems(
      "getCoursesData",
      payload.value,
      "academyProductPanel"
    ),
  1000,
  {
    maxWait: 5000,
  }
);
const changeItemStatus = (e) => {
  let data = { body: { status: e.action, ids: e.id } };
  $repos.academyProductPanel
    .updateCourseStatus(data)
    .then(() =>
      sharedStore.getListingItems(
        "getCoursesData",
        payload.value,
        "academyProductPanel"
      )
    );
};
const goToItem = () => {
  navigateTo(
    localePath({
      path: "/courses/" + `${sharedStore.currentItem.slug}`,
    }),
    {
      external: true,
    }
  );
};
onMounted(async () => {
  await sharedStore.getListingCommon(
    "getCourseListCommon",
    "academyProductPanel",
    payload.value
  );
  init();
  await sharedStore.getListingItems(
    "getCoursesData",
    payload.value,
    "academyProductPanel"
  );
});
definePageMeta({
  middleware: ["auth"],
  layout: false,
});
</script>

<style></style>
