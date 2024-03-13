<template>
  <div class="d-flex align-center py-0" :class="justify">
    <div
      style="white-space: nowrap"
      :class="[justify != 'justify-space-between' ? 'me-3' : '',smAndDown?'text-body-1' :'text-text-heading']"
    >
      {{ $t("share_in") }}
    </div>
    <v-btn
      color="text-high-emphasis"
      density="compact"
      min-width="auto"
      :size="smAndDown?' x-small':'default'"
      v-for="(item, index) in socials"
      :key="item.title"
      thickness="1"
      class="px-0"
      variant="text"
      :class="[
        index == 0 ? 'ms-lg-4 ms-sm-2' : 'ms-lg-4 ms-sm-4',
      ]"
    >
      <template #append>
        <v-icon
          class="me-2"
          :icon="item.icon"
          size="18"
        ></v-icon> </template
    ></v-btn>
  </div>
</template>

<script setup>
const socials = useSocials();
import { useDisplay } from "vuetify";
const { smAndDown } = useDisplay();
const props = defineProps({
  justify: {
    type: String,
    default: "justify-space-between",
  },
});
</script>

<style lang="css" scoped></style>
