<template>
  <div class="d-flex align-center" id="editor-uploader">
    <div
      :style="{ width: `${areaSize.width}`, height: `${areaSize.height}` }"
      :class="description ? 'mb-8' : ''"
      class="position-relative"
    >
      <div v-if="showImage">
        <slot
          name="outlineEdit"
          :fileImport="handleFileImport"
          :deleteFile="onDeletePhoto"
        ></slot>
      </div>
      <div class="panel-uploader rounded-lg h-100" :class="isEmpty">
        <div class="d-flex align-center justify-center flex-wrap" v-if="showButtons">
          <v-btn
            prepend-icon="custom:uploadPicture"
            color="button-primary"
            class="me-3 mb-3"
            @click="handleFileImport(false)"
          >
            <span class="text-button">{{ $t("add_picture") }}</span>
          </v-btn>
          <!-- <v-btn variant="outlined" class="me-3 mb-3" color="button-primary">
            <span class="text-button">{{ $t("add_from_gallery") }}</span>
          </v-btn> -->
        </div>
        <div class="w-100 text-center" v-if="sendingRequest">
          <v-progress-circular
            indeterminate
            color="primary-base"
          ></v-progress-circular>
        </div>

        <div
          class="d-flex flex-column"
          style="height: 100%; width: 100%"
          v-if="showImage"
        >
          <v-img
            cover
            width="100%"
            :height="blogContent ? '80%' : '100%'"
            :src="uploadedFiles?.url || uploadedFiles"
          >
            <div class="d-flex justify-end ma-4">
              <v-btn
                color="background-dark"
                class="me-2"
                @click="handleFileImport(false)"
              >
                <span class="text-button text-text-low-emphasis">
                  <v-icon icon="custom:uploadPicture"></v-icon>
                  {{ $t("change_picture") }}</span
                >
              </v-btn>
              <v-btn color="background-dark" @click="onDeletePhoto()">
                <span class="text-button text-text-low-emphasis">
                  <v-icon icon="custom:trash"></v-icon>
                  {{ $t("delete_picture") }}</span
                >
              </v-btn>
            </div>
          </v-img>
          <v-textarea
            v-if="blogContent"
            placeholder="برای تصویر کپشن بنویسید(اختیاری)"
            no-resize
            v-model="modelValue.caption"
            variant="solo"
            rows="1"
            flat
          ></v-textarea>
        </div>
      </div>
      <span v-if="description" class="text-text-low-emphasis text-subtitle-1">{{
        $t(description)
      }}</span>
    </div>
    <input
      ref="uploader"
      class="d-none"
      type="file"
      :multiple="chooseMultipleFile"
      @change="onFileChanged"
    />
  </div>
</template>

<script setup>
let uploader = ref(null);
const emit = defineEmits(["update:moedlValue", "update:max"]);
const props = defineProps({
  uploadPath: String,
  modelValue: Object,
  align: { type: String, default: "center" },
  blogContent: {
    type: Boolean,
    default: false,
  },
  max: {
    type: Number,
    default: 1,
  },
  areaSize: Object,
  description: String,
  returnUrl: {
    default: false,
    type: Boolean,
  },
  blogContent: {
    default: false,
    type: Boolean,
  },
});
let showImage = computed(() => {
  if (props.blogContent)
    return uploadedFiles.value.url && !sendingRequest.value;
  else return !!uploadedFiles.value.url && !sendingRequest.value;
});
let showButtons = computed(() => {
  if (props.blogContent)
    return !uploadedFiles.value.url && !sendingRequest.value;
  else {
    return !uploadedFiles.value.url && !sendingRequest.value;
  }
});

let isEmpty = computed(() => {
  if (!props.modelValue?.url || !props.modelValue)
    return "border-sm border-dashed text-n300";
  else return "";
});
let caption = computed({
  get() {
    return props.modelValue?.caption;
  },
  set(newValue) {
    return newValue;
  },
});
let uploadedFiles = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:moedlValue", value);
  },
});
let useUploaderArguments = ref({
  uploadedFiles,
  blogContent: props.blogContent,
  caption,
  max: props.max,
  returnUrl: props.returnUrl,
  uploadPath: props.uploadPath,
  emit,
  uploader,
  align: props.align,
  multiple: false,
  singleStep:false
});
let {
  handleFileImport,
  onFileChanged,
  onDeletePhoto,
  fileIndex,
  chooseMultipleFile,
  sendingRequest,
  isSelecting,
} = useUploader(useUploaderArguments.value);
</script>

<style lang="scss">
#editor-uploader {
  .utility-position {
    position: absolute;
    right: 0;
    top: 4px;
  }
  .panel-uploader {
    // border: 1px dashed rgba(var(--v-theme-n300));
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
  .v-textarea textarea {
    text-align: center !important;
  }
}
</style>
