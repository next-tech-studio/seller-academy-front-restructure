<template>
  <div class="text-center mb-6">
    <div class="text-h2 text-text-heading mb-1">{{ $t("latest_news") }}</div>
    <div class="text-body-1">{{ $t("latest_news_brief") }}</div>
  </div>
  <v-row justify="center">
    <v-col v-for="item in items" :key="item.title" cols="12" md="4">
      <app-content-card
        @click="
          navigateTo(localePath({ path: `/article/${item.slug}` }), {
            external: true,
          })
        "
        :content="item"
        hide-image-content
      ></app-content-card>
    </v-col>
    <v-col cols="12" md="12" class="d-flex flex-column align-center">
      <v-btn
      @click="
        navigateTo(localePath({ path: 'blog' }), {
          external: true,
        })
      "
      tag="a"
      class="rounded-lg"
      color="primary-base"
      variant="outlined"
      >{{ $t("see_more") }}</v-btn
    >
    </v-col>
  </v-row>
</template>

<script setup>
const props = defineProps({
  items: Array,
});
</script>
