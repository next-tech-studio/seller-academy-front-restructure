<template>
  <v-container fluid>
    <div v-for="unit in units" :key="unit">
      <v-row class="mb-lg-13 mb-6" v-if="members(unit?.heading)?.length">
        <v-col cols="12" md="12" sm="12" class="text-center pb-lg-10 pb-4">
          <div class="text-h3 font-weight-bold mb-4">{{ $t(unit?.title) }}</div>
          <div class="text-body-1">{{ $t(unit?.description) }}</div>
        </v-col>
        <v-col
          v-for="(item, index) in members(unit?.heading)"
          :key="index"
          :cols="6"
          lg="3"
          xxl="2"
          class="pa-2"
        >
          <about-us-member-card :item="item" />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup>
import { useDisplay } from "vuetify";

const { lgAndUp } = useDisplay();
const props = defineProps({
  items: Array,
});
const units = [
  {
    heading: "پورتفو و سرمایه‌گذاری",
    title: "units.portfolio.title",
    description: "units.portfolio.description",
  },
  {
    heading: "تکنولوژی و نوآوری",
    title: "units.r_and_d.title",
    description: "units.r_and_d.description",
  },
  {
    heading: "توسعه استعداد",
    title: "units.talent.title",
    description: "units.talent.description",
  },
  {
    heading: "مالی",
    title: "units.financial.title",
    description: "units.financial.description",
  },
];
const members = (unit) => props.items.filter((m) => m.unit == unit);
</script>
