<template>
  <span
    class="text-text-low-emphasis text-body-1"
    v-html="item?.content"
  ></span>
</template>

<script setup>
const props = defineProps({
    item: Object
})

useShema(props.item, "article");
</script>
