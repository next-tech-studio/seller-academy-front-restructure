<template>
  <v-row justify="center" tag="section" :dense="smAndDown">
    <v-col cols="12" class="py-0">
      <div class="d-flex justify-space-between align-center mb-md-8 mb-4">
        <h2 class="text-md-h1 text-h2 text-text-high-emphasis" v-if="title">
          {{ $t(title).split("-").join(" ") }}
        </h2>
        <app-category
          v-if="showSortBy && !showFilter"
          :categories="sortItems"
          :offset="0"
          :button-style="{
            color: 'rgba(var(--v-theme-text-high-emphasis))',
          }"
          :button-title="{ before: 'sort_by', after: 'sort_by' }"
          v-model="store.filter.sort"
          single
          variant="tonal"
          v-on:update:modelValue="$emit('filter')"
        />
      </div>
      <div class="d-flex justify-space-between mb-6" v-if="dropDownFilter">
        <app-filters
          v-if="showFilter"
          :items="filters"
          @filter="$emit('filter')"
          variant="tonal"
          :no-slide="true"
          :remove-all="false"
          rounded="small"
          size="default"
          selectedBtn="bg-background-primary"
          defaultBtn="text-text-high-emphasis"
          selectedTxt="text-text-light"
          defaultTxt="text-text-high-emphasis"
          :set-color="false"
        />
        <app-category
          v-if="showSortBy"
          :categories="sortItems"
          :offset="0"
          :button-style="{
            color: 'rgba(var(--v-theme-text-high-emphasis))',
          }"
          :button-title="{ before: 'sort_by', after: 'sort_by' }"
          v-model="store.filter.sort"
          single
          variant="tonal"
          v-on:update:modelValue="$emit('filter')"
        />
      </div>
      <!-- <app-filterings class="mb-8 mt-md-4 mt-2" :filters="filterItems"> </app-filterings> -->
      <!-- <archive-filters
@filter="$emit('filter')"
:items="categories"
v-if="showFilter && !dropDownFilter"
:show-sort="showSortBy"
/> -->
      <v-row :no-gutters="smAndDown ? false : true" :dense="smAndDown">
        <v-col
          :cols="responsiveHorizontal ? 12 : 6"
          :md="grid"
          v-for="(post, index) in content"
          :key="index"
          :class="{
            'px-2': position(index) == 'center',
            'ps-4': position(index) == 'start' && blogHomepageHorizontalShow == 'false',
            'pe-4': position(index) == 'end',
          }"
          class="pb-md-6 py-0 position-relative"
        >
          <slot :item="post">
            <app-content-card
              :horizontal="(!mdAndUp && responsiveHorizontal) || horizontal"
              @click="$emit('to:item', post)"
              :content="post"
              aspect-ratio="1.64"
              hide-footer
            />
          </slot>
          <v-btn
            v-if="selectable"
            class='remove-article-position'
            icon="custom:x"
            flat
            @click="$emit('remove:item', post)"
          ></v-btn>
        </v-col>
      </v-row>
    </v-col>
    <v-btn
      flat
      @click="$emit('load:more')"
      class="align-self-center text-button mt-6"
      height="48px"
      color="primary-base"
      v-if="showSeeMore"
      >{{ $t("see_more") }}</v-btn
    >
  </v-row>
</template>

<script setup>
import { useDisplay } from "vuetify";
const { mdAndUp, smAndDown } = useDisplay();
import { useFilterStore } from "@core/stores/filter";
const store = useFilterStore();
const emit = defineEmits(["filter", "update:filters"]);
const { blogHomepageHorizontalShow } = useRuntimeConfig().public
const props = defineProps({
  content: Array,
  categories: Array,
  showFilter: {
    type: Boolean,
    default: true,
  },
  showSortBy: {
    default: false,
    type: Boolean,
  },
  title: {
    type: String,
  },
  showSeeMore: {
    type: Boolean,
    default: true,
  },
  responsiveHorizontal: {
    type: Boolean,
    default: false,
  },
  horizontal: {
    type: Boolean,
    default: false,
  },
  dropDownFilter: {
    type: Boolean,
    default: false,
  },
  filters: Array,
  grid: {
    type: Number,
    default: 4,
  },
  selectable: {
    type: Boolean,
    default: false,
  },
});
const sortItems = useSort();
let filters = ref([
  {
    type: "dropdown",
    title: "categories",
    items: props.categories,
    key: "title",
    value: "slug",
  },
]);
const position = (index) => {
  const col = 12 / props.grid;
  if (!smAndDown.value) {
    if (index % col == col - 1) {
      return "start";
    } else if (index % col == 0) {
      return "end";
    } else {
      return "center";
    }
  }
};
</script>

<style lang="scss">
.remove-article-position{
  position: absolute;
  left: 0;
  top: 0;
}
</style>
