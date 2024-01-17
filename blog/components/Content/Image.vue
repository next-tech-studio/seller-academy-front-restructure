<template>
  <figure class="d-flex" :class="item?.align=='center'? 'justify-center flex-wrap':''">
    <img :src="item?.url" class="mb-1" alt="" />
    <figcaption>{{ item.caption }}</figcaption>
  </figure>
</template>

<script setup>
const props = defineProps({
  item: Object,
});
</script>
