<template>
  <v-container>
    <v-row>
      <v-col cols="11">
        <v-skeleton-loader
        width="20%"
          type="subtitle, heading"
        ></v-skeleton-loader>
      </v-col>
      <v-col cols="1">
        <v-skeleton-loader
          type="button"
        ></v-skeleton-loader>
      </v-col>
      <v-col cols="12" md="2" v-for="n in 12" :key="n" class="mb-9">
        <v-skeleton-loader
          dir="ltr"
          type="card, heading"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
</template>
