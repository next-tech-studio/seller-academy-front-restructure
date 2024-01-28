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

<style lang="scss">
#html {
  .content {
    video,
    img {
      max-width: 100%;
      object-fit: contain;
      height: auto;
      display: flex;
      flex-direction: column;
      margin: 16px auto;
      border-radius: 16px;
    }
  }
  table,
  th,
  td,
  tr {
    border: 1px solid rgba(var(--v-theme-text-high-emphasis));
    border-collapse: collapse;
  }
  table {
    min-width: 100% !important;
  }
}
</style>
