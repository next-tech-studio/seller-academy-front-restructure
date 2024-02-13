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
        :group-actions="groupActions"
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
            'usersList',
            true,
            payload,
            'sharedPanel'
          )
        "
        @navigate:toItem="goToItem"
        @filter="
          sharedStore.getListingItems('usersList', payload, 'sharedPanel')
        "
      >
        <template #displayName="{ item }">
          <div
            class="d-flex cursor-pointer"
            v-if="item.item.profile.displayName"
          >
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
                item?.item?.profile?.displayName
              }}</span>
            </div>
          </div>
        </template>
        <template #mobile="{ item }">
          <div
            v-if="item.item.profile.mobile"
            style="direction: ltr"
            class="text-end"
          >
            {{ item?.item?.profile?.mobile }}
          </div>
        </template>
        <template #type="{ item }">
          <v-chip
            :color="sharedStore.statusColor(item.item.profile.type)"
            v-if="item.item.profile.type"
          >
            {{ $t(item?.item?.profile?.type) }}
          </v-chip>
        </template>
        <template #roles="{ item }">
          <div
            v-if="item.item.profile.roles"
            style="direction: ltr"
            class="text-end"
          >
            {{ item?.item?.profile?.roles?.displayName }}
          </div>
        </template>
        <template #status="{ item }">
          <div
            v-if="item.item.status"
            class="text-truncate"
            style="width: 80px"
            :class="sharedStore.statusColor(item?.item?.status)"
          >
            <v-icon icon="custom:dot" size="12" class="me-2" />
            <span class="text-body-1">{{ $t(item?.item?.status) }}</span>
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
const UPLOAD_AVATAR_PATH = "/panel/articles/inline_media";
let page = ref(1);
let userList = ref(null);
let operations;
let filters;
let headers = ref([
  {
    align: "start",
    key: "displayName",
    value: "profile.displayName",
    sortable: false,
    title: t("display_name"),
    selectAll: true,
    size: "150px",
  },
  {
    value: "profile.email",
    title: t("email"),
    sortable: true,
    size: "150px",
  },
  {
    value: "profile.mobile",
    key: "mobile",
    title: t("mobile"),
    sortable: false,
    size: "50px",
  },
  {
    value: "role",
    key: "role",
    title: t("role"),
    size: "75px",
    sortable: false,
  },
  {
    value: "status",
    key: "status",
    title: t("status"),
    sortable: false,
    size: "50px",
  },

  { key: "operation", title: t("operation"), size: "50px" },
]);
let groupActions = ref([
  { title: "فعال کردن", value: "active" },
  { title: "غیرفعال کردن", value: "deactive" },
]);
let search = ref("");
let payload = computed(() => {
  return {
    page: page.value,
    search: search.value,
    role: filterStore?.filter?.role || "",
    type: filterStore?.filter?.type || "",
    sortKey: sharedStore.sortBy[0]?.key || "",
    sortOrder: sharedStore.sortBy[0]?.order || "",
  };
});
const { $repos } = useNuxtApp();
let dataForm = ref([
  {
    type: "uploader",
    name: "avatarUrl",
    show: true,
    uploadPath: UPLOAD_AVATAR_PATH,
    modelValue: ref({}),
    size: 12,
    multiple: false,
    maxImage: 1,
    hasStartButton: true,
    validations: "required",
    dataPath: "profile",
  },
  {
    type: "text-field",
    name: "username",
    show: true,
    modelValue: ref(""),
    validations: "required",
    label: "mobile_username",
    size: 6,
    hint: true,
  },
  {
    type: "text-field",
    name: "firstName",
    show: true,
    modelValue: ref(""),
    validations: "required",
    label: "first_name",
    size: 6,
    hint: true,
    dataPath: "profile",
  },
  {
    type: "text-field",
    name: "lastName",
    show: true,
    modelValue: ref(""),
    validations: "required",
    label: "last_name",
    size: 6,
    hint: true,
    dataPath: "profile",
  },
  {
    type: "text-field",
    name: "email",
    show: true,
    modelValue: ref(""),
    size: 6,
    validations: "email",
    label: "email",
    hint: true,
    dataPath: "profile",
  },
  // {
  //   type: "text-field",
  //   name: "mobile",
  //   show: true,
  //   modelValue: ref(""),
  //   size: 6,
  //   validations: "",
  //   label: "mobile_username",
  //   hint: true,
  //   dataPath: "profile",
  // },
  {
    type: "select",
    modelValue: ref(""),
    selectValue: "title",
    show: true,
    selectTitle: "title",
    name: "role",
    items: computed(() => sharedStore.listInfo?.roles),
    validations: "required",
    label: "role",
    size: 6,
    hint: true,
  },
  {
    type: "text-field",
    name: "jobTitle",
    show: true,
    textFieldType: "jobTitle",
    modelValue: ref(""),
    size: 6,
    validations: "",
    label: "job_title",
    hint: true,
    dataPath: "profile",
  },
  {
    type: "text-field",
    name: "linkedin",
    show: true,
    textFieldType: "linkedin",
    modelValue: ref(""),
    size: 6,
    validations: "",
    label: "linkedin",
    hint: true,
    dataPath: "profile",
  },
  {
    type: "text-field",
    name: "password",
    show: computed(() => (sharedStore.edit ? false : true)),
    textFieldType: "password",
    modelValue: ref(""),
    size: 12,
    validations: computed(() => (!sharedStore.edit ? "required" : "")),
    label: "password",
    hint: true,
  },
  {
    type: "text-area",
    name: "description",
    show: true,
    modelValue: ref(""),
    size: 12,
    validations: "",
    label: "description",
    hint: true,
    dataPath: "profile",
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
      "sharedPanel"
    ),
  1000,
  {
    maxWait: 5000,
  }
);
const init = () => {
  operations = ref([
    { title: "ویرایش", value: "edit", function: userList.value.edit },
    {
      title: "غیرفعال کردن",
      value: "active",
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
      profileId: sharedStore.currentItem.profile.id,
    };
    $repos.sharedPanel
      .createUser(payload)
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
      body,
    };
    $repos.sharedPanel
      .createUser(payload)
      .then((res) => {
        console.log("dhcsdhvhcj", res);
        Object.assign(sharedStore.listItems.data, [
          ...sharedStore.listItems.data,
          { ...res.data },
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
  await sharedStore.getListingItems(
    "usersList",
    payload.value,
    // headers.value,
    "sharedPanel"
  );
});
definePageMeta({
  middleware: ["auth", "roles"],
  layout: false,
  permissions: ["blogs", "community", "academy", "users"],
});
</script>

<style></style>
