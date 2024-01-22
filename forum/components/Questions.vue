<template>
  <div id="community-question">
    <v-card color="background-dark">
      <div
        class="d-flex flex-column flex-md-row align-md-center justify-md-space-between mt-md-6 mt-4"
      >
        <v-card-title
          class="text-body-1 font-weight-bold py-0 px-0 py-md-2 px-md-2"
          >{{ $t("last_questions") }}</v-card-title
        >
        <v-card-actions class="px-0 px-md-4">
          <q-a-filter
            v-model="filterToggle"
            @filter:items="$emit('filter:questions')"
            :items="filters"
          ></q-a-filter>
          <v-divider vertical class="my-3 mx-2" :thickness="2"></v-divider>
          <app-category
            :categories="categories"
            :offset="100"
            :close-on-content-click="false"
            button-color="text-text-low-emphasis"
            :button-title="{ before: 'grouping', after: 'grouping' }"
            v-model="store.filter.category"
            @close:after="onCategoryClose"
          ></app-category>
        </v-card-actions>
      </div>
    </v-card>
    <v-card color="background-dark" v-if="items.length">
      <div v-for="(item, index) in items" :key="item.slug">
        <question
          @reaction="onReaction($event, item.slug, index)"
          :item="item"
          class="mb-2"
          bold
          @click="$emit('to:item', item)"
          :all-in-bottom="!mdAndUp"
          :diveded-footer="false"
        >
        </question>
      </div>
      <v-row
        class="justify-center"
        v-if="!isLastPage"
        :class="isClient ? 'd-flex' : 'd-none'"
      >
        <v-btn
          @click="$emit('load:more')"
          flat
          class="my-6 text-button"
          color="primary-base"
          >{{ $t("see_more") }}</v-btn
        >
      </v-row>
    </v-card>
  </div>
</template>
<script setup>
const emit = defineEmits(["react:message", "filter:questions"]);
import { useFilterStore } from "@core/stores/filter";
import { useDisplay } from "vuetify/lib/framework.mjs";
let store = useFilterStore();
let questionReaction = ref({});
let filterToggle = ref("recent");
let filters = [
  { title: "newest", value: "recent" },
  { title: "most_popular", value: "likes" },
  { title: "without_response", value: "noneAnswer" },
];
const { isClient } = useSsrCorrection();
const { mdAndUp } = useDisplay();
const props = defineProps({
  items: Array,
  categories: Array,
  isLastPage: Boolean,
});
const onCategoryClose = () => {
  emit("filter:questions");
};
const onReaction = (action, questionSlug, index) => {
  Object.assign(questionReaction.value, { questionSlug, action, index });
  emit("react:message", questionReaction.value);
};
</script>

<style lang="scss">
#community-question {
  .checkbox .v-label {
    font-size: 10rem !important;
  }
}
</style>
