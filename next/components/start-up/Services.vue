<template>
  <div class="bg-background-dark pa-10 rounded-lg">
    <!-- <h3 class="mb-6">{{ $t("our_sevices") }}</h3> -->
    <v-row>
      <v-col
      cols="12"
      md="4"
      lg="3"
        v-for="(item, index) in services"
        :key="index"
        class="d-flex bg-background-light px-4 py-6 mb-2 me-6 rounded-lg align-center"
      >
        <div class="rounded-pill bg-icon-hint-success me-3 d-flex align-center justify-center" style="width: 25px; height: 25px;">
          <v-icon icon="custom:check" size="x-large" />
        </div>
        <span class="text-body-1" style="height:25px">{{ item }}</span>
    </v-col>
    </v-row>
  </div>
</template>
<script setup>
const props = defineProps({
  services: Array,
});
</script>
