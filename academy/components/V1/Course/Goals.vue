<template>
  <v-card class="rounded-lg">
    <v-card-text>
      <div class="text-text-heading text-h2">{{ $t("course_goals") }}</div>
      <div class="text-subtitle text-text-hih-emphasis">
        {{ $t("course_goals_description") }}
      </div>
      <div
        class="text-text-high-emphasis mt-4"
        v-for="(point, index) in item.learningPoints"
        :key="index"
      >
        <div class="text-h5 text-text-high-emphasis">{{ point.title }}</div>
        <div class="text-body-2 text-text-high-emphasis">
          {{ point.description }}
        </div>
      </div>
      <div class="mt-4" v-if="item.skills">
        <app-tags :title="$t('capable_skills')" :items="item.skills" />
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
const props = defineProps({
  item: Object,
});
</script>
