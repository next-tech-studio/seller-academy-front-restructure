<template>
  <v-row align="center">
    <v-col cols="12" md="3" :order="smAndDown ? 1 : null" class="py-0 py-lg-3">
      <v-card class="ma-2">
        <div class="text-h4 font-weight-bold mt-lg-9 mt-0">
          {{ $t("investment_and_startups") }}
        </div>
        <div class="mt-1 mb-4 text-body-1 text-text-low-emphasis">
          {{ $t("investment_and_startups_brief") }}
        </div>
        <v-btn
          size="large"
          variant="flat"
          color="primary-base"
          class="rounded-lg"
          :to="localePath('portfo')"
          >{{ $t("more_details") }}</v-btn
        >
      </v-card>
    </v-col>
    <v-col
      cols="12"
      md="9"
      :order="smAndDown ? 2 : null"
      class="position-relative py-0 py-lg-3"
    >
      <v-slide-group
        :class="!lgAndUp ? 'hide-slider-control' : ''"
        next-icon="custom:chevronRight"
        prev-icon="custom:chevronLeft"
      >
        <v-slide-group-item
          v-for="(item, index) in items"
          :key="index"
          v-slot="{ isSelected, toggle }"
          class="overflow-visible"
        >
          <v-card width="318" class="ma-2" :to="localePath({name: 'startups-slug', params: {slug: item.slug}})">
            <v-card-text
              class="rounded-md mb-4 d-flex align-center justify-center background-color position-relative"
              :style="computedBackgroud(item.color)"
              style="height: 290px"
            >
              <v-img
                cover
                :src="item.imageUrl"
              ></v-img>
            </v-card-text>
            <span class="text-h5">{{ item.title }}</span>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>
    </v-col>
  </v-row>
</template>

<script setup>
import { useDisplay } from "vuetify";
const { mobile, smAndDown, lgAndUp } = useDisplay();
const props = defineProps({
  items: Array,
});
const computedBackgroud = (color) => {
  return {
    "--startup-bg-color": color,
  };
};
</script>
<style lang="scss">
.startup-cover-position {
  // transform:translateY(-10px)
  position: absolute;
  top: -10%;
  z-index: 100;
}
// .background-color {
//   background:  radial-gradient(circle at bottom, var(--startup-bg-color)30%,transparent 50%),
//   linear-gradient(var(--startup-bg-color),  var(--startup-bg-color)) bottom/100% 50% no-repeat,

// }

.background-color::before,
.background-color::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: -1;
}

.background-color::before {
  background-color: var(--startup-bg-color);
  height: 75%;
  border-radius: 20px;
}

.background-color::after {
  height: 30%;
  background-color: transparent;
}
</style>
