<template>
  <v-card class="text-center" style="position: relative" :rounded="lgAndUp ? 1 : 0">
    <v-icon
      color="text-primary"
      class="p-absolute-right"
      icon="custom:doodle"
      size="83"
    ></v-icon>
    <v-img
      :src="getPublicImage('/images/academy_header.jpg', 'academy')"
      gradient="180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.8) 100%"
      cover
      max-height="398px"
      class="align-end"
    >
      <div class="w-50 mx-auto pb-6">
        <v-card-title class="text-md-h1 text-h5 text-text-light pb-2 pt-0">
          {{ $t("deep_learning") }}
        </v-card-title>
        <v-card-text
          class="text-md-h3 text-subtitle text-text-primary pb-2 pt-0"
        >
          <v-icon icon="custom:doodleChevronLeft"></v-icon>
          <span class="font-weight-bold">{{ $t("online_training") }}</span>
        </v-card-text>
        <v-card-text
          class="d-md-block d-none text-body-2 text-text-disabled pb-2 pt-0"
        >
          {{ $t("academy_header_description") }}
        </v-card-text>
        <!-- <v-card-actions class="justify-center pt-0">
              <v-btn variant="flat" color="button-primary" class="text-button">{{ $t("cta") }}</v-btn>
            </v-card-actions> -->
      </div>
    </v-img>
    <v-icon
      color="icon-light"
      class="p-absolute-left"
      icon="custom:doodleStar"
      size="40"
    ></v-icon>
  </v-card>
</template>

<script setup>
  import { useDisplay } from "vuetify";
const { lgAndUp } = useDisplay();
</script>

<style scoped>
.p-absolute-right {
  position: absolute;
  right: 24px;
  top: 24px;
  z-index: 10;
}

.p-absolute-left {
  position: absolute;
  left: 24px;
  bottom: 24px;
  z-index: 10;
}
</style>
