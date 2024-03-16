<template>
  <v-card>
    <v-avatar size="96">
      <v-img :src="user?.info?.avatarUrl"></v-img>
    </v-avatar>
    <div class="text-text-high-emphasis text-h6 px-4">
      {{ user?.info?.displayName }}
    </div>
    <!-- <v-card-title class="text-text-high-emphasis">
      {{ user?.info?.displayName}}
    </v-card-title> -->
    <v-card-text class="text-text-low-emphasisi">
      <span class="me-4" @click="$emit('to:followers')" style="cursor: pointer">
        {{ user?.info?.followersCount }} {{ $t("followers") }}
      </span>
      <span @click="$emit('to:followings')" style="cursor: pointer">
        {{ user?.info?.followingCount }} {{ $t("following") }}
      </span>
    </v-card-text>
    <v-card-subtitle
      class="text-text-low-emphasis mb-4"
      style="white-space: wrap"
    >
      {{ user?.info?.description }}
    </v-card-subtitle>
    <v-card-actions>
      <v-btn
        :text="$t(user?.info?.isFollowed ? 'unfollow' : 'follow')"
        color="primary-base"
        variant="flat"
        @click="$emit('update:followStatus')"
      />
    </v-card-actions>
  </v-card>
</template>

<script setup>
const props = defineProps({
  user: Object,
});
</script>
