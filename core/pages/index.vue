<template>
    <landing-header />
    <landing-calculator :items="incomes" />
    <landing-quote class="my-10 py-lg-10 py-0" />
    <v-container v-if="articles.length">
      <app-content-card-listing
      :content="articles.slice(0, 4)"
      title="relevant_content"
      :responsive-horizontal="true"
      @to:item="toItem($event)"
      :show-see-more="false"
      :show-filter="false"
      grid="3"
    ></app-content-card-listing>
    </v-container>
    <landing-roadmap />
    <landing-stories />
</template>

<script setup>
const {$repos} = useNuxtApp()
const articles = ref([])
const incomes = ref([])
useAsyncData(async () => await $repos.other.homepage().then((res) => {
  console.log(res);
  articles.value = res.articles
  incomes.value = res.incomes
}))
</script>
