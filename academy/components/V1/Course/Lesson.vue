<template>
  <v-card class="d-flex flex-column">
    <v-card-text class="d-flex justify-space-between">
      <span>{{ lesson.title }}</span>
    </v-card-text>
    <v-divider class="mx-4"></v-divider>
    <v-card-text>
      <slot />
    </v-card-text>
    <slot name="actions"></slot>
  </v-card>
</template>

<script setup>
defineProps({
  lesson: Object,
});
</script>
