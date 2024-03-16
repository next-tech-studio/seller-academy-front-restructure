<template>
  <v-card :title="$t('rooms')" class="px-6 py-4">
    <v-row>
      <v-col cols="12" md="6" lg="4" v-for="(room,index) in rooms" :key="index">
      <app-room-card
        :max-width="296"
        :item="room"
        @to:item="toRoom(room)"
      ></app-room-card>
      </v-col>
    </v-row>

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
const toRoom = (item) => {
  navigateTo(
    localePath({
      name: "forum-room-slug",
      params: { slug: item?.slug },
      query: {
        category: item?.category?.slug,
        roomId: item?.roomId,
      },
    })
  );
};
onMounted(async () => {
  getRooms();
});
</script>
