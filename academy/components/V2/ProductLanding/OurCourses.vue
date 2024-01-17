<template>
  <app-switch-wrapper class="mx-0">
    <div class="d-flex justify-space-between align-center">
      <span class="text-lg-h2 text-h3 text-text-heading">
        {{ $t(title) }}
      </span>
      <v-btn
        v-if="!hideSeeMore"
        color="text-secondary"
        variant="text"
        class="px-0 animated text-button"
        :to="localePath({ name: 'academy-courses-category-slug' })"
        >{{ $t("see_more") }}
      </v-btn>
    </div>
    <div v-if="categories?.length">
      <app-filterings
        v-if="!hideFilter"
        @filter="filter"
        class="my-6"
        :filters="filters"
      />
    </div>

    <!-- <app-filters
      v-if="!hideFilter"
      class="my-6"
      @filter="filter"
      :items="categories"
      selectedBtn="bg-background-primary"
      defaultBtn="text-text-high-emphasis"
    /> -->
    <v-slide-group
      id="course_slider"
      :class="{ 'mt-4': hideFilter }"
      :direction="mdAndUp ? 'horizontal' : 'vertical'"
    >
      <v-slide-group-item
        v-for="(item, index) in courses?.slice(0, 4)"
        :key="index"
        :value="item.slug"
      >
        <div>
          <course-card
            :class="{ 'mr-md-4 mr-0': !hideDescription, 'mb-2': !mdAndUp }"
            :horizontal="!mdAndUp"
            class="ml-4"
            :width="mdAndUp ? 296 : '100%'"
            :item="item"
            @to:item="toCourse"
          ></course-card>
        </div>
      </v-slide-group-item>
    </v-slide-group>
  </app-switch-wrapper>
  <v-col cols="12" md="12" class="d-flex flex-column align-center">
    <v-btn tag="a" class="rounded-lg mt-4" color="primary-base" variant="outlined">{{
      $t("see_all_courses")
    }}</v-btn>
  </v-col>
</template>

<script setup>
import { useFilterStore } from "@core/stores/filter";
import { useDisplay } from "vuetify";
const { mdAndUp } = useDisplay();
const store = useFilterStore();
const props = defineProps({
  title: {
    default: "our_courses",
    type: String,
  },
  items: Array,
  categories: Array,
  currentCategory: Array,
  hideSeeMore: {
    default: false,
    type: Boolean,
  },
  hideFilter: {
    default: false,
    type: Boolean,
  },
  hideDescription: {
    default: false,
    type: Boolean,
  },
});
let filters = computed(() => {
  return [{ type: "button", items: props.categories }];
});
const courses = computed(() => {
  return !props.hideFilter ? store.filter.courses : props.items;
});
// onUpdated(() => {
//   store.buttonDefault = props.categories[0].slug;
// });
</script>

<style lang="scss">
#course_slider {
  .v-slide-group__content {
    // justify-content: space-between;
  }
}
</style>
