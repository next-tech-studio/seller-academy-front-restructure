<template>
  <v-container class="py-10 my-10">
    <h2 class="text-h2 text-text-heading text-center mb-6">{{ $t('success_stories') }}</h2>
    <v-row>
      <v-col cols="6" lg="6" v-for="story in 4" :key="story">
        <app-video-player
          video-poster="/images/home-header.png"
          video-src="https://www.aparat.com/v/6GYax"
          small
        />
      </v-col>
    </v-row>
  </v-container>
</template>
