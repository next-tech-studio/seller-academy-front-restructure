<template>
  <v-card>
    <v-container>
      <div class="d-flex align-center mb-4">
        <v-btn disabled flat class="bg-icon-dark" icon>{{ order }}</v-btn>
        <v-btn disabled flat class="bg-white text-text-heading">{{ title }}</v-btn>
        <v-divider></v-divider>
      </div>
      <div class="text-body-1 mb-4" v-html="description?.replace(/(\\r)*\\n/g, '<br>')"></div>
      <slot></slot>
    </v-container>
  </v-card>
</template>

<script setup>
const props = defineProps({
  order: String,
  title: String,
  description: String,
});
</script>
