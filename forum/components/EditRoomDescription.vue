<template>
  <v-textarea
    flat
    base-color="n300"
    density="compact"
    v-model="item"
    variant="solo-filled"
    persistent-placeholder
    persistent-hint
    :placeholder="$t('room_description')"
    class="mt-6"
  ></v-textarea>
  <div class="w-100 d-flex justify-end">
    <v-btn
      height="48"
      class="mt-2"
      @click="$emit('update:description')"
      variant="flat"
      color="primary-base"
      >{{ $t("save_edit") }}</v-btn
    >
  </div>
</template>
<script setup>
// $emit('update:description',item)
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: String,
});
let item = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue',value)
  },
});
</script>
