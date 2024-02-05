<template>
  <div style="height: 500px" class="postion-relative">
    <v-btn
      icon="custom:simplePlay"
      color="light"
      class="loading-position bg-text-low-emphasis"
      flat
      @click="videoHasNotUploadedYet"
      v-if="!/https/.test(content.url)"
    />
    <app-video-player
      v-else
      small
      :video-src="content?.url"
      :video-poster="content?.cover"
      :options="options"
    >
    </app-video-player>
    <div class="w-100 mt-2">{{ content.caption }}</div>
  </div>
  <app-rejection-approval
    v-model:dialog="dialog"
    approval-or-rejection-message="please_be_patient_your_video_is_processing"
  ></app-rejection-approval>
</template>

<script setup>
let options = [];
let dialog = ref(false);
defineProps({
  content: Object,
});
const videoHasNotUploadedYet = () => {
  dialog.value = true;
};
</script>

<style lang="scss">
.loading-position {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 100000;
  transform: translateY(-50%);
}
</style>
