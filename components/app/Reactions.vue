<template>
  <div
    class="rounded-lg ml-6 scale-x d-flex align-center bg-white w-content"
    @mouseover="onHover(true)"
    @mouseleave="onHover(false)"
    :class="{ 'absolute elevation-1': !show }"
  >
    <div
      v-for="(reaction, index) in mutedReactions"
      :key="reaction.id"
      style="position: relative"
    >
      <div
        v-if="show"
        class="d-md-none d-block"
        style="
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: 1000;
          cursor: pointer;
        "
        @click.stop="open"
      ></div>
      <v-btn
        icon
        flat
        :size="smAndDown ? '20' : 'x-small'"
        :class="{
          'transition-y': hoverItem == index && !smAndDown,
        }"
        @click="react(reaction)"
        @mouseover="onHoverItem(index)"
        @mouseleave="onHoverItem(index)"
      >
        <v-img :width="smAndDown ? '16' : '24'" :src="reaction.src"></v-img>
      </v-btn>
      <span v-if="reaction.count()" class="text-caption ml-2">
        {{ reaction.count() }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { useDisplay } from "vuetify/lib/framework.mjs";

const props = defineProps({
  item: {
    type: Object,
  },
});

const reactions = useReactions(props.item?.reactions?.totalReactions);

const hover = ref(null);

const hoverItem = ref(false);

let show = ref(true);

const { smAndDown } = useDisplay();

const emit = defineEmits(["react"]);

const react = (reaction) => {
  emit("react", {
    ...reaction,
    id: props.item.id,
  });
  show.value = true;
  hover.value = false;
};

const onHover = (value) => {
  hover.value = value;
};

const onHoverItem = (value) => {
  hoverItem.value = value;
};

const open = () => {
  show.value = false;
};

const mutedReactions = computed(() => {
  let items = reactions.filter((r) => !!r.count());
  if (!items.length) items = [reactions[0]];
  if (hover.value) items = reactions;
  return items;
});
</script>

<style lang="scss" scoped>
.scale-x {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);
  transition-duration: 1s;
}
.transition-y {
  transform: translateY(-5px);
}

.absolute {
  position: absolute;
  bottom: 10px;
}
</style>
