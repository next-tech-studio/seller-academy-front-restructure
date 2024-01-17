<template>
  <v-card
    color="background-light"
    class="mx-auto h-100 d-flex flex-column"
    @click="$emit('to:item', item)"
    exact
    min-width="296"
  >

    <div style="height: 150px; position: relative">
      <v-img
        aspect-ratio="1.9"
        :src="item?.bannerUrl"
        width="100%"
        :alt="item?.slug"
        class="rounded-md align-end"
        cover
      >
      </v-img>
      <v-badge
        class="border-positioned"
        location="bottom start"
        offset-y="4"
        offset-x="4"
        color="transparent"
      >
        <template #badge>
          <v-icon color="success" size="x-small">fas fa-certificate</v-icon>
        </template>
        <v-avatar
          :image="item?.avatarUrl"
          class="bordered"
          color="surface-variant"
        ></v-avatar>
      </v-badge>
    </div>

    <v-card-text class="pb-1 pt-7">
      <span class="text-body-2 font-weight-bold text-text-heading">
        {{ item?.title || item?.name }}
      </span>
      <v-icon v-if="item?.isPrivate" color="icon-dark" size="x-small"
        >fas fa-lock</v-icon
      >
    </v-card-text>
    <v-card-text class="pt-1 pb-4 flex-1-1-100">
      <span class="text-body-2 text-text-high-emphasis truncate-2">
        {{ item?.description }}
      </span>
    </v-card-text>
    <app-avatar-group :max-avatar-count="3"  show-remaining-avatars :members-count="item?.membersCount" :members="item?.members" class="ma-4" size="24px"></app-avatar-group>
  </v-card>
</template>

<script lang="ts" setup>
const props = defineProps({
  item: { type: Object },
});
</script>

<style scoped>
.border-positioned {
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translate(-50%, 50%);
}
</style>
