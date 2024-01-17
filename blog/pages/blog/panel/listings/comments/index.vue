<template>
  <NuxtLayout name="sidebar">
    <v-container fluid class="pa-8">
      <app-listing
        ref="commentsListing"
        :items="sharedStore.listItems"
        :headers="headers"
        :info="sharedStore.listInfo.counts"
        :store="sharedStore"
        :filters="filters"
        :show-dialog="true"
        :dialog-title="sharedStore.additionalOperation? 'reject':'submit_and_publish'"
        listing-title="comments"
        dialog-subtitle="check_comment_description"
        dialog-start-button-title="reject_comment"
        v-model:page="payload.page"
        v-model:searchModel="payload.search"
        @update:searchModel="onSearch"
        @edit="
          sharedStore.editListing(
            $event.action,
            editForm,
            rejectForm,
            $event.api,
            'commentList',
            $event.hasDialog,
            payload,
            'panel'
          )
        "
        v-model:dataForm="form"
        :add-new-item="false"
        default-status="active"
        @update:itemStatus="
          sharedStore.changeItemStatus(
            $event,
            'updateCommentStatus',
            'commentList',
            payload
          )
        "
        @update:page="
          sharedStore.getListingItems('commentList', payload, 'panel')
        "
        @update:items="submitItem"
        @filter="sharedStore.getListingItems('commentList', payload, 'panel')"
      >
        <template #author="{ item }">
          <div class="d-flex cursor-pointer">
            <div class="d-flex align-center" style="width: 200px; flex: 0 1 0%">
              <v-checkbox-btn
                true-icon="custom:squareCheck"
                false-icon="custom:square"
                :value="item.item"
                multiple
                v-model="sharedStore.selectedTableItems"
              >
              </v-checkbox-btn>
              <span class="text-truncate text-body-1">{{
                item.item.author
              }}</span>
            </div>
          </div>
        </template>
        <template #status="{ item }">
          <div class="text-truncate" width="80px">
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
        <template #operation="{ item }">
          <div class="d-flex flex-column">
            <div>
              <v-btn
                v-for="(action, index) in operations"
                :key="index"
                icon
                flat
                density="compact"
                class="me-4 text-body-1 font-weight-bold"
                @click="commentsListing.edit(item.item, action)"
              >
                <v-icon :icon="action.icon" size="20"></v-icon>
              </v-btn>
            </div>
          </div>
        </template>
        <template #date="{ item }">
          <div style="direction: ltr" class="text-end">
            {{ item.item.date }}
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
        <template #relatedArticle="{ item }">
          <v-btn
            variant="text"
            class="text-body-1"
            @click="goToItem(item.item)"
            >{{ item.item.relatedArticle.title }}</v-btn
          >
        </template>
        <template #formActions>
          <div v-if="sharedStore?.edit">
            <v-btn
              color="background-primary"
              class="text-button"
              type="submit"
              variant="outlined"
              @click="submitItem"
            >
              {{ $t("edit") }}
            </v-btn>
            <v-btn
              color="background-primary"
              class="text-button"
              type="submit"
              variant="flat"
              @click="publish"
            >
              {{ $t("publish") }}
            </v-btn>
          </div>
        </template>
      </app-listing>
    </v-container>
  </NuxtLayout>
</template>

<script setup>
const { t } = useI18n();
// import { usePanelStore } from "@core/stores/panel";
import { useSharedPanelStore } from "@core/stores/sharedPanel";
import { useFilterStore } from "@core/stores/filter";
const sharedStore = useSharedPanelStore();
let filterStore = useFilterStore();
// let sharedStore = usePanelStore();
const localePath = useLocalePath();
let commentsListing = ref(null);
let search = ref("");
let filters;
let operations;
let rejectionReasons = ref([]);
const getRejectionReasons = async () => {
  await $repos.other.getRejectionReasons().then((res) => {
    Object.assign(rejectionReasons.value, res);
  });
};
let editForm = ref([
  {
    type: "label",
    name: "author",
    modelValue: ref(""),
    label: "write_by",
    size: 12,
    hint: "",
  },
  {
    type: "text-area",
    modelValue: ref(""),
    label: "text",
    name: "text",
    size: 12,
    hint: "",
  },
]);
let rejectForm = ref([
  {
    type: "label",
    name: "author",
    modelValue: ref(""),
    label: "write_by",
    size: 12,
    hint: "",
  },
  {
    type: "label",
    modelValue: ref(""),
    name: "text",
    label: "text",
    size: 12,
    hint: "",
  },
  {
    type: "select",
    modelValue: ref(""),
    selectValue: "id",
    name: "reason",
    items: rejectionReasons,
    label: "rejection_reason",
    size: 12,
    hint: false,
  },
]);
let page = ref(1);
let payload = computed(() => {
  return {
    page: page.value,
    search: search.value,
    status: filterStore.filter.status || "",
    sortKey: sharedStore.sortBy[0]?.key || "",
    sortOrder: sharedStore.sortBy[0]?.order || "",
  };
});

let headers = ref([
  {
    align: "start",
    key: "author",
    sortable: false,
    title: t("author"),
    selectAll: true,
    size: "100px",
  },
  { key: "text", title: t("text"), sortable: false, size: "300px" },
  { key: "date", title: t("date"), sortable: false, size: "200px" },
  { key: "relatedAricle", title: t("relatedArticle"), size: "100px" },
  { key: "status", title: t("status"), sortable: false, size: "80px" },
  { key: "rate", title: t("rate"), size: "100px" },
  { key: "ip", title: t("ip"), size: "100px" },
  { key: "operation", title: t("operation"), size: "50px" },
]);
const { $repos } = useNuxtApp();
const onSearch = useDebounceFn(
  async () =>
    await sharedStore.getListingItems("commentList", payload.value, "panel"),
  1000,
  {
    maxWait: 5000,
  }
);
const goToItem = (item) => {
  navigateTo(localePath({ path: `/article/${item.relatedArticle.slug}` }), {
    external: true,
  });
};
const publish = () => {
  let payload = {
    body: { status: "approved", ids: [sharedStore.currentItem.id] },
  };
  let itemIndex = sharedStore.listItems.data.findIndex(
    (item) => item.id === sharedStore.currentItem.id
  );
  $repos.panel.updateCommentStatus(payload).then((res) => {
    Object.assign(sharedStore.listItems.data[itemIndex], {
      status: "published",
    });
    sharedStore.closeDialog();
  });
};
const init = () => {
  operations = ref([
    {
      title: "ویرایش انتشار",
      value: "edit",
      icon: "custom:pencil",
      hasDialog: true,
      api: "updateCommentStatus",
    },
    {
      title: "رد کردن",
      value: "rejected",
      icon: "custom:x",
      hasDialog: true,
      api: "updateCommentStatus",
    },
    {
      title: "حذف کردن",
      value: "deleted",
      icon: "custom:trash",
      hasDialog: false,
      api: "updateCommentStatus",
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
const submitItem = () => {
  let itemIndex = sharedStore.listItems.data.findIndex(
    (item) => item.id === sharedStore.currentItem.id
  );
  let payload;
  let reason = sharedStore.editForm.find((item) => item.name === "reason");
  let text = sharedStore.editForm.find((item) => item.name === "text");
  if (sharedStore.additionalOperation) {
    payload = {
      body: {
        status: "rejected",
        ids: [sharedStore.currentItem.id],
        reportId: reason.modelValue,
      },
    };
    $repos.panel.updateCommentStatus(payload).then((res) => {
      Object.assign(sharedStore.listItems.data[itemIndex], {
        status: payload.body.status,
      });
      sharedStore.closeDialog();
    });
  } else if (sharedStore.edit) {
    payload = {
      id: sharedStore.currentItem.id,
      body: {
        text: text?.modelValue,
      },
    };
    $repos.panel.updateCommentText(payload).then((res) => {
      Object.assign(sharedStore.listItems.data[itemIndex], payload.body);
      sharedStore.closeDialog();
    });
  }
};
onMounted(async () => {
  await getRejectionReasons();
  await sharedStore.getListingCommon("commentListCommon", "panel");
  init();
  await sharedStore.getListingItems("commentList", payload.value, "panel");
});
definePageMeta({
  middleware: ["auth"],
  layout: false,
});
</script>

<style></style>
