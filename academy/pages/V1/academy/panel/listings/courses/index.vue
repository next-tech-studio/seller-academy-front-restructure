<template>
  <NuxtLayout name="sidebar">
    <v-container fluid class="pa-8">
      <app-listing
        ref="coursesList"
        :items="sharedStore.listItems"
        :headers="headers"
        :info="sharedStore.listInfo.counts"
        :store="sharedStore"
        listing-title="courses"
        v-model:page="payload.page"
        v-model:searchModel="payload.search"
        @update:searchModel="onSearch"
        dialog-subtitle="add_new_form_description"
        view-address="/academy/course/"
        @update:page="
          sharedStore.getListingItems(
            'getCoursesData',
            payload,
            'academyPanel'
          )
        "
        @update:itemStatus="
          sharedStore.changeItemStatus(
            $event,
            'updateCourseStatus',
            'getCoursesData',
            payload,
            'academyPanel'
          )
        "
        @update:items="submitItem"
        @navigate:toItem="goToItem"
        @filter="
          sharedStore.getListingItems(
            'getCoursesData',
            payload,
            'academyPanel'
          )
        "
        @edit="goToPageBuilder"
        :filters="filters"
        :table-actions="operations"
        default-status="draft"
      >
        <template #status="{ item }">
          <div class="text-truncate" style="width: 100px">
            <v-icon
              icon="custom:dot"
              size="12"
              :class="sharedStore.statusColor(item?.item?.status)"
              class="me-2"
            />
            <span
              class="text-body-2"
              :class="sharedStore.statusColor(item?.item?.status)"
              >{{ $t(item?.item?.status) }}</span
            >
          </div>
        </template>
        <template #instructor="{ item }">
          <div>{{ item?.item?.instructor?.displayName }}</div>
        </template>
        <template #category="{ item }">
          <div>{{ item?.item?.category?.title }}</div>
        </template>
        <template #rate="{ item }">
          <div class="d-flex">
            <v-icon
              icon="custom:star"
              color="text-hint-caution"
              class="me-3"
            ></v-icon>
            <div v-if="item?.item?.rate != null">
              {{ item?.item?.rate }}
            </div>
            <div v-else>0</div>
          </div>
        </template>
        <template #publicationDate="{ item }">
          <div style="direction: ltr" class="text-end">
            {{ item?.item?.publicationDate }}
          </div>
        </template>
      </app-listing>
    </v-container>
  </NuxtLayout>
</template>

<script setup>
import { useSharedPanelStore } from "@core/stores/sharedPanel";
const sharedStore = useSharedPanelStore();
import { useFilterStore } from "@core/stores/filter";
let filterStore = useFilterStore();
const localePath = useLocalePath();
const { t } = useI18n();
const { $repos } = useNuxtApp();
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
    sortKey: sharedStore.sortBy[0]?.key || "",
    sortOrder: sharedStore.sortBy[0]?.order || "",
    instructor: filterStore.filter.instructor?.id || "",
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
    key: "instructor",
    title: t("instructor"),
    sortable: false,
    size: "200px",
  },
  {
    key: "publicationDate",
    title: t("publicationDate"),
    sortable: true,
    size: "100px",
  },
  {
    key: "category",
    title: t("category"),
    sortable: false,
    size: "200px",
  },
  { key: "status", title: t("status"), sortable: false, size: "300px" },
  {
    key: "totalStudentsCount",
    title: t("total_students_count"),
    sortable: true,
    size: "100px",
  },
  {
    key: "doneStudentsCount",
    title: t("graduate_students"),
    sortable: true,
    size: "100px",
  },

  {
    key: "rate",
    title: t("rate"),
    sortable: true,
    size: "200px",
  },
  { key: "operation", title: t("operation"), size: "50px" },
]);
const init = () => {
  operations = ref([
    {
      title: "edit",
      value: "edit",
      hasDialog:true,
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
      title: "instructor",
      items: sharedStore.listInfo?.instructors,
      key: "displayName",
      value: null,
    },
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
        "/academy/panel/course/" + `${sharedStore.currentItem.id}` + "/general",
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
      "academyPanel"
    ),
  1000,
  {
    maxWait: 5000,
  }
);
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
    "academyPanel",
    payload.value
  );
  init();
  await sharedStore.getListingItems(
    "getCoursesData",
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
