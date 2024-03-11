<template>
  <v-card>
    <v-card-title v-if="title">
      <div class="d-flex justify-space-between">
        <span class="text-body-1 font-weight-bold">{{ title }}</span>
        <slot name="append-title"></slot>
      </div>
    </v-card-title>
    <v-list max-width="300">
      <template v-if="items.length">
        <app-profile-list-item
          v-for="(item, index) in items"
          :key="index"
          avatar-size="48px"
          :item="item"
          :subtitle-key="subtitle"
          @click="$emit('to:item', item)"
          :class="{ blur: blur }"
          :disabled="blur"
        ></app-profile-list-item>
      </template>
      <div class="mx-4">
        <slot name="action">
          <v-btn
            v-if="!hideAction"
            @click="$emit('more')"
            variant="text"
            class="text-text-secondary text-button px-0 animated"
            >{{ $t(actionText) }}</v-btn
          >
        </slot>
      </div>
    </v-list>
  </v-card>
</template>
<script setup>
const { t } = useI18n();
const props = defineProps({
  title: {
    type: String,
  },
  subtitle: {
    type: String,
    default: "subtitle",
  },
  subtitleKey: {
    type: String,
    default: "subtitle",
  },
  items: {
    type: Array,
    default: "",
  },
  blur: {
    type: Boolean,
    default: false,
  },
  actionText: {
    type: String,
    default: "see_more",
  },
  hideAction: {
    type: Boolean,
    default: false,
  },
});
</script>