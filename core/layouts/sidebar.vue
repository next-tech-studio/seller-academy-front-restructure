<template>
  <div>
    <v-layout class="h-100vh" dir="rtl">
      <Navbar :show-navber-items="false"/>
      <v-main class="bg-background-dark" style="min-height: 100vh;">
        <Sidebar/>
        <slot/>
      </v-main>
      <app-toast></app-toast>
    </v-layout>
  </div>
</template>

<script setup>
import Sidebar from "./components/sidebar/Sidebar.vue";
import Navbar from "./components/navbar/Navbar.vue";
</script>

