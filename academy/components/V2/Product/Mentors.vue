<template>
  <v-row v-if="items.length">
    <v-col v-if="title" cols="6" lg="3" xxl="2" class="pa-2 text-h3 text-text-heading">{{ title }}</v-col>
    <v-col
      v-for="(item, index) in items"
      :key="index"
      :cols="6"
      lg="3"
      xxl="2"
      class="pa-2"
    >
      <about-us-member-card :item="item" />
    </v-col>
  </v-row>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  title: {
    default: "",
    type: String,
  },
});
</script>
