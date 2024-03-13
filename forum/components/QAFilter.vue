<template>
  <v-btn-toggle v-model="filterToggle" mandatory class="bg-background-dark" id="q-a-filters">
    <v-btn
    v-for="(item, index) in items" :key="index"
      selected-class="text-text-heading"
      :value="item.value"
      class="text-body-2 text-text-low-emphasis bg-background-dark ps-0 ps-md-2"
      @click="filterQuestions(item.value)"
      >{{ $t(item.title) }}</v-btn
    >
    <!-- <v-btn
      selected-class="text-text-heading"
      value="recent"
      class="text-body-2 text-text-low-emphasis bg-background-dark ps-0 d-flex justify-start"
      @click="filterQuestions('recent')"
      >{{ $t("newest") }}</v-btn
    >
    <v-btn
      selected-class="text-text-heading"
      value="likes"
      class="text-body-2 text-text-low-emphasis bg-background-dark ps-0 ps-md-2"
      @click="filterQuestions('likes')"
      >{{ $t("most_popular") }}</v-btn
    >
    <v-btn
      selected-class="text-text-heading"
      value="noneAnswer"
      class="text-body-2 text-text-low-emphasis bg-background-dark ps-0 ps-md-2"
      @click="filterQuestions('noneAnswer')"
      >{{ $t("without_response") }}</v-btn
    > -->
  </v-btn-toggle>
</template>

<script setup>
import { useFilterStore } from "~/stores/filter";
let store = useFilterStore();
let props = defineProps({
  modelValue: String,
  items:Array
});
let emit = defineEmits(["update:modelValue"]);

let filterToggle = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
const filterQuestions = (filterType) => {
  store.filter.sort = filterType;
  emit("filter:items");
};
</script>

<style lang="scss">
#q-a-filters {
  .v-btn--active > .v-btn__overlay {
    background: transparent !important;
  }
  .v-btn--variant-text .v-btn__overlay {
    background: transparent !important;
  }
}
</style>
