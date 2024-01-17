
import type { VListItemSubtitle } from 'vuetify/lib/components/index.mjs';

<template>
  <v-card class="py-10">
    <v-container>
      <div class="text-h2 text-text-heading">پرتکرارترین پرسش‌های متداول</div>
      <v-tabs
        v-model="current"
        color="primary-base"
        class="mb-6"
        align-tabs="start"
      >
        <v-tab
          v-for="(item, index) in items"
          :key="index"
          class="text-subtitle-1 font-weight-bold"
          :value="index"
        >
          {{ item.title }}
        </v-tab>
      </v-tabs>
      <v-window v-model="current">
        <v-window-item v-for="n in items.length" :key="n" :value="n - 1">
          <app-content-faq
            gap="16"
            density="compact"
            hide-title
            parrent-padding="px-0"
            :content="items[current].faq"
          />
        </v-window-item>
      </v-window>
    </v-container>
  </v-card>
</template>

<script setup>
const props = defineProps({
  items: Array,
});

let current = ref(0)
</script>
