<template>
  <v-card color="n100" class="rounded-0">
    <v-container fluid class="py-8">
      <v-carousel
        :show-arrows="false"
        hide-delimiters
        cycle
        height="fit-content"
      >
        <v-carousel-item v-for="(item, i) in items" :key="i">
          <v-sheet height="100%" tile color="transparent">
            <v-row>
              <v-col cols="12" md="8" sm="12">
                <div class="d-flex flex-column">
                  <div>
                    <div class="text-h2 mb-2">{{ item.title }}</div>
                    <v-btn rounded variant="flat" disabled>
                      <v-icon size="x-large" icon="custom:star"></v-icon>
                      <div class="text-text-hint-caution">
                        <span class="text-ad-status-pending"> 5 /</span> 4.1
                      </div>
                    </v-btn>
                    <div class="text-text-high-emphasis my-4">
                      {{ item.description }}
                    </div>
                    <div class="d-flex mb-4">
                      <client-only>
                        <div>
                          <v-icon
                            color="primary-base"
                            icon="custom:calendar"
                          ></v-icon>
                          <span
                            class="text-md-body-1 text-body-2 text-text-high-emphasis me-8 ms-2"
                          >
                            شروع دوره: ۱۶ مرداد ماه
                          </span>
                        </div>
                        <div>
                          <v-icon
                            color="primary-base"
                            icon="custom:clock"
                          ></v-icon>
                          <span
                            class="text-md-body-1 text-body-2 text-text-high-emphasis me-8 ms-2"
                          >
                            ۸۶ ساعت
                          </span>
                        </div>
                        <div>
                          <v-icon
                            color="primary-base"
                            icon="custom:certificate"
                          ></v-icon>
                          <span
                            class="text-md-body-1 text-body-2 text-text-high-emphasis me-8 ms-2"
                          >
                            {{ $t("certified") }}
                          </span>
                        </div>
                      </client-only>
                    </div>
                    <div>
                      <div class="mb-2">{{ $t("mentors") }}</div>
                      <app-avatar-group
                        :members="item.instructor"
                        gap="ms-2"
                        size="48"
                      ></app-avatar-group>
                    </div>
                  </div>
                  <div class="mt-14">
                    <v-btn size="large" class="rounded-lg" color="primary-base">
                      {{ $t("more_details") }}
                      <v-icon size="24" class="ms-2" icon="custom:chevronLeft"></v-icon>
                    </v-btn>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" md="4" sm="12" class="py-10">
                <v-card height="100%" class="overflow-visible">
                  <v-card-text class="mx-auto text-center">
                    <v-btn
                      size="small"
                      variant="outlined"
                      rounded
                      color="text-hint-caution"
                      class="mb-2"
                    >
                      <v-icon icon="custom:info" class="me-2"></v-icon>
                      {{ $t("especially_for_the_labor_market") }}
                    </v-btn>
                    <v-img
                      class="rounded w-50 mx-auto mb-10"
                      :src="item.bannerUrl"
                    ></v-img>
                  </v-card-text>
                  <v-card-actions class="carousel-control">
                    <v-btn size="44" variant="flat" color="primary-lighten3" icon>
                      <v-icon
                        color="primary-base"
                        icon="custom:chevronRight"
                      ></v-icon>
                    </v-btn>
                    <v-btn size="44" variant="flat" color="primary-lighten3" icon>
                      <v-icon
                        color="primary-base"
                        icon="custom:chevronLeft"
                      ></v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </v-container>
  </v-card>
</template>

<script setup>
const props = defineProps({
  items: Array,
});
</script>

<style lang="scss">
.carousel-control {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%);
}
</style>
