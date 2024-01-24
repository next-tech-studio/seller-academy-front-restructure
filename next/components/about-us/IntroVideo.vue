<template>
  <v-card class="rounded-0">
    <v-img
      cover
      src="/images/intro-video-bg.png"
      gradient="to bottom, rgba(var(--v-theme-primary-base), 70%), rgba(var(--v-theme-primary-base), 70%)"
      aspect-ratio="4"
    >
      <v-container fluid class="h-100">
        <v-row class="h-100" align="center">
          <v-col cols="12" md="6" sm="12" class="my-auto">
            <div class="w-lg-75 w-100">
              <div class="text-h3 text-text-light">
                {{ $t("intro_video_title") }}
              </div>
              <div class="text-body-1 text-text-light">
                {{ $t("intro_video_text") }}
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="6" sm="12">
            <v-card class="w-lg-75 w-100 ms-auto">
              <!-- <app-video-player
                video-poster="/images/home-header.png"
                video-src="https://www.aparat.com/v/6GYax"
                small
              /> -->
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-img>
  </v-card>
</template>
