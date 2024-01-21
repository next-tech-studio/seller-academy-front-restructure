<template>
  <v-card
    class="header rounded-0 rounded-b-2lg"
    height="65vh"
    color="primary-base"
  >
    <v-container fluid class="d-flex align-center h-100 justify-center">
      <div class="header__desc">
        <h1 class="text-md-h2 font-weight-bold text-h3">{{ $t("company_brief") }}</h1>
        <div class="mt-md-2 mt-0 mb-md-6 mb-2 text-md-body-1 text-caption">{{ $t("company_description") }}</div>
        <v-btn
          variant="flat"
          color="n900"
          @click="navigateTo(localePath({ name: 'about-us' }))"
          >{{ $t("about_us") }}</v-btn
        >
      </div>
      <v-img
        :height="lgAndUp ? '75%' : '50%'"
        class="main_header__img text-center"
        src="/images/home-header.png"
      ></v-img>
    </v-container>
  </v-card>
</template>
<script setup>
import { useDisplay } from 'vuetify';

const {smAndDown, lgAndUp} = useDisplay()
const localePath = useLocalePath();
</script>
<style lang="scss" scoped>
.main_header__img {
  background: lightgray 50% / no-repeat;
  mix-blend-mode: lighten;
  width: 50%;
  align-self: flex-end;
  transform: scale(1.25);

  @include respond(md) {
    transform: scale(2);
  }

  @include respond(sm) {
    position: absolute;
    // top: 50%;
    // transform: translateY(-50%);
    width: 100%;
    opacity: 0.5;
    top: 100%;
    transform: translateY(-120%) scale(3);
  }
}
.header__desc {
  width: 50%;
  z-index: 10;
  @include respond(md) {
    position: absolute;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 85%;
  }
}
</style>
