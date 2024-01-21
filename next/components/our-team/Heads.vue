<template>
  <v-card color="primary-base" class="rounded-0">
    <v-container fluid>
      <v-row>
        <v-col v-for="(item, index) in items" cls="12" md="6" :key="index">
          <about-us-profile-card grey :item="item" dark />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup>
const props = defineProps({
  items: Array,
});
</script>
