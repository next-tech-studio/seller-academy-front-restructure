<template>
  <app-switch-wrapper class="bg-white py-8 ps-4 rounded-lg pe-md-0 pe-4">
    <div class="d-flex flex-column flex-md-row">
      <v-card :width="lgAndUp ? 470 :mdAndUp ? 1000 : '100%'">
        <div class="text-h5 text-text-heading">
          {{ $t("roadmaps") }}
        </div>
        <div class="text-body-2 text-text-low mb-2">
          {{ $t("roadmaps_description") }}
        </div>
        <v-btn
          size="small"
          color="primary-base"
          variant="flat"
          icon="custom:chevronRight"
          class="rounded-xl ml-2"
          @click="() => parent.scrollTo('prev')"
        ></v-btn>
        <v-btn
          size="small"
          color="primary-base"
          variant="flat"
          icon="custom:chevronLeft"
          class="rounded-xl"
          @click="() => parent.scrollTo('next')"
        ></v-btn>
        <v-btn
          variant="text"
          block
          class="d-block px-0 animated text-button text-button-secondary position-absolute"
          style="bottom: 0"
        >
          {{ $t("start_your_roadmap") }}
          <v-icon
            class="mr-1"
            size="x-small"
            icon="custom:chevronLeft"
          ></v-icon>
        </v-btn>
      </v-card>
      <v-slide-group id="course_slider" ref="parent" :direction="mdAndUp ? 'horizontal' : 'vertical'">
        <v-slide-group-item
          v-for="(item, index) in items"
          :key="index"
          :value="item.slug"
        >
          <div>
            <course-card
              class="mr-md-4 mr-0 mb-md-0 mt-lg-0 mt-4"
              :width="mdAndUp ? 296 : '100%'"
              :item="item"
              @to:item="toRoadmap"
              :horizontal="!mdAndUp"
            ></course-card>
          </div>
        </v-slide-group-item>
      </v-slide-group>
    </div>
  </app-switch-wrapper>
</template>

<script setup>
import { useDisplay } from "vuetify";

const { mdAndUp, lgAndUp } = useDisplay();
const props = defineProps({
  items: Array,
});
const parent = ref(null);
</script>
