<template>
  <v-card
    id="start-up-card"
    height="206"
    class="d-flex flex-column position-relative"
    :color="item.color"
  >
    <v-img cover :src="item.thumbnailUrl" />
    <div class="card-footer justify-space-between pa-2">
      <v-card-text class="py-0 d-flex justify-space-between align-center">
        <div>
          <p class="text-h5 text-text-heading">{{ item.title }}</p>
        <span class="text-text-low-emphasis">{{ item.startedAt }}</span>
        </div>
        <v-btn icon variant="outlined" color="primary-base" size="39">
          <v-icon icon="custom:chevronLeft" v-if="localeStore.locale == 'fa'" />
          <v-icon icon="custom:chevronRight" v-if="localeStore.locale == 'en'" />
        </v-btn>
      </v-card-text>
    </div>
  </v-card>
</template>
<script setup>
import { useLocaleStore } from "~/stores/locale";
let localeStore = useLocaleStore();
const props = defineProps({
  item: Object,
});
</script>
<style lang="scss" scoped>
  .card-footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    background-color: rgba(var(--v-theme-n200), 0.6);
  }
  .v-card:hover {
    .v-btn {
      background-color: rgba(var(--v-theme-primary-base));
    }
    .v-icon {
      color: white;
    }
  }

</style>
