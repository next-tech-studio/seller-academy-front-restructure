<template>
  <v-slide-group class="overflow-auto">
    <v-slide-group-item v-for="(item, index) in items" :key="index">
      <v-card class="me-6">
        <v-card-item>
          <v-img width="300" :src="item" />
        </v-card-item>
      </v-card>
    </v-slide-group-item>
  </v-slide-group>
</template>
<script setup>
const props = defineProps({
  items: Array,
});
</script>
