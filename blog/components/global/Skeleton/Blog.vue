<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" class="mb-10">
        <v-skeleton-loader
          :height="mdAndUp ? 370 : 199"
          type="article, button"
        ></v-skeleton-loader>
      </v-col>
      <v-col cols="12" md="6" class="mb-8">
        <v-card>
          <v-skeleton-loader
            class="img-h-100"
            :height="mdAndUp ? 370 : 199"
            type="image"
          ></v-skeleton-loader>
        </v-card>
      </v-col>
      <v-col cols="12" md="3" v-for="n in 4" :key="n" class="mb-16">
        <v-card>
          <v-skeleton-loader height="142" type="image"></v-skeleton-loader>
        </v-card>
      </v-col>
      <v-col cols="12" md="12">
        <v-skeleton-loader class="w-25 mx-0" type="heading"></v-skeleton-loader>
      </v-col>
      <v-col cols="12" md="2" v-for="n in 6" :key="n">
        <v-card>
          <v-skeleton-loader height="192" type="card"></v-skeleton-loader>
        </v-card>
        <!-- <v-skeleton-loader type="list-item-two-line"></v-skeleton-loader> -->
      </v-col>
      <v-col cols="12" md="12" class="mt-16">
        <v-skeleton-loader class="w-25 mx-0" type="heading"></v-skeleton-loader>
        <v-skeleton-loader dir="ltr" type="actions"></v-skeleton-loader>
      </v-col>
      <v-col cols="12" md="4" v-for="n in 9" :key="n" class="mb-9">
        <v-skeleton-loader
          dir="ltr"
          type="card-avatar, article"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useDisplay } from "vuetify";
import { useGlobalStore } from "~/stores/global";
const { mdAndUp } = useDisplay();
const store = useGlobalStore();
</script>

<style lang="scss">
.v-skeleton-loader__image {
  border-radius: 8px !important;
}
.img-h-100 .v-skeleton-loader__image {
  height: 100% !important;
}
</style>
