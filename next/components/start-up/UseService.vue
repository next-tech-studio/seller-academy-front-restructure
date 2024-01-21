<template>
  <v-row class="bg-text-hint-caution rounded-lg">
    <v-col cols="12" lg="10" class="pa-10">
      <p class="text-subtitle-1 font-weight-bold mb-4">
        {{ $t("in_favour_of_using_this_startup_services") }}
      </p>
      <p class="text-body-1">{{ $t("use_our_services_desc") }}</p>
    </v-col>
    <v-col  cols="12" lg="2" class="pa-0">
      <v-img height="180" class="transform-flip" src="/images/circles.svg">
        <div class="w-100 d-flex justify-end justify-lg-start px-4">
          <v-btn
            :block="!lgAndUp ? true : false"
            class="text-button transform-flip text-primary-base px-10 bg-background-light ms-10"
            variant="outlined"
            size="x-large"
            @click="$emit('open:dialog')"
            rounded="lg"
            >{{ $t("use_services") }}</v-btn
          >
        </div>
      </v-img>
    </v-col>
  </v-row>
</template>
<script setup>
import { useDisplay } from "vuetify";
const { lgAndUp } = useDisplay();
const props = defineProps({
  services: Array,
});
</script>

<style lang="scss" scoped>
.circle-background {
  display: flex;
  align-items: center;
  transform: scaleX(-1);
  background: url("/images/circles.svg") no-repeat;
  background-size: contain;
}
.transform-flip {
  transform: scaleX(-1);
  display: flex;
  align-items: center;
}
</style>
