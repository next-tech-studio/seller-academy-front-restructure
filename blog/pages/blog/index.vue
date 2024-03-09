<template>
  <v-container id="blog-header" class="pb-8 pt-4 pt-md-8 pt-lg-12">
    <h1 style="display: none">بلاگ سلر آکادمی</h1>
    <content-slider :items="blog.featuredArticles" @to:more="toItem($event)" />
    <featured-content
      v-if="blog?.quickActionBanners?.length"
      :class="isClient ? 'd-flex' : 'd-none'"
      :items="blog.quickActionBanners"
      class="mt-md-10 mt-1"
    ></featured-content>
  </v-container>

  <v-container class="mt-6 py-2" v-if="blog?.recentPodcasts?.length">
    <client-only>
      <content-slide-group
        :title="$t('latest_podcasts')"
        :items="blog.recentPodcasts"
        :to="localePath({ name: 'podcast-archive' })"
      >
        <template #item="{ item }">
          <podcast-card width="192" :item="item" />
        </template>
      </content-slide-group>
    </client-only>
  </v-container>

  <v-container class="mt-6 py-2">
    <h2 class="text-md-h1 text-h2 text-text-high-emphasis">
      {{ $t("latest_content").split("-").join(" ") }}
    </h2>
  </v-container>

  <div v-if="blog?.categories?.length">
    <app-filterings
      arrow-bg-gradient-end="--v-theme-light"
      @filter="getHomeData"
      class="mb-2"
      :filters="filters"
    >
    </app-filterings>
  </div>
  <v-container id="blog" class="mb-8">
    <app-content-card-listing
      :class="isClient ? 'd-flex' : 'd-none'"
      :filters="filters"
      :categories="blog.categories"
      :content="blog.data"
      :responsive-horizontal="true"
      @to:item="toItem($event)"
      @load:more="toMore"
      @filter="getHomeData($event)"
      see-more-title="see_more_articles"
      :show-see-more="!lastPage"
      :grid="blogHomepageGrid"
      :horizontal="blogHomepageHorizontalShow == 'true'"
    ></app-content-card-listing>
  </v-container>
</template>

<script setup>
import { useFilterStore } from "@core/stores/filter";
const store = useFilterStore();
let blog = reactive([]);
const { isClient } = useSsrCorrection();
const { $repos } = useNuxtApp();
const localePath = useLocalePath();
const { t } = useI18n();
let lastPage = ref(false);
let filters = computed(() => {
  return [{ type: "button", items: blog.categories }];
});
const { blogHomepageGrid, blogHomepageHorizontalShow } = useRuntimeConfig().public
const toItem = (e) => {
  navigateTo(
    localePath({
      name: "article-preview-slug",
      params: {
        slug: e.slug,
      },
    })
  );
};

const toMore = () => {
  navigateTo(
    localePath({
      name: "article-archive",
    })
  );
};

const getHomeCommon = async () => {
  await $repos.blog
    .homeCommon({
      type: "article",
    })
    .then((res) => {
      Object.assign(blog, res);
      store.buttonDefault = blog.categories[0].slug;
    });
};

const getHomeData = async () => {
  await $repos.article
    .archiveList({
      sort: "recent",
      category: store.buttonDefault,
      tag: "",
      type: "article",
    })
    .then((res) => {
      Object.assign(blog, res);
      lastPage.value = res.last_page === res.current_page ? true : false;
    });
};
Promise.all([
  useAsyncData(async () => await getHomeData()),
  useAsyncData(async () => await getHomeCommon()),
]);

useHead(
  useHeadTags({
    title: t("blog"),
    description: "",
    type: "website",
  })
);
</script>

<style lang="scss">
#blog {
  .v-list-item--density-default:not(.v-list-item--nav).v-list-item--one-line {
    border-right: 2px solid rgba(var(--v-theme-icon-disabled));
    color: rgba(var(--v-theme-icon-disabled));
  }
  .v-list-item--variant-text .v-list-item__overlay {
    background-color: transparent !important;
  }
  .active {
    border-right: 2px solid rgba(var(--v-theme-icon-high-emphasis)) !important;
    color: rgba(var(--v-theme-icon-high-emphasis)) !important;
  }
  :target {
    scroll-margin-top: 100px;
  }
}
</style>
