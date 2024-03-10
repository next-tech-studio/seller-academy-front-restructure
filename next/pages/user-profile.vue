<template>
    <v-container>
      <v-row>
        <v-col cols="12" lg="9">
          <NuxtPage/>
        </v-col>
        <v-col cols="12" lg="3">
          <profile-user-preview :user="user"> </profile-user-preview>
          <v-list
            :max-width="smAndDown ? '100%' : 400"
            class="pt-4"
            color="secondary"
          >
            <template v-for="item in user.following" :key="item.id">
              <app-profile-list-item
                avatar-size="40px"
                :item="item"
                class="px-0"
                @click="$emit('to:item', item.id)"
                :class="{ 'bg-white rounded-md mb-1': smAndDown }"
              >
                <template #title>
                  <span
                    class="text-caption text-text-heading font-weight-bold"
                    >{{ item.dispalyName }}</span
                  >
                </template>
                <template #subtitle>
                  <span class="text-caption text-text-high-emphasis">{{
                    item?.bio
                  }}</span>
                </template>
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
          </v-list>
        </v-col>
      </v-row>
    </v-container>
</template>
<script setup>
let user = ref({});
const { $repos } = useNuxtApp();
const route = useRoute();
const getUserprofile = async () => {
  console.log('iwiiwiwiwi',route.params)
  await $repos.other.getUserProfileSidebar(route.params.id).then((res) => {
    Object.assign(user.value, res.data);
  });
};
onMounted(() => {
  getUserprofile();
});
</script>
