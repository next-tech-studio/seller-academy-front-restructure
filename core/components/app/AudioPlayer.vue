<template>
  <v-card rounded="lg" height="461px" class="d-flex align-center">
    <v-img
      :src="audioPoster"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      cover
      height="100%"
      content-class="d-flex align-center justify-center pa-md-16 bg pa-4"
    >
      <v-card
        :width="mdAndUp ? 333 : '100%'"
        :height="mdAndUp ? 333 : '100%'"
        color="transparent"
      >
        <app-video-player
          class="h-100"
          :video-src="audioSrc"
          :video-poster="audioPoster"
          small
          :options="['volume', 'cog']"
          audio-only
        ></app-video-player>
      </v-card>
    </v-img>
  </v-card>
</template>

<script setup>
import { useDisplay } from "vuetify";

const { mdAndUp } = useDisplay();
const props = defineProps({
  item: Object,
  audioSrc: String,
  audioPoster: String,
});
</script>

<style lang="scss">
.bg {
  -webkit-mask: radial-gradient(square, lightgray 50% / cover no-repeat);
  backdrop-filter: blur(16px);
}
</style>
