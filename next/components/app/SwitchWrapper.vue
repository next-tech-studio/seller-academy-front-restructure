<template>
  <component :is="mdAndUp ? VContainer : 'div'" class="px-0 py-0 hide-slider-control">
    <slot />
  </component>
</template>

<script setup>
import { VContainer } from "vuetify/lib/components/index.mjs";
import { useDisplay } from "vuetify";
const { mdAndUp } = useDisplay();
</script>
