<template>
  <div class="text-h2 font-weight-bold mt-1 mb-4 text-center">
    "{{ $t("about_us_departments_title") }}"
  </div>
  <v-row no-gutters class="my-6" justify="space-between">
    <v-col cols="12" md="9" class="my-auto">
      <div>
        <div class="text-h3">
          {{ $t(items[0].title) }}
        </div>
        <div class="text-body-1">
          {{ $t(items[0].description) }}
        </div>
      </div>
    </v-col>
    <v-col cols="12" md="3">
      <v-img class="rounded-md" :src="items[0].image" />
    </v-col>
  </v-row>
  <v-row no-gutters class="my-6" justify="space-between">
    <v-col cols="12" md="3" :order="smAndDown ? 2 : 1">
      <v-img class="rounded-md" :src="items[1].image" />
    </v-col>
    <v-col cols="12" lg="auto" md="9" sm="12" class="my-auto" :order="smAndDown ? 1 : 2">
      <div class="ps-4">
        <div class="text-h3">
          {{ $t(items[1].title) }}
        </div>
        <div class="text-body-1">
          {{ $t(items[1].description) }}
        </div>
      </div>
    </v-col>
  </v-row>
  <v-row no-gutters class="my-6" justify="space-between">
    <v-col cols="12" md="9" class="my-auto">
      <div>
        <div class="text-h3">
          {{ $t(items[2].title) }}
        </div>
        <div class="text-body-1">
          {{ $t(items[2].description) }}
        </div>
      </div>
    </v-col>
    <v-col cols="12" md="3">
      <v-img class="rounded-md" :src="items[2].image" />
    </v-col>
  </v-row>
</template>

<script setup>
import { useDisplay } from "vuetify/lib/framework.mjs";
const { mobile, smAndDown } = useDisplay();

const items = [
  {
    title: "departments.portfolio.title",
    description: "departments.portfolio.description",
    image: '/images/departments/portfolio.png'
  },
  {
    title: "departments.talent.title",
    description: "departments.talent.description",
    image: '/images/departments/talent.png'
  },
  {
    title: "departments.r_and_d.title",
    description: "departments.r_and_d.description",
    image: '/images/departments/r_and_d.png'
  },
]
</script>
