<template>
  <div v-if="filters">
    <component
      @filter="$emit('filter')"
      v-for="(filter, index) in filters"
      :key="index"
      v-bind="computedProps(filter?.type)"
      :is="component(filter?.type)"
      :content="filter"
    />
  </div>
</template>

<script setup>
import Button from "@/components/app/filterings/Button.vue";
import DatePicker from "@/components/app/filterings/DatePicker.vue";
import SearchCombo from "@/components/app/filterings/SearchCombo.vue";
import DropDown from "@/components/app/filterings/Dropdown.vue";

const props = defineProps({
  filters: Array,
  arrowBgGradientEnd: String,
});
let computedProps = (type) => {
  if (type == 'button')
    return {
      arrowBgGradientEnd: props.arrowBgGradientEnd,
    };
};
const component = (type) => {
  let component;
  switch (type) {
    case "button":
      component = Button;
      break;
    case "date-picker":
      component = DatePicker;
      break;
    case "dropdown":
      component = DropDown;
      break;
    case "search-combo":
      component = SearchCombo;
      break;
    case "search-list":
      component = SearchList;
      break;
  }
  return component;
};
</script>
