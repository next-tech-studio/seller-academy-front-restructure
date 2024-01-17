<template>
  <app-video-player
    small
    :video-src="content?.url"
    :video-poster="content?.cover"
    :options="options"
  >
  </app-video-player>
  <div class="w-100 mt-2">{{ content.caption }}</div>
</template>

<script setup>
let options = []
defineProps({
    content: Object
})
</script>