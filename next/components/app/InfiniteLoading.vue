<template>
  <div v-bind="$attrs">
    <div
      :class="{
        'top-results': $attrs.top && $attrs.target,
        'bottom-results': !$attrs.top && $attrs.target,
      }"
      id="content"
      :style="`height:${height}px`"
    >
      <InfiniteLoading v-if="$attrs.top" @infinite="infinite" v-bind="$attrs">
        <template #spinner>
          <div class="text-center">
            <v-progress-circular
              indeterminate
              color="primary-base"
              :width="3"
            ></v-progress-circular>
          </div>
        </template>
        <template #complete>
          <span class="your-customize-class"></span>
        </template>
      </InfiniteLoading>
      <div v-for="item in items" :key="item.id">
        <slot name="items" v-bind:item="item"></slot>
      </div>
      <InfiniteLoading
        class="loader"
        v-if="!$attrs.top"
        @infinite="infinite"
        v-bind="$attrs"
      >
        <template #spinner>
          <div class="text-center">
            <v-progress-circular
              indeterminate
              color="primary-base"
              :width="3"
            ></v-progress-circular>
          </div>
        </template>
        <template #complete>
          <span class="your-customize-class"></span>
        </template>
      </InfiniteLoading>
    </div>
  </div>
</template>

<script setup>
import { toRefs } from "vue";
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
const emit = defineEmits(["infinite"]);

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  // SET ID=PARENT TO ELEMENT WITH PROPER HEIGHT
  id: {
    type: String,
    default: "parent",
  },
  // IS RELATED TO PARENT HEIGHT (PADDING, MARGIN,...)
  offset: {
    type: Number,
    default: 0
  }
});

const { items } = toRefs(props);

const load = async ($state) => {
};
const infinite = ($state) => {
  emit("infinite", $state);
};
const scrollToBottom = () => {
  let content = document.getElementById("content");
  content.scrollTop = content?.scrollHeight;
};
watch(items, async (newValue, oldValue) => {
  await nextTick();
  scrollToBottom();
});
let height = ref(100);
onMounted(() => {
  height.value = document.getElementById(props.id).offsetHeight - props.offset;
});
</script>

<style>
.bottom-results {
  overflow-y: scroll;
}

.top-results {
  overflow-y: scroll;
}

.loader {
  padding: 10px;
}
</style>
