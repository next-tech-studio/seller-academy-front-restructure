<template>
  <v-footer id="footer" class="bg-n800 py-md-10 px-md-10 py-5 px-5">
    <v-container class="pa-0">
      <v-row justify-md="center">
        <v-col
          cols="8"
          md="3"
          class="d-flex flex-column w-100 justify-space-between mb-11 mb-md-8"
        >
          <v-img
            src="/images/logo/logo.svg"
            max-height="112"
            max-width="308"
            contain
            class="mb-4 mb-md-6"
            alt="logo"
          />
          <p class="text-body-1">
            {{ $t("footer_description") }}
          </p>
          <div class="d-flex">
            <v-btn
              color="text-icon-light"
              class="ml-4 d-none d-md-block"
              density="compact"
              min-width="auto"
              size="small"
              v-for="item in socials"
              :key="item.title"
              thickness="1"
              :icon="item.icon"
              variant="text"
            ></v-btn>
          </div>
        </v-col>
        <v-col
          cols="6"
          md="3"
          v-for="(item, index) in footerLinks"
          :key="index"
          class="d-flex flex-column mb-8 pb-7 mb-md-10"
          tag="nav"
        >
          <span class="text-h5">{{ $t(item.title) }}</span>
          <v-divider
            thickness="1"
            color="icon-light"
            width="56px"
            class="my-4"
            style="opacity: 1"
          ></v-divider>
          <v-btn
            min-width="auto"
            v-for="link in item.links"
            :to="link.to"
            :key="link"
            color="white"
            variant="text"
            class="align-self-start px-0 text-body-1 animated"
          >
            {{ $t(link.title) }}
          </v-btn>
        </v-col>
        <v-col class="d-md-none mb-8 pb-7 d-flex justify-space-between">
          <p class="text-h5">{{ $t("be_with_us") }}</p>
          <div>
            <v-btn
              color="text-icon-light"
              class="ml-4 d-md-none"
              density="compact"
              min-width="auto"
              size="small"
              v-for="item in socials"
              :key="item.title"
              thickness="1"
              :icon="item.icon"
              variant="text"
            ></v-btn>
          </div>
        </v-col>
        <v-col md="3" cols="12">
          <p class="text-h5">{{ $t("newsletter") }}</p>
          <v-divider
            thickness="1"
            color="icon-light"
            width="56px"
            class="mt-4 d-none d-md-block"
            style="opacity: 1"
          ></v-divider>
          <div class="text-body-1 mt-4">
            {{ $t("newsletter_membership_description") }}
          </div>
          <v-text-field
            color="n300"
            class="py-0 mt-4"
            density="compact"
            variant="outlined"
            bg-color="rgba(255, 255, 255, 0.1)"
            :label="$t('your_email')"
            type="email"
            theme="dark"
          >
            <template #append-inner>
              <v-btn
                style="border: 1px solid rgb(var(--v-theme-primary-base))"
                flat
                class="rounded-md text-button"
                color="primary-base"
                >{{ $t("write_in") }}</v-btn
              >
            </template>
          </v-text-field>
        </v-col>
        <v-divider class="mt-10 d-none d-md-block"></v-divider>
        <v-col class="text-center mt-3 d-none d-md-block" cols="12">
          {{ $t("rights") }}
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup>
const footerLinks = useFooterLinks();
const socials = useSocials();
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
