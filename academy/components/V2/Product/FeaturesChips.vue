<template>
  <v-chip
    v-for="(feature, index) in features"
    :key="index"
    color="background-dark"
    class="bg-background-dark me-lg-4 me-1 mb-2"
  >
    <v-icon
      start
      :icon="featureIcon(feature)"
      color="icon-high-emphasis"
    ></v-icon>
    <span class="text-text-high-emphasis">{{ feature.title }}</span>
  </v-chip>
</template>

<script setup>
const props = defineProps({
  features: Array,
});

const featureIcon = (feature) => {
  let icon = "";
  switch (feature.value) {
    case "certificate":
      icon = "custom:documentText";
      break;
    case "refund":
      icon = "custom:money";
      break;
    case "supporting":
      icon = "custom:book";
      break;
    case "interactive":
      icon = "custom:penAdd";
      break;
  }
  return icon;
};
</script>
