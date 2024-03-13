<template>
  <v-container fluid class="pa-8">
    <app-listing
      ref="registersList"
      :items="store.listItems"
      :headers="headers"
      :info="store.listInfo.counts"
      :store="store"
      listing-title="registers"
      :show-dialog="false"
      :add-new-item="false"
      v-model:page="payload.page"
      v-model:searchModel="payload.search"
      @update:searchModel="onSearch"
      @update:page="
        store.getListingItems(
          'registersList',
          payload.value,
          'academyProductPanel'
        )
      "
      default-status="active"
      :table-actions="operations"
      @update:items="submitItem"
      @init:form="store.initForm(dataForm)"
      @edit="certificates"
      @navigate:toItem="goToItem"
      hide-group-actions
      @update:itemStatus="
        store.changeItemStatus(
          $event,
          'updateRegisterStatus',
          'registersList',
          payload,
          'academyProductPanel'
        )
      "
    >
      <template #displayName="{ item }">
        <div class="d-flex cursor-pointer">
          <div class="d-flex align-center" style="width: 200px; flex: 0 1 0%">
            <v-checkbox-btn
              true-icon="custom:squareCheck"
              false-icon="custom:square"
              :value="item.item"
              multiple
              v-model="store.selectedTableItems"
            >
            </v-checkbox-btn>
            <v-avatar class="me-2" size="32">
              <v-img :src="item?.item?.user?.profile?.avatarUrl"> </v-img>
            </v-avatar>
            <span class="text-truncate text-body-1">{{
              item?.item?.user?.profile?.displayName
            }}</span>
          </div>
        </div>
      </template>
      <template #mobile="{ item }">
        <span>{{ item?.item?.user?.profile?.mobile }}</span>
      </template>
      <template #resume="{ item }">
        <v-btn
          download
          size="small"
          variant="text"
          color="primary-base"
          :href="item.item.resume"
          target="_blank"
          tag="a"
          icon="custom:download"
        ></v-btn>
      </template>
      <template #status="{ item }">
        <div class="text-truncate">
          <v-icon
            icon="custom:dot"
            size="12"
            :class="store.statusColor(item?.item?.status)"
            class="me-2"
          />
          <span
            class="text-body-1"
            :class="store.statusColor(item?.item?.status)"
            >{{ $t(item?.item?.status) }}</span
          >
        </div>
      </template>
    </app-listing>
  </v-container>
</template>

<script setup>
import { useSharedPanelStore } from "~/stores/sharedPanel";
let store = useSharedPanelStore();
const localePath = useLocalePath();
const route = useRoute();
const { t } = useI18n();
let page = ref(1);
let registersList = ref(null);
let operations;
let headers = ref([
  {
    align: "start",
    key: "displayName",
    sortable: false,
    title: t("display_name"),
    selectAll: true,
    size: "200px",
  },
  {
    align: "start",
    key: "mobile",
    sortable: false,
    title: t("mobile"),
    selectAll: false,
    size: "200px",
  },
  {
    align: "start",
    key: "resume",
    sortable: true,
    title: t("resume"),
    selectAll: false,
    size: "200px",
  },
  {
    align: "start",
    key: "motivation",
    sortable: true,
    title: t("motivation"),
    selectAll: false,
    size: "200px",
  },
  {
    align: "start",
    key: "status",
    sortable: true,
    title: t("status"),
    selectAll: false,
    size: "200px",
  },
  { key: "operation", title: t("operation"), size: "50px", sortable: false },
]);
let search = ref("");
let payload = computed(() => {
  return {
    page: page.value,
    search: search.value,
    sortKey: store.sortBy[0]?.key || "",
    sortOrder: store.sortBy[0]?.order || "",
    slug: route.params.slug,
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
    name: "description",
    modelValue: ref(""),
    size: 12,
    label: "related_descriptions",
  },
]);
const openDialog = () => {
  store.dialog = true;
  store.initForm(dataForm.value);
};
const onSearch = useDebounceFn(
  async () =>
    await store.getListingItems(
      "registersList",
      payload.value,
      "academyProductPanel"
    ),
  1000,
  {
    maxWait: 5000,progress
: 
"waiting_payment"
  }
);
const init = () => {
  operations = ref([
    {
      type: "select",
      title: "جزئیات",
      value: "status",
      hasDialog: true,
      items: ["in_progress", "reject", "waiting_payment", "done"],
      onChange: ($event) =>
        store.changeItemStatus(
          $event,
          "updateRegisterStatus",
          "registersList",
          payload.value,
          "academyProductPanel"
        ),
    },
  ]);
};
const submitItem = () => {
  let payload;
  let formTitle = store.editForm.find((item) => item.name === "title");
  let formDescription = store.editForm.find(
    (item) => item.name === "description"
  );
  if (store.edit) {
    let itemIndex = store.listItems.data.findIndex(
      (item) => item.id === store.currentItem.id
    );
    payload = {
      body: {
        id: store.currentItem.id,
        title: formTitle.modelValue,
        description: formDescription.modelValue,
        status: store.currentItem.status,
      },
    };
    $repos.academyProductPanel.updateSkill(payload).then((res) => {
      Object.assign(store.listItems.data[itemIndex], res);
      store.edit = false;
      store.closeDialog();
    });
  } else {
    payload = {
      body: {
        title: formTitle.modelValue,
        description: formDescription.modelValue,
      },
    };
    $repos.academyProductPanel.updateSkill(payload).then((res) => {
      Object.assign(store.listItems.data, [
        ...store.listItems.data,
        { ...res },
      ]);
      store.closeDialog();
    });
  }
};
// const goToItem = () => {
//   navigateTo(
//     localePath({
//       path: "/article/category/" + `${store.currentItem.slug}`,
//     }),
//     {
//       external: true,
//     }
//   );
// };
onMounted(() => {
  init();
  // store.getListingCommon("registersListCommon", "academyProductPanel");
  store.getListingItems("registersList", payload.value, "academyProductPanel");
});
definePageMeta({
  middleware: ["auth"],
  layout: "sidebar",
});

const certificates = () => {
  navigateTo(localePath({ name: "academy-panel-listings-certificates" }));
};
</script>

<style></style>
