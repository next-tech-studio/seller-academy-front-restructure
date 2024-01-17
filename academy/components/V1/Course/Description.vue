<template>
  <v-card rounded="lg" class="h-100">
    <v-card-title class="text-h2 text-text-heading pb-6 rounded-lg">
      {{ $t("description") }}
    </v-card-title>
    <v-card-text class="pt-0 pb-6">
      <v-card color="n100" variant="outlined" class="py-0">
        <v-card-title class="text-h5 text-text-high-emphasis pb-4">
          {{ $t("course_details") }}
        </v-card-title>
        <v-card-text class="d-flex justify-space-between flex-lg-row flex-column  w-100">
          <div class="d-flex align-center mb-lg-0 mb-4">
            <v-icon
              size="24"
              class="rounded-xl bg-icon-secondary pa-1 ml-1"
              color="icon-light"
              variant="compact"
              icon="custom:clock"
            ></v-icon>
            <div class="text-text-high-emphasis font-weight-bold ml-1">
              {{ $t("course_period") }}:
            </div>
            <div class="text-text-high-emphasis">{{ item.totalDuration }}</div>
          </div>
          <div class="d-flex align-center mb-lg-0 mb-4">
            <v-icon
              size="24"
              class="rounded-xl bg-icon-secondary pa-1 ml-1"
              color="icon-light"
              variant="compact"
              icon="custom:play"
            ></v-icon>
            <div class="text-text-high-emphasis font-weight-bold ml-2">
              {{ $t("videos_count") }}:
            </div>
            <div class="text-text-high-emphasis">{{ item.videoCount }}</div>
          </div>
          <div class="d-flex align-center mb-lg-0 mb-4">
            <v-icon
              size="24"
              class="rounded-xl bg-icon-secondary pa-1 ml-1"
              color="icon-light"
              variant="compact"
              icon="custom:quiz"
            ></v-icon>
            <div class="text-text-high-emphasis font-weight-bold ml-1">
              {{ $t("quizzes_count") }}:
            </div>
            <div class="text-text-high-emphasis">{{ item.examCount }}</div>
          </div>
          <div class="d-flex align-center mb-lg-0">
            <v-icon
              size="24"
              class="rounded-xl bg-icon-secondary pa-1 ml-1"
              color="icon-light"
              variant="compact"
              icon="custom:language"
            ></v-icon>
            <div class="text-text-high-emphasis font-weight-bold ml-1">
              {{ $t("course_lang") }}:
            </div>
            <!-- <div class="text-text-high-emphasis">{{ item?.languages?.join(' و ') }}</div> -->
            <div class="text-text-high-emphasis">فارسی</div>

          </div>
        </v-card-text>
      </v-card>
    </v-card-text>
    <v-card-title class="text-h5 text-text-high-emphasis">
      {{ $t("What_is_covered_in_this_course") }}
    </v-card-title>
    <v-card-text class="mb-6">
      <v-row>
        <v-col
          v-for="(object, index) in item.supportItems"
          :key="index"
          cols="12"
          md="6"
          class="pb-lg-4 pb-0"
        >
          <div class="d-flex">
            <v-icon
              size="x-large"
              color="icon-hint-success"
              icon="custom:check"
              class="ml-2"
            ></v-icon>
            <div class="text-body-2 text-high-emphasis">
              {{ object }}
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
const props = defineProps({
  item: Object,
});
</script>
