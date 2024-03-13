<template>
  <NuxtLayout name="sidebar">
    <v-container fluid class="pa-8">
      <app-listing
        ref="forms"
        :items="sharedStore.listItems"
        :headers="headers"
        listing-title="forms"
        dialog-start-button-title="add_new_form"
        :dialog-title="sharedStore.edit ? 'edit_form' : 'add_new_form'"
        :store="sharedStore"
        :show-dialog="true"
        :add-new-item="true"
        v-model:page="payload.page"
        v-model:searchModel="payload.search"
        @update:searchModel="onSearch"
        dialog-subtitle="add_new_form_description"
        view-address="/article/category/"
        @update:page="
          sharedStore.getListingItems('getForms', payload, 'sharedPanel')
        "
        @update:items="submitItem"
        @update:hardDelete="remove"
        @show:dialog="openDialog"
        @edit="
          sharedStore.editListing(
            'edit',
            dialogForm,
            null,
            null,
            null,
            true,
            null
          )
        "
        :hard-delete="true"
        @navigate:toItem="goToItem"
        :table-actions="operations"
      >
      <template #url="{ item, header }">
        <div dir="ltr" class="text-truncate" :style="`width:${header.header.size} !important`">{{ item.item.url }}</div>
      </template>
      </app-listing>
    </v-container>
  </NuxtLayout>
</template>

<script setup>
import { useSharedPanelStore } from "~/stores/sharedPanel";
const sharedStore = useSharedPanelStore();
import { useFilterStore } from "~/stores/filter";
const filterStore = useFilterStore();
const localePath = useLocalePath();
const { t } = useI18n();
const { $repos } = useNuxtApp();
let page = ref(1);
let forms = ref(null);
let items = reactive({});
const UPLOAD_FORM_PATH = "/panel/forms/upload_cover";
let search = ref("");
let operations;
let payload = computed(() => {
  return {
    page: page.value,
    search: search.value,
    status: filterStore.filter.status || "",
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
    key: "text",
    title: t("description"),
    sortable: false,
    size: "600px",
  },
  {
    key: "url",
    title: t("link"),
    sortable: false,
    size: "250px",
  },
  { key: "operation", title: t("operation"), size: "50px", sortable: false },
]);
let dialogForm = ref([
  {
    type: "uploader",
    name: "cover_url",
    uploadPath: UPLOAD_FORM_PATH,
    modelValue: ref({}),
    size: 1,
    multiple: false,
    maxImage: 1,
    hasStartButton: true,
    validations: "required",
  },
  {
    type: "text-field",
    name: "title",
    modelValue: ref(""),
    validations: "required",
    label: "title",
    size: 11,
  },
  {
    type: "text-field",
    name: "url",
    modelValue: ref(""),
    validations: "required",
    label: "link",
    size: 12,
  },
  {
    type: "text-area",
    name: "text",
    modelValue: ref(""),
    validations: "required",
    label: "description",
    size: 12,
    rows: 6,
  },
]);
const init = () => {
  operations = ref([
    {
      title: "ویرایش انتشار",
      value: "edit",
      icon: "custom:pencil",
      hasDialog: true,
      api: "updateCommentStatus",
      function: forms.value.edit,
    },
    {
      title: "حذف کردن",
      value: "deleted",
      icon: "custom:trash",
      function: forms.value.changeItemStatus,
    },
  ]);
  // sharedStore.initForm(dialogForm.value);
};
const openDialog = () => {
  sharedStore.dialog = true;
  console.log("dialogFormm", dialogForm.value);
  sharedStore.initForm(dialogForm.value);
};
const onSearch = useDebounceFn(
  async () =>
    await sharedStore.getListingItems("getForms", payload.value, "sharedPanel"),
  1000,
  {
    maxWait: 5000,
  }
);

const remove = (e) => {
  $repos.sharedPanel.deleteForm(e).then(() => {
    let formIndex = sharedStore.listItems.data.findIndex(
      (element) => element.id == e
    );
    sharedStore.listItems.data.splice(formIndex, 1);
  });
};
const submitItem = () => {
  let payload;
  let body = {};
  sharedStore.editForm.forEach((field) => {
    body[field.name] = sharedStore.editForm.find(
      (item) => item.name === field.name
    )?.modelValue;
  });
  if (body.cover_url) body.cover_url = body.cover_url.url;
  // let formTitle = sharedStore.editForm.find((item) => item.name === "title");
  // let formCover = sharedStore.editForm.find((item) => item.name === "image");
  // let formLink = sharedStore.editForm.find((item) => item.name === "link");
  // let formText = sharedStore.editForm.find((item) => item.name === "text");
  if (sharedStore.edit) {
    let itemIndex = sharedStore.listItems.data.findIndex(
      (item) => item.id === sharedStore.currentItem.id
    );
    payload = { ...body, id: sharedStore.currentItem.id };
    $repos.sharedPanel
      .updateForm(payload)
      .then((res) => {
        Object.assign(sharedStore.listItems.data[itemIndex], res);
        sharedStore.edit = false;
        sharedStore.closeDialog();
      })
      .catch(() => {
        sharedStore.sendingRequest = false;
      });
  } else {
    payload = { ...body, id: 0 };
    $repos.sharedPanel
      .updateForm(payload)
      .then((res) => {
        Object.assign(sharedStore.listItems.data, [
          { ...res },
          ...sharedStore.listItems.data,
        ]);
        console.log("yesssss", sharedStore.listItems.data, res);
        sharedStore.closeDialog();
      })
      .catch(() => {
        sharedStore.sendingRequest = false;
      });
  }
};
const goToItem = () => {
  navigateTo(
    localePath({
      path: "/article/category/" + `${sharedStore.currentItem.slug}`,
    }),
    {
      external: true,
    }
  );
};
onMounted(async () => {
  // await sharedStore.getListingCommon("commentListCommon", "sharedPanel");
  init();
  await sharedStore.getListingItems("getForms", payload.value, "sharedPanel");
});
definePageMeta({
  middleware: ["auth"],
  layout: false,
});
</script>

<style></style>
