<template>
  <div>
    <NuxtLayout name="sidebar">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
  layout: false,
});
</script>

<style></style>
