<template>
  <v-card class="d-flex flex-md-row flex-column">
    <div class="mb-4">
      <div class="text-text-heading text-h5 mb-4">{{ title }}</div>
      <div
        class="text-text-high-emphasis text-body-2 mb-4"
        v-html="description?.replace(/(\\r)*\\n/g, '<br>')"
      ></div>
      <v-btn v-if="actionable" variant="outlined" color="primary-base">{{
        actionText
      }}</v-btn>
    </div>
    <v-card rounded="lg" width="400" height="230" color="n100" v-if="url">
      <!-- <app-content
        type="vid"
        :content="{ url }"
      ></app-content> -->
    </v-card>
  </v-card>
</template>

<script setup>
const props = defineProps({
  title: String,
  description: String,
  actionText: String,
  actionStyle: String,
  url: String,
  icon: String,
  actionable: {
    default: true,
    type: Boolean,
  },
});
</script>
