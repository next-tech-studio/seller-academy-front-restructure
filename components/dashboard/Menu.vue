<template>
  <v-card rounded="lg">
    <v-tabs
      :model-value="tabs"
      class="text-text-low-emphasis"
      @update:modelValue="$emit('update:modelValue', $event)"
      bg-color="background-light"
      
      center-active
      :grow="grow"
    >
      <v-tab
        v-for="(item, index) in menu"
        :value="item.value"
        :key="index"
        @click="$emit('change:route')"
        :class="$router.currentRoute.value.fullPath.split('/').pop() == item.value? selectedClass : ''"
      >
        <span>
          {{ $t(item.title) }}
        </span>
      </v-tab>
    </v-tabs>
  </v-card>
</template>
<script setup>
const props = defineProps({
  modelValue: Object,
  menu: Object,
  selectedClass: String,
  grow: {
    default: true,
    type: String,
  },
  to: {
    default: true,
    type: String,
  },
});
const emit = defineEmits(["update:modelValue"]);
const localePath = useLocalePath();
let tabs = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    console.log("tabs", value);
    emit("update:modelValue", value);
  },
});
</script>
