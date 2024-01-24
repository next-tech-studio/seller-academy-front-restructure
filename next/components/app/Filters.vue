<template>
  <app-switch-wrapper>
    <v-slide-group v-model="filter" v-if="!noSlide">
      <v-slide-group-item
        v-for="(item, index) in items"
        :key="index"
        :value="item"
        v-slot="{ isSelected, toggle }"
      >
        <v-btn
          v-if="item.type != 'dropdown' && item.type != 'datePicker'"
          flat
          class="ml-4 rounded-md text-body-1"
          :class="
            !isSelected
              ? 'bg-n100 text-text-low-emphasis'
              : 'bg-primary-base text-text-light'
          "
          @click="toggle"
          v-on:click="filterContent"
        >
          {{ item.title }}
        </v-btn>
      </v-slide-group-item>
    </v-slide-group>
    <div v-else class="d-flex">
      <div v-for="(item, index) in items" :key="index" :value="item">
        <v-menu transition="slide-y-transition" v-if="item.type === 'dropdown'">
          <template v-slot:activator="{ props, isActive }">
            <v-btn
              flat
              v-bind="{ ...$attrs, ...props }"
              :size="$attrs.size || 'large'"
              :rounded="$attrs.rounded || 'pill'"
              :variant="$attrs.variant || 'outlined'"
              :class="
                selected[item?.title]
                  ? ($attrs.selectedBtn || 'bg-background-light text-primary-base')
                  : ($attrs.defaultBtn || 'bg-background-light text-n200')
              "
              class="me-4 text-body-1"
            >
              <template v-slot:append>
                <v-icon
                  size="12"
                  :color="
                    selected[item.title]
                      ? ($attrs.selectedTxt || 'text-primary')
                      : ($attrs.defaultTxt || 'text-high-emphasis')
                  "
                  :icon="
                    isActive ? 'custom:caretTopSolid' : 'custom:caretDownSolid'
                  "
                />
              </template>
              <span
                :class="
                  selected[item.title]
                    ? ($attrs.selectedTxt || 'text-text-primary')
                    : ($attrs.defaultTxt || 'text-text-high-emphasis')
                "
                class="text-body-1"
                v-text="
                  selected[item.title]
                    ? t(selected[item.title][0])
                    : t(item.title)
                "
              ></span>
            </v-btn>
          </template>
          <v-list
            v-model:selected="selected[item.title]"
            select-strategy="single-independent"
            open-strategy="single"
            class="px-2"
          >
            <v-list-item
              v-for="(filterItem, i) in item.items"
              :key="i"
              nav
              :class="store.statusColor(filterItem)"
              :value="filterValue(item.key, filterItem)"
              @click="filterContent(item, filterItem)"
            >
              <v-list-item-title>
                <v-icon
                  v-if="item.icon"
                  :icon="item.icon"
                  size="12"
                  :class="store.statusColor(filterItem)"
                  class="me-2 text-body-1"
                />
                <span class="text-body-1" v-text="filterTitle(item.key, filterItem)" />
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <div v-if="item.type === 'datePicker'">
          <v-btn
            flat
            size="large"
            rounded
            variant="outlined"
            :class="
              date.length > 1
                ? 'text-text-primary bg-background-light'
                : 'text-border-grade-2 bg-background-light'
            "
            class="me-4 custom-input"
          >
            <template v-slot:append>
              <v-icon
                size="12"
                :color="
                  date.length > 1
                    ? 'text-primary'
                    : 'text-high-emphasis'
                "
                icon='custom:caretDownSolid'
              />
            </template>
            <span
            class="text-body-1"
              :class="
                date.length ? 'text-text-primary' : 'text-text-high-emphasis'
              "
              >{{ $t(item.title) }}</span
            >
          </v-btn>
          <date-picker
            auto-submit
            range
            color="rgba(var(--v-theme-primary-base))"
            v-model="date"
            format="YYYY/MM/DD"
            custom-input=".custom-input"
            popover="bottom-left"
          ></date-picker>
        </div>
      </div>
      <v-btn color="text-low-emphasis" variant="text" append-icon="custom:x" @click="removeFilters()">حذف همه‌ی فیلتر‌ها</v-btn>
    </div>
  </app-switch-wrapper>
</template>

<script setup>
const { t } = useI18n();
import { useFilterStore } from "@core/stores/filter";
const store = useFilterStore();
const emit = defineEmits(["filter"]);
let selected = ref({});
let now = new Date();
let date = ref(now);
let filter = ref("");
const props = defineProps({
  items: Array,
  showSort: { type: Boolean, default: false },
  noSlide: { type: Boolean, default: false },
  setColor: { type: Boolean, default: true },
});
const filterContent = (filterParent = null, selectedFilter = null) => {
  let value = {
    [filterParent?.title]: filterValue(filterParent?.value, selectedFilter),
  };
  if (props.noSlide) {
    Object.assign(store.filter, value);
  } else {
    Object.assign(store.filter, filter.value);
  }
  emit("filter");
};

watch(
  date,
  (newValue) => {
    let value = {
      publicationDateMax: newValue[1],
      publicationDateMin: newValue[0],
    };
    store.filter = value;
    emit("filter");
  },
  { deep: true }
);
const filterTitle = (key, filter) => {
  return key ? t(filter[key]) : t(filter);
};
const filterValue = (value, filter) => {
  return value ? filter[value] : filter;
};
const removeFilters = ()=>{
  store.filter = {};
  console.log('selected',selected)
  selected.value = {}
  console.log('selected',selected)
  emit("filter");
}
</script>
