<template>
  <v-card color="n100" variant="outlined">
    <v-card-text>
      <v-row :class="{ 'flex-row-reverse': reverse }">
        <v-col cols="12" md="6">
          <v-card :height="mdAndUp ? 388 : 195" color="n100"></v-card>
        </v-col>
        <v-col cols="12" md="6">
          <div class="text-text-heading text-h2 mb-2">{{ item.title }}</div>
          <div class="text-text-heading text-body-1 text-text-high-emphasis mb-2">{{ item.subtitle }}</div>
          <div class="text-text-heading text-body-1 text-text-high-emphasis mb-4">{{ item.text }}</div>
          <v-btn flat color="secondary-base">{{ $t('see_tutorial_article') }}</v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { useDisplay } from "vuetify";
const { mdAndUp } = useDisplay();
const props = defineProps({
  item: Object,
  reverse: {
    default: false,
    type: Boolean,
  },
});
</script>
