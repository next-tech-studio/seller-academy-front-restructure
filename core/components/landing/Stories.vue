<template>
  <v-container class="py-10 my-10">
    <h2 class="text-h2 text-text-heading text-center mb-6">{{ $t('success_stories') }}</h2>
    <v-row>
      <v-col cols="6" lg="6" v-for="story in stories" :key="story">
        <v-card flat height="360">
          <app-video-player
          video-poster="/images/home-header.png"
          :video-src="story"
        />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const stories = ref([
  'https://player.arvancloud.ir/index.html?config=https://next-test.arvanvod.ir/ZaMv0Glomq/rQgvK49mjL/origin_config.json',
  'https://player.arvancloud.ir/index.html?config=https://next-test.arvanvod.ir/ZaMv0Glomq/Q765Rb5gDz/origin_config.json',
  'https://player.arvancloud.ir/index.html?config=https://next-test.arvanvod.ir/ZaMv0Glomq/AkqROL34X0/origin_config.json',
  'https://player.arvancloud.ir/index.html?config=https://next-test.arvanvod.ir/ZaMv0Glomq/m1xg0G3eoy/origin_config.json'

])
</script>
