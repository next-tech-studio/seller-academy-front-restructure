<template>
  <v-card @click="toItem(item)" min-width="192">
    <v-img cover aspect-ratio="1" class="rounded-md w-100" :src="item.bannerUrl || item.banner_url" />
    <div class="mt-4 text-text-heading text-h5 text-truncate">{{ item.title }}</div>
  </v-card>
</template>

<script setup>
const localePath = useLocalePath();
const props = defineProps({
    item: Object
})
function toItem(e) {
  navigateTo(
    localePath({ name: "podcast-slug", params: { slug: e.slug } })
  );
}
</script>
