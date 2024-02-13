<template>
  <v-card class="d-none d-lg-block">
    <v-skeleton-loader type="image"></v-skeleton-loader>
  </v-card>
  <v-container>
    <v-row>
      <v-col :cols="lgAndUp ? 3 : 12">
        <v-card>
          <v-skeleton-loader
            v-for="n in 4"
            :key="n"
            type="list-item-avatar"
          ></v-skeleton-loader>
          <v-skeleton-loader type="button"></v-skeleton-loader>
        </v-card>
      </v-col>
      <v-col v-for="n in lgAndUp ? 3 : 1" :key="n" :cols="lgAndUp ? 3 : 12">
        <v-card>
          <v-skeleton-loader
            boilerplate
            class="mx-auto"
            type="card-avatar, article"
          ></v-skeleton-loader>
        </v-card>
      </v-col>
      <v-col cols="3"></v-col>
      <v-col cols="9">
        <v-card height="68">
          <v-skeleton-loader type="image"></v-skeleton-loader>
        </v-card>
      </v-col>
      <v-col cols="3"></v-col>
      <v-col cols="9">
        <v-row class="mt-4">
          <v-col cols="6">
            <v-skeleton-loader type="heading"></v-skeleton-loader>
          </v-col>
          <v-col cols="6">
            <v-skeleton-loader type="actions"></v-skeleton-loader>
          </v-col>
        </v-row>
      </v-col>
      <v-row>
        <v-col cols="3"></v-col>
        <v-col cols="9">
          <v-card
            variant="outlined"
            color="n200"
            v-for="n in 6"
            :key="n"
            class="mt-2"
          >
            <v-skeleton-loader
              type="list-item-avatar, list-item-three-line"
            ></v-skeleton-loader>
          </v-card>
        </v-col>
      </v-row>
    </v-row>
  </v-container>
</template>

<script setup>
import { useDisplay } from "vuetify";

const { lgAndUp, mdAndUp } = useDisplay();
</script>