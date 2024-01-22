<template>
  <!-- <NuxtLayout> -->
    <NuxtPage />
  <!-- </NuxtLayout> -->
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
  layout: 'sidebar',
});
</script>

<style></style>
