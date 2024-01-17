<template>
  <v-card
    class="d-flex justify-space-between align-center rounded-lg flex-lg-row flex-column"
    variant="outlined"
    color="n100"
  >
    <v-card-text>
      <div :class="{'w-75': lgAndUp}">
        <div class="text-h2 text-text-heading mb-6">
          {{ $t("get_course_certificate") }}
        </div>
        <div class="text-body-2 text-text-high-emphasis">
          {{ $t("get_course_certificate_description") }}
        </div>
      </div>
    </v-card-text>
    <v-card-text>
      <v-card color="icon-disabled" height="309" width="525"></v-card>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { useDisplay } from 'vuetify';

const {lgAndUp} = useDisplay()
</script>
