<template>
  <v-hover>
    <template v-slot:default="{ isHovering, props }">
      <v-card
        v-bind="props"
        :variant="isHovering ? 'flat' : 'outlined'"
        class="rounded-md text-center h-100"
        :color="isHovering ? 'primary-base' : 'rgba(var(--v-theme-n300), 30%)'"
      >
        <v-card-text class="pa-8">
          <v-avatar>
            <v-icon size="32" :color="!isHovering ? 'primary-base' : 'icon-light'" :icon="item.icon"></v-icon>
          </v-avatar>
          <div class="text-h5" :class="!isHovering ? 'text-text-heading' : 'text-white'">{{ $t(item.title || "") }}</div>
          <div :class="!isHovering ? 'text-text-low-emphasis' : 'text-white'">{{ $t(item.text || "") }}</div>
        </v-card-text>
      </v-card>
    </template>
  </v-hover>
</template>

<script setup>
const props = defineProps({
  item: Array,
});
</script>
