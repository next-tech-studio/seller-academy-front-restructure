<template>
  <v-container class="pt-0 pt-md-6 pb-12">
    <app-breadcrumbs
      class="px-0"
      color="text-heading"
      page="articleCategory"
      :data="articleCategoryBreadcrumb"
    />
    <v-card-title class="pa-0 pb-4 text-md-h1 text-h2 text-text-heading">{{
      route.params.slug.split("-").join(" ")
    }}</v-card-title>
    <content-card
      :is-banner="true"
      :content="banner"
      horizontal
      class="mb-10"
      @click="toItem(banner)"
    />
    <!-- <content-slider
      hide-delimiters
      :show-arrows="false"
      :items="banner"
      @to:more="toItem(banner)"
      class="mb-md-10 mb-4"
    /> -->
    <app-content-card-listing
      :content="list"
      :show-title="false"
      @to:item="toItem($event)"
      @load:more="getList"
      :show-filter="false"
    ></app-content-card-listing>
  </v-container>
</template>

<script setup>
const { $repos } = useNuxtApp();
let list = reactive([]);
let banner = reactive({});
let page = reactive(1);
let lastPage = ref(false);
const route = useRoute();
let title = route.params.slug.replace("_", " ");
const localePath = useLocalePath();
let articleCategoryBreadcrumb = ref({
  category: title,
});
const getBanner = () => {
  $repos.blog.article
    .showCategory({
      slug: route.params.slug,
    })
    .then((res) => {
      Object.assign(banner, { ...res.featuredArticle });
    });
};

function getList() {
  $repos.article
    .archiveList({
      page,
      sort: "recent",
      category:route.params.slug,
      tag: "",
      type: 'article'
    })
    .then((res) => {
      Object.assign(list, [...list, ...res.data]);
      lastPage.value = res.lastPage === res.currentPage ? true : false;
      if (res.lastPage != page) page++;
    });
}
function toItem(e) {
  navigateTo(localePath({ name: "article-preview-slug", params: { slug: e.slug } }));
}

Promise.all([
  useAsyncData(async () => await getList()),
  useAsyncData(async () => {
    await $repos.blog.article
      .showCategory({
        slug: route.params.slug,
        type: 'article'
      })
      .then((res) => {
        Object.assign(banner, { ...res.featuredArticle });
      });
  }),
]);
</script>

<style></style>
