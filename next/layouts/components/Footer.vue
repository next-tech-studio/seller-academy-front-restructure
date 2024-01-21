<template>
  <v-footer id="footer" class="bg-primary-darken1 px-0 mt-10">
    <v-container fluid class="py-0">
      <v-card
        variant="outlined"
        color="rgba(var(--v-theme-n300), 30%)"
        class="mt-n12 mb-9 rounded-lg"
      >
        <v-card-text class="bg-white d-flex flex-md-row flex-column justify-space-between align-center">
          <div>
            <div class="text-md-h5 text-body-2 font-weight-bold">
              {{
                $t("subscribe_here_to_receive_the_latest_news_and_discounts")
              }}
            </div>
            <div class="text-caption text-text-low-emphasis">{{ $t("sign_up_with_the_help_of_the_opposite_button") }}</div>
          </div>
          <v-btn variant="flat" color="primary-base" class="mt-md-0 mt-2">{{ $t('newsletter_membership') }}</v-btn>
        </v-card-text>
      </v-card>
      <v-row>
        <v-col cols="12" lg="4" class="d-flex flex-column w-100 mb-11 mb-md-4">
          <span class="text-h5 mb-4">{{ $t("about_us") }}</span>
          <p class="text-body-1">
            {{ $t("footer_description") }}
          </p>
        </v-col>
        <v-col
          v-for="(item, index) in footerLinks"
          :key="index"
          cols="12"
          lg="2"
          class="d-flex flex-column"
          tag="nav"
        >
          <span class="text-h5 mb-4">{{ $t(item.title) }}</span>
          <v-btn
            v-for="link in item.links"
            min-width="auto"
            :key="item.to"
            color="white"
            variant="text"
            class="align-self-start px-0 text-body-1 animated"
            :href="link.to ? localePath(link.to) : null"
            tag="a"
          >
            {{ $t(link.title) }}
          </v-btn>
        </v-col>
        <!-- <v-col cols="12" class="d-md-none mb-8 pb-7 d-flex justify-space-between">
          <p class="text-h5">{{ $t("be_with_us") }}</p>
          <div>
            <v-btn
              v-for="item in socials"
              :key="item.title"
              color="text-icon-light"
              class="ml-4 d-md-none"
              density="compact"
              min-width="auto"
              size="small"
              thickness="1"
              :icon="item.icon"
              variant="text"
            ></v-btn>
          </div>
        </v-col> -->
        <v-col lg="4" cols="12">
          <div class="d-flex justify-space-between mb-4">
            <p class="text-h5">{{ $t("contact_ways") }}</p>
            <app-share-in />
          </div>
          <v-btn
            v-for="way in contactWays"
            :key="way.title"
            color="white"
            variant="text"
            height="auto"
            class="align-self-start px-0 text-body-1 animated d-flex"
          >
            <v-icon size="20" class="me-2" :icon="way.icon"></v-icon>
            <span style="white-space: pre-wrap;">
              {{ $t(way.text) }}
            </span>
            
          </v-btn>
        </v-col>
        <v-divider class="mt-10 d-none d-md-block"></v-divider>
        <v-col class="text-center my-10 d-none d-md-block" cols="12">
          <v-img
            class="mx-auto mb-2"
            max-width="200"
            src="/images/logo/1.svg"
          />
          {{ $t("rights") }}
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup>
const footerLinks = useFooterLinks();
const socials = useSocials();
const contactWays = useContactWays();
const localePath = useLocalePath()
</script>

<style lang="scss">
#footer {
  .v-field__append-inner {
    padding-top: 0 !important;
    align-items: center !important;
    .v-btn.v-btn--density-default {
      height: 100%;
    }
  }
  .v-field--appended {
    padding-inline-end: 0 !important;
  }
}
</style>
