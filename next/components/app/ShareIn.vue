<template>
  <div class="d-flex align-center py-0" :class="justify">
    <div
      v-if="!hideTitle"
      style="white-space: nowrap"
      :class="[
        justify != 'justify-space-between' ? 'me-3' : '',
        smAndDown ? 'text-body-1' : 'text-text-heading',
      ]"
    >
      <span :class="`text-${color} me-4`">{{ $t("share_in") }}</span>
    </div>
    <v-btn
      tag="a"
      :href="item.link"
      target="_blank"
      :color="color"
      :size="smAndDown ? ' x-small' : 'small'"
      v-for="(item, index) in socials"
      :key="item.title"
      thickness="1"
      class="px-0"
      variant="icon"
      :class="[
        // index == 0 ? 'mr-lg-4 ms-sm-2' : 'ms-lg-4 ms-sm-2',
        justify != 'justify-space-between' ? 'me-2' : '',
        
      ]"
      :icon="item.icon"
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
  hideTitle: {
    type: Boolean,
    default: true,
  },
  color: {
    default: 'text-light',
    type: String
  }
});
</script>

<style lang="css" scoped></style>
