<template>
  <div>
    <v-layout class="flex-column" full-height>
      <v-app-bar flat v-if="$route.path == '/'" :height="lgAndUp ? 70 : 40">
        <v-img
          class="cursor-pointer"
          @click="toEvent"
          cover
          width="100%"
          :height="lgAndUp ? 70 : 40"
          src="/images/innovation-bridge/cta-banner.svg"
        ></v-img>
      </v-app-bar>
      <Navbar />
      <v-main :dir="$i18n.locale == 'fa' ? 'rtl' : 'ltr'">
        <!-- <div>
              <search v-if="!lgAndUp" />
            </div> -->
        <slot />
        <!-- <v-row justify="end">
          <v-col cols="3">
            <video-player small video-src="/videos/video.mp4" video-poster="https://static.cdn.asset.aparat.com/avt/46845066-5693-b__6582.jpg">
              <client-only>
                <v-btn class="type text-white" rounded="pill" flat :size="mdAndUp ? 'small' : 'x-small'"
                :color="content.type == 'live' ? 'primary-base' : 'rgba(var(--v-theme-background-scrim-dark), 50%)'">{{ content.type == 'live' ? $t(content.type) : $moment.utc(content.duration*1000).format('HH:mm:ss') }}</v-btn>
              </client-only>
            </video-player>
          </v-col>
        </v-row> -->
      </v-main>
      <Footer v-if="!hideFooter" ref="footer" />
      <app-loading-indicator v-show="loading" />
      <app-toast></app-toast>
    </v-layout>
  </div>
</template>

<script setup>
import Navbar from "./components/navbar/Navbar.vue";
import Footer from "./components/Footer.vue";
import Search from "./components/navbar/components/Search.vue";
import { useLocaleStore } from "@core/stores/locale";
import { useDisplay } from "vuetify";
import { useLoadingStore } from "~/stores/loading";
import { watch } from "vue";
const { loading, overflow } = useLoading();
const route = useRoute();
let localeStore = useLocaleStore();
const { lgAndUp } = useDisplay();
const localePath = useLocalePath();
const footer = ref(null);
provide("footer", footer);

const props = defineProps({
  hideFooter: {
    default: false,
    type: Boolean,
  },
});

const toEvent = () => {
  navigateTo(localePath({ name: "innovation-bridge" }));
};

watch(localeStore, async (newValue) => {
  localeStore.setLocale(localeStore.locale);
  await refreshNuxtData();
});
</script>
