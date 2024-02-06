<template>
  <div id="navbar" @click="drawer = false">
    <v-app-bar flat style="z-index: 1000 !important" :class="color.bg">
      <template v-slot:prepend v-if="!lgAndUp">
        <v-btn
          icon="custom:hamburger"
          @click.stop="drawer = !drawer"
          :class="color.bg"
        ></v-btn>
      </template>
      <template v-slot:append v-if="!lgAndUp">
        <lang-switcher />
      </template>
      <v-container class="d-flex align-center" v-if="!lgAndUp">
        <a
          href="/"
          style="position: absolute; left: 50%; transform: translateX(-50%)"
        >
          <v-avatar tile size="85">
            <v-img
              :src="`/images/logo/${$route.name == 'index' ? '1' : '2'}.svg`"
              contain
              alt="logo"
            />
          </v-avatar>
        </a>
      </v-container>
      <v-container
        v-if="lgAndUp"
        fluid
        class="d-flex align-center"
        :style="$route.name.includes('panel') ? 'max-width: 100%;' : ''"
      >
        <a href="/">
          <v-avatar tile size="86.51">
            <v-img
              :src="`/images/logo/${isIndex ? '1' : '2'}.svg`"
              max-height="31.26px"
              max-width="86.51"
              contain
              alt="logo"
            />
          </v-avatar>
        </a>
        <!-- TODO: change navbar condition -->
        <template v-for="(item, index) in items" :key="item.title">
          <v-divider v-if="item.divider" vertical class="my-8"></v-divider>
          <a
            v-else
            style="text-decoration: none"
            class="text-body-2 font-weight-medium"
            tag="div"
            exact
            :href="localePath(item.to)"
          >
            <v-btn
              :active="isActive(item)"
              :color="!isActive(item) ? color.text : color.activeText"
              text
              tag="nav"
              class="text-body-2 font-weight-bold"
            >
              {{ $t(item.title) }}
            </v-btn>
          </a>
        </template>
        <v-spacer></v-spacer>
        <div class="d-flex align-center">
          <app-share-in class="mx-4" :color="color.text" />
          <!-- <div class="mx-4">
            <lang-switcher />
          </div> -->
          <auth-handler v-if="needAuth" />
        </div>
      </v-container>
    </v-app-bar>
    <v-navigation-drawer
      v-if="!lgAndUp"
      v-model="drawer"
      location="start"
      sticky
      temporary
      dir="auto"
    >
      <v-card>
        <v-list height="100vh">
          <v-list-item v-if="auth.user.loggedIn">
            <div class="mx-1 text-icon-high-emphasis text-button">
              <v-avatar
                start
                size="30"
                :image="auth.user?.avatarUrl"
              ></v-avatar>
              <span class="mr-2"
                >{{ `${auth.user.firstName} ${auth.user.lastName}` }}</span
              >
            </div>
          </v-list-item>
          <v-divider v-if="auth.user.loggedIn"></v-divider>
          <v-list-item
            @click.stop="drawer = false"
            v-for="(item, index) in items"
            :key="item.title"
            :to="localePath(item.to)"
            class="mx-1"
            :active="isActive(item)"
            border="0"
            :color="
              !isActive(item)
                ? 'rgba(var(--v-theme-text-disabled))'
                : 'rgba(var(--v-theme-text-heading))'
            "
          >
            {{ $t(item.title) }}
          </v-list-item>
        </v-list>
      </v-card>
      <template v-slot:append>
        <div class="pa-2">
          <auth-handler mobile />
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script setup>
import { useDisplay } from "vuetify";
import { useAuthStore } from "~/next/stores/auth";
import AuthHandler from "./components/AuthHandler.vue";
import LangSwitcher from "./components/LangSwitcher.vue";
import Search from "./components/Search.vue";
const config = useRuntimeConfig();
const needAuth = computed(() => config.public.needAuth != "false");
const items = useNavItems();
const { lgAndUp, mdAndUp } = useDisplay();
const drawer = ref(false);
const route = useRoute();
const openSearch = ref(false);
const auth = useAuthStore();
const props = defineProps({
  showNavberItems: {
    default: true,
    type: Boolean,
  },
});
const isActive = (item) => {
  const found = item.children?.find((child, i) => {
    return route.fullPath.includes(child);
  });
  return !!found;
};
let isIndex = computed(
  () =>
    useRoute().name == "index" ||
    useRoute().name.includes("panel") ||
    useRoute().name == "login"
);
const color = computed(() => {
  return {
    bg: isIndex.value ? "bg-primary-base" : "white",
    text: isIndex.value
      ? "rgba(var(--v-theme-text-light))"
      : "rgba(var(--v-theme-text-high-emphasis))",
    activeText: isIndex.value
      ? "rgba(var(--v-theme-text-light))"
      : "rgba(var(--v-theme-primary-base))",
  };
});
</script>

<style lang="scss">
#navbar {
  .v-btn--variant-text .v-btn__overlay {
    background: transparent !important;
  }

  .v-navigation-drawer {
    top: 0 !important;
    z-index: 2008 !important;
    height: 100% !important;
  }

  .v-navigation-drawer__scrim {
    background: rgba(var(--v-theme-n400)) !important;
  }
  .border-bottom-0 {
    border-bottom: 1px solid rgba(var(--v-theme-n200));
  }
}
</style>

<style lang="scss">
.search-overlay {
  height: 100%;
  z-index: 10;
  position: fixed;
  background: white;
  width: 100%;
}
body.search-overlay {
  overflow-y: hidden !important;
  position: fixed;
}
</style>
