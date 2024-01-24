<template>
  <v-row
    class="py-10 bg-background-dark"
  >
    <v-col cols="6" lg="3" v-for="(item, index) in statistics" :key="index" class="text-center">
      <h2>{{ $t(item.value) }}</h2>
      <span class="text-body-1 text-text-high-emphasis">{{ $t(item.title) }}</span>
    </v-col>
  </v-row>
</template>
<script setup>
const props = defineProps({
  statistics: Object,
});
</script>
