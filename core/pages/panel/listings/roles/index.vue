<template>
  <NuxtLayout name="sidebar">
    <v-container fluid class="pa-8">
      <app-listing
        ref="roleList"
        :items="sharedStore.listItems"
        :headers="headers"
        :info="sharedStore.listInfo.counts"
        :store="sharedStore"

        :filters="filters"
        listing-title="roles"
        :show-dialog="true"
        :add-new-item="true"
        :group-actions="groupActions"
        dialog-start-button-title="add_new_role"
        :dialog-title="sharedStore.edit ? 'edit_role' : 'add_new_role'"
        v-model:page="payload.page"
        v-model:searchModel="payload.search"
        @update:searchModel="onSearch"
        @show:dialog="openDialog"
        dialog-subtitle="add_new_role_description"
        view-address="/article/category/"
        @update:itemStatus="
          sharedStore.changeItemStatus(
            $event,
            'updateRoleStatus',
            'rolesList',
            payload,
            'sharedPanel'
          )
        "
        @update:page="
          sharedStore.getListingItems('rolesList', payload, 'sharedPanel')
        "
        default-status="deactive"
        :table-actions="operations"
        @update:items="submitItem"
        @init:form="sharedStore.initForm(dataForm)"
        @edit="
          sharedStore.editListing(
            $event.action,
            dataForm,
            null,
            $event.api,
            'rolesList',
            true,
            payload,
            'sharedPanel'
          )
        "
        @navigate:toItem="goToItem"
        @filter="
          sharedStore.getListingItems('rolesList', payload, 'sharedPanel')
        "
      >
        <template #name="{ item,header }">
          <div
            class="d-flex cursor-pointer"
            v-if="item.item.name"
          >
            <div
              class="d-flex align-center justify-start"
              :style="`width: ${header.header.size} !important; flex: 0 1 0%`"
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
                <v-btn variant="text" :ripple="false" class="text-truncate text-body-1">{{
                  item?.item?.name
                }}</v-btn>
              </template>
              </v-checkbox>

            </div>
          </div>
        </template>
        <template #permissions="{ item,header }">
          <div :style="`width: ${header.header.size}; white-space: wrap`">
            <v-chip
             color="icon-hint-caution"
              v-for="item in item?.item?.permissions"
              :key="item.key"
              class="my-1"
              size="small"
            >
              {{ $t(item?.displayName) }}
            </v-chip>
          </div>

        </template>
      </app-listing>
    </v-container>
  </NuxtLayout>
</template>

<script setup>
import { useSharedPanelStore } from "~/stores/sharedPanel";
import { useFilterStore } from "~/stores/filter";
const sharedStore = useSharedPanelStore();
const filterStore = useFilterStore();
const { t } = useI18n();
const UPLOAD_AVATAR_PATH = "/panel/articles/inline_media";
let page = ref(1);
let roleList = ref(null);
let operations;
let filters;
let headers = ref([
  {
    align: "start",
    key: "name",
    sortable: false,
    title: t("role"),
    selectAll: true,
    size: "100px",
  },
  {
    key: "key",
    title: t("key"),
    sortable: false,
    size: "100px",
  },
  {
    key: "permissions",
    title: t("permissions"),
    sortable: false,
    size: "600px",
  },
  {
    key: "creationDate",
    title: t("creation_date"),
    sortable: false,
    size: "120px",
  },

  { key: "operation", title: t("operation"), size: "50px", sortable: false },
]);
let groupActions = ref([
  { title: "حذف کردن", value: "deleted" },
]);
let search = ref("");
let payload = computed(() => {
  return {
    page: page.value,
    search: search.value,
    permissions: filterStore?.filter?.permissions || "",
    sortKey: sharedStore.sortBy[0]?.key || "",
    sortOrder: sharedStore.sortBy[0]?.order || "",
  };
});
const { $repos } = useNuxtApp();
let dataForm = ref([
  {
    type: "text-field",
    name: "name",
    modelValue: ref(""),
    validations: "required",
    label: "title",
    size: 6,
    show:true
  },
  {
    type: "text-field",
    name: "key",
    modelValue: ref(""),
    validations: "required",
    label: "key",
    size: 6,
    show:true
  },
  {
    type: "select",
    name: "permissions",
    modelValue: null,
    selectValue: "id",
    selectTitle:"displayName",
    validations: "required",
    items: computed(() => sharedStore.listInfo?.permissions),
    label: "choose_permissions",
    multiple:true,
    size: 12,
    hint: false,
    show:true
  },
]);
const openDialog = () => {
  sharedStore.dialog = true;
  sharedStore.initForm(dataForm.value);
};
const onSearch = useDebounceFn(
  async () =>
    await sharedStore.getListingItems(
      "rolesList",
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
    { title: "ویرایش", value: "edit", function: roleList.value.edit },
    {
      title: "حذف کردن",
      value: "deleted",
      function: roleList.value.changeItemStatus,
    },
  ]);
  filters = ref([
    {
      type: "dropdown",
      title: "permissions",
      items: sharedStore.listInfo?.permissions,
      key: "displayName",
      value: "id",
    },
  ]);
};

const submitItem = () => {
  let payload;
  let body = {};

  dataForm.value.forEach((field) => {
    if (field.show) {
      body[field.name] = sharedStore.editForm.find(
        (item) => item.name === field.name
      )?.modelValue;

      if (field.name == "avatarUrl")
        body[field.name] = body[field.name]?.url || "";
    }
  });

  if (sharedStore.edit) {
    let itemIndex = sharedStore.listItems.data.findIndex(
      (item) => item.id === sharedStore.currentItem.id
    );
    payload = {
      ...body,
      id: sharedStore.currentItem.id,
    };
    $repos.sharedPanel
      .updateRole(payload)
      .then((res) => {
        Object.assign(sharedStore.listItems.data[itemIndex], res);
        sharedStore.edit = false;
        sharedStore.closeDialog();
      })
      .catch(() => {
        sharedStore.sendingRequest = false;
      });
  } else {
    payload = {
      ...body,
    };
    $repos.sharedPanel
      .updateRole(payload)
      .then((res) => {
        Object.assign(sharedStore.listItems.data, [
          { ...res },
          ...sharedStore.listItems.data,
        ]);
        sharedStore.closeDialog();
      })
      .catch(() => {
        sharedStore.sendingRequest = false;
      });
  }
};
onMounted(async () => {
  await sharedStore.getListingCommon("rolesListCommon", "sharedPanel");
  init();
  await sharedStore.getListingItems(
    "rolesList",
    payload.value,
    // headers.value,
    "sharedPanel"
  );
});
definePageMeta({
  middleware: ["auth"],
  layout: false,
  permissions: ["users"],
});
</script>

<style></style>
