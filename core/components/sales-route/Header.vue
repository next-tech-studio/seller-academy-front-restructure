<template>
  <v-card color="n100" class="rounded-b-lg rounded-0 overflow-visible">
    <v-container class="position-relative">
      <div class="mb-lg-10 mb-0" :class="lgAndUp ? 'w-50' : 'w-100'">
        <div class="text-h2 text-lg-h1 text-text-heading mt-lg-16 mt-3">
          {{ $t("sales_route_in_digikala") }}
        </div>
        <div class="text-h5 text-text-high-emphasis mb-lg-8 mb-4">
          {{ $t("sales_route_in_digikala_description") }}
        </div>
        <div class="text-h5 text-text-high-emphasis mb-lg-8 mb-4">
          {{ $t("sales_route_in_digikala_pros") }}
        </div>
        <v-row>
          <v-col cols="12" md="6" v-for="(item, index) in pros" :key="index">
            <v-icon
              class="bg-text-high-emphasis rounded-pill me-4"
              size="24"
              icon="custom:check"
            ></v-icon>
            {{ item }}
          </v-col>
        </v-row>
      </div>
      <div class="image__fixed">
        <v-img src="/images/sales-route.png"></v-img>
      </div>
    </v-container>
  </v-card>
</template>

<script setup>
import { useDisplay } from "vuetify";
const { lgAndUp } = useDisplay();
const pros = ref([
  "فروشی به وسعت ایران",
  "فروشی به وسعت ایران",
  "ایجاد آگاهی در خصوص برند",
  "ایجاد آگاهی در خصوص برند",
  "تجربه رشد فروش",
  "تجربه رشد فروش",
]);
</script>

<style lang="scss">
.image__fixed {
  position: absolute;
  top: 120px;
  left: 0;
  width: 500px;

  @include respond("md") {
    position: relative;
    width: 100%;
    top: 50px;
    bottom: 0;
  }

  @include respond("sm") {
    position: relative;
    width: 100%;
    top: 50px;
    bottom: 0;
  }
}
</style>
