<template>
  <home-header class="mb-5" />
  <v-container fluid>
    <v-row>
      <v-col
        v-for="(department, index) in departments"
        :key="department.title"
        cols="12"
        md="4"
        :class="{
          'px-2': position(index) == 'center',
          'pe-4 ps-0': position(index) == 'right',
          'ps-4 pe-0': position(index) == 'left',
        }"
      >
        <home-department-card :item="department"></home-department-card>
      </v-col>
    </v-row>
  </v-container>
  <v-card class="pe-0 ps-container">
    <home-startups :items="startups" />
  </v-card>
  <!-- <home-courses :items="courses.data" class="my-5" /> -->
  <!-- <v-container fluid class="pb-5"> -->
  <!-- <v-container fluid class="pb-5"> -->
    <portfo-columned
      title="investment_fields"
      description="investment_fields_brief"
      :items="investmentAreas.data"
      :start-col-size="lgAndUp ? '4' : '12'"
      class="my-0 my-lg-16"
    ></portfo-columned>
  <!-- </v-container> -->
  <v-container fluid class="pb-16" v-if="isClient">
    <home-latest-news :items="news" />
  </v-container>
  <v-container fluid class="pt-5">
    <home-faq :items="faq" />
  </v-container>
</template>

<script setup>
import { useLocaleStore } from "~/stores/locale";
import { useDisplay } from "vuetify";
const { isClient } = useSsrCorrection();
// const { news } = await queryContent("/news").findOne();
const { $repos } = useNuxtApp();
const departments = useDepartments();
const { smAndDown, lgAndUp } = useDisplay();
const localeStore = useLocaleStore();
let courses = ref([]);
let news = reactive([])
let faq = ref([]);
let investmentAreas = ref([]);
let startups = reactive([]);
const getStartupList = () => {
   $repos.main.portfoStartUpList().then((res) => {
    Object.assign(startups, res.data);
  });
};
const getRelatedNews = async()=>{
  await $repos.main.homeRelatedArticles().then((res)=>{
    Object.assign(news,res.featuredArticles.slice(-3))
  }
  )
}
Promise.all([
  useAsyncData(async () => await getStartupList()),
  useAsyncData(async () => await getRelatedNews()),
]);
watch(
  localeStore,
  async (newValue) => {
    faq.value = await queryContent(`${newValue.locale || "fa"}/faq`).findOne();
    courses.value = await queryContent(
      `${newValue.locale || "fa"}/courses`
    ).findOne();
    investmentAreas.value = await queryContent(
      `${newValue.locale || "fa"}/investment-areas`
    ).findOne();
  },
  { immediate: true }
);
const position = (index) => {
  if (!smAndDown.value) {
    if (index % 3 == 1) return "center";
    if (index % 3 == 0) return "right";
    if (index % 3 == 2) return "left";
  }
};
</script>
