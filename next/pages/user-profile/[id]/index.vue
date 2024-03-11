<template>
  <h2 class="mb-4">{{ user?.displayName }}</h2>
  <dashboard-menu
    v-model="tabs"
    :menu="menu"
    selected-class="text-high-emphasis"
    :grow="false"
  ></dashboard-menu>
  <v-window v-model="tabs" class="pa-4">
    <v-window-item value="posts">
      <app-content-card-listing
        :content="posts"
        horizontal="true"
        :responsive-horizontal="true"
        @load:more="getUserPosts"
        see-more-title="see_more_articles"
        grid="12"
        :image-square="true"
        @to:item="toItem($event)"
        :show-filter="false"
      ></app-content-card-listing>
    </v-window-item>
    <v-window-item value="about">
      <!-- <dashboard-address
                :information="userInfo.addressInfo"
              ></dashboard-address> -->
    </v-window-item>
  </v-window>
</template>
<script setup>
let tabs = ref(null);
const menu = ref([
  { title: "posts", value: "posts" },
  { title: "about", value: "about" },
]);
const props = defineProps({
  user: Object,
});
let posts = ref([]);
const { $repos } = useNuxtApp();
const route = useRoute();
let page = reactive(1);
let lastPage = ref(false);
let totalPages = ref(1);
const getUserPosts = async (e) => {

  await $repos.other
    .getUserPosts({
      page,
      id: route.params.id,
    })
    .then((res) => {
      Object.assign(posts.value, [...posts.value, ...res.data]);
      lastPage.value = res.last_page === res.current_page ? true : false;
      totalPages.value = res.total;
      if (res.total != page) page++;
    });
  // $repos.other.getUserPosts({id:route.params.id}).then((res) => {
  //   Object.assign(posts.value, res.data);
  // });
};
onMounted(() => {
  getUserPosts();
});
</script>
