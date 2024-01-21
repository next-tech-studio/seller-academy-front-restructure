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
    :item-title="titleKey"
    :items="items"
    variant="outlined"
  >
    <template v-slot:append-inner>
      <v-icon icon="custom:caretDownSolid" size="12" />
    </template>
    <template v-slot:chip="{ item }">
      <div style="cursor: pointer;">
        <v-chip close-icon="custom:x" @click:close="removeTag(item)" ></v-chip>
      </div>
    </template>
    <template v-slot:item="{ item }">
      <v-checkbox
        :value="returnObject?item.raw: item.value"
        v-model="model"
        class="ms-3"
        hide-details
        true-icon="custom:squareCheck"
        false-icon="custom:square"
        :label="item.title"
        multiple
      >
      </v-checkbox>
      <!-- <div>{{ item }}dsf</div> -->
    </template>
    <template v-slot:selection="{item }">
                {{  $t(item.title)}}
            </template>
  </v-select>
</template>
<script setup>
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: Array,
  items: Array,
  selectKey: String,
  titleKey:String,
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
  console.log("93939393933939");
  const index = model.value.findIndex((object) => {
    return object === item.value;
  });
  console.log("before", model, index);
  model.value.splice(index, 1);
  console.log("after", model, index);
};
</script>
