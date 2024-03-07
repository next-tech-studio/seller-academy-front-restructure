<template>
  <NuxtLayout name="sidebar">
    <v-container fluid class="pa-8">
      <app-listing
        ref="certificatesList"
        :items="sharedStore.listItems"
        :headers="headers"
        :info="sharedStore.listInfo.counts"
        :store="sharedStore"
        listing-title="certificates"
        :show-dialog="false"
        :add-new-item="false"
        v-model:page="payload.page"
        v-model:searchModel="payload.search"
        @update:searchModel="onSearch"
        @show:dialog="openDialog"
        @update:itemStatus="
          sharedStore.changeItemStatus(
            $event,
            'updateSkillStatus',
            'certificatesList',
            payload,
            'academyPanel'
          )
        "
        @update:page="
          sharedStore.getListingItems('certificatesList', payload,'academyPanel')
        "
        default-status="active"
        :table-actions="operations"
        @update:items="submitItem"
        @init:form="sharedStore.initForm(dataForm)"
        @edit="downloadImage(sharedStore.currentItem.certificateFile, sharedStore.currentItem.course)"
        @navigate:toItem="goToItem"
        hide-group-action
      >
        <template #displayName="{ item }">
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
              <v-avatar class="me-2" size="32">
                <v-img :src="item.item.avatarUrl"> </v-img>
              </v-avatar>
              <span class="text-truncate text-body-1">{{
                item.item.displayName
              }}</span>
            </div>
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
import {useSharedPanelStore} from "@core/stores/sharedPanel";
const sharedStore = useSharedPanelStore();
const localePath = useLocalePath();
const { t } = useI18n();
let page = ref(1);
let certificatesList = ref(null);
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
    key: "course",
    sortable: false,
    title: t("course_name"),
    selectAll: false,
    size: "200px",
  },
  {
    align: "start",
    key: "category",
    sortable: false,
    title: t("category"),
    selectAll: false,
    size: "200px",
  },
  {
    align: "start",
    key: "finalScore",
    sortable: true,
    title: t("final_score"),
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
    sortKey: sharedStore.sortBy[0]?.key || "",
    sortOrder: sharedStore.sortBy[0]?.order || "",
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
  sharedStore.dialog = true;
  sharedStore.initForm(dataForm.value);
};
const onSearch = useDebounceFn(
  async () =>
    await sharedStore.getListingItems(
      "certificatesList",
      payload.value,
      "academyPanel"
    ),
  1000,
  {
    maxWait: 5000,
  }
);
const init = () => {
  operations = ref([
    { title: "ویرایش", value: "download", function: certificatesList.value.edit },
  ]);
};
const submitItem = () => {
  let payload;
  let formTitle = sharedStore.editForm.find((item) => item.name === "title");
  let formDescription = sharedStore.editForm.find(
    (item) => item.name === "description"
  );
  if (sharedStore.edit) {
    let itemIndex = sharedStore.listItems.data.findIndex(
      (item) => item.id === sharedStore.currentItem.id
    );
    payload = {
      body: {
        id: sharedStore.currentItem.id,
        title: formTitle.modelValue,
        description: formDescription.modelValue,
        status: sharedStore.currentItem.status,
      },
    };
    $repos.academyPanel.updateSkill(payload).then((res) => {
      Object.assign(sharedStore.listItems.data[itemIndex], res);
      sharedStore.edit = false;
      sharedStore.closeDialog();
    });
  } else {
    payload = {
      body: {
        title: formTitle.modelValue,
        description: formDescription.modelValue,
      },
    };
    $repos.academyPanel.updateSkill(payload).then((res) => {
      Object.assign(sharedStore.listItems.data, [
        ...sharedStore.listItems.data,
        { ...res },
      ]);
      sharedStore.closeDialog();
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
onMounted(() => {
  init();
  sharedStore.getListingCommon("certificatesListCommon", "academyPanel");
  sharedStore.getListingItems(
    "certificatesList",
    payload.value,
    "academyPanel"
  );
});
definePageMeta({
  middleware: ["auth"],
  layout: false,
});

const downloadImage = async (imageSrc, nameOfDownload = "my-image.png") => {
  const response = await fetch(imageSrc);

  const blobImage = await response.blob();

  const href = URL.createObjectURL(blobImage);

  const anchorElement = document.createElement("a");
  anchorElement.href = href;
  anchorElement.download = nameOfDownload;

  document.body.appendChild(anchorElement);
  anchorElement.click();

  document.body.removeChild(anchorElement);
  window.URL.revokeObjectURL(href);
};
</script>

<style></style>
