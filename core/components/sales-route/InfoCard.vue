<template>
  <v-card variant="outlined">
    <v-card-text
      class="text-md-center text-start py-md-8 pb-4 pt-2 d-flex flex-row flex-md-column align-center"
    >
      <v-avatar
        v-if="icon"
        class="bg-text-high-emphasis mb-lg-4 mb-0 me-4 me-md-0"
        :icon="icon"
      ></v-avatar>
      <div :class="{ 'd-flex justify-space-between w-100': flexOnMobile }">
        <div class="text-text-heading text-h5 mb-lg-4 mb-2">{{ title }}</div>
        <div class="text-text-high-emphasis text-body-2 mb-lg-4 mb-2">
          {{ description }}
        </div>
        <v-btn v-if="actionable" variant="outlined" color="primary-base">{{
          actionText
        }}</v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
const props = defineProps({
  title: String,
  description: String,
  actionText: String,
  icon: String,
  actionable: {
    default: true,
    type: Boolean,
  },
  flexOnMobile: {
    default: false,
    type: Boolean,
  },
});
</script>
