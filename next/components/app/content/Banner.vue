<template>
  <div
    @click="goToBannerUrl"
    class="bg-primary-base rounded-lg overflow-hidden pa-4 d-flex flex-wrap"
    id="editor-banner"
  >
    <h2 class="text-text-light w-100 text-center">{{ content.title }}</h2>
    <p class="w-100 text-center">{{ content.description }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  content: Object,
});
const goToBannerUrl = ()=>{
  console.log('uuurrll', props.content)
  window.open(props.content.link);
}
</script>

<style lang="scss">
#editor-banner {
  cursor: pointer;
  .v-text-field input {
    text-align: center !important;
  }
}
</style>
