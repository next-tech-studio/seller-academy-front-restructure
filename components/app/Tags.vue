<template>
  <div class="text-h5 text-text-heading">{{ title ?? $t("tags") }}</div>
  <div class="d-md-flex d-none">
    <v-chip
      v-for="item in items"
      :to="
        localePath({
          name: `${type}-tag-slug`,
          params: { slug: item?.slug },
        })
      "
      :key="item.slug"
      class="text-text-low-emphasis bg-background-dark me-4 mt-4"
      >#{{ item.title }}</v-chip
    >
  </div>
  <v-slide-group class="d-md-none d-flex">
    <v-slide-group-item v-for="item in items" :key="item.slug">
      <v-chip
        :to="
          localePath({
            name: `${type}-tag-slug`,
            params: { slug: item?.slug },
          })
        "
        :key="item.slug"
        class="text-text-low-emphasis bg-background-dark me-4 mt-4"
        >#{{ item.title }}</v-chip
      >
    </v-slide-group-item>
  </v-slide-group>
</template>

<script setup>
const localePath = useLocalePath();
const props = defineProps({
  items: Array,
  title: String,
  type: {
    default: "article",
    type: String
  }
});
</script>
