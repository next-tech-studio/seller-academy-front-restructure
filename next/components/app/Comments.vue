<template>
  <template v-if="items.length">
    <app-comment-with-replies
      v-for="item, index in items"
      :key="item.id"
      :item="item"
      @see:replies="$emit('see:replies', item)"
      :pagination="repliesPaginations[index]"
      @react="$emit('react', $event)"
      @reply="$emit('reply', $event)"
    ></app-comment-with-replies>
    <v-btn
      v-if="!isLastPage"
      @click="$emit('see:more')"
      class="px-0 mt-4"
      variant="text"
      color="text-secondary text-button"
      >{{ $t("see_more") }}</v-btn
    >
  </template>
  <v-card v-else class="d-flex flex-column align-center py-12">
    <v-img width="120" src="/images/empty/no_comment.svg" />
    <v-card-text class="text-body-1 font-weight-bold text-center">
      {{ $t("no_comment") }}
    </v-card-text>
  </v-card>
</template>

<script setup>
const props = defineProps({
  items: Array,
  isLastPage: Boolean,
  repliesPaginations: {
    type: Array,
    default: () => []
  }
});
</script>
