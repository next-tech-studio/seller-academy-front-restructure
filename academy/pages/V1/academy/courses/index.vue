<template>
  <div v-if="!auth?.user?.loggedIn">
    <v-container class="pt-lg-10 pb-lg-10 pt-0 pb-2 px-0 px-lg-auto">
      <course-landing-header></course-landing-header>
    </v-container>
    <v-container class="py-lg-10 py-2">
      <course-landing-our-courses :categories="data.categories"></course-landing-our-courses>
    </v-container>
    <v-container class="py-lg-10 py-2">
      <v-img src="/images/landing_courses.png" />
    </v-container>
    <v-container class="py-lg-10 py-2">
      <v-img
        src="/images/landing_pros.png"
      ></v-img>
    </v-container>
    <v-img
      class="py-lg-10 py-2"
      src="/images/landing_statistics.png"
    ></v-img>
    <v-container>
      <course-landing-testimonial :items="data.comments"></course-landing-testimonial>
    </v-container>
    <v-img
      class="pt-10"
      cover
      src="/images/landing_features.png"
    ></v-img>
  </div>
  <div v-else>
    <div class="bg-background-dark">
      <v-container class="py-md-6 pb-md-6 pt-0 pb-4 px-md-auto px-0">
        <course-landing-user-progress :items="data.userCourses" />
      </v-container>
    </div>
    <v-container>
      <course-landing-our-courses
        :categories="data.categories"
        class="py-10"
      ></course-landing-our-courses>
      <course-landing-our-courses
        v-if="data?.topCourses?.length"
        :items="data.topCourses"
        title="popular_courses"
        class="py-10"
        hide-see-more
        hide-filter
        hide-description
      ></course-landing-our-courses>
    </v-container>
    <v-container>
      <course-landing-our-courses
        v-if="data?.recentlyVisitedCourses?.length"
        title="recently_visits"
        :items="data.recentlyVisitedCourses"
        class="py-10"
        hide-see-more
        hide-filter
        hide-description
      ></course-landing-our-courses>
      <KeepAlive>
        <course-landing-testimonial
        class="py-12"
        :items="data.comments"
      ></course-landing-testimonial>
      </KeepAlive>
    </v-container>
  </div>
</template>

<script setup>
import { useAuthStore } from "@core/stores/auth";
import { useFilterStore } from "@core/stores/filter";
const { $repos } = useNuxtApp();
const store = useFilterStore();
const auth = useAuthStore();
const data = reactive({});

const suggestedRoadmaps = [
  {
    id: "6",
    title: "استفاده از پنل (مقدماتی)",
    status: "active",
    bannerUrl: "https://source.unsplash.com/random/?school&4",
    commentsCount: 8,
    coursesCount: 8,
    stars: 4.8,
  },
  {
    id: "6",
    title:
      "وبینار آموزش جامع کار با پنل فروشندگان دیجی‌کالا و اگر خیلی طولانی باشد برای این",
    status: "active",
    bannerUrl: "https://source.unsplash.com/random/?school&5",
    commentsCount: 8,
    coursesCount: 8,
    stars: 4.8,
  },
  {
    id: "6",
    title: "وبینار آموزش جامع کار با پنل فروشندگان دیجی‌کالا",
    status: "active",
    bannerUrl: "https://source.unsplash.com/random/?school&6",
    commentsCount: 8,
    coursesCount: 8,
    stars: 4.8,
  },
  {
    id: "6",
    title: "وبینار آموزش جامع کار با پنل فروشندگان دیجی‌کالا",
    status: "active",
    bannerUrl: "https://source.unsplash.com/random/?school&7",
    commentsCount: 8,
    coursesCount: 8,
    stars: 4.8,
  },
  {
    id: "6",
    title: "وبینار آموزش جامع کار با پنل فروشندگان دیجی‌کالا",
    status: "active",
    bannerUrl: "https://source.unsplash.com/random/?school&8",
    commentsCount: 8,
    coursesCount: 8,
    stars: 4.8,
  },
];

const getNotLoggedInHomepageData = async () => {
  await $repos.academy.getHomepageData().then((res) => {
    Object.assign(data, res);
    store.buttonDefault = data.categories[0].slug;
  });
};

const getLoggedInHomepageData = async () => {
  await $repos.academy.getLoggedInHomepageData().then((res) => {
    Object.assign(data, res);
    store.buttonDefault = data.categories[0].slug;
  });
};

Promise.all([
  useAsyncData(async () => {
    !auth.user.loggedIn
      ? await getNotLoggedInHomepageData()
      : getLoggedInHomepageData();
  }),
]);
</script>
