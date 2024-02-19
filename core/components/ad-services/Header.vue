<template>
  <v-card
    color="n100"
    :height="lgAndUp ? 555 : auto"
    class="d-flex align-center rounded-0 rounded-b-lg"
  >
    <v-container>
      <v-row justify="center">
        <v-col cols="12" lg="4" v-for="n in 3" :key="n">
          <v-img
            max-height="355"
            :src="`/images/ad-services/banners/${n}.png`"
          ></v-img>
        </v-col>
        <v-btn
          v-if="lgAndUp"
          style="position: absolute; bottom: 0"
          color="icon-low-emphasis"
          flat
          variant="text"
          icon="custom:arrowDown"
        ></v-btn>
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup>
import { useDisplay } from "vuetify";
const { lgAndUp } = useDisplay();
</script>
