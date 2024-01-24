<template>
  <v-row>
    <v-col cols="12" md="3">
      <div class="text-h2 text-text-heading mb-1">{{ $t("faq") }}</div>
      <div class="text-body-1">{{ $t("latest_news_brief") }}</div>
    </v-col>
    <v-col cols="12" md="9">
        <app-content-faq hide-title :content="items" />
    </v-col>
  </v-row>
</template>

<script setup>
const props = defineProps({
    items: Object
})
</script>
