<template>
  <p class="text-text-high-emphasis text-h3">{{ item.title }}</p>
  <div class="text-text-high-emphasis text-subtitle-1">{{ item.summary }}</div>
  <div class="rounded bg-background-dark pa-3">
    <v-avatar size="80" class="me-3" >
    <v-img cover :src="item.bannerUrl.url">
    </v-img>
    </v-avatar>
    <span>{{ $t("editor.your_banner_location") }}</span>
  </div>
</template>

<script setup>
let props= defineProps({
    item:Object
})
</script>

<style></style>
