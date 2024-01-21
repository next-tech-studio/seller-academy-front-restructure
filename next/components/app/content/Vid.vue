<template>
  <app-video-player
    small
    :video-src="content?.url"
    :video-poster="content?.cover"
  >
  </app-video-player>
  <div class="w-100 mt-2">{{ content.caption }}</div>
</template>

<script setup>
defineProps({
    content: Object
})
</script>