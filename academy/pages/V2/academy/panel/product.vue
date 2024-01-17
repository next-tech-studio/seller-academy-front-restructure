<template>
    <NuxtLayout name="sidebar">
      <NuxtPage />
    </NuxtLayout>
  </template>
  
  <script setup>
  definePageMeta({
    // middleware: ["auth"],
    layout: false,
  });
  </script>
  
  <style></style>
  