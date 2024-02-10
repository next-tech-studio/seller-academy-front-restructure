<template>
  <div
    class="d-flex align-center"
    id="uploader"
    :style="{ height: `${size}px` }"
  >
    <!-- 1. Create the button that will be clicked to select a file -->
    <div class="d-flex h-100 align-center">
      {{ uploadedFiles }}dfadf
      <slot name="activator">
        <v-btn
          v-bind="$attrs"
          :size="`${size}px`"
          class="d-flex align-center justify-center"
          color="icon-secondary"
          variant="flat"
          icon
          @click="handleFileImport(true)"
          :loading="sendingRequest"
          v-if="
            (uploadedFiles?.length == 0 ||
              Object.keys(uploadedFiles).length == 0) &&
            hasStartButton
          "
        >
          <v-icon
            icon="custom:picture"
            :size="`${size / 2}px`"
            color="text-text-light"
          />
        </v-btn>
        <div v-if="multiple" class="d-flex">
          <div
            v-for="index in max"
            :key="index"
            class="h-100 d-flex align-center"
          >
            <v-btn
              class="mx-1 pa-0 border-dashed border-sm d-flex align-center justify-center"
              flat
              @click="handleFileImport(true, index - 1)"
              color="text-low-emphasis"
              :rounded="roundImages ? 'md' : 'pill'"
              :loading="loading[index - 1]"
              :size="`${size}px`"
              variant="outlined"
              v-if="uploadedFiles.length != 0 || !hasStartButton"
            >
              <div class="d-flex flex-column justify-center align-center">
                <v-icon
                  color="icon-high-emphasis"
                  icon="custom:uploadFile"
                  class="mb-1"
                  :size="`${size / 2.5}px`"
                />
                <span
                  class="text-text-high-emphasis"
                  :style="{ fontSize: `${size / 4}px` }"
                  >{{ $t("upload") }}</span
                >
              </div>
            </v-btn>
          </div>
        </div>
        <div v-else-if="!hasStartButton && !(max - (Object.keys(uploadedFiles).length || uploadedFiles?.length))">
          <v-btn
              class="mx-1 pa-0 border-dashed border-sm d-flex align-center justify-center"
              flat
              @click="handleFileImport(true, index - 1)"
              color="text-low-emphasis"
              :rounded="roundImages ? 'md' : 'pill'"
              :loading="loading[index - 1]"
              :size="`${size}px`"
              variant="outlined"
            >
              <div class="d-flex flex-column justify-center align-center">
                <v-icon
                  color="icon-high-emphasis"
                  icon="custom:uploadFile"
                  class="mb-1"
                  :size="`${size / 2.5}px`"
                />
                <span
                  class="text-text-high-emphasis"
                  :style="{ fontSize: `${size / 4}px` }"
                  >{{ $t("upload") }}</span
                >
              </div>
            </v-btn>
        </div>
      </slot>
    </div>
    <input
      ref="uploader"
      class="d-none"
      type="file"
      :multiple="chooseMultipleFile"
      @change="onFileChanged"
    />
    <div v-if="uploadedFiles.length != 0 && multiple" class="d-flex h-100">
      <div
        v-for="(item, index) in uploadedFiles"
        :key="index"
        class="position-relative h-100 mx-2 d-flex align-center"
      >
        <v-btn
          class="ma-0 pa-0 overflow-hidden"
          flat
          icon
          :rounded="roundImages ? 'md' : 'pill'"
          :width="`${size}px`"
          :height="`${size}px`"
          @click="handleFileImport(false, index, 'subs')"
        >
          <v-img
            :src="item.url"
            cover
            :class="roundImages ? 'rounded-md' : 'rounded-pill'"
            :width="`${size}px`"
            :height="`${size}px`"
          >
          </v-img>
        </v-btn>
        <v-btn
          class="bg-background-light border ma-0 utility-position"
          size="18px"
          :class="
            roundImages
              ? 'rounded-ts-md rounded-bs-0 round-be-sm rounded-te-0'
              : 'rounded-pill'
          "
          @click="onDeletePhoto(index)"
        >
          <v-icon size="10" icon="custom:trash" color="icon-primary"></v-icon>
        </v-btn>
      </div>
    </div>
    <div
      v-if="
        !multiple &&
        !!(max - (Object.keys(uploadedFiles).length || uploadedFiles?.length)) &&
        (uploadedFiles?.length > 0 || Object.keys(uploadedFiles).length)
      "
      class="position-relative h-100 ms-2 d-flex align-center"
    >
      <v-btn
        class="ma-0 pa-0 overflow-hidden"
        flat
        icon
        :rounded="roundImages ? 'md' : 'pill'"
        :width="`${size}px`"
        :height="`${size}px`"
        @click="handleFileImport(false, index, 'subs')"
      >
        <v-img
          :src="uploadedFiles.url"
          cover
          :class="roundImages ? 'rounded-md' : 'rounded-pill'"
          :width="`${size}px`"
          :height="`${size}px`"
        >
        </v-img>
      </v-btn>
      <v-btn
        class="bg-background-light border ma-0 utility-position"
        size="18px"
        :class="
          roundImages
            ? 'rounded-ts-md rounded-bs-0 round-be-sm rounded-te-0'
            : 'rounded-pill'
        "
        @click="onDeletePhoto(index)"
      >
        <v-icon size="10" icon="custom:trash" color="icon-primary"></v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script setup>
let uploader = ref(null);
const emit = defineEmits(["update:modelValue", "update:max"]);
const props = defineProps({
  uploadPath: String,
  modelValue: Array,
  hasCaption: {
    type: Boolean,
    default: false,
  },
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
  multiple: {
    type: Boolean,
    default: true,
  },
  size: {
    type: Number,
    default: 56,
  },
});
let loading = ref([]);
const requesting = (index) => {
  if (index === fileIndex.value && sendingRequest.value)
    loading.value[index] = true;
};
let uploadedFiles = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

onMounted(() => {
  for (let i = 0; i < props.max; i++) loading.value.push(false);
});
let useUploaderArguments = ref({
  uploadedFiles,
  hasCaption: props.hasCaption,
  caption: "",
  max: props.max,
  returnUrl: props.returnUrl,
  uploadPath: props.uploadPath,
  emit,
  uploader,
  multiple: props.multiple,
  singleStep: false,
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

watch(sendingRequest, (newValue) => {
  if (newValue === true && countInput.value < 2)
    loading.value[fileIndex.value] = true;
  else if (newValue === true && countInput.value > 1) {
    for (let i = 0; i <= countInput.value; i++) {
      loading.value[(fileIndex.value + i) % props.max] = true;
    }
  } else {
    console.log(loading.value.length);
    for (let i = 0; i <= props.max; i++) loading.value[i] = false;
  }
});
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
