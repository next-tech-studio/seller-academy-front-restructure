<template>
  <v-card class="py-10">
    <v-container>
      <div class="text-h2 text-text-heading">پرتکرارترین پرسش‌های متداول</div>
      <v-tabs
        v-model="mutedCurrentCategory"
        slider-color="primary-base"
        color="primary-base"
        align-tabs="start"
        class="mb-6"
      >
        <v-tab
          v-for="(category, propertyName) in categories"
          :key="propertyName"
          :value="propertyName"
          >{{ category?.category?.title }}</v-tab
        >
      </v-tabs>
      <v-window v-model="mutedCurrentCategory">
        <v-window-item
          v-for="(category, propertyName) in categories"
          :key="propertyName"
          :value="propertyName"
        >
          <v-container fluid>
            <v-row>
              <app-content-faq
                gap="16"
                density="compact"
                hide-title
                class="w-100"
                parrent-padding="px-0"
                :content="category?.frequentFaqs"
              />
            </v-row>
          </v-container>
        </v-window-item>
      </v-window>
      <!-- <v-tabs
        v-model="current"
        color="primary-base"
        class="mb-6"
        align-tabs="start"
      >
        <v-tab
          v-for="(item, index) in items"
          :key="index"
          class="text-subtitle-1 font-weight-bold"
          :value="index"
        >
          {{ item.title }}
        </v-tab>
      </v-tabs>
      <v-window v-model="current">
        <v-window-item v-for="n in items.length" :key="n" :value="n - 1">
          <app-content-faq
            gap="16"
            density="compact"
            hide-title
            parrent-padding="px-0"
            :content="items[current].faq"
          />
        </v-window-item>
      </v-window> -->
    </v-container>
  </v-card>
</template>

<script setup>
// const props = defineProps({
//   items: Array,
// });

// let current = ref(0)
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  categories: Array,
  modelValue: String,
});
const mutedCurrentCategory = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>
