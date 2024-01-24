<template>
  <v-card-text
    id="html"
    class="text-text-low-emphasis text-body-1 content"
    v-html="content.model || content"
  ></v-card-text>
</template>

<script setup>
defineProps({
  content: String,
});
</script>

<style>
#html.content img, #html.content video {
  max-width: 100%;
  object-fit: contain;
  height: auto;
  display: flex;
  flex-direction: column;
  margin: 16px auto;
  border-radius: 16px;
}
</style>
