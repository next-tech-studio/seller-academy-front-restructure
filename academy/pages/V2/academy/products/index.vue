<template>
  <v-container fluid>
    <product-landing-header :items="data.slider" class="mb-16 pb-4" />
    <product-landing-statistics class="mb-12" />
    <product-landing-successes class="mb-12" />
    <product-landing-our-courses
      v-if="data?.categories?.length"
      title="favorite_courses"
      :items="data.categories[0].courses"
      :categories="data?.categories"
      hide-see-more
      hide-description
    ></product-landing-our-courses>
  </v-container>
  <div class="bg-background-dark mt-10">
    <v-container fluid>
      <product-landing-testimonial :items="data.comments" />
    </v-container>
  </div>
  <v-container class="pt-0" fluid>
    <v-row class="my-10 py-10">
      <v-col
        v-for="(item, index) in data?.teachers?.slice(0, 6)"
        :key="index"
        :cols="6"
        lg="3"
        xxl="2"
        class="pa-2"
      >
        <about-us-member-card :item="item" />
      </v-col>
      <v-col cols="12" md="12" class="d-flex flex-column align-center">
        <v-btn
          tag="a"
          class="rounded-lg mt-4"
          color="primary-base"
          variant="outlined"
          >{{ $t("see_all_teachers") }}</v-btn
        >
      </v-col>
    </v-row>
    <home-latest-news :items="data?.articles?.slice(0, 3)" />
    <product-landing-course-request
      class="my-10 py-10"
      :item="requestFormStore.form"
      @upload="upload($event)"
      @send="send"
    />
    <product-landing-instagram :item="data" class="my-10 py-10" />
  </v-container>
</template>

<script setup>
import { useAuthStore } from "@core/stores/auth";
import { useFilterStore } from "~/stores/filter";
import { useRequestFormStore } from "~/stores/requestForm";
const requestFormStore = useRequestFormStore();
const { $repos } = useNuxtApp();
const store = useFilterStore();
const auth = useAuthStore();
const data = reactive({});
const course = reactive({});
const getNotLoggedInHomepageData = async () => {
  await $repos.academyProduct.getHomepageData().then((res) => {
    Object.assign(data, res);
    store.buttonDefault = data.categories[0].slug;
  });
};

const getLoggedInHomepageData = async () => {
  await $repos.academyProduct.getLoggedInHomepageData().then((res) => {
    Object.assign(data, res);
    store.buttonDefault = data.categories[0].slug;
  });
};

// Promise.all([
//   useAsyncData(async () => {
//     !auth.user.loggedIn
//       ? await getNotLoggedInHomepageData()
//       : getLoggedInHomepageData();
//   }),
// ]);

onMounted(async () => await getNotLoggedInHomepageData());
</script>
