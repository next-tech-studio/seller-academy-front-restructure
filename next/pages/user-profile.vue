<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="9">
        <NuxtPage :user="user.info" />
      </v-col>
      <v-col cols="12" lg="3">
        <profile-user-preview
          :user="user"
          class="mb-8"
          @update:followStatus="follow(user.info, true)"
        >
        </profile-user-preview>
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
              <span class="text-caption font-weight-bold">{{
                item.displayName
              }}</span>
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
  navigateTo(localePath({ name: "user-profile-id", params: { id: item.id } }));
};
onMounted(() => {
  getUserprofile();
});
</script>
