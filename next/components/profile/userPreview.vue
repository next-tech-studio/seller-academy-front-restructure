<template>
  <v-card>
    <v-avatar size="96" >
    <v-img :src="user?.info?.avatarUrl"></v-img>
    </v-avatar>
    <v-card-title class="text-text-high-emphasisi">
      {{ user?.info?.displayName}}
    </v-card-title>
    <v-card-text class="text-text-low-emphasisi">
      <span class="me-4"> {{ user?.info?.followersCount }} {{ $t("followers") }} </span>
      <span> {{ user?.info?.followingCount }} {{ $t("following") }} </span>
    </v-card-text>
    <v-card-subtitle class="text-text-low-emphasis mb-4" style="white-space: wrap;">
      {{ user?.info?.description }}
    </v-card-subtitle>
    <v-card-actions>
      <v-btn :text="$t('follow')" color="primary-base" variant="flat" />
    </v-card-actions>
  </v-card>
</template>

<script setup>
const props = defineProps({
  user: Object,
});
</script>
