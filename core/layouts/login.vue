<template>
  <div>
    <v-layout class="h-100vh" dir="rtl">
      <Navbar />
      <v-main>
        <v-divider></v-divider>
        <v-row
          no-gutters
          class="d-flex flex-column flex-md-row"
          :class="{ 'h-100': !mobile }"
        >
          <v-col md="6" sm="12" :order="mobile ? 2 : 1">
            <slot />
          </v-col>
          <v-col
            md="6"
            sm="12"
            :order="mobile ? 1 : 2"
            class="d-flex flex-column justify-md-center"
            :class="{ 'bg-n100': !mobile }"
          >
            <v-card
              :color="
                mobile
                  ? 'rgba(var(--v-theme-background-success), 10%)'
                  : 'transparent'
              "
              class="py-6 rounded-0 rounded-b-xl"
            >
              <v-img
                :max-height="smAndDown ? 160 : 300"
                src="/images/login.svg"
                class="align-self-stretch"
              ></v-img>
            </v-card>
            <template v-if="!smAndDown">
              <div class="text-text-heading text-h3 mb-4 mt-16 text-center">
                {{ $t('welcome_title') }}
              </div>
              <div class="text-text-high-emphasis text-body-1 text-center">
                {{ $t('welcome_description') }}
              </div>
            </template>
          </v-col>
        </v-row>
      </v-main>
      <app-toast></app-toast>
    </v-layout>
  </div>
</template>

<script setup>
import { useDisplay } from "vuetify/lib/framework.mjs";
import Navbar from "./components/navbar/Navbar.vue";
const { mobile, smAndDown } = useDisplay();
</script>

<style scoped>
.h-100vh {
  min-height: 100vh;
  height: 100%;
}
</style>
