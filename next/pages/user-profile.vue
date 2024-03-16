<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="9" order-sm="1" order-lg="0">
        <NuxtPage :user="user.info" />
      </v-col>
      <v-divider vertical class="my-8"></v-divider>
      <v-col cols="12" lg="3" order-sm="0" order-lg="1">
        <profile-user-preview
          :user="user"
          class="mb-8"
          @to:followings="
            navigateTo(
              localePath({ name: 'user-profile-id-followType', params: { id: route.params.id,followType: 'following' } }),
              { external: true }
            )
          "
                    @to:followers="
            navigateTo(
              localePath({ name: 'user-profile-id-followType', params: { id: route.params.id,followType: 'followers' } }),
              { external: true }
            )
          "
          @update:followStatus="follow(user.info, true)"
        >
        </profile-user-preview>
        <div class="d-none d-lg-block" v-if="user?.followers?.length">
          <h4>
            {{ $t("following") }}
          </h4>
          <template v-for="item in user.followers" :key="item.id">
            <app-profile-list-item
              avatar-size="48"
              :hover="false"
              subtitle-key="description"
              :item="item"
              @click.self="toUser(item)"
              class="mb-4 px-1 rounded"
            >
              <template #title>
                <span
                  @click.self="toUser(item)"
                  class="text-caption font-weight-bold"
                  >{{ item.displayName }}</span
                >
              </template>
              <!-- <template #subtitle>
                  <span class="text-caption text-text-high-emphasis">{{
                    item?.description
                  }}</span>
                </template> -->
              <template #append>
                <v-btn
                  :text="$t('follow')"
                  @click="follow(item)"
                  slim
                  color="primary-base"
                  :variant="item.isFollowed ? 'outlined' : 'flat'"
                  size="small"
                />
              </template>
            </app-profile-list-item>
          </template>
          <v-btn
            @click="
              navigateTo(
                localePath({
                  name: 'user-profile-id-followType',
                  params: { id: route.params.id, followType: 'following' },
                })
              )
            "
            color="primary-base"
            variant="text"
            class="mt-3 mb-10 mx-auto px-0"
          >
            {{ $t("see_more") }}
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { useDisplay } from "vuetify";
const { smAndDown } = useDisplay();
let user = ref({});
const localePath = useLocalePath();
const { $repos } = useNuxtApp();
const route = useRoute();
const getUserprofile = () => {
  $repos.other.getUserProfileSidebar(route.params.id).then((res) => {
    Object.assign(user.value, res.data);
  });
};
const follow = (item, self = false) => {
  let itemIndex = self
    ? user.value.findIndex((element) => element.id === item.id)
    : -1;
  $repos.other
    .follow({
      body: { followId: item.id, do: item.isFollowed ? "unfollow" : "follow" },
    })
    .then((res) => {
      const profile = self ? user.value.info : user.value.following[itemIndex];
      profile.isFollowed = !profile.isFollowed;
    });
};
const toUser = (item) => {
  navigateTo(localePath({ name: "user-profile-id", params: { id: item.id } }), {
    external: true,
  });
};
onMounted(() => {
  getUserprofile();
});
</script>
