<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-skeleton-loader type="subtitle, heading, button, actions"></v-skeleton-loader>
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
