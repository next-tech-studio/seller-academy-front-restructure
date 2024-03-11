<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="9">
        <NuxtPage :user="user.info" />
      </v-col>
      <v-col cols="12" lg="3">
        <profile-user-preview :user="user"> </profile-user-preview>

        <template v-for="item in user.following" :key="item.id">
          <app-profile-list-item
            avatar-size="48"
            :hover="false"
            subtitle-key="description"
            :item="item"
            class="px-0"
            @click="$emit('to:item', item.id)"
            :class="{ 'bg-white rounded-md mb-1': smAndDown }"
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
                class="bg-background-primary"
                slim
                variant="text"
                size="small"
              />
            </template>
          </app-profile-list-item>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { useDisplay } from "vuetify";
const { smAndDown } = useDisplay();
let user = ref({});
const { $repos } = useNuxtApp();
const route = useRoute();
const getUserprofile = () => {
  $repos.other.getUserProfileSidebar(route.params.id).then((res) => {
    Object.assign(user.value, res.data);
  });
};
onMounted(() => {
  getUserprofile();
});
</script>
