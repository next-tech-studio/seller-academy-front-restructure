<template>
  <v-card :title="$t('rooms')">
    <v-list
      :max-width="smAndDown ? '100%' : 300"
      class="pt-4 px-4"
      color="secondary"
    >
      <template v-for="(item, index) in rooms" :key="index">
        <app-profile-list-item
          avatar-size="40px"
          :item="item"
          @click="$emit('to:item', item)"
          :class="{ 'bg-white rounded-md mb-1': smAndDown }"
        >
          <template #title>
            <span class="text-caption text-text-heading font-weight-bold">{{
              item.title
            }}</span>
          </template>
          <template #subtitle>
            <span class="text-caption text-text-high-emphasis">{{
              item?.lastMessage.text || "هیچ پیامی وجود ندارد!"
            }}</span>
          </template>
          <template #append>
            <div class="d-flex flex-column align-end">
              <div class="text-caption text-text-high-emphasis">
                {{ item.lastMessage.since }}
              </div>
              <div style="min-height: 30px">
                <v-btn
                  icon
                  size="16"
                  v-if="item.unreadCount > 0"
                  flat
                  class="text-caption d-flex"
                  >{{ item.unreadCount }}</v-btn
                >
              </div>
            </div>
          </template>
          <v-divider></v-divider>
        </app-profile-list-item>
      </template>
    </v-list>
  </v-card>
</template>
<script setup>
const localePath = useLocalePath();
let rooms = ref({});
const { $repos } = useNuxtApp();
let page = ref(1);
let search = ref("");
useLastMessageRealTime(rooms);
let payload = ref({
  page: page.value,
  search: search.value,
});
const getRooms = () => {
  $repos.other.rooms(payload.value).then((res) => {
    Object.assign(rooms.value, res.data);
  });
};
const navigateToItem = (e) => {
  navigateTo(localePath({ path: `/forum/question/${e.slug}` }), {
    external: true,
  });
};
onMounted(async () => {
  getRooms();
});
</script>
