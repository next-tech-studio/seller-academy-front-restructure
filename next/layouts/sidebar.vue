<template>
  <div>
    <v-layout class="h-100 flex-column" full-height>
      <Navbar :show-navber-items="false" />
      <v-main
        class="bg-background-dark"
        :dir="$i18n.locale == 'fa' ? 'rtl' : 'ltr'"
        style="min-height: 100vh"
      >
        <Sidebar />
        <slot />
      </v-main>
      <app-toast></app-toast>
    </v-layout>
  </div>
</template>

<script setup>
import Sidebar from "./components/sidebar/Sidebar.vue";
import Navbar from "./components/navbar/Navbar.vue";
import { useLocaleStore } from "@core/stores/locale";
let localeStore = useLocaleStore();
watch(localeStore, async (newValue) => {
  localeStore.setLocale(localeStore.locale);
  // await refreshNuxtData();
});
</script>
