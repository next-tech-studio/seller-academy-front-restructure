<template>
  <div class="bg-n800 py-16">
    <v-container fluid>
      <div class="text-center mb-lg-12 mb-6">
        <h3 class="mb-4">{{ $t("title_of_start_ups_and_portfo") }}</h3>
        <span>{{ $t("desc_of_start_ups_and_portfo") }}</span>
      </div>
      <div>
        <v-slide-group
          :class="{ 'hide-slider-control': !lgAndUp }"
          next-icon="custom:chevronRight"
          prev-icon="custom:chevronLeft"
        >
          <v-slide-group-item
            v-for="(item, index) in items"
            :key="index"
            v-slot="{ isSelected, toggle }"
          >
            <portfo-startup-card
              @click="$emit('to:item', item)"
              class="me-4"
              width="318"
              :item="item"
            ></portfo-startup-card>
          </v-slide-group-item>
        </v-slide-group>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import { useDisplay } from "vuetify";

const { lgAndUp } = useDisplay();
const props = defineProps({
  startups: Array,
});
let items = computed(() => {
  return props.startups;
});
</script>
