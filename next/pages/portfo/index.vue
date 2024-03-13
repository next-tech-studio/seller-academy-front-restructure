<template>
  <portfo-header></portfo-header>
  <portfo-statistics :statistics="statistics.data"></portfo-statistics>
  <v-container fluid>
    <portfo-columned
      title="portfo_investment_title"
      description="portfo_investment_desc"
      :items="investmentAreas.data"
      :start-col-size="lgAndUp ? '4' : '12'"
    ></portfo-columned>
  </v-container>
  <portfo-startups :startups="startups" @to:item="toStartup"></portfo-startups>
  <!-- <portfo-columned
    title="cooperation_opportunity_title"
    description="cooperation_opportunity_desc"
    :items="opportunities.data"
    :cols="2"
    :start-col-size="lgAndUp ? '4' : '12'"
    :add-extra-to-bottom="!lgAndUp"
    class="mt-16"
  >
    <template #descriptionExtra>
      <v-btn color="primary-base" size="large" width="220px" rounded="lg">
        <span class="text-body-1">{{ $t("see_all_job_opportunities") }}</span>
      </v-btn>
    </template>
    <template #items="{ element }">
      <div class="d-flex justify-space-between border pa-4 w-100 rounded">
        <div class="d-flex">
          <v-img width="60px" class="me-3" :src="element.imageUrl" />
          <div class="d-flex flex-column">
            <span class="text-body-1 font-weight-bold text-text-heading">{{
              element.title
            }}</span>
            <span class="text-text-low-emphasis text-body-2">{{
              element.owner
            }}</span>
          </div>
        </div>
        <v-chip class="text-caption text-text-high-emphasis bg-background-light" rounded="sm">{{ element.team }}</v-chip>
      </div>
    </template>
  </portfo-columned> -->
  <v-container fluid class="my-16">
    <portfo-contact-us
      :item="requestFormStore.form"
      @send="send"
    ></portfo-contact-us>
  </v-container>
</template>
<script setup>
import { useRequestFormStore } from "~/stores/requestForm";
const requestFormStore = useRequestFormStore();
const localePath = useLocalePath();
const { $repos } = useNuxtApp();
import { useLocaleStore } from "~/stores/locale";
import { useDisplay } from "vuetify";
let localeStore = useLocaleStore();
let statistics = ref([]);
let investmentAreas = ref([]);
let startups = reactive([]);
let opportunities = ref([]);
const { lgAndUp } = useDisplay();
useAsyncData(() => {
  $repos.main.portfoStartUpList().then((res) => {
    Object.assign(startups, res.data);
  });
});
const send = () => {
  requestFormStore.send();
};
watch(
  localeStore,
  async (newValue) => {
    opportunities.value = await queryContent(
      `${newValue.locale || "fa"}/opportunities`
    ).findOne();

    statistics.value = await queryContent(
      `${newValue.locale || "fa"}/statistics`
    ).findOne();

    investmentAreas.value = await queryContent(
      `${newValue.locale || "fa"}/investment-areas`
    ).findOne();
  },
  { immediate: true }
);
const toStartup = (e) => {
  Object.assign(localeStore.startupSlug, e.slug || useRoute().params.slug)
  navigateTo(
    localePath({
      name: "startups-slug",
      params: { slug: e.slug },
    })
  );
};
</script>
