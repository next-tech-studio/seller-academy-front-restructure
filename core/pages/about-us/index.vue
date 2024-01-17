<template>
  <article id="about-us">
    <header class="header">
      <div
        class="header_cover d-flex align-center flex-column justify-end pb-10 text-h2"
      >
        <p class="header_title">
          {{ $t("about_us_header") }}
        </p>
        <v-btn size="large">
          <span class="text-primary-base text-button">{{
            $t("see_more")
          }}</span>
          <v-icon color="primary-base ms-2" icon="custom:arrowDown"></v-icon>
        </v-btn>
      </div>
    </header>
    <div
      class="bg-n800 py-lg-16 py-10 d-flex align-center justify-center position-relative"
    >
      <div class="text-center">
        <v-container>
          <h2 class="text-h2 mb-4">{{ $t("about_us_second_part_title") }}</h2>
          <p class="text-body-1 mb-4">
            {{ $t("about_us_second_part_explanation") }}
          </p>
          <v-img src="/images/aboutus/second-part.png" />
          <v-img
            width="70px"
            src="/images/ornamentation/curve.svg"
            class="curve-position d-none d-md-block"
          />
          <v-img
            width="50px"
            src="/images/ornamentation/star.svg"
            class="star-position d-none d-md-block"
          />
        </v-container>
      </div>
    </div>
    <v-container class="py-md-16 py-10">
      <v-row>
        <v-col cols="12" lg="6" class="py-8">
          <p class="text-h2 text-text-heading">
            {{ $t("about_us_story_title") }}
          </p>
          <p class="text-body-1 font-weight-bold text-text-high-emphasis mb-4">
            {{ $t("about_us_story_subtitle") }}
          </p>
          <p class="text-body-1 text-text-high-emphasis">
            {{ $t("about_us_story_description") }}
          </p>
        </v-col>
        <v-spacer class="d-none d-lg-block"></v-spacer>
        <v-col cols="12" lg="5">
          <v-timeline
            side="end"
            justify="end"
            align="start"
            line-color="text-light"
            truncate-line="both"
          >
            <v-timeline-item
              v-for="(item, index) in timelines"
              :key="index"
              :rounded="false"
              fill-dot
              density="compact"
              dot-color="text-secondary"
              size="large"
            >
              <template v-slot:icon>
                <span class="text-body-1 font-weight-bold"
                  >{{ $t("year") }} {{ item.year }}</span
                >
              </template>
              <span class="text-body-1 text-text-high-emphasis">{{
                $t(item.description)
              }}</span>
            </v-timeline-item>
          </v-timeline>
        </v-col>
      </v-row>
    </v-container>
    <div class="seller-hub">
      <div class="seller-hub_cover">
        <v-container class="py-0 h-100">
          <v-row class="py-0 h-100">
            <v-col cols="12" lg="6" class="py-lg-0 py-10 h-100">
              <v-img
                cover
                :src="mdAndUp?'/images/aboutus/community.png':'/images/aboutus/community-mobile.png'"
                height="100%"
              ></v-img>
            </v-col>
            <v-spacer class="d-none d-lg-block"></v-spacer>
            <v-col cols="12" lg="6" class="py-lg-16 pb-10">
              <p class="text-h3 text-text-light mb-4">
                {{ $t("about_us_whats_going_on") }}
              </p>
              <v-alert color="n700" density="compact" class="mb-4">
                <p class="text-h5">
                  {{ $t("about_us_whats_going_on_not_seller") }}
                </p>
                <span class="text-body-2 text-text-disabled">{{
                  $t("about_us_whats_going_on_not_seller_desc")
                }}</span>
              </v-alert>
              <v-alert color="n700" density="compact" class="mb-4">
                <p class="text-h5">
                  {{ $t("about_us_whats_going_on_seller") }}
                </p>
                <span class="text-body-2 text-text-disabled">{{
                  $t("about_us_whats_going_on_seller_desc")
                }}</span>
              </v-alert>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
    <v-container class="py-16">
      <v-row>
        <v-col cols="12" lg="6">
          <p class="text-h2">{{ $t("about_us_why_seller_hub_title") }}</p>
          <p class="text-body-1">{{ $t("about_us_why_seller_hub_desc") }}</p>
        </v-col>
        <v-col cols="12" lg="6">
          <v-card
            rounded="lg"
            class="mx-auto"
            color="primary-base"
            variant="flat"
          >
            <div
              class="d-flex justify-center align-center flex-column pt-6 pb-2"
            >
              <div>
                <v-img
                  width="144"
                  class="text-center"
                  src="/images/aboutus/logo.svg"
                ></v-img>
              </div>
              <div class="text-h5 text-center">
                {{ $t("about_us_digikala_advantages") }}
              </div>
            </div>

            <v-alert
              color="primary-lighten1"
              density="compact"
              class="pa-8 pb-6"
            >
              <v-row no-gutters>
                <v-col
                  v-for="(item, index) in advatages"
                  :key="index"
                  cols="12"
                  lg="6"
                  class="mb-2 h-auto"
                >
                  <div class="d-flex">
                    <v-icon
                      icon="custom:circleCheckSolid"
                      class="me-3"
                    ></v-icon>
                    <p class="text-body-1 text-truncate">{{ $t(item) }}</p>
                  </div>
                </v-col>
              </v-row>
            </v-alert>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <div class="bg-n100">
      <v-container class="py-lg-16 py-8 d-flex justify-center flex-column align-center">
        <p class="text-h3 mb-4 text-text-heading text-center">
          {{ $t("about_us_commitment_title") }}
        </p>
        <p class="text-body-1 text-text-high-emphasis text-center">
          {{ $t("about_us_commitment_desc") }}
        </p>
      </v-container>
    </div>
    <v-container class="py-lg-16 py-10">
      <v-alert class="text-body-1 pa-lg-16 py-6 text-center" rounded="lg" color="n800">
        <div class=" mb-4" :class="mdAndUp?'px-25':'px-4'">
          {{ $t("about_us_are_you_ready") }}
        </div>
        <v-btn
          size="large"
          color="button-primary"
          :text="$t('about_us_how_to_start')"
        ></v-btn>
      </v-alert>
    </v-container>
  </article>
</template>
<script setup>
import { useDisplay } from 'vuetify';

const {lgAndUp, mdAndUp} = useDisplay()
const timelines = [
  { year: 1399, description: "about_us_timeline_1399" },
  { year: 1400, description: "about_us_timeline_1400" },
  { year: 1401, description: "about_us_timeline_1401" },
  { year: 1402, description: "about_us_timeline_1402" },
];
const advatages = [
  "advantage_1",
  "advantage_2",
  "advantage_3",
  "advantage_4",
  "advantage_5",
];
</script>
<style lang="scss">
#about-us {
  .header {
    height: 40vh;
    background: url("../../public/images/aboutus/header.png") no-repeat,
      linear-gradient(rgba(var(--v-theme-n800)), rgba(var(--v-theme-n800))) !important;
    background-size: cover !important;
    &_cover {
      height: 100%;
      width: 100%;
      background: rgba(var(--v-theme-primary-lighten1), 85%);
    }
    &_title {
      width: 25vw;
      @include respond("sm") {
        width: 70vw !important;
      }
      text-align: center;
      margin-bottom: 12px;
      color: rgba(var(--v-theme-background-light));
    }
  }
  .curve-position {
    position: absolute;
    top: 15%;
    right: 15%;
  }
  .star-position {
    position: absolute;
    bottom: 15%;
    left: 15%;
  }
  .v-timeline--vertical .v-timeline-divider__after {
    border: 1px dashed rgba(var(--v-theme-text-secondary));
  }
  .v-timeline--vertical .v-timeline-divider__before {
    border: 1px dashed rgba(var(--v-theme-text-secondary));
  }
  .v-timeline-divider__inner-dot {
    border-radius: 12px;
  }
  .v-timeline-divider__dot--size-large {
    width: 86px;
    height: 54px;
  }
  .v-timeline--vertical.v-timeline.v-timeline--side-end
    .v-timeline-item
    .v-timeline-item__body {
    padding-inline-start: 16px;
  }
  .seller-hub {
    height: 40vh;
    background: url("../../public/images/aboutus/seller-hub.png") no-repeat,
      linear-gradient(rgba(var(--v-theme-n800)), rgba(var(--v-theme-n800))) !important;
    background-position: bottom left !important;
    background-size: cover !important;
    @include respond("sm") {
      height: fit-content !important;
    }
    &_cover {
      height: 100%;
      width: 100%;
      background: rgba(var(--v-theme-n800), 95%);
    }
  }
  .px-25 {
    padding: 0 100px 0 100px;
  }
}
</style>
