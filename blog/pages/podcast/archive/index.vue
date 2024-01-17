<template>
  <v-container class="pt-0 pt-md-6 pb-lg-12 pb-7">
    <app-breadcrumbs color="text-heading" page="podcastArchive" />
    <app-content-card-listing
      :content="list"
      :drop-down-filter="false"
      title="latest_podcasts"
      @load:more="getList"
      @filter="getList($event, 1)"
      :show-filter="false"
      :show-sort-by="true"
      :show-see-more="!lastPage"
      see-more-title="see_more_podcasts"
      grid="2"
    >
      <template v-slot="{item}">
        <podcast-card :item="item" />
      </template>
    </app-content-card-listing>
  </v-container>
</template>

<script setup>
import { useFilterStore } from "@core/stores/filter";
const store = useFilterStore();
const { $repos } = useNuxtApp();
const localePath = useLocalePath();
let page = reactive(1);
let total_pages = reactive();
let list = reactive([]);
let lastPage = ref(false);

const getList = async (e, currentPage) => {
  if (currentPage) {
    page = currentPage;
    list.splice(0, list.length);
  }
  await $repos.article
    .archiveList({
      page,
      sort: store.filter?.sort[0],
      type: 'podcast'
    })
    .then((res) => {
      Object.assign(list, [...list, ...res.data]);
      lastPage.value = res.last_page === res.current_page ? true : false;
      total_pages = res.total;
      if (res.total != page) page++;
    });
};

function toItem(e) {
  navigateTo(
    localePath({ name: "podcast-slug", params: { slug: e.slug } })
  );
}

Promise.all([
  useAsyncData(async () => await getList())
]);
</script>
