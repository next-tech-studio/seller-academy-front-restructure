<template>
  <figure class="d-flex" :class="content?.align=='center'? 'justify-center flex-wrap':''">
    <img :src="content?.url" class="mb-1" alt="" />
    <figcaption>{{ content.caption }}</figcaption>
  </figure>


</template>

<script setup>
defineProps({
    content: Object
})
</script>