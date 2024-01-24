<template>
  <v-card
    variant="outlined"
    color="rgba(var(--v-theme-background-scrim-dark), 30%)"
    class="d-flex flex-column mx-auto"
  >
    <v-card-title>
      <v-avatar class="ml-4" color="grey-lighten-3"></v-avatar>
      <span class="text-body-1 text-text-heading">{{ $t(item.title) }}</span>
    </v-card-title>
    <v-card-text>
      {{ $t(item.description) }}
    </v-card-text>
    <v-card-actions>
      <v-btn
        block
        color="primary-base"
        variant="flat"
        class="text-button"
        @click="$emit('continue')"
      >
        {{ $t("continue") }}
        <v-icon class="mr-4" size="x-small" icon="custom:chevronLeft"></v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
const props = defineProps({
  item: Object,
});
</script>
