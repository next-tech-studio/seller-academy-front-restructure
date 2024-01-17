<template>
  <div class="d-flex justify-space-between align-center">
    <div class="d-flex align-center">
        <p class="text-h1">{{information?.state}}</p>
        <span>،</span>
        <p class="text-h4">{{information?.city}}</p>

    </div>
    <v-btn color="text-primary" class="px-0 d-flex justify-end" variant="text" @click="openDialog">
      <span class="me-1 text-button d-none d-md-flex">{{ $t("edit_information") }}</span>
      <v-icon icon="custom:chevronLeft" size="12" />
    </v-btn>
  </div>
  <v-list lines="one">
    <v-list-item>
      <div class="d-flex justify-space-between">
        <span class="text-text-low-emphasis text-body-1">
          {{ $t("state") }}
        </span>
        <span class="text-text-heading text-body-1">
          {{ information?.state }}
        </span>
      </div>
    </v-list-item>
    <v-divider />
    <v-list-item>
      <div class="d-flex justify-space-between">
        <span class="text-text-low-emphasis text-body-1">
          {{ $t("city") }}
        </span>
        <span class="text-text-heading text-body-1">
          {{ information?.city }}
        </span>
      </div>
    </v-list-item>
    <v-divider />
    <v-list-item>
      <div class="d-flex justify-space-between">
        <span class="text-text-low-emphasis text-body-1">
          {{ $t("continution_of_address") }}
        </span>
        <span class="text-text-heading text-body-1">
          {{ information?.street }}
        </span>
      </div>
    </v-list-item>
    <v-divider />
    <v-list-item>
      <div class="d-flex justify-space-between">
        <span class="text-text-low-emphasis text-body-1">
          {{ $t("block") }}
        </span>
        <span class="text-text-heading text-body-1">
          {{ information?.block }}
        </span>
      </div>
    </v-list-item>
    <v-divider />
    <v-list-item>
      <div class="d-flex justify-space-between">
        <span class="text-text-low-emphasis text-body-1">
          {{ $t("unit") }}
        </span>
        <span class="text-text-heading text-body-1">
          {{ information?.unit }}
        </span>
      </div>
    </v-list-item>
    <v-divider />
    <v-list-item>
      <div class="d-flex justify-space-between">
        <span class="text-text-low-emphasis text-body-1">
          {{ $t("postalcode") }}
        </span>
        <span class="text-text-heading text-body-1">
          {{ information?.postalcode }}
        </span>
      </div>
    </v-list-item>
  </v-list>
  
</template>

<script setup>
import { useSharedPanelStore } from "~/stores/sharedPanel";
const store = useSharedPanelStore();
const UPLOAD_FORM_PATH = "/panel/forms/upload_cover";
const props = defineProps({
  information: Object,
});
let dataForm = ref([
  {
    type: "text-field",
    name: "state",
    modelValue: ref(""),
    validations: "required",
    label: "state",
    size: 6,
    sm:12,
    hint: true,
  },
  {
    type: "text-field",
    name: "city",
    modelValue: ref(""),
    validations: "required",
    label: "city",
    size: 6,
    sm:12,
    hint: true,
  },
  {
    type: "text-field",
    name: "street",
    modelValue: ref(""),
    validations: "",
    label: "continution_of_address",
    size: 12,
    sm:12,
    hint: true,
  },
  {
    type: "text-field",
    name: "block",
    modelValue: ref(""),
    validations: "",
    label: "block",
    size: 4,
    sm:12,
    hint: true,
  },
  {
    type: "text-field",
    name: "unit",
    modelValue: ref(""),
    validations: "",
    label: "unit",
    size: 4,
    sm:12,
    hint: true,
  },
  {
    type: "text-field",
    name: "postalCode",
    modelValue: ref(""),
    validations: "",
    label: "postalcode",
    size: 4,
    sm:12,
    hint: true,
  },
]);
const openDialog = () => {
  store.dialog = true;
  store.edit = true;
  store.currentItem = props.information
  store.initForm(dataForm.value);
};
</script>
