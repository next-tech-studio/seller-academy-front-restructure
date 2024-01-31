<template>
  <slot name="activator" :open="openDialog">
    <v-btn @click="openDialog">{{ $t("participate_in_the_course") }}</v-btn>
  </slot>
  <app-dialog-form
    :store="sharedStore"
    button-title=""
    subtitle=""
    save-title="edit"
    :title="$t('pre_registration') + ' ' + item.title"
    ref="dialogForm"
    :add-new-item="false"
    @update:fields="$emit('submit')"
  >
    <template #formActions>
      <slot name="formActions"></slot>
    </template>
    <template #description>
      <div class="text-body-2 text-text-high-emphasis mb-4">
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده
        از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و
        سطرآنچنان که لازم است.
      </div>
    </template>
    <template #resumeDescription>
      <div class="text-body-2 text-text-high-emphasis font-weight-bold">
        {{ $t("your_resume") }}
      </div>
      <div class="text-body-2 text-text-low-emphasis">
        {{ $t("your_resume_description") }}
      </div>
    </template>
    <template #downloadQuiz>
      <div class="d-flex justify-space-between align-center">
        <div class="text-body-2 font-weight-bold">
          {{ $t("pre_registration_quiz") }}
        </div>
        <v-btn
          class="text-body-2 font-weight-bold px-0 animated"
          variant="text"
          color="primary-base"
          >{{ $t("download_quiz") }}</v-btn
        >
      </div>
      <div class="text-text-high-emphasis text-body-2 py-4">
        {{ $t("pre_registration_quiz_description") }}
      </div>
    </template>
  </app-dialog-form>
</template>

<script setup>
import { useSharedPanelStore } from "@core/stores/sharedPanel";
const sharedStore = useSharedPanelStore();
const UPLOAD_PATH = "/panel/articles/inline_media";
const props = defineProps({
  item: Object,
});
let dataForm = ref([
  {
    type: "slot",
    name: "description",
  },
  {
    type: "label",
    name: "general_info",
    modelValue: ref(""),
    label: "general_info",
    size: 12,
    hint: "",
    color: "text-text-high-emphasis",
  },
  {
    type: "text-field",
    name: "firstName",
    modelValue: ref(""),
    validations: "required",
    label: "first_name",
    size: 6,
    hint: false,
  },
  {
    type: "text-field",
    name: "lastName",
    modelValue: ref(""),
    validations: "required",
    label: "last_name",
    size: 6,
    hint: false,
  },
  {
    type: "text-field",
    name: "email",
    modelValue: ref(""),
    validations: "required|email",
    label: "email",
    size: 6,
    hint: false,
  },
  {
    type: "text-field",
    name: "mobile",
    modelValue: ref(""),
    validations: "required",
    label: "mobile",
    size: 6,
    hint: false,
  },
  {
    type: "divider",
    size: 12,
  },
  {
    type: "slot",
    name: "resumeDescription",
    size: 11,
  },
  {
    type: "uploader",
    name: "resume",
    uploadPath: UPLOAD_PATH,
    modelValue: ref({}),
    size: 1,
    multiple: false,
    maxImage: 1,
    validations: "required",
    hasStartButton: false,
    roundImages: "md",
  },
  {
    type: "divider",
    size: 12,
  },
  {
    type: "slot",
    name: "downloadQuiz",
    size: 12,
  },
  {
    type: "label",
    name: "add_answer",
    modelValue: ref(""),
    label: "add_answer",
    size: 2,
    hint: "",
    color: "text-text-high-emphasis",
  },
  {
    type: "uploader",
    name: "resume",
    uploadPath: UPLOAD_PATH,
    modelValue: ref({}),
    size: 10,
    multiple: false,
    maxImage: 1,
    hasStartButton: true,
    validations: "required",
    hasStartButton: false,
    roundImages: "md",
  },
  {
    type: "divider",
    size: 12,
  },
  {
    type: "label",
    name: "motivation",
    modelValue: ref(""),
    label: "motivation",
    size: 12,
    hint: "",
    color: "text-text-high-emphasis",
  },
  {
    type: "text-area",
    name: "description",
    modelValue: ref(""),
    size: 12,
    label: "motivation_description",
  },
]);
const installments = ref([
  {
    percent: "قسط اول (۵۰٪)",
    description: "جهت ثبت‌نام",
    price: "۲.۲۵۰.۰۰۰ تومان",
  },
  {
    percent: "قسط دوم (۲۵٪)",
    description: "پیش از جلسه ۴ ام",
    price: "۱.۲۵۰.۰۰۰ تومان",
  },
  {
    percent: "قسط سوم (۲۵٪)",
    description: "پیش از جلسه ۸ ام",
    price: "۱.۲۵۰.۰۰۰ تومان",
  },
]);
const openDialog = (context) => {
  console.log("context", context);
  sharedStore.dialog = true;
  sharedStore.currentItem = props.item;
  sharedStore.edit = true;
  console.log(dataForm, props.item);
  sharedStore.initForm(dataForm.value);
};
</script>
