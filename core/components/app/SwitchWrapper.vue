<template>
  <component
    :is="mdAndUp ? VContainer : 'div'"
    class="px-0 py-0 hide-slider-control"
    :style="oneSideMargin ? `maxWidth: ${712 + margin / 2}px` : ''"
  >
    <slot />
  </component>
</template>

<script setup>
import { VContainer } from "vuetify/lib/components/index.mjs";
import { useDisplay } from "vuetify";
const { mdAndUp } = useDisplay();
const props = defineProps({
  oneSideMargin: {
    default: false,
    type: Boolean,
  },
});

let margin = ref(0);

const setMargin = () => {
  margin.value = window.innerWidth - 712;
}

onMounted(() => {
  setMargin()
  window.addEventListener("resize", setMargin);
});

onUnmounted(() => window.removeEventListener("resize", setMargin));
</script>
