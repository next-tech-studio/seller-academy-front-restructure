<template>
  <v-card rounded="0" class="bottom-background">
    <v-container class="py-13">
      <v-row justify="space-between">
        <v-col cols="12" lg="4">
          <v-card>
            <h1 class="text-h2 text-text-heading">{{ $t('landing_header_title') }}</h1>
            <div class="mb-2 text-h4 text-text-high-emphasis">{{ $t('landing_header_subtitle') }}</div>
            <v-btn width="300" flat color="primary-base">{{ $t('landing_header_ca') }}</v-btn>
          </v-card>
        </v-col>
        <v-col cols="12" lg="4">
            <v-card color="background-dark" min-height="350" rounded="lg"></v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<style lang="scss">
.bottom-background {
  background: url("../../public/images/wave.svg") no-repeat !important;
  // min-height: 460px;
  background-position: bottom !important;
  background-size: 100% 70% !important;
  width: 100vw;
}
</style>
