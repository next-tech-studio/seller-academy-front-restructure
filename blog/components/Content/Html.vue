<template>
  <v-card-text
    class="text-text-low-emphasis text-body-1"
    v-html="item?.model || item"
  ></v-card-text>
</template>

<script setup>
const props = defineProps({
  item: Object,
});

useShema(props.item, "article");
</script>
