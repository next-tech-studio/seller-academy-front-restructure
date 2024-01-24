
import { Style } from '.nuxt/components';
<template>
  <v-row>
    <v-col cols="12" lg="6">
      <div :class="{ 'w-75': lgAndUp }">
        <div class="text-h2 font-weight-bold mb-2">
          {{ $t("mentors_header_title") }}،
        </div>
        <div class="text-h2 font-weight-bold mb-2">
          {{ $t("mentors_header_moto") }}
        </div>
        <div class="text-body-1 mb-6">
          {{ $t("mentors_header_description") }}
        </div>
        <v-btn color="primary-base" variant="outlined" class="mt-6" size="large" href="#mentors">
          {{ $t("see_mentors") }}
          <v-icon class="ms-2" icon="custom:chevronDown"></v-icon>
        </v-btn>
      </div>
    </v-col>
    <v-col cols="12" lg="6">
      <div class="rounded-lg overflow-hidden">
        <v-img
          cover
          :height="lgAndUp ? 295 : 148"
          class="rounded-s-pill"
          src="/images/start-up-header.png"
        ></v-img>
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import { useDisplay } from "vuetify";

const { lgAndUp } = useDisplay();
</script>

<style lang="scss"></style>
