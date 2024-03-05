<template>
  <v-card
    rounded="lg"
    height="500"
    class="d-flex justify-center align-center position-relative"
  >
    <!-- <div class="bg-red">{{  uploadProgress == 100}}</div>
    <div class="bg-yellow">{{ !!/https/.test(uploadedFiles.url) }}</div>
    <div class="bg-orange">{{ !!uploadedFiles.url  }}</div> -->
    <v-btn
      icon="custom:simplePlay"
      color="light"
      class="loading-position bg-text-low-emphasis"
      flat
      @click="videoHasNotUploadedYet"
      v-if="
        (!!uploadedFiles.url || !!/https/.test(uploadedFiles.url)) &&
        (uploadProgress == 100 || uploadProgress == 0)
      "
    />
    <app-video-player
      v-if="/https/.test(uploadedFiles.url) && type == 'video'"
      :video-src="uploadedFiles.url"
      :options="['volume', 'cog', 'forward', 'fullScreen']"
      small
    >
    </app-video-player>
    <app-audio-player
      v-if="type == 'audio' && /https/.test(uploadedFiles.url)"
      :audio-src="uploadedFiles.url"
      :audio-poster="uploadedFiles.cover"
    />
    <v-btn
      prepend-icon="custom:uploadPicture"
      color="button-primary"
      class="me-3 mb-3"
      v-if="!uploadProgress && !uploadedFiles.url"
      @click="handleFileImport"
    >
      <span class="text-button" v-if="type == 'video'">{{
        $t("upload_video")
      }}</span>
      <span class="text-button" v-if="type == 'audio'">{{
        $t("upload_audio")
      }}</span>
    </v-btn>
    <!-- <v-btn @click="handleFileImport"> {{ 'upload_video' }}</v-btn> -->
    <input
      ref="uploader"
      class="d-none"
      type="file"
      :multiple="false"
      @change="onFileChanged"
    />
    <v-btn
      v-if="uploadProgress == 100 && type=='audio'"
      flat
      prepend-icon="custom:uploadPicture"
      color="primary-base"
      class="me-4 cover-button-position"
      :text="$t('add_cover')"
      @click="cover.click()"
    />
    <v-file-input
      v-model="coverValue"
      ref="cover"
      class="d-none"
    ></v-file-input>
    <v-progress-circular
      color="primary-base"
      :rotate="360"
      :model-value="uploadProgress"
      :size="100"
      v-if="uploadProgress && !uploadedFiles.url && uploadProgress <= 99"
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
let cover = ref(null);
const endpoint =
  "https://napi.arvancloud.ir/vod/2.0/channels/0b9bc134-caf3-4887-98eb-4b370c1f381b/files";
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
  type: {
    default: "video",
    type: String,
  },
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
  return originalString.substring(wordIndex + word.length);
};

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
      uploadedFiles.value.url = removeAfterWord(upload.url, "files/");
    },
  });
  upload.start();
}

const videoHasNotUploadedYet = () => {
  dialog.value = true;
};

const createPreview = async (file, type) => {
  let formData = new FormData();
  formData.append("files[0]", file);
  await $repos.other
    .uploadFiles(
      {
        body: formData,
      },
      "/panel/articles/inline_media",
      true
    )
    .then((res) => {
      console.log("0e0e0e0e0", res.data[0].url);
      // uploadedFiles.value[type] = res.data[0].url
      // Object.assign(uploadedFiles.value[type]?.url,res.data[0].url)
      emit("update:modelValue", {
        ...uploadedFiles.value,
        cover: { url: res.data[0].url },
      });
      // uploadedFiles.value[type].url = res.data[0].url;
      console.log("838383838", props.modelValue);
    });

  // const reader = new FileReader();
  // reader.onload = (e) => {
  //   props.modelValue[type] = e.target.result;
  // };
  // reader.readAsDataURL(file);
};
let coverValue = computed({
  get() {
    return props.modelValue.cover;
  },
  set(newValue) {
    console.log("coverValue", newValue);
    // emit("update:modelValue", { ...uploadedFiles.value, cover: newValue });
    createPreview(newValue[0], "cover");
  },
});
</script>

<style>
.cover-button-position {
  position: absolute;
  top: 1%;
  left: 0;
}
</style>
