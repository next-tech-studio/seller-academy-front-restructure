<template>
  <div class="slider-container">
    <v-slide-group
      ref="buttonFilter"
      direction="horizontal"
      center-active
      v-model="store.buttonDefault"
      id="button-filter"
      style="height: 50px"
      class="align-center"
    >
      <v-slide-group-item
        v-for="(item, index) in content.items"
        :key="index"
        :value="item.slug"
        v-slot="{ isSelected, toggle }"
      >
        <v-btn
          flat
          class="ml-4 text-body-1"
          rounded="lg"
          :class="
            isSelected
              ? 'bg-primary-base text-text-light'
              : 'bg-n100 text-text-low-emphasis'
          "
          @click="toggle"
          v-on:click="filterContent"
          :height="mdAndUp ? '50px' : '46px'"
        >
          {{ item.title }}
        </v-btn>
      </v-slide-group-item>
    </v-slide-group>
    <div
      class="arrows d-md-flex align-center d-none"
      :style="arrowsBackground"
      v-if="sliderWidth > containerWidth && mdAndUp"
    >
      <div style="min-width: 150px" class="d-flex justify-end">
        <v-btn
          icon="custom:chevronRightLight"
          @click="prevItems()"
          :disabled="disabledPrev"
          size="x-small"
          class="px-4 me-1"
          selected-class="bg-background-primary"
        ></v-btn>
        <v-btn
          icon="custom:chevronLeftLight"
          @click="nextItems()"
          :disabled="disabledNext"
          size="x-small"
          class="px-4"
          :class="next ? 'bg-background-primary' : 'bg-background-light'"
        ></v-btn>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  content: Array,
  arrowBgGradientStart: String,
  arrowBgGradientEnd: String,
});
import { useDisplay } from "vuetify";
const { mdAndUp } = useDisplay();
let sliderWidth = ref(0);
let back = ref(false);
let next = ref(false);
let containerWidth = ref(0);
let container = ref(null);
let slider = ref(null);
let buttonFilter = ref(null);
let disabledNext = ref(false);
let disabledPrev = ref(true);
import { useFilterStore } from "~/stores/filter";
const store = useFilterStore();
let x = 0;
const emit = defineEmits(["filter"]);
const prevItems = () => {
  x -= containerWidth.value / 3;
  buttonFilter.value.scrollOffset = x;
  if (
    buttonFilter.value.scrollOffset <
    sliderWidth.value - containerWidth.value
  )
    disabledNext.value = false;
  if (buttonFilter.value.scrollOffset < 100) disabledPrev.value = true;
};
const nextItems = () => {
  x += containerWidth.value / 3;
  buttonFilter.value.scrollOffset = x;
  if (
    buttonFilter.value.scrollOffset >
    sliderWidth.value - containerWidth.value
  )
    disabledNext.value = true;

  if (buttonFilter.value.scrollOffset > 0) disabledPrev.value = false;
};

const filterContent = async (emitUp = true) => {
  await nextTick();
  let filterValue = props.content.items.find(
    (item) => item.slug === store.buttonDefault
  );
  Object.assign(store.filter, filterValue);
  if (emitUp) emit("filter");
  setArrows();
};
let arrowsBackground = computed(() => {
  return {
    "--arrows-bg-gradient-end": `var(${props.arrowBgGradientEnd})`,
  };
});
const setArrows = async() => {
  await nextTick();
  container.value = document.getElementById("button-filter");
  slider.value = container.value.querySelector(".v-slide-group__content");
  containerWidth.value = container.value.offsetWidth;
  sliderWidth.value = slider.value.offsetWidth;
  console.log(containerWidth.value,sliderWidth.value)
};
onMounted(async () => {
  await filterContent(false);
});
onUpdated(()=>{
  console.log('555555555555555')
  setArrows();
})
</script>
<style lang="scss">
#button-filter {
  .v-slide-group__prev {
    display: none;
  }
  .v-slide-group__next {
    display: none;
  }
  .v-slide-group__next--disabled,
  .v-slide-group__prev--disabled {
    opacity: 1;
    pointer-events: visible;
  }
}
.arrows {
  width: 85px;
  position: absolute;
  left: 0;
  height: 100%;
  top: 0;
  background-image: linear-gradient(
    to left,
    transparent,
    rgba(var(--arrows-bg-gradient-end))
  );
}
.slider-container {
  width: 100%;
  padding: 16px;
  position: relative;

  @include respond("xxl") {
    max-width: 1360px;
    margin-right: calc(50% - 660px);
  }
  @include respond("xl") {
    max-width: 1180px;
    margin-right: calc(50% - 570px);
  }
  @include respond("lg") {
    max-width: 1000px;
    margin-right: calc(50% - 480px);
  }
  @include respond("md") {
    max-width: 750px;
    margin-right: calc(50% - 360px);
  }
  @include respond("sm") {
    max-width: 540px;
    margin-right: calc(50% - 270px);
    padding: 0px;
  }
  @include respond("xs") {
    max-width: 100%;
    margin-right: auto;
    padding: 0px;
  }
}
</style>
