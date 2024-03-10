<template>
  <div class="d-flex justify-space-between align-center">
    <div class="d-flex align-center">
      <v-avatar size="64" class="me-4">
        <v-img cover :src="information?.avatarUrl?.url" />
      </v-avatar>
      <div class="text-text-heading text-body-1 font-weight-bold">
        {{ information?.name }}
      </div>
    </div>
    <v-btn
      color="text-primary"
      class="px-0 d-flex justify-end"
      variant="text"
      @click="openDialog"
    >
      <span class="me-1 text-button d-none d-md-flex">{{
        $t("edit_information")
      }}</span>
      <v-icon icon="custom:chevronLeft" size="12" />
    </v-btn>
  </div>
  <v-list lines="one">
    <v-list-item>
      <div class="d-flex justify-space-between">
        <span class="text-text-low-emphasis text-body-1">
          {{ $t("email_address") }}
        </span>
        <span class="text-text-heading text-body-1">
          {{ information?.email }}
        </span>
      </div>
    </v-list-item>
    <v-divider />
    <v-list-item>
      <div class="d-flex justify-space-between">
        <span class="text-text-low-emphasis text-body-1">
          {{ $t("phone_number") }}
        </span>
        <span class="text-text-heading text-body-1">
          {{ information?.phone }}
        </span>
      </div>
    </v-list-item>
    <v-divider />
    <v-list-item>
      <div class="d-flex justify-space-between">
        <span class="text-text-low-emphasis text-body-1">
          {{ $t("birthdate") }}
        </span>
        <span class="text-text-heading text-body-1">
          {{ $moment(information?.birthday).format("jYYYY/jMM/jDD") }}
        </span>
      </div>
    </v-list-item>
    <v-divider />
    <v-list-item>
      <div class="d-flex justify-space-between">
        <span class="text-text-low-emphasis text-body-1">
          {{ $t("job") }}
        </span>
        <span class="text-text-heading text-body-1">
          {{ information?.job }}
        </span>
      </div>
    </v-list-item>
    <v-divider />
    <v-list-item>
      <div class="d-flex justify-space-between">
        <span class="text-text-low-emphasis text-body-1">
          {{ $t("category") }}
        </span>
        <span class="text-text-heading text-body-1">
          {{ information?.category }}
        </span>
      </div>
    </v-list-item>
    <v-divider />
    <v-list-item>
      <div class="d-flex justify-space-between">
        <span class="text-text-low-emphasis text-body-1">
          {{ $t("shop_link") }}
        </span>
        <a v-if="information?.shopLink" class="text-text-heading text-body-1" :href="information?.shopLink" terget="_blank">
          {{ information?.shopLink }}
        </a>
      </div>
    </v-list-item>
  </v-list>
</template>

<script setup>
import { useSharedPanelStore } from "~/stores/sharedPanel";
const store = useSharedPanelStore();
const UPLOAD_PATH = "/community/questions/attachment";
let dataForm = ref([
  {
    type: "uploader",
    name: "avatarUrl",
    uploadPath: UPLOAD_PATH,
    modelValue: ref({}),
    size: 1,
    sm: 3,
    multiple: false,
    maxImage: 1,
    hasStartButton: true,
    validations: "required",
  },
  {
    type: "text-field",
    name: "firstName",
    modelValue: ref(""),
    validations: "required",
    label: "first_name",
    size: 5,
    sm: 9,
    hint: true,
  },
  {
    type: "text-field",
    name: "lastName",
    modelValue: ref(""),
    validations: "required",
    label: "last_name",
    size: 6,
    sm: 12,
    hint: true,
  },
  {
    type: "text-field",
    name: "email",
    modelValue: ref(""),
    validations: "required|email",
    label: "email",
    size: 6,
    sm: 12,
    hint: true,
  },
  {
    type: "date-picker",
    name: "birthday",
    readOnly: true,
    modelValue: ref(""),
    validations: "",
    label: "birthdate",
    size: 6,
    sm: 12,
    hint: true,
  },
  {
    type: "text-field",
    name: "phone",
    modelValue: ref(""),
    readOnly:true,
    disabled:true,
    validations: "required",
    label: "phone_number",
    size: 6,
    sm: 12,
    hint: true,
  },
  {
    type: "text-field",
    name: "job",
    modelValue: ref(""),
    validations: "",
    label: "job",
    size: 6,
    sm: 12,
    hint: true,
  },
  {
    type: "text-field",
    name: "category",
    modelValue: null,
    validations: "",
    label: "category",
    size: 6,
    sm: 12,
    hint: true,
  },

  {
    type: "text-field",
    name: "shopLink",
    modelValue: ref(""),
    validations: "",
    label: "shop_link",
    size: 6,
    sm: 12,
    hint: true,
  },
]);
const openDialog = () => {
  store.dialog = true;
  store.edit = true;
  store.currentItem = props.information;
  store.initForm(dataForm.value);
};
const props = defineProps({
  information: Object,
});
</script>
