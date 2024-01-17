<template>
  <app-switch-wrapper>
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

    <v-slide-group
      id="course_slider"
      :class="{ 'mt-4': hideFilter }"
      :direction="mdAndUp ? 'horizontal' : 'vertical'"
    >
      <v-slide-group-item v-if="!hideDescription">
        <v-card
          :width="mdAndUp ? 296 : '100%'"
          :class="{ 'mb-4': !mdAndUp, 'ml-4': mdAndUp }"
        >
          <div class="text-h5 text-text-heading text-subtitle-2">
            {{ store.filter.title }}
          </div>
          <div class="text-body-2 text-text-low mb-md-0 mb-2">
            {{ store.filter.description }}
          </div>
          <v-divider color="n400" class="my-7 d-none d-md-block"></v-divider>
          <div class="text-body-2 font-weight-bold text-text-heading mb-2">
            {{ $t("capable_skills") }}
          </div>
          <div class="mb-md-0 mb-4">
            <v-btn
              v-for="skill in store.filter.skills"
              :key="skill.id"
              disabled
              variant="flat"
              color="background-dark"
              class="mb-2 ml-2"
              size="small"
            >
              <span class="text-text-low-emphasis text-body-2">
                {{ skill }}
              </span>
            </v-btn>
          </div>
          <v-divider color="n400" class="my-7 d-none d-md-block"></v-divider>
          <div class="d-flex justify-space-between">
            <span class="text-body-2 text-text-high-emphasis">{{
              $t("participants")
            }}</span>
            <span class="text-body-2 text-text-heading font-weight-bold">
              {{ store.filter.UserEnrolledCount }}
            </span>
          </div>
          <div class="d-flex justify-space-between">
            <span class="text-body-2 text-text-high-emphasis">{{
              $t("courses_count")
            }}</span>
            <span class="text-body-2 text-text-heading font-weight-bold">
              {{ store.filter.courseCount }}
            </span>
          </div>
        </v-card>
      </v-slide-group-item>
      <v-slide-group-item
        v-for="(item, index) in courses?.slice(0, 3)"
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
</template>

<script setup>
import { useFilterStore } from "@core/stores/filter";
import { useDisplay } from "vuetify";
const localePath = useLocalePath()
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
