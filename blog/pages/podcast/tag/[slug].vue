<template>
  <v-container class="pt-0 pt-md-6 pb-12">
    <app-breadcrumbs
      class="px-0"
      color="text-heading"
      page="articleTag"
      :data="articleTagBreadcrumb"
    />
    <app-content-card-listing
      :content="list"
      :show-title="false"
      @to:item="toItem($event)"
      @load:more="getList"
      :show-filter="false"
      :title="title"
      :show-see-more="!lastPage"
      grid="2"
    >
      <template v-slot="{ item }">
        <podcast-card :item="item" />
      </template>
    </app-content-card-listing>
  </v-container>
</template>

<script setup>
const { $repos } = useNuxtApp();
let list = reactive([]);
let page = reactive(1);
let lastPage = ref(false);
const route = useRoute();
const localePath = useLocalePath();
let title = route.params.slug.replace("_", " ");
let articleTagBreadcrumb = ref({
  tag: title,
});

const getList = async () => {
  await $repos.article
    .archiveList({
      page,
      sort: "recent",
      category: "",
      tag: route.params.slug,
      type: "podcast",
    })
    .then((res) => {
      Object.assign(list, [...list, ...res.data]);
      lastPage.value = res.lastPage === res.currentPage ? true : false;
      if (res.lastPage != page) page++;
    });
};
function toItem(e) {
  navigateTo(localePath({ name: "podcast-slug", params: { slug: e.slug } }));
}

Promise.all([useAsyncData(async () => await getList())]);
</script>
