<template>
  <v-card color="n800" rounded="lg">
    <v-card-text>
      <v-row align="center">
        <v-col
          cols="12"
          md="6"
          class="d-flex flex-column justify-center ps-12"
          style="height: fit-content"
        >
          <div class="text-h3 text-text-light font-weight-bold mb-6">
            موفقیت‌های ما در آکادمی دیجی‌نکست
          </div>
          <v-row no-gutters>
            <v-col
              v-for="i in 10"
              :key="i"
              cols="10"
              md="5"
              class="d-flex flex-column align-start"
            >
              <v-chip pill link class="mb-4">
                <v-avatar start color="success">
                    <v-icon icon="custom:check"></v-icon>
                </v-avatar>
                John Leider
              </v-chip>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="6">
          <v-img class="rounded-lg" src="/images/intro-video-bg.png" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
