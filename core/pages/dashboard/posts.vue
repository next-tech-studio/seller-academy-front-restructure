<template>
  <v-card :title="$t('posts')">
    <dashboard-menu
      v-model="tabs"
      :menu="menu"
      selected-class="text-high-emphasis"
      :grow="false"
    ></dashboard-menu>
    <v-window v-model="tabs" class="pa-4">
      <v-window-item value="myPosts">
        <app-content-card-listing
          :content="myPosts"
          :horizontal="mdAndUp?true:false"
          grid="12"
          :image-square="true"
          @to:item="navigateToItem"
          :show-see-more="false"
          :show-filter="false"
        >
          <template #icon>
            <v-btn
              class="icon-slot-position px-0 d-flex justify-start pb-4"
              flat
              @click="$emit('remove:item', post)"
            >
              <v-icon
                icon="custom:bookmarkSolid"
                color="secondary-base"
                size="24"
              ></v-icon>
            </v-btn>
          </template>
        </app-content-card-listing>
      </v-window-item>
      <v-window-item value="Bookmarks">
        <app-content-card-listing
          :content="bookmarked"
          :horizontal="mdAndUp?true:false"
          grid="12"
          :image-square="true"
          @to:item="navigateToItem"
          :show-see-more="false"
          :show-filter="false"
        >
          <template #icon = {item}>
            <div class="text-truncate remove-article-position px-4 pb-4" :class="sharedStore.statusColor(item.status)">
              <v-icon
                icon="custom:dot"
                size="12"
                class="me-2"
              />
              <span
                class="text-body-1"
                >{{ $t(item.status) }}</span
              >
            </div>
          </template>
        </app-content-card-listing>
      </v-window-item>
    </v-window>
  </v-card>
</template>
<script setup>
import { useSharedPanelStore } from "@core/stores/sharedPanel";
import { useDisplay } from 'vuetify';
const sharedStore = useSharedPanelStore();
const localePath = useLocalePath();
const {mdAndUp} = useDisplay()
let myPosts = ref({});
let bookmarked = ref({});
let tabs = ref(null);
const { $repos } = useNuxtApp();
let page = ref(1);
let search = ref("");
let tabType = ref("my");
let operations;
const menu = ref([
  { title: "my_posts", value: "myPosts" },
  { title: "bookmarked_posts", value: "Bookmarks" },
]);
let payload = ref({
  page: page.value,
  search: search.value,
  data: tabType.value,
});
const getPosts = () => {
  $repos.other.posts(payload.value).then((res) => {
    if (tabType.value == "my") Object.assign(myPosts.value, res.data);
    else Object.assign(bookmarked.value, res.data);
  });
};
watch(
  tabs,
  (newTab) => {
    console.log(newTab);
    tabType.value = newTab == "myPosts" ? "my" : "bookmark";
    getPosts();
  },
  { deep: true }
);
const navigateToItem = (e) => {
  navigateTo(localePath({ path: `/forum/question/${e.slug}` }), {
    external: true,
  });
};
onMounted(async () => {
  getPosts();
  await nextTick();
});
</script>
