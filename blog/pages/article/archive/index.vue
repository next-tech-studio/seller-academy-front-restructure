<template>
  <v-container class="pt-0 pt-md-6 pb-lg-12 pb-7">
    <app-breadcrumbs color="text-heading" page="articlesArchive" />
    <app-content-card-listing
      :categories="categories"
      :content="list"
      :drop-down-filter="true"
      title="latest_articles"
      @to:item="toItem($event)"
      @load:more="getList"
      @filter="getList($event, 1)"
      :show-sort-by="true"
      :show-see-more="!lastPage"
    ></app-content-card-listing>
  </v-container>
</template>

<script setup>
import { useDisplay } from "vuetify";
import { useFilterStore } from "~/stores/filter";
const store = useFilterStore();
let page = reactive(1);
let total_pages = reactive();
let list = reactive([]);
let common = reactive([]);
let categories = reactive([]);
let filter = ref({ category: "", sort: "recent", tag: "" });
let lastPage = ref(false);
const { t } = useI18n();
const { smAndDown } = useDisplay();
const { $repos } = useNuxtApp();
const localePath = useLocalePath();

const getList = async (e, currentPage) => {
  if (currentPage) {
    page = currentPage;
    list.splice(0, list.length);
  }
  await $repos.article
    .archiveList({
      page,
      sort: store.filter?.sort[0],
      category: store.filter?.categories || "",
      tag: store.filter?.tag,
      type: 'article'
    })
    .then((res) => {
      Object.assign(list, [...list, ...res.data]); 
      console.log(res.data,list)
      lastPage.value = res.last_page === res.current_page ? true : false;
      total_pages = res.total;
      if (res.total != page) page++;
    });
};

function toItem(e) {
  navigateTo(localePath({ name: "article-preview-slug", params: { slug: e.slug } }));
}

Promise.all([
  useAsyncData(async () => await getList()),
  useAsyncData(async () => {
    await $repos.article.archiveCommon({
      type: 'article'
    }).then((res) => {
      Object.assign(common, res.pinnedArticles);
      Object.assign(categories, res.categories);
    });
  }),
]);

useHead(
  useHeadTags({
    title: t("articles")
  })
);
</script>

<style lang="scss" scoped>
.details {
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.95) 100%
  );
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 48px;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.95) 100%
  );
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 48px;
}
</style>
