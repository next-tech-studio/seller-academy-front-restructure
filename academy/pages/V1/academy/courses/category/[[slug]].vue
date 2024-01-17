<template>
  <div class="bg-background-dark">
    <v-container>
      <app-breadcrumbs
        page="academyCategory"
        :data="{ category: $route.params.slug }"
        class="px-0"
      />
      <div class="d-flex align-center justify-space-between">
        <div>
          <span class="text-h1 text-text-heading">{{
            $t("courses_list")
          }}</span>
          <v-btn
            label
            class="text-body-2 text-text-low-emphasis mr-4"
            color="transparent"
            variant="flat"
          >
            {{ totalPages + " " + $t("result_founds") }}
          </v-btn>
        </div>
        <course-filter-bottom-sheet v-if="!lgAndUp" :items="filters" v-model="filters" />
      </div>
      <v-row class="mt-6">
        <v-col cols="12" md="3" v-if="lgAndUp">
          <course-filter
            v-for="(value, key) in filters"
            :key="key"
            v-model="filters[key].model"
            :items="value"
            class="mb-4"
          ></course-filter>
        </v-col>
        <v-col cols="12" lg="9" md="12">
          <v-row v-if="courses.length">
            <v-col
              cols="12"
              lg="4"
              md="6"
              sm="12"
              v-for="item in courses"
              :key="item.id"
              class="py-2"
            >
              <course-card
                color="background-light"
                :item="item"
                @to:item="toCourse"
                :horizontal="smAndDown"
              ></course-card>
            </v-col>
            <v-btn
              @click="getCoursesList"
              v-if="!lastPage"
              color="primary-base"
              variant="flat"
              class="mt-3 mb-10 mx-auto"
            >
              {{ $t("see_more") }}
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <div class="bg-primary-base mt-10">
      <v-container>
        <landing-roadmaps :items="roadmaps"></landing-roadmaps>
      </v-container>
    </div>
  </div>
</template>

<script setup>
const roadmaps = [
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

const data = reactive({});
const { $repos } = useNuxtApp();
let courses = reactive([]);
let filters = reactive({
  categories: {
    items: [],
    multiple: false,
    title: "categories",
    itemText: "title",
    itemValue: "id",
    model: "",
  },
  skills: {
    items: [],
    multiple: true,
    title: "skills",
    itemText: "title",
    itemValue: "id",
    returnObject: true,
    model: [],
  },
  instructors: {
    items: [],
    multiple: false,
    title: "instructor",
    itemText: "displayName",
    model: [],
  },
  duration: {
    items: [
      {
        title: "کمتر از ۲ ساعت",
        lessTime: 120,
      },
      {
        title: "۱ تا ۴ هفته",
        lessTime: 40320,
        moreTime: 10080,
      },
      {
        title: "۱ تا ۳ ماه",
        lessTime: 131400,
        moreTime: 43800,
      },
      {
        title: "۳ تا ۶ ماه",
        lessTime: 262800,
        moreTime: 131400,
      },
    ],
    multiple: false,
    title: "course_duration",
    itemText: "title",
    model: "",
  },
});
let page = reactive(1);
let totalPages = ref();
let lastPage = ref(false);

const getCoursesList = async () => {
  await $repos.academy
    .getCoursesList({
      page: page,
      query: `?categoryId=${
        filters?.categories?.model || ""
      }&skills=${JSON.stringify(filters?.skills?.model)}&instructorId=${
        filters?.instructors?.items[filters?.instructors.model]?.id || ""
      }&instructorType=${
        filters?.instructors?.items[filters?.instructors.model]?.type || ""
      }&lessTime=${
        filters?.duration?.items[filters?.duration.model]?.lessTime || ""
      }&moreTime=${
        filters?.duration?.items[filters?.duration.model]?.moreTime || ""
      }`,
      // query: `?categoryId=${filters?.categories?.model}&instructorId=${filters?.instructors[model]?.id}&instructorType=${filters?.instructors[model]?.type}&skills=${filters?.skills?.model}`,
    })
    .then((res) => {
      Object.assign(data, res);
      Object.assign(courses, [...courses, ...res.data]);
      lastPage.value =
        res.pagination.lastPage === res.pagination.currentPage ? true : false;
      totalPages.value = res.total;
      if (res.pagination.total != page) page++;
    });
};

const getCourseFilters = async () => {
  await $repos.academy.getCourseFilters().then((res) => {
    for (const property in res) {
      // filters[property].items = res[property];
      Object.assign(filters[property].items, res[property]);
    }
  });
};

watch(
  filters,
  () => {
    page = 1;
    courses.splice(0, courses.length);
    getCoursesList();
  },
  { deep: true }
);

Promise.all([
  // useAsyncData(async () => await getCoursesList()),
  useAsyncData(async () => await getCourseFilters()),
]);
</script>
