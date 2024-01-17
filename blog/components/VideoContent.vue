<template>
  <video-player
    small
    :video-src="item?.videoUrl"
    :video-poster="item?.previewUrl"
  >
  </video-player>
  <div class="w-100">{{ item.description }}</div>
</template>

<script setup>
const props = defineProps({
    item: Object
})

useShema(props.item, "video");
</script>
