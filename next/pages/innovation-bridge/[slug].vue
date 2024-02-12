<template>
  <!-- REGSTER -->
  <div class="bg-icon-hint-caution" :style="sticky">
    <v-container fluid class="pa-0">
      <div>
        <v-banner
          border="none"
          lines="one"
          class="bg-transparent py-lg-4 py-1"
          density="compact"
        >
          <template v-slot:text>
            <div>
              <div class="text-text-light text-h3">
                {{ current?.title }}
              </div>
              <div class="text-text-light text-caption ms-n4">
                <app-breadcrumbs
                  color="text-light"
                  page="innovationBridge"
                  :data="current"
                  class="py-0"
                />
              </div>
            </div>
          </template>
          <v-spacer></v-spacer>
          <app-share-in v-if="!smAndDown" :hide-title="false" />
          <template v-slot:actions>
            <v-btn
              class="text-button text-primary-base px-10 bg-background-light mb-lg-4 mb-3"
              variant="outlined"
              size="x-large"
              :to="
                localePath({
                  name: 'innovation-bridge-slug-register',
                  params: { slug: route.params.slug },
                })
              "
              rounded="lg"
            >
              {{ $t("sign_up") }}
              <v-icon class="ms-2" icon="custom:chevronLeft"></v-icon>
            </v-btn>
          </template>
        </v-banner>
      </div>
    </v-container>
  </div>
  <!-- HOLDING DETAIL -->
  <v-container fluid class="py-md-16 my-md-16 py-8 my-2">
    <div class="text-md-h3 text-h5 text-text-heading text-center mb-lg-6 mb-3 mt-lg-0 mt-10">
      {{ current?.event_title }}
    </div>
    <v-card
      image="/images/innovation-bridge/event-header.png"
      class="rounded-lg"
    >
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4">
            <v-card class="cardColor rounded-lg">
              <v-card-text>
                <div class="text-primary-base text-body-1 font-weight-bold">
                  {{ $t("holding_date") }}
                </div>
                <div class="text-text-heading font-weight-bold mt-1">
                  {{ current?.holdingDate }}
                </div>
                <div
                  class="text-primary-base text-body-1 font-weight-bold mt-4"
                >
                  {{ $t("price") }}
                </div>
                <div class="text-text-heading font-weight-bold mt-1">
                  {{ current?.price }}
                </div>
                <div
                  class="text-primary-base text-body-1 font-weight-bold mt-4"
                >
                  {{ $t("event_type") }}
                </div>
                <div class="text-text-heading font-weight-bold mt-1">
                  {{ current?.eventType }}
                </div>
                <div
                  class="text-primary-base text-body-1 font-weight-bold mt-4"
                >
                  {{ $t("eventPlace") }}
                </div>
                <div class="d-flex justify-space-between">
                  <div class="text-text-heading font-weight-bold mt-1">
                    {{ current?.eventPlace }}
                  </div>
                  <v-btn color="primary-base" variant="text"
                    >مشاهده روی نقشه</v-btn
                  >
                </div>
                <div
                  class="text-primary-base text-body-1 font-weight-bold mt-4"
                >
                  {{ $t("event_audiences") }}
                </div>
                <div class="text-text-heading font-weight-bold mt-1">
                  {{ current?.eventAudiences }}
                </div>
                <v-btn
                  block
                  flat
                  color="primary-base"
                  class="mt-4"
                  size="large"
                  :to="
                    localePath({
                      name: 'innovation-bridge-slug-register',
                      params: { slug: route.params.slug },
                    })
                  "
                >
                  {{ $t("sign_up") }}
                  <v-icon icon="custom:chevronLeft" end></v-icon>
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
  <!-- HOLDING DETAIL -->
  <v-container fluid class="pt-0">
    <v-card>
      <v-card-text class="px-0">
        <div class="text-h3 text-text-heading">
          {{ $t("event_information") }}
        </div>
        <div class="mb-8 text-text-high-emphasis text-body-1">
          {{ current?.information }}
        </div>
        <div v-for="(item, index) in current?.pros" :key="index" class="mb-4">
          <v-btn
            color="success"
            flat
            size="32"
            icon="custom:check"
            class="me-4"
          ></v-btn>
          <span class="text-body-2 text-text-high-emphasis">{{ item }}</span>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
  <!-- SPEAKERS -->
  <v-container fluid class="mt-md-16 mt-0">
    <div class="text-h3 text-text-heading mb-4">{{ $t('event_speakers') }}</div>
    <product-mentors
      v-if="current?.speakers"
      :items="current?.speakers"
      class="mb-4"
    >
      <template #bottom="{ item }">
        <div>
          <v-divider color="n400" class="my-1"></v-divider>
          <div class="text-text-low-emphasis text-caption">
            {{ $t("presentation_topic") }}
          </div>
          <div class="text-text-heading text-body-2 font-weight-bold">
            {{ item.presentationTopic }}
          </div>
        </div>
      </template>
    </product-mentors>
    <NuxtPage />
  </v-container>
</template>

<script setup>
import { useDisplay } from "vuetify";
const { smAndDown } = useDisplay();
let innovationBridge = ref([]);
const current = ref({});
const route = useRoute();
useAsyncData(async () => {
  innovationBridge.value = await queryContent(
    `/fa/innovation-bridge`
  ).findOne();

  Object.assign(
    current.value,
    innovationBridge.value.data.find((x) => x.slug == route.params.slug)
  );
});

const sticky = ref({
  backgroundColor: "#c0c0c0",
  position: "fixed",
  top: 0,
  width: "100%",
  zIndex: 100,
  marginTop: "64px",
});
</script>

<style lang="scss">
.cardColor {
  background-color: rgba(255, 255, 255, 0.9) !important;
}
</style>
