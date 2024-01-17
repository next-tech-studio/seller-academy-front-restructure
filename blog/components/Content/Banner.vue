<template>
  <div
    class="bg-primary-base rounded-lg overflow-hidden pa-4 d-flex flex-wrap"
    id="editor-banner"
  >
    <h2 class="text-text-light w-100 text-center">{{ item.model.title }}</h2>
    <p class="w-100 text-center">{{ item.model.description }}</p>
  </div>
</template>

<script setup>
let props = defineProps({
  item: Object,
});
</script>

<style lang="scss">
#editor-banner {
  .v-text-field input {
    text-align: center !important;
  }
}
</style>
