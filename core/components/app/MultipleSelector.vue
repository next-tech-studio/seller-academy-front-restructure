<template>
  <p class="mb-2 text-h3">{{ $t(title) }}</p>
  <v-select
    :placeholder="$t(label)"
    density="compact"
    base-color="n300"
    hide-details
    v-model="model"
    multiple
    chips
    closable-chips
    :item-value="selectKey"
    :items="items"
    :return-object="returnObject"
    variant="outlined"
  >
    <template v-slot:append-inner>
      <v-icon icon="custom:caretDownSolid" size="12" />
    </template>
    <template v-slot:chip="{ item }">
      <div style="cursor: pointer;">
        <v-chip close-icon="custom:x" @click:close="removeTag(item)" />
      </div>
    </template>
    <template v-slot:item="{ item }">
      <v-checkbox
        :value="item.value"
        v-model="model"
        class="ms-3"
        hide-details
        true-icon="custom:squareCheck"
        false-icon="custom:square"
        :label="item.title"
        multiple
      >
      </v-checkbox>
      <!-- <div>{{ item.title }}</div> -->
    </template>
  </v-select>
</template>
<script setup>
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: Array,
  items: Array,
  selectKey: String,
  title: String,
  label: String,
  returnObject: { default: true, type: Boolean },
});
let model = computed({
  get() {
    return props.modelValue || [];
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
const removeTag = (item) => {
  const index = model.value.findIndex((object) => {
    return object === item.value;
  });
  model.value.splice(index, 1);
};
</script>
