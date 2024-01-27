<template>
  <NuxtLayout name="sidebar">
    <v-container fluid class="pa-8">
      <app-listing
        ref="userList"
        :items="sharedStore.listItems"
        :headers="headers"
        :info="sharedStore.listInfo.counts"
        :store="sharedStore"
        :filters="filters"
        listing-title="users"
        :show-dialog="true"
        :add-new-item="true"
        dialog-start-button-title="add_new_user"
        :dialog-title="sharedStore.edit ? 'edit_user' : 'add_new_user'"
        v-model:page="payload.page"
        v-model:searchModel="payload.search"
        @update:searchModel="onSearch"
        @show:dialog="openDialog"
        dialog-subtitle="add_new_user_description"
        view-address="/article/category/"
        @update:itemStatus="
          sharedStore.changeItemStatus(
            $event,
            'updateUserStatus',
            'usersList',
            payload,
            'sharedPanel'
          )
        "
        @update:page="
          sharedStore.getListingItems('usersList', payload, 'sharedPanel')
        "
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
        @filter="
          sharedStore.getListingItems('usersList', payload, 'sharedPanel')
        "
      >
        <template #displayName="{ item }">
          <div class="d-flex cursor-pointer">
            <div
              class="d-flex align-center justify-start"
              :style="`width: ${item.size} !important; flex: 0 1 0%`"
            >
              <v-checkbox-btn
                true-icon="custom:squareCheck"
                false-icon="custom:square"
                :value="item.item"
                multiple
                v-model="sharedStore.selectedTableItems"
              >
              </v-checkbox-btn>
              <span class="text-truncate text-body-1" @click="goToItem(item)">{{
                item.item.displayName
              }}</span>
            </div>
          </div>
        </template>
        <template #phoneNumber="{ item }">
          <div style="direction: ltr" class="text-end">
            {{ item.item.phoneNumber }}
          </div>
        </template>
        <template #roles="{ item }">
          <div>
            <v-chip
              v-if="item.item?.roles"
              style="direction: ltr"
              class="text-end"
              color="secondary-base"
            >
              {{ item.item?.roles?.name }}
            </v-chip>
            <div v-else>-</div>
          </div>
        </template>
        <template #status="{ item }">
          <div class="text-truncate" style="width: 80px">
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
import { useSharedPanelStore } from "@core/stores/sharedPanel";
import { useFilterStore } from "@core/stores/filter";
const sharedStore = useSharedPanelStore();
const filterStore = useFilterStore();

const { t } = useI18n();
const UPLOAD_AVATAR_PATH = "/panel/forms/upload_cover";
let page = ref(1);
let userList = ref(null);
let operations;
let filters;
let headers = ref([
  {
    align: "start",
    key: "displayName",
    sortable: false,
    title: t("display_name"),
    selectAll: true,
    size: "150px",
  },
  {
    key: "email",
    title: t("email"),
    sortable: true,
    size: "150px",
  },
  {
    key: "phoneNumber",
    title: t("phone_number"),
    sortable: false,
    size: "50px",
  },
  {
    key: "roles",
    title: t("role"),
    size: "75px",
    sortable: false,
  },
  { key: "status", title: t("status"), sortable: false, size: "50px" },

  { key: "operation", title: t("operation"), size: "50px" },
]);
let search = ref("");
let payload = computed(() => {
  return {
    page: page.value,
    search: search.value,
    role: filterStore?.filter?.role || "",
    sortKey: sharedStore.sortBy[0]?.key || "",
    sortOrder: sharedStore.sortBy[0]?.order || "",
  };
});
const { $repos } = useNuxtApp();
let dataForm = ref([
  {
    type: "text-field",
    name: "firstName",
    show: true,
    modelValue: ref(""),
    validations: "required",
    label: "first_name",
    size: 6,
    hint: "به زبان فارسی و بدون استفاده از هیچ کاراکتری نوشته شود.",
  },
  {
    type: "text-field",
    name: "lastName",
    show: true,
    modelValue: ref(""),
    validations: "required",
    label: "last_name",
    size: 6,
    hint: "به زبان انگلیسی و بدون فاصله نوشته شود.",
  },
  {
    type: "text-field",
    name: "email",
    show: true,
    modelValue: ref(""),
    size: 6,
    validations: "required|email",
    label: "email",
    hint: false,
  },
  {
    type: "text-field",
    name: "phoneNumber",
    show: true,
    modelValue: ref(""),
    size: 6,
    validations: "",
    label: "phone_number",
    hint: false,
  },
  {
    type: "text-field",
    name: "password",
    show: computed(() => !sharedStore.edit),
    textFieldType: "password",
    modelValue: ref(""),
    size: 6,
    validations: "required",
    label: "password",
    hint: false,
  },

  {
    type: "select",
    modelValue: ref(""),
    selectValue: "id",
    show: true,
    selectTitle: "name",
    name: "roles",
    items: computed(() => sharedStore.listInfo?.roles),
    validations: "required",
    label: "role",
    size: 6,
    hint: false,
  },
  {
    type: "text-area",
    name: "description",
    modelValue: ref(""),
    size: 12,
    validations: "",
    label: "description",
  },
]);
const openDialog = () => {
  sharedStore.dialog = true;
  sharedStore.initForm(dataForm.value);
};
const onSearch = useDebounceFn(
  async () =>
    await sharedStore.getListingItems(
      "usersList",
      payload.value,
      headers.value,
      "sharedPanel"
    ),
  1000,
  {
    maxWait: 5000,
  }
);
const init = () => {
  operations = ref([
    {
      title: "ویرایش",
      hasDialog: true,
      value: "edit",
      function: userList.value.edit,
    },
    {
      title: "حذف کردن",
      value: "deleted",
      function: userList.value.changeItemStatus,
    },
    {
      title: "پنهان کردن",
      value: "hidden",
      function: userList.value.changeItemStatus,
    },
  ]);
  filters = ref([
    {
      type: "dropdown",
      title: "role",
      items: sharedStore.listInfo?.roles,
      key: "name",
      value: "key",
    },
  ]);
};

const submitItem = () => {
  let payload;
  let body = {};
  sharedStore.editForm.forEach((field) => {
    body[field.name] = sharedStore.editForm.find(
      (item) => item.name === field.name
    )?.modelValue;
  });
  if (body.avatarUrl) body.avatarUrl = body.avatarUrl.url;

  if (sharedStore.edit) {
    let itemIndex = sharedStore.listItems.data.findIndex(
      (item) => item.id === sharedStore.currentItem.id
    );
    payload = { ...body, id: sharedStore.currentItem.idtext };
    $repos.sharedPanel.updateUser(payload).then((res) => {
      Object.assign(sharedStore.listItems.data[itemIndex], res);
      sharedStore.edit = false;
      sharedStore.closeDialog();
    });
  } else {
    payload = { ...body, id: 0 };
    $repos.sharedPanel
      .createUser(payload)
      .then((res) => {
        Object.assign(sharedStore.listItems.data, [
          ...sharedStore.listItems.data,
          { ...res },
        ]);
        sharedStore.closeDialog();
      })
      .catch(() => {
        sharedStore.sendingRequest = false;
      });
  }
};
onMounted(async () => {
  await sharedStore.getListingCommon("usersListCommon", "sharedPanel");
  init();
  await sharedStore.getListingItems("usersList", payload.value, "sharedPanel");
});
definePageMeta({
  middleware: ["auth"],
  layout: false,
});
</script>

<style></style>
