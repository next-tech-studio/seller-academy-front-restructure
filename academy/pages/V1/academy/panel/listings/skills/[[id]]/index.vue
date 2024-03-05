<template>
  <NuxtLayout name="sidebar">
    <v-container fluid class="pa-8">
      <app-listing
        ref="skillList"
        :items="sharedStore.listItems"
        :headers="headers"
        :info="sharedStore.listInfo.counts"
        :store="sharedStore"
        listing-title="skills"
        :show-dialog="true"
        :add-new-item="true"
        dialog-start-button-title="add_new_skill"
        :dialog-title="sharedStore.edit?'edit_skill':'add_new_skill'"
        v-model:page="payload.page"
        v-model:searchModel="payload.search"
        @update:searchModel="onSearch"
        @show:dialog="openDialog"
        dialog-subtitle="add_new_skill_description"
        @update:itemStatus="
          sharedStore.changeItemStatus(
            $event,
            'updateSkillStatus',
            'skillsList',
            payload,
            'academyPanel'
          )
        "
        @update:page="
          sharedStore.getListingItems('skillsList', payload,'academyPanel')
        "
        default-status="active"
        :table-actions="operations"
        @update:items="submitItem"
        @init:form="sharedStore.initForm(dataForm)"
        @edit="
          sharedStore.editListing('edit', dataForm, null, null, null, true, null)
        "
        @navigate:toItem="goToItem"
      >
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
        <!-- <template #studentsCount="{ item }">
          <div class="text-center">
            {{ item.item.studentsCount }}
          </div>
        </template> -->
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
let skillList = ref(null);
let operations;
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
    key: "courses_count",
    title: t("course_count"),
    sortable: false,
    size: "50px",
  },
  {
    key: "description",
    title: t("description"),
    sortable: true,
    size: "100px",
  },
  { key: "status", title: t("status"), sortable: false, size: "50px" },
  {
    key: "studentsCount",
    title: t("students_count"),
    size: "50px",
    sortable: true,
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
    name: "slug",
    modelValue: ref(""),
    validations: "required",
    label: "slug",
    size: 12,
    hint: true,
  },
  {
    type: "text-field",
    name: "description",
    modelValue: ref(""),
    size: 12,
    validations: "",
    label: "related_descriptions",
    hint: false,
  },
  // {
  //   type: "select",
  //   modelValue: ref(""),
  //   // show:true,
  //   name: "status",
  //   items: computed(() => sharedStore.listInfo?.status),
  //   validations: "required",
  //   label: "status",
  //   size: 12,
  //   hint: false,
  //   show: sharedStore.edit
  // },
]);
const openDialog = () => {
  sharedStore.dialog = true;
  sharedStore.initForm(dataForm.value);
};
const onSearch = useDebounceFn(
  async () =>
    await sharedStore.getListingItems(
      "skillsList",
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
    { title: "ویرایش", value: "edit",hasDialog:true, function: skillList.value.edit },
    {
      title: "حذف کردن",
      value: "deleted",
      function: skillList.value.changeItemStatus,
    },
    {
      title: "پنهان کردن",
      value: "hidden",
      function: skillList.value.changeItemStatus,
    },
  ]);
};
const submitItem = () => {
  console.log('hhhheellooooooo')
  let payload;
  let body = {};
  sharedStore.editForm.forEach((field) => {
    body[field.name] = sharedStore.editForm.find(
      (item) => item.name === field.name
    )?.modelValue;
  });
  if (body.avatarUrl) body.avatarUrl = body.avatarUrl.url;
  payload = {
    body: { ...body, id: sharedStore.currentItem.id || 0, status: "active" },
  };
  if (sharedStore.edit) {
    let itemIndex = sharedStore.listItems.data.findIndex(
      (item) => item.id === sharedStore.currentItem.id
    );
    $repos.academyPanel.updateSkill(payload).then((res) => {
      Object.assign(sharedStore.listItems.data[itemIndex], res);
      sharedStore.edit = false;
      sharedStore.closeDialog();
    }).catch(() => sharedStore.sendingRequest = false);
  } else {
    $repos.academyPanel.updateSkill(payload).then((res) => {
      Object.assign(sharedStore.listItems.data, [
        { ...res },
        ...sharedStore.listItems.data,
      ]);
      sharedStore.closeDialog();
    }).catch(() => sharedStore.sendingRequest = false);
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
  sharedStore.getListingCommon("skillsListCommon", "academyPanel");
  sharedStore.getListingItems(
    "skillsList",
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
