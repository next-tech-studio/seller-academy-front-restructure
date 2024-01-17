<template>
  <v-btn icon="custom:picture" size="36" @click="handleFileImport(true)">
    <v-icon color="button-primary" icon="custom:picture"></v-icon>
  </v-btn>
  <input
    ref="uploader"
    class="d-none"
    type="file"
    :multiple="chooseMultipleFile"
    @change="onFileChanged"
  />
</template>

<script setup>
let uploader = ref(null);
const emit = defineEmits(["update:modelValue", "update:max"]);
const props = defineProps({
  uploadPath: String,
  modelValue: Array,
  max: Number,
  description: String,
  returnUrl: {
    default: false,
    type: Boolean,
  },
  hasStartButton: {
    type: Boolean,
    default: true,
  },
  roundImages: {
    type: Boolean,
    default: true,
  },
  size: {
    type: Number,
    default: 56,
  },
});
let uploadedFiles = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    console.log('mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm',value)
    emit("update:modelValue", value);
  },
});
let maxCount = computed({
  get() {
    return props.max;
  },
  set(value) {
    emit("update:max", value);
  },
});
let useUploaderArguments = ref({
  uploadedFiles,
  hasCaption: false,
  caption: "",
  max: maxCount,
  uploadPath: props.uploadPath,
  emit,
  uploader,
  multiple: false,
  singleStep: true,
});

let {
  handleFileImport,
  onFileChanged,
  onDeletePhoto,
  fileIndex,
  chooseMultipleFile,
  sendingRequest,
  isSelecting,
  countInput,
} = useUploader(useUploaderArguments.value);

defineExpose({ onDeletePhoto });
</script>

<style lang="scss">
#uploader {
  .utility-position {
    position: absolute;
    right: 0;
    top: 0;
  }
  .panel-uploader {
    border: 1px dashed rgba(var(--v-theme-n300));
    background-color: rgba(var(--v-theme-backgroud-light));
    border-radius: 15px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    cursor: pointer;
  }
  .active-dropzone {
    color: rgba(var(--v-theme-text-light));
    border-color: rgba(var(--v-theme-primary-base));
    background-color: rgba(var(--v-theme-primary-lighten3), 0.5);
  }
}
</style>
