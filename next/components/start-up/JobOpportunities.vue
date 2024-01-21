<template>
  <div class="text-center mb-6">
    <h3 class="mb-4">{{ $t("job_opportunities") }}</h3>
    <p>{{ $t("start_up_job_opportunity_desc") }}</p>
  </div>

  <v-row>
    <v-col cols="12" lg="6" v-for="(item, index) in opportunities" :key="index">
      <app-job-opportunity :item="item"></app-job-opportunity>
    </v-col>
  </v-row>
</template>
<script setup>
const props = defineProps({
  opportunities: Array,
});
</script>
