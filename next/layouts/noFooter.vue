<template>
  <div :style="`max-height: ${height} !important;`">
    <v-layout class="h-100vh" dir="rtl">
      <Navbar />
      <v-main style="height: 100vh;" class="px-0 pt-16">
        <slot />
      </v-main>
      <app-toast></app-toast>
    </v-layout>
  </div>
</template>

<script setup>
import Navbar from "./components/navbar/Navbar.vue";
defineProps({
  height: String
})
</script>

<style scoped>
.h-100vh {
  min-height: 100vh;
  height: 100%;
}
</style>
