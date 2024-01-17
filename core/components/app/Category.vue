<template>
  <v-menu
    v-model="menu"
    z-index="1"
    :offset="[0, offset]"
    location="bottom"
    :close-on-content-click="closeOnContentClick"
    scroll-strategy="none"
    :origin="menuOrigin"
  >
    <template v-slot:activator="{ props }">
      <v-btn
        flat
        class="align-center"
        :style="buttonStyle"
        :text="
          modelValue && smAndDown && fullWidth
            ? modelValue
            : modelValue.title && !smAndDown && showItemTitle
            ? modelValue.title
            : modelValue && !smAndDown && !showItemTitle
            ? $t(buttonTitle.after)
            : $t(buttonTitle.before)
        "
        v-bind="{ ...$attrs, ...props }"
      >
        <template v-slot:append>
          <v-icon
            size="x-small"
            :icon="menu ? 'custom:caretTopSolid' : 'custom:caretDownSolid'"
          />
           </template
      ></v-btn>
    </template>

    <v-list
      elevation="0"
      :border="true"
      max-height="250"
      ref="categoryMenu"
      density="compact"
      :max-width="cardWidth"
      class="d-flex flex-wrap w-content py-0"
      v-if="fullWidth"
    >
      <v-list-item class="w-100 py-0 px-0">
        <!-- <span class="text-body-1 font-weight-bold"> {{ menuTitle }}</span> -->
        <div class="d-flex justify-end mt-1">
          <v-btn
            @click="menu = false"
            flat
            append-icon="fas fa-caret-up"
            class="text-button text-text-low-emphasis"
            >{{ $t("close") }}</v-btn
          >
        </div>
      </v-list-item>
      <v-row no-gutters class="w-100">
        <v-col cols="6" md="4" v-for="(item, index) in categories" :key="index">
          <v-list-item
            height="0"
            density="compact"
            class="px-md-1 px-2 py-0 d-flex"
          >
            <div class="d-flex">
              <v-checkbox
                v-bind="$attrs"
                :model-value="modelValue"
                :value="item.slug"
                @update:modelValue="$emit('update:modelValue', item.slug)"
                color="primary-base"
                height="0"
                true-icon="custom:squareCheck"
                false-icon="custom:square"
                density="compact"
                hide-details
              >
                <template v-slot:label>
                  <span class="text-body-1 text-text-high-emphasis">{{
                    item.title
                  }}</span>
                </template>
              </v-checkbox>
            </div>
          </v-list-item>
        </v-col>
      </v-row>
    </v-list>
    <v-list
      v-if="!fullWidth"
      elevation="0"
      :border="true"
      class="w-content"
      max-height="200"
    >
      <v-list-item
        height="0"
        density="compact"
        class="ps-0 py-0 me-3 d-flex"
        v-for="(item, index) in categories"
        :key="index"
      >
        <div class="d-flex">
          <v-checkbox
            v-bind="$attrs"
            v-model="model"
            :value="item.slug"
            :true-value="slug"
            color="primary-base"
            height="0"
            true-icon="custom:squareCheck"
            false-icon="custom:square"
            density="compact"
            class="mx-2"
            hide-details
          >
            <template v-slot:label>
              <span
                class="text-body-1 text-text-high-emphasis"
                :style="item.customStyle"
                >{{ item.title }}</span
              >
            </template>
          </v-checkbox>
        </div>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup>
const emit = defineEmits(["update:modelValue", "close:after", "change:sort"]);
const props = defineProps({
  categories: {
    type: Array,
  },
  cardWidth: {
    type: String,
    default: "auto",
  },
  menuTitle: {
    type: String,
    default: "انتخاب دسته‌بندی",
  },
  buttonTitle: {
    type: Object,
    default: { before: "choose", after: "change_category" },
  },
  menuOrigin: {
    type: String,
    default: "auto",
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
  buttonStyle: {
    type: Object,
  },
  offset: {
    type: Number,
    default: 0,
  },
  modelValue: {
    type: Array || Object,
  },
  closeOnContentClick: {
    type: Boolean,
    default: true,
  },
  single: {
    type: Boolean,
    default: false,
  },
  showItemTitle: {
    type: Boolean,
    default: false,
  },
});
import { useDisplay } from "vuetify";
const { smAndDown } = useDisplay();
let menu = ref(false);
let categoryMenu = ref(null);
let menuGotClosed = ref(false);

let model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    if (props.single && value.length > 1) value.shift();
    emit("update:modelValue", value);
    if (menuGotClosed) emit("close:after");
  },
});

watch(menu, (newValue) => {
  if (!newValue) menuGotClosed.value = !menuGotClosed.value;
});
</script>

<style lang="scss" scoped>
.v-data-table__td:first-child {
  padding-right: 0px !important;
}
</style>
