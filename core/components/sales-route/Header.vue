<template>
  <v-card color="primary-base" class="rounded-b-lg rounded-0 overflow-visible">
    <v-container class="position-relative">
      <v-row class="mt-lg-16 mt-3">
        <v-col cols="12" md="6" class="mb-lg-10 mb-0">
          <div>
            <div class="text-h2 text-lg-h1 text-text-light">
              {{ $t("sales_route_in_digikala") }}
            </div>
            <div class="text-h5 text-text-light mb-lg-8 mb-4">
              {{ $t("sales_route_in_digikala_description") }}
            </div>
            <div class="text-h5 text-text-light mb-lg-8 mb-4">
              {{ $t("sales_route_in_digikala_pros") }}
            </div>
          </div>
          <v-row>
            <v-col cols="12" md="6" v-for="(item, index) in pros" :key="index">
            <v-icon
              class="bg-secondary-base rounded-pill me-4"
              size="24"
              icon="custom:check"
            ></v-icon>
            {{ item }}
          </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="6">
          <v-img src="/images/sales_route.png" alt="sales route header"></v-img>
        </v-col>
      </v-row>
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
