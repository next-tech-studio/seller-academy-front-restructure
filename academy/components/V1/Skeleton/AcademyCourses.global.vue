<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="rounded-md">
          <v-skeleton-loader type="image"></v-skeleton-loader>
        </v-card>
      </v-col>
      <v-col cols="11" class="mt-lg-16 mt-4">
        <v-skeleton-loader width="50%" type="heading"></v-skeleton-loader>
      </v-col>
      <v-col cols="1" class="mt-lg-16 mt-0">
        <v-skeleton-loader type="button"></v-skeleton-loader>
      </v-col>
      <v-col cols="12">
        <v-skeleton-loader type="button, button, button"></v-skeleton-loader>
      </v-col>
      <v-col :cols="lgAndUp ? 3 : 12">
        <v-skeleton-loader
          v-if="lgAndUp"
          type="heading, paragraph, divider, heading, divider, subtitle, subtitle"
        ></v-skeleton-loader>
        <v-skeleton-loader
          v-else
          type="heading, paragraph, heading, subtitle, subtitle"
        ></v-skeleton-loader>
      </v-col>
      <v-col :cols="lgAndUp ? 3 : 12" v-for="n in 3" :key="n">
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
      <v-col cols="12">
        <v-card class="rounded-md mt-lg-16 mt-4">
          <v-skeleton-loader type="image"></v-skeleton-loader>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card class="rounded-md mt-lg-16 mt-4">
          <v-skeleton-loader type="image"></v-skeleton-loader>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-col cols="12">
    <v-card class="rounded-md mt-lg-16 mt-4">
      <v-skeleton-loader type="image"></v-skeleton-loader>
    </v-card>
  </v-col>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-skeleton-loader type="heading" width="20%"></v-skeleton-loader>
        <v-skeleton-loader type="avatar, paragraph"></v-skeleton-loader>
        <v-skeleton-loader type="actions"></v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
  <v-col cols="12">
    <v-card class="rounded-md mt-lg-16 mt-4">
      <v-skeleton-loader type="image"></v-skeleton-loader>
    </v-card>
  </v-col>
</template>

<script setup>
import { useDisplay } from "vuetify";

const { lgAndUp, mdAndUp } = useDisplay();
</script>
