<template>
  <v-row id="content-slider" no-gutters>
    <v-col cols="12" md="6" lg="7">
      <v-carousel
        :height="mdAndUp ? 326 : 'auto'"
        v-model="current"
        :interval="10000"
        cycle
        v-bind="$attrs"
        :show-arrows="false"
        hide-delimiter-background
        style="margin: 0 !important"
      >
        <v-carousel-item
          class="d-flex justify-center align-end rounded-lg"
          v-for="(item, i) in items"
          :key="i"
          aspect-ratio="1.64"
          cover
          :alt="item?.slug"
        >
          <v-card>
            <h2 class="px-0 text-text-heading text-h2 mb-2">
              {{ item.title }}
            </h2>
            <v-chip color="secondary-base" class="mb-4" :size="!mdAndUp ? 'small' : 'default'">
              <v-icon
                color="secondary-darken2"
                icon="custom:profileAdd"
              ></v-icon>
              <span class="text-secondary-darken2"
                >{{ item.memberCount }} نفر در این دوره شرکت کرده‌اند</span
              >
            </v-chip>
            <div class="d-none d-md-block">
              <div class="text-text-high-emphasis text-body-2 mb-2">
                {{ item.description }}
              </div>
              <div>
                <v-chip
                  color="background-dark"
                  class="bg-background-dark me-lg-4 me-1 mb-lg-6 mb-2"
                >
                  <v-icon
                    start
                    icon="custom:money"
                    color="icon-high-emphasis"
                  ></v-icon>
                  <span class="text-text-high-emphasis">تماما رایگان</span>
                </v-chip>
                <v-chip
                  color="background-dark"
                  class="bg-background-dark me-lg-4 me-1 mb-lg-6 mb-2"
                >
                  <v-icon
                    start
                    icon="custom:penAdd"
                    color="icon-high-emphasis"
                  ></v-icon>
                  <span class="text-text-high-emphasis">فضای تعاملی</span>
                </v-chip>
                <v-chip
                  color="background-dark"
                  class="bg-background-dark me-lg-4 me-1 mb-lg-6 mb-2"
                >
                  <v-icon
                    start
                    icon="custom:documentText"
                    color="icon-high-emphasis"
                  ></v-icon>
                  <span class="text-text-high-emphasis"
                    >گواهی شرکت در دوره</span
                  >
                </v-chip>
              </div>
              <v-btn :to="localePath(item.url)" size="large" flat color="primary-base" class="my-6">
                {{ $t("more_info") }}
                <v-icon
                  size="x-large"
                  end
                  icon="custom:chevronLeftLight"
                ></v-icon>
              </v-btn>
            </div>
          </v-card>
          <div class="d-md-none d-block">
            <v-img
              class="rounded-lg"
              cover
              height="197"
              :src="item.bannerUrl"
            />
            <v-btn size="large" flat color="primary-base" class="my-6">
              {{ $t("more_info") }}
              <v-icon
                size="x-large"
                end
                icon="custom:chevronLeftLight"
              ></v-icon>
            </v-btn>
          </div>
        </v-carousel-item>
      </v-carousel>
    </v-col>
    <v-col cols="12" lg="5" md="6" class="d-none d-md-block">
      <v-carousel
        class="rounded-lg"
        :height="mdAndUp ? 326 : 199"
        v-model="current"
        :interval="10000"
        cycle
        v-bind="$attrs"
        :show-arrows="false"
        hide-delimiters
        style="margin: 0 !important"
      >
        <v-carousel-item
          class="d-flex justify-center align-end rounded-lg"
          v-for="(item, i) in items"
          :key="i"
          aspect-ratio="1.64"
          cover
          :src="item.bannerUrl"
          :alt="item?.slug"
        ></v-carousel-item>
      </v-carousel>
    </v-col>
  </v-row>
</template>

<script setup>
import { useDisplay } from "vuetify";

const { mdAndUp } = useDisplay();
let current = ref(1);

const props = defineProps({
  items: Array,
});

const localePath = useLocalePath()
</script>

<style lang="scss">
#content-slider {
  .v-window__controls {
    padding: 0 !important;
  }

  .v-carousel__controls {
    right: 0 !important;
    width: auto !important;
    height: auto !important;
    border-radius: 8px 8px 0 0;
    color: white;

    @include respond("sm") {
      height: 10px !important;
    }

    .v-btn {
      @include respond("sm") {
        width: auto !important;
        height: auto !important;
        border-radius: 0;
        margin: auto 4px;
      }

      .v-btn__content {
        display: none;
      }

      &::before {
        content: "";
        width: 8px;
        height: 8px;
        background-color: rgba(var(--v-theme-primary-base));
        border-radius: 50%;
        margin: auto;

        @include respond("sm") {
          width: 3.26px;
          height: 3.26px;
        }
      }

      &--active {
        &::before {
          content: "";
          width: 31px;
          background-color: rgba(var(--v-theme-primary-base));
          height: 8px;
          border-radius: 50px;

          @include respond("sm") {
            width: 12.62px;
            height: 3.26px;
          }
        }
      }
    }
  }
}
</style>
