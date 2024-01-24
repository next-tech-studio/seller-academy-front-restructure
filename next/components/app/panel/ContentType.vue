<template>
  <div class="d-flex align-center">
    <v-btn
      icon="custom:x"
      flat
      class="text-icon-low-emphasis pa-0 me-2"
      size="24"
      @click="model = false"
    />
    <v-tooltip
      v-for="(item, index) in useContentType(optionsModel)"
      :key="index"
      :text="item.title"
      location="bottom"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          class="me-2 pa-0"
          v-bind="props"
          color="secondary-base"
          icon
          size="40"
          variant="outlined"
          @click="$emit('add:content', item.type)"
        >
          <v-icon :icon="item.icon" size="24"></v-icon>
        </v-btn>
      </template>
    </v-tooltip>
  </div>
</template>

<script setup>
const emit = defineEmits(["update:toggle"]);
let props = defineProps({
  toggle: Boolean,
  options: Array,
});
let model = computed({
  get() {
    return props.toggle;
  },
  set(value) {
    emit("update:toggle", value);
  },
});
let optionsModel = computed(() => props.options);
// let contentTypes =  useContentType(optionsModel.value);
</script>

<style></style>
