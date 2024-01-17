<template>
  <div>
    <v-card
      v-if="!uploaded"
      class="dashed-border d-flex align-center justify-center"
      :height="height"
      rounded="lg"
    >
    </v-card>
    <v-card v-else rounded="lg" :height="height">
      <v-img v-if="type == 'image'" :src="modelValue.url"></v-img>
      <app-video-player
        v-if="type == 'video'"
        :video-src="modelValue.url"
        :video-poster="modelValue.cover"
        :options="['volume', 'cog', 'forward', 'fullScreen']"
        small
      >
      </app-video-player>
      <app-audio-player
        v-if="type == 'audio'"
        :audio-src="modelValue.url"
        :audio-poster="modelValue.cover"
      />
    </v-card>
    <div :class="{ uploaded: uploaded, actions: true }">
      <v-file-input
        v-model="fileValue"
        ref="file"
        class="d-none"
      ></v-file-input>
      <v-file-input
        v-model="coverValue"
        ref="cover"
        class="d-none"
      ></v-file-input>
      <v-btn
        v-if="uploaded"
        flat
        color="primary-base"
        class="me-4"
        @click="cover.click()"
      >
        <v-icon icon="custom:uploadPicture" class="me-2"></v-icon>
        {{ $t("add_cover") }}
      </v-btn>
      <div>
        <v-btn flat color="primary-base" class="me-4" @click="file.click()">
          <v-icon icon="custom:video" class="me-2"></v-icon>
          {{ $t(`add_${type}`) }}
        </v-btn>
        <v-btn flat color="primary-base" variant="outlined">
          {{ $t(`add_${type}_from_gallery`) }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
let emit = defineEmits(["update:modelValue"]);
const { $repos } = useNuxtApp();
const props = defineProps({
  type: {
    default: "video",
    type: String,
  },
  modelValue: Object,
});
const file = ref(null);
const cover = ref(null);

let coverValue = computed({
  get() {
    return props.modelValue.cover;
  },
  set(newValue) {
    console.log("coverValue", newValue);
    emit("update:modelValue", { ...props.modelValue, cover: newValue });
    createPreview(newValue[0], "cover");
  },
});

let fileValue = computed({
  get() {
    return props.modelValue.file;
  },
  set(newValue) {
    console.log("fileValue", newValue);
    emit("update:modelValue", { ...props.modelValue, file: newValue });
    createPreview(newValue[0], "url");
  },
});

let uploaded = computed(
  () => !!(props.modelValue.url || props.modelValue.cover)
);

let height = computed(() =>
  uploaded.value && props.type != "video"
    ? 461
    : uploaded.value && props.type == "video"
    ? "100%"
    : 239
);

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
      props.modelValue[type] = res.data[0].url;
    });

  // const reader = new FileReader();
  // reader.onload = (e) => {
  //   props.modelValue[type] = e.target.result;
  // };
  // reader.readAsDataURL(file);
};
</script>

<style lang="scss" scoped>
.dashed-border {
  border: 1px dashed rgba(var(--v-theme-n200)) !important;
}

.actions {
  z-index: 100;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  &.uploaded {
    top: 8%;
    width: 97%;
    justify-content: space-between;
  }
  &:not(.uploaded) {
    top: 50%;
  }
}
</style>
