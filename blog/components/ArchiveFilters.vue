<template>
  <v-slide-group class="d-md-none mb-8 mt-md-4 mt-2" v-model="filterToggle">
    <v-slide-group-item
      v-for="(item, index) in items"
      :key="index"
      :value="item.slug"
      v-slot="{ isSelected, toggle }"
    >
      <v-btn
        flat
        class="ml-4 rounded-md text-body-1"
        :class="
          !isSelected? ' bg-n100 text-text-low-emphasis' : 'bg-primary-base text-text-light'
        "
        @click="toggle"
        v-on:click="filterContent"
      >
        {{ item.title }}
      </v-btn>
    </v-slide-group-item>
  </v-slide-group>
  <div class="d-md-flex justify-space-between d-none mb-6 mt-4">
    <div>
      <v-btn-toggle rounded v-model="filterToggle">
        <v-btn
          weight="4"
          v-for="(item, index) in items"
          :key="index"
          flat
          :value="item.slug"
          @click="filterContent"
          selected-class="bg-primary-base text-text-light"
          :class="
            filterToggle != item.slug ? ' bg-n100 text-text-low-emphasis' : ''
          "
          class="ml-4 rounded-lg text-body-1" 
        >
          {{ item.title }}
        </v-btn>
      </v-btn-toggle>
    </div>
    <div class="d-flex justify-end">
      <app-category
        v-if="showSort"
        :categories="sortItems"
        :offset="25"
        button-color="text-text-low-emphasis"
        :button-title="{ before: 'sort_by', after: 'sort_by' }"
        v-model="store.filter.sort"
        single
        v-on:update:modelValue="filterContent"
      />
    </div>
  </div>
</template>

<script setup>
import { useFilterStore } from "@core/stores/filter";
const store = useFilterStore();
const emit = defineEmits(["filter"]);
// let filter = ref({ category: [], sort: "recent", tag:"" });
const props = defineProps({
  items: Array,
  showSort: { type: Boolean, default: false },
});
let filterToggle = ref("all");
const filterContent = () => {
  store.filter.category = filterToggle.value;
  emit("filter");
};
const sortItems = useSort();
</script>

<style lang="css">
.v-select .v-field .v-text-field__prefix,
.v-select .v-field .v-text-field__suffix,
.v-select .v-field .v-field__input,
.v-select .v-field.v-field {
  box-shadow: none;
}
</style>
