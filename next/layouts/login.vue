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
            class="d-flex flex-column justify-md-center h-100"
            :class="{ 'bg-n100': !mobile }"
          >
          <v-img
                src="/images/login.jpg"
                cover
              ></v-img>
            <!-- <v-card
              :color="
                mobile
                  ? 'rgba(var(--v-theme-background-success), 10%)'
                  : 'transparent'
              "
              class="py-6 rounded-0 rounded-b-xl h-100"
            >
              <v-img
                src="/images/login.jpg"
                cover
              ></v-img>
            </v-card> -->
            <!-- <template v-if="!smAndDown">
              <div class="text-text-heading text-h3 mb-4 text-center">
                عنوان توضیح
              </div>
              <div class="text-text-high-emphasis text-body-1 text-center">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
                استفاده از طراحان گرافیک است
              </div>
            </template> -->
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
