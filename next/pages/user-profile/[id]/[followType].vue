<template>
  <h2 class="mb-4">
    {{
      route.params.followType == "followers"
        ? user?.followersCount
        : user?.followingCount
    }}
    {{ $t(route.params.followType) }}
  </h2>
  <template v-for="item in followingOrFollower" :key="item.id">
    <app-profile-list-item
      avatar-size="48"
      :item="item"
      :hover="false"
      subtitle-key="description"
      @click.self="toUser(item)"
      class="mb-4 px-1 rounded"
    >
      <template #title>
        <span class="text-caption font-weight-bold">{{
          item?.displayName
        }}</span>
      </template>
      <!-- <template #subtitle>
          <span class="text-caption text-text-high-emphasis">{{
            item?.description
          }}</span>
        </template> -->
      <template #append>
        <v-btn
          :text="$t(item.isFollowed ? 'unfollow' : 'follow')"
          @click="follow(item)"
          class="bg-background-primary"
          slim
          variant="text"
          size="small"
        />
      </template>
    </app-profile-list-item>
  </template>
  <v-btn
    @click="
      route.params.followType == 'followers'
        ? getFollowersList
        : getFollowingList
    "
    v-if="!lastPage"
    color="primary-base"
    variant="flat"
    class="mt-3 mb-10 mx-auto"
  >
    {{ $t("see_more") }}
  </v-btn>
</template>
<script setup>
const props = defineProps({
  user: Object,
});
import { useDisplay } from "vuetify";
const { smAndDown } = useDisplay();
const { $repos } = useNuxtApp();
const route = useRoute();
let page = reactive(1);
let lastPage = ref(false);
let totalPages = ref(1);
let followingOrFollower = ref([]);

const getFollowingList = (e) => {
  $repos.other
    .getUserFollowingList({ page, id: route.params.id })
    .then((res) => {
      Object.assign(followingOrFollower.value, res.data);
      lastPage.value = res.last_page === res.current_page ? true : false;
      totalPages.value = res.total;
      if (res.total != page) page++;
      console.log("rrrreeesssss", res);
    });
};
const getFollowersList = (e) => {
  $repos.other
    .getUserFollowersList({ page, id: route.params.id })
    .then((res) => {
      Object.assign(followingOrFollower.value, res.data);
      lastPage.value = res.last_page === res.current_page ? true : false;
      totalPages.value = res.total;
      if (res.total != page) page++;
      console.log("rrrreeesssss", res);
    });
};
const follow = (item) => {
  console.log(item);
  let itemIndex = followingOrFollower.value.findIndex(
    (element) => element.id === item.id
  );
  $repos.other
    .follow({
      body: { followId: item.id, do: item.isFollowed ? "unfollow" : "follow" },
    })
    .then((res) => {
      followingOrFollower.value[itemIndex].isFollowed =
        !followingOrFollower.value[itemIndex].isFollowed;
    });
};
const toUser = (item) => {
  navigateTo(localePath({ name: "user-profile-id", params: { id: item.id } }));
};
onMounted(() => {
  route.params.followType == "followers"
    ? getFollowersList()
    : getFollowingList();
});
</script>
