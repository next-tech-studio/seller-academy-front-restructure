<template>
  <v-card
    class="header rounded-0 d-flex"
    :min-height="mdAndUp ? '58vh' : '60vh'"
    color="primary-base"
  >
    <v-container fluid>
      <div class="d-flex align-center flex-lg-row flex-column">
        <div class="w-lg-50 w-100">
          <h1 class="mb-2 text-h2">{{ $t("portfo_title") }}</h1>
          <div class="mt-2 mb-6 text-body-1" style="">
            {{ $t("portfo_desc") }}
          </div>
          <!-- <v-btn
            size="large"
            variant="flat"
            color="light"
            class="text-button-1 text-primary-base"
            :to="{ name: 'about-us' }"
          >
            {{ $t("about_us") }}
            <v-icon
              class="ms-2"
              :icon="
                $vuetify.locale.isRtl
                  ? 'custom:chevronLeft'
                  : 'custom:chevronRight'
              "
            />
          </v-btn> -->
        </div>
        <div
          class="w-lg-50 w-100 d-flex position-relative mt-lg-10 mt-6 mb-16"
          :style="`height: ${mdAndUp ? '294px' : '160px'}`"
        >
          <v-img
            v-for="(item, index) in headerPhotos"
            :src="item"
            :key="index"
            :width="xxl ? '94px' : xl ? '80px' : '57px'"
            class="mx-lg-4 mx-2 header__photo"
            :style="headerPosition(index)"
          ></v-img>
        </div>
      </div>
    </v-container>
    <!-- {{ useDisplay() }} -->
  </v-card>
</template>
<script setup>
import { useDisplay } from "vuetify";

const { mdAndUp, lgAndUp, xl, xxl } = useDisplay();

let headerPhotos = [
  "/images/portfo-header1.png",
  "/images/portfo-header2.png",
  "/images/portfo-header3.png",
  "/images/portfo-header4.png",
  "/images/portfo-header5.png",
];
const headerPosition = (index) => {
  return {
    "--header-top-postion":
      index == 1
        ? ` ${index * 70}px`
        : index == 3
        ? ` ${index * 5}px`
        : ` ${index * 15}px`,
    "--header-left-postion": ` ${mdAndUp.value ? index * 15 : index * 20}%`,
  };
};
</script>
<style lang="scss" scoped>
.header__img {
  opacity: 0.5;
  background: lightgray 50% / no-repeat;
  mix-blend-mode: lighten;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  @include respond(sm) {
    top: 100%;
    transform: translateY(-150%) scale(3);
  }
}
.header__photo {
  position: absolute !important;
  height: 291px;
  top: var(--header-top-postion);
  left: var(--header-left-postion);
}
.center-justified {
  text-align: justify;
  text-align-last: center;
}
</style>
