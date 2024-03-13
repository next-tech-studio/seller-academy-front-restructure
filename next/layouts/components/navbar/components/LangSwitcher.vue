<template>
  <v-menu
    transition="slide-y-transition"
    content-class="elevation-0"
    offset="4"
  >
    <template v-slot:activator="{ props, isActive }">
      <v-btn v-bind="props" variant="icon" min-width="fit-content">
        <template #append>
          <v-icon icon="custom:languageSquare" :color="color.bg"/>
        </template>
        <div class="text-button">
          <v-icon
            size="10"
            :icon="isActive ? 'custom:caretTopSolid' : 'custom:caretDownSolid'"
          ></v-icon>
          <span class="px-2">{{ localeStore.locale }}</span>
        </div>
      </v-btn>
    </template>
    <v-list elevation="0" :border="true" density="compact" class="py-0">
      <v-list-item
        v-for="(item, i) in $i18n.availableLocales"
        :key="i"
        @click="setLocale(item)"
        :to="switchLocalePath(item)"
      >
        <div>
          <v-list-item-title class="text-high-emphasis">{{
            $t(item)
          }}</v-list-item-title>
        </div>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup>
import { useLocaleStore } from "~/stores/locale";
const route = useRoute();
const switchLocalePath = useSwitchLocalePath();
const localeStore = useLocaleStore();
const setLocale = (locale) => {
  localeStore.setLocale(locale);
};
let isIndex = computed(
  () =>
    useRoute().name == "index" ||
    useRoute().name.includes("panel") ||
    useRoute().name == "login"
);
const color = computed(() => {
  return {
    text: isIndex ? "transparent" : "rgba(var(--v-theme-text-high-emphasis))",
    bg: isIndex ? "white" : "rgba(var(--v-theme-text-high-emphasis))",
  };
});
</script>
