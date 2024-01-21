<template>
  <v-card class="bg-transparent">
    <v-card-text class="text-center">
      <div class="text-h3 font-weight-bold mb-6">{{ $t("mission_title") }}</div>
      <!-- <div class="text-subtitle-1 mb-6">{{ $t("mission_subtitle") }}</div> -->
    </v-card-text>
    <v-row>
      <v-col cols="12" md="4" v-for="item in items" :key="item.title">
        <v-card
          variant="outlined"
          class="rounded-lg h-100"
          color="rgba(var(--v-theme-n300), 30%)"
        >
          <v-card-text class="pa-lg-8 pa-4 bg-white h-100">
            <div class="d-flex align-center">
              <v-avatar color="rgba(var(--v-theme-n200), 30%)" size="56" class="me-lg-6 me-0">
                <v-icon
                  size="32"
                  color="primary-base"
                  :icon="item.icon"
                ></v-icon>
              </v-avatar>
              <div class="text-lg-h5 text-body-1 font-weight-bold text-text-heading">
                {{ $t(item.title || "") }}
              </div>
            </div>
            <div :class="!isHovering ? 'text-text-low-emphasis' : 'text-white'">
              {{ $t(item.text || "") }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
const { t } = useI18n();
const items = [
  {
    title: "missons.first.title",
    text: "missons.first.description",
    icon: "custom:lamp",
  },
  {
    title:"missons.second.title",
    text: "missons.second.description",
    icon: "custom:jet",
  },
  {
    title:"missons.third.title",
    text: "missons.third.description",
    icon: "custom:stars",
  },
];
</script>
