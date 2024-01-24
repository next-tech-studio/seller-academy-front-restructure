<template>
  <v-row class="d-flex align-center">
    <v-col cols="12" lg="9">
      <h3 class="mb-4">{{ $t("about") }} {{ item.title }}</h3>
      <p class="text-body-1 text-text-low-emphasis columned-text" :class="{'w-75': lgAndUp}">
        {{ item.about }}
      </p>
    </v-col>
    <v-col cols="12" lg="3" class="d-flex justify-end">
      <v-img src="/images/circle.png" class="d-flex justify-space-between align-center">
        <v-img width="40%" class="bg mx-auto" :src="item.logoUrl" />
      </v-img>
    </v-col>
  </v-row>
</template>
<script setup>
import { useDisplay } from 'vuetify/lib/framework.mjs';

const {lgAndUp} = useDisplay()
const props = defineProps({
  item: Object,
});
</script>

<style lang="scss">
// .columned-text {
//   @include respond("sm") {
//     column-count: 1;
//   }
//   column-count: 2;
// }
</style>
