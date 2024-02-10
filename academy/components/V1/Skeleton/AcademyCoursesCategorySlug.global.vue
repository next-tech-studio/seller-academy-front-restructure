<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-skeleton-loader
          width="50%"
          type="subtitle, heading"
        ></v-skeleton-loader>
      </v-col>
      <v-col cols="12" lg="3" v-if="lgAndUp">
        <v-card
          class="mb-4"
          v-for="m in 4"
          :key="m"
          variant="outlined"
          color="n200"
        >
          <v-skeleton-loader
            v-for="n in 7"
            :key="n"
            type="list-item"
          ></v-skeleton-loader>
        </v-card>
      </v-col>
      <v-col cols="12" lg="9">
        <v-row>
            <v-col cols="12" :lg="lgAndUp ? 4 : 12" v-for="m in 12" :key="m">
        <v-card variant="outlined" color="n200">
          <v-skeleton-loader
            v-if="lgAndUp"
            type="card-avatar, heading, divider, subtitle, subtitle"
          ></v-skeleton-loader>
          <v-skeleton-loader
            v-else
            type="list-item-avatar, heading, divider, subtitle"
          ></v-skeleton-loader>
        </v-card>
      </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useDisplay } from "vuetify";

const { lgAndUp, mdAndUp } = useDisplay();
</script>
