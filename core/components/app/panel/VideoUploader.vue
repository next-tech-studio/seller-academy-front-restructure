<!-- <template>
  <v-btn @click="handleFileImport"> Upload File</v-btn>
  <input
    ref="uploader"
    class="d-none"
    type="file"
    :multiple="false"
    @change="onFileChanged"
  />
</template>
<script setup>
let uploader = ref(null);
const { $repos } = useNuxtApp();
let isSelecting = ref(false);
let selectedFiles = ref([]);
let userInputArray = ref([]);
let fileId = ref('')
let sendingRequest = ref(false);
const props = defineProps({
  modelValue: Object,
});
const emit = defineEmits(["update:modelValue"]);
let uploadedFiles = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
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
  userInputArray.value = Array.from(e.target.files);
  //multiple image import
  selectedFiles.value = userInputArray.value;
  // setRemainderImage(selectedFiles?.value?.length);
  for (let item of selectedFiles?.value) item.url = URL.createObjectURL(item);

  //choose multiple image after initialization

  //single image change

  submit();
};
async function submit() {
  sendingRequest.value = true;
  let formData = new FormData();
  for (let i = 0; i < selectedFiles.value.length; i++) {
    formData.append("file", selectedFiles?.value[i]);
  }
  await $repos.other
    .uploadVideoGenerateId({
      body: formData,
    })
    .then((res) => {
      sendingRequest.value = false;
      fileId.value = res
      Object.assign(uploadedFiles.value, ...res.data);
    //   selectedFiles?.value.splice(0, selectedFiles?.value.length);
    //   userInputArray.value.splice(0, userInputArray?.value.length);
    })
    .catch(() => {
      sendingRequest.value = false;
      url = ref("");
      selectedFiles?.value.splice(0, selectedFiles?.value.length);
    });
}
</script> -->

<!-- 
<template>
  <div id="video-uploader">
    <h1>Welcome to Uppy Vue Demo!</h1>
    <h2>Inline Dashboard</h2>
    <Dashboard
      :uppy="uppy"
      :props="{
        metaFields: [{ id: 'name', name: 'Name', placeholder: 'File name' }],
      }"
    />
    <h2>Modal Dashboard</h2>
    <div>
      <button @click="open = true">Show Dashboard</button>
      <DashboardModal
        :uppy="uppy2"
        :open="true"
        :props="{
          onRequestCloseModal: handleClose,
        }"
      />
    </div>

    <h2>Drag Drop Area</h2>
    <DragDrop
      :uppy="uppy"
      :props="{
        locale: {
          strings: {
            chooseFile: 'Boop a file',
            orDragDrop: 'or yoink it here',
          },
        },
      }"
    />

    <h2>Progress Bar</h2>
    <ProgressBar
      :uppy="uppy"
      :props="{
        hideAfterFinish: false,
      }"
    />
  </div>dd
</template>

<script>
import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import { Dashboard, DashboardModal, DragDrop, ProgressBar } from "@uppy/vue";
import { defineComponent } from "vue";

// const { VITE_TUS_ENDPOINT: TUS_ENDPOINT } = import.meta.env;

export default defineComponent({
  computed: {
    uppy: () =>
      new Uppy({ id: "uppy1", autoProceed: true, debug: true }).use(Tus, {
        endpoint:"https://api-demo-sellerhub.diginext.ir/fa/api/file/upload/large",
      }),
    uppy2: () =>
      new Uppy({ id: "uppy2", autoProceed: false, debug: true }).use(Tus, {
        endpoint:"https://api-demo-sellerhub.diginext.ir/fa/api/file/upload/large",
      }),
  },
  data() {
    return {
      open: false,
      showInlineDashboard: false,
    };
  },
  methods: {
    handleClose() {
      this.open = false;
    },
  },
});
</script>

<style src="@uppy/core/dist/style.css"></style>
<style src="@uppy/dashboard/dist/style.css"></style>
<style src="@uppy/drag-drop/dist/style.css"></style>
<style src="@uppy/progress-bar/dist/style.css"></style>

<style>
#video-uploader {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style> -->

<template>
  <v-btn @click="handleFileImport"> Upload File</v-btn>
  <input
    ref="uploader"
    class="d-none"
    type="file"
    :multiple="false"
    @change="onFileChanged"
  />
  <progress :value="uploadProgress" max="100">{{ uploadProgress }}</progress>
  <!-- <input type="file" @change="handleFileChange" />
  <progress :value="uploadProgress" max="100">{{ uploadProgress }}%</progress> -->
</template>

<script setup>
let uploader = ref(null);
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
  console.log("888888", formData, selectedFiles?.value.file);
  const upload = createUploader(selectedFiles.value.file, {
    // You can override default options here
    uploadSize: selectedFiles.value.file.length,
    metadata: {
      filename: selectedFiles.value.file.name,
      filetype: selectedFiles.value.file.type,
    },
    onSuccess: () => {
      console.log("Upload finished:", upload?.url);
    },
  });
  upload.start();
}

// function handleFileChange(event) {
//   const file = event.target.files[0];
//   if (!file) return;

//   const upload = createUploader(file, {
//     // You can override default options here
//     metadata: {
//       filename: file.name,
//       filetype: file.type,
//     },
//   });

//   upload.start();
// }
</script>
