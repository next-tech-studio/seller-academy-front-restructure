<template>
  <v-row :dense="smAndDown">
    <v-col cols="6" md="3" v-for="(item, index) in items" :key="item.title">
      <v-card tag="a" :href="item.linkUrl">
        <v-img
          :src="item.imageUrl"
          aspect-ratio="1.5"
          cover
          class="bg-grey-lighten-2"
        ></v-img>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
const props = defineProps({
  items: Array,
});

import { useDisplay } from "vuetify";
const {smAndDown} = useDisplay()
</script>

<style lang="scss"></style>
