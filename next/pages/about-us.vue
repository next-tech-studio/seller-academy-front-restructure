<template>
  <v-container fluid class="pb-16 pt-0 mt-lg-10 mt-1">
    <about-us-header />
  </v-container>
  <div class="bg-n100 py-1">
    <v-container fluid class="py-16">
      <about-us-missions />
    </v-container>
  </div>
  <about-us-intro-video />
  <v-container fluid class="py-16">
    <about-us-departments />
  </v-container>
  <v-container fluid class="pb-16">
    <home-latest-news :items="news" />
  </v-container>
</template>

<script setup>
// const { news } = await queryContent("/news").findOne();
let news = reactive([]);
const { $repos } = useNuxtApp();
const getRelatedNews = () => {
  $repos.main.homeRelatedArticles().then((res) => {
    Object.assign(news, res.featuredArticles.slice(-3));
  });
};
useAsyncData(() => getRelatedNews());
</script>
