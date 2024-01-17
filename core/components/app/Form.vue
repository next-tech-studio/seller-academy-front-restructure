<template>
  <v-card max-width="610" @click="toForm">
    <div class="d-flex justify-start">
      <v-img class="rounded-lg me-4" aspect-ratio="1.65" width="50%" cover :src="item.cover_url.url" />
      <div class="d-flex flex-wrap h-100 align-self-start">
        <v-card-title class="pa-0 mb-2 w-100">
          {{ item.title }}
        </v-card-title>
        <v-card-text class="pa-0 mb-2 w-100">
          <p class="truncate-3 text-body-2 text-text-low-emphasis">
            {{ item.text }}
          </p>
        </v-card-text>
        <v-btn
          variant="text"
          class="text-text-secondary text-button align-self-end pa-0 align-end"
          :text="$t('see_more')"
        ></v-btn>
      </div>
    </div>
  </v-card>
</template>
<script setup>
const props = defineProps({
  item: Object,
});
const toForm = () => {
  window.open(props.item.url);
};
</script>
