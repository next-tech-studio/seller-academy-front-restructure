<template>
  <app-comment
    @react="$emit('react', { type: 'comment', ...$event })"
    @reply="$emit('reply', $event)"
    :item="item"
  ></app-comment>
  <template v-for="reply in item.replies" :key="reply.id">
    <app-comment
      bordered
      :replyable="false"
      :item="reply"
      @react="$emit('react', { type: 'reply', ...$event })"
    ></app-comment>
  </template>
  <v-btn
    v-if="pagination?.page < pagination?.last_page && pagination?.last_page"
    @click="$emit('see:replies')"
    class="px-0 mt-4 text-button"
    variant="text"
    color="text-secondary"
    >{{ $t("see_more") }}</v-btn
  >
</template>

<script setup>
const props = defineProps({
  item: Object,
  pagination: Object,
});
</script>
