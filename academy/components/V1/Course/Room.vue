<template>
  <v-card class="rounded-md d-flex">
    <v-card-text style="flex: 0 0 auto" class="rounded-md">
      <v-img
        class="rounded-md"
        width="243"
        height="100%"
        :src="room.bannerUrl"
        cover
      ></v-img>
    </v-card-text>
    <v-card-text style="flex: 1 0 auto" class="w-25">
      <div class="mb-1 d-flex align-center justify-space-between">
        <v-badge
          class="border-positioned"
          location="bottom start"
          offset-y="4"
          offset-x="4"
          color="transparent"
        >
          <template #badge>
            <v-icon
              color="success"
              size="x-small"
              icon="custom:certificate"
            ></v-icon>
          </template>
          <v-avatar
            :image="room?.avatarUrl"
            class="bordered"
            color="surface-variant"
          ></v-avatar>
        </v-badge>
        <app-avatar-group
          :max-avatar-count="3"
          show-remaining-avatars
          :members="room.members"
          size="24px"
        ></app-avatar-group>
      </div>
      <div class="text-text-heading text-body-2 font-weight-bold mb-1">
        {{ room.name }}
      </div>
      <div class="text-text-high-emphasis text-body-2 mb-1 text-truncate w-75">
        {{ room.description }}
      </div>
      <v-btn
        @click="toItem(room)"
        class="text-button-2"
        variant="flat"
        color="button-secondary"
        tag="a"
        style="cursor: pointer"
        >{{ $t("see_room") }}</v-btn
      >
    </v-card-text>
  </v-card>
</template>

<script setup>
defineProps({
  room: Object,
});
const localePath = useLocalePath();

const toItem = (e) => {
  navigateTo(
    localePath({
      path: `/forum/room/${e?.slug}`,
      query: {
        roomId: e.id,
        category: e?.category?.slug
      }
    })
  );
};
</script>
