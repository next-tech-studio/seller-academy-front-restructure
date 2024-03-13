<template>
  <div>
    <!-- {{ references }} -->

    <div class="px-6 py-2 d-flex justify-space-between border-b">
      <p class="text-h3">
        {{ $t("choose_article") }}
      </p>
      <v-expand-transition>
        <search @choose:article="addReference($event)" />
      </v-expand-transition>
    </div>
    <div class="pa-6">
      <!-- <p v-if="search.length < 1" class="text-h3 text-n300 text-center">
        مقاله‌های موجود پس از جستجو‌ نمایش داده خواهند شد.
      </p> -->
      <app-content-card-listing
        :content="articles"
        horizontal="true"
        selectable="true"
        grid="12"
        :image-square="true"
        @to:item="addReference"
        @remove:item="removeReference"
        :show-see-more="false"
        :show-filter="false"
      ></app-content-card-listing>
    </div>
  </div>
</template>
<script setup>
import Search from "@core/layouts/components/navbar/components/Search.vue";
const emit = defineEmits(["update:modelValue"]);
let search = ref("");
let articles = computed({
  get() {
    return props.references;
  },
  set(newValue) {
  },
});
const props = defineProps({
  api: {
    type: Object,
    default: { repo: "blog", function: "search" },
  },
  modelValue: Array,
  store: Object,
  references: Array,
});
let model = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit("update:modelValue", newValue);
  },
});
const addReference = (e) => {
  if (!model.value.includes(e.id)) {
    model.value.push(e.id);
    articles.value.push(e);
  }
};
const removeReference = (e) => {
  let index = model.value.findIndex((item) => item.id == e.id);
  model.value.splice(index, 1);
  articles.value.splice(index, 1);
};
onMounted(() => {});
</script>
<style lang="scss">
.search-overlay {
  height: 100%;
  z-index: 10;
  position: fixed;
  background: white;
  width: 100%;
}
body.search-overlay {
  overflow-y: hidden !important;
  position: fixed;
}
</style>
