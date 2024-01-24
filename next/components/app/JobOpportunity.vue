<template>
  <div class="d-flex justify-space-between border pa-4 w-100 rounded">
    <div class="d-flex">
      <v-img width="60px" class="me-3" :src="item.imageUrl" />
      <div class="d-flex flex-column">
        <span class="text-body-1 font-weight-bold text-text-heading">{{
          item.title
        }}</span>
        <span class="text-text-low-emphasis text-body-2">{{
          item.owner
        }}</span>
      </div>
    </div>
    <v-chip
      class="text-caption text-text-high-emphasis bg-background-light"
      rounded="sm"
      >{{ item.team }}</v-chip
    >
  </div>
</template>
<script setup>
const props = defineProps({
    item:Object
})
</script>
