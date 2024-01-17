<template>
  <v-card rounded="0" color="n800">
    <v-container fluid class="py-16">
      <div class="text-text-light text-h3">{{ $t("course_goals") }}</div>
      <div class="text-body-2 text-text-light">
        {{ $t("course_goals_description") }}
      </div>
      <div
        class="text-text-high-emphasis mt-4 d-flex"
        v-for="(point, index) in item?.supportItems"
        :key="index"
      >
        <v-btn class="me-4" color="icon-hint-success" flat size="32">
          <v-icon size="24" icon="custom:check"></v-icon>
        </v-btn>
        <div class="text-body-2 text-text-light">{{ point }}</div>
      </div>
      <div class="mt-16" v-if="item?.skills">
        <app-tags light :title="$t('capable_skills')" :items="item?.skills" />
      </div>
    </v-container>
  </v-card>
</template>

<script setup>
const props = defineProps({
  item: Object,
});
</script>
