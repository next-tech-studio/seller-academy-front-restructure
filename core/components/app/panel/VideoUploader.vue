<template>
   <v-card rounded="lg" height="500" class="d-flex justify-center align-center">
  <v-btn
    icon="custom:simplePlay"
    color="light"
    class="loading-position bg-text-low-emphasis"
    flat
    @click="videoHasNotUploadedYet"
    v-if="!!/https/.test(uploadedFiles.url) || !!uploadedFiles.url || uploadProgress==100"
  />
  <app-video-player
    v-if="type == 'video' && /https/.test(uploadedFiles.url)"
    :video-src="uploadedFiles.url"
    :options="['volume', 'cog', 'forward', 'fullScreen']"
    small
  >
  </app-video-player>
  <v-btn
    prepend-icon="custom:uploadPicture"
    color="button-primary"
    class="me-3 mb-3"
    v-if="!uploadProgress && !uploadedFiles.url"
    @click="handleFileImport"
  >
    <span class="text-button">{{ $t("upload_video") }}</span>
  </v-btn>
  <!-- <v-btn @click="handleFileImport"> {{ 'upload_video' }}</v-btn> -->
  <input
    ref="uploader"
    class="d-none"
    type="file"
    :multiple="false"
    @change="onFileChanged"
  />
  <v-progress-circular
    color="primary-base"
    :rotate="360"
    :model-value="uploadProgress"
    :size="100"
    v-if="uploadProgress  && !uploadedFiles.url && uploadProgress !='100'"
  >
    {{ uploadProgress }}%
  </v-progress-circular>
  <app-rejection-approval
    v-model:dialog="dialog"
    approval-or-rejection-message="please_be_patient_your_video_is_processing_please_submit_the_content"
  ></app-rejection-approval>
</v-card>

  <!-- <progress :value="uploadProgress" max="100">{{ uploadProgress }}</progress> -->
  <!-- <input type="file" @change="handleFileChange" />
  <progress :value="uploadProgress" max="100">{{ uploadProgress }}%</progress> -->
</template>

<script setup>
let uploader = ref(null);
let dialog = ref(false);
const endpoint ="https://napi.arvancloud.ir/vod/2.0/channels/0b9bc134-caf3-4887-98eb-4b370c1f381b/files";
const { $repos } = useNuxtApp();
let isSelecting = ref(false);
let selectedFiles = ref([]);
let fileId = ref(null);
let offsetLength = ref(0);
const emit = defineEmits(["update:modelValue"]);
let sendingRequest = ref(false);
const { uploadProgress, createUploader } = useTus();
const props = defineProps({
  modelValue: Object,
});
let uploadedFiles = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
const removeAfterWord = (originalString, word) => {
  const wordIndex = originalString.indexOf(word);
  if (wordIndex === -1) {
    return originalString; // The word isn't found, return the original string
  }
  // Return the part of the string after the word.
  // wordIndex + word.length to include the word itself in the result.
  return originalString.substring(wordIndex + word.length);
  // const parts = originalString.split(word);
  // return parts[1]; // Contains the string before the word
}

const handleFileImport = (index = 0) => {
  window.addEventListener(
    "focus",
    () => {
      isSelecting.value = false;
    },
    { once: true }
  );
  uploader.value.click();
};
const onFileChanged = (e) => {
  selectedFiles.value.url = URL.createObjectURL(e.target.files[0]);
  selectedFiles.value.file = e.target.files[0];

  submit();
};
const checkStatus = () => {
  $repos.other.uploadStatus({ fileId: fileId.value }).then((res) => {
    offsetLength.value = res.offsetLength;
  });
};
async function submit() {
  sendingRequest.value = true;
  let formData = new FormData();
  formData.append("file", selectedFiles?.value.file);
  const upload = createUploader(selectedFiles.value.file, {
    // You can override default options here
    uploadSize: selectedFiles.value.file.length,
    metadata: {
      filename: selectedFiles.value.file.name,
      filetype: selectedFiles.value.file.type,
    },
    onSuccess: () => {
      console.log("Upload finished:", upload?.url);
    //   let originalStr = "Blue Earth";
    // let newStr = upload.url.replace("files/", ""); // Output: " Earth"
      uploadedFiles.value.url = removeAfterWord(upload.url,'files/')
    },
  });
  upload.start();
}

const videoHasNotUploadedYet = () => {
  dialog.value = true;
};
</script>
