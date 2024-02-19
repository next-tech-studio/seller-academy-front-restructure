<template>
  <div>
    <v-layout class="flex-column" dir="rtl" full-height>
      <Navbar />
      <v-main>
        <!-- <div>
              <search v-if="!lgAndUp" />
            </div> -->
        <VitePwaManifest />

        <component
          v-if="store.skeletonLoading && store.skeleton"
          :is="skeleton"
        />
        <div v-show="!store.skeletonLoading"><slot /></div>
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
      <Footer v-if="!store.skeletonLoading" ref="footer" />
      <app-toast></app-toast>
    </v-layout>
  </div>
</template>

<script setup>
import { useGlobalStore } from "../stores/global";
import { useDisplay } from "vuetify";
import Navbar from "./components/navbar/Navbar.vue";
import Footer from "./components/Footer.vue";
import Search from "./components/navbar/components/Search.vue";

const { lgAndUp } = useDisplay();
const store = useGlobalStore();
let skeleton = null;
const props = defineProps({
  hideFooter: {
    default: false,
    type: Boolean,
  },
});
const footer = ref(null);
provide("footer", footer);

watch(
  store,
  (newValue) => {
    skeleton = resolveComponent(newValue.skeleton);
  },
  { deep: true }
);
</script>
