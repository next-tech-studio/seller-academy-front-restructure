<template>
  <div id="navbar">
    <v-app-bar flat style="z-index: 1000 !important" class="border-bottom-0">
      <template v-slot:prepend v-if="!lgAndUp">
        <v-btn
          icon="custom:hamburger"
          @click.stop="drawer = !drawer"
          class="text-icon-high-emphasis"
        ></v-btn>
      </template>
      <template v-slot:append v-if="!lgAndUp">
        <v-btn
          @click="openSearch = !openSearch"
          :icon="!openSearch ? 'custom:search' : 'custom:x'"
          class="text-icon-high-emphasis"
        ></v-btn>
      </template>
      <v-container class="d-flex align-center" v-if="!lgAndUp">
        <v-spacer></v-spacer>
        <a href="/blog">
          <v-img
            src="/images/logo/logo.svg"
            height="55"
            width="120"
            cover
            alt="logo"
          />
          <!-- <v-avatar tile size="85">
            <v-img
              src="/images/logo/logo.png"
              max-height="31.26px"
              max-width="55.36"
              contain
              alt="logo"
            />
          </v-avatar> -->
        </a>
        <v-spacer></v-spacer>
      </v-container>
      <v-container
        v-if="lgAndUp"
        :fluid="!showNavberItems"
        class="d-flex align-center"
      >
        <a href="/blog">
          <v-img
            src="/images/logo/logo.svg"
            height="65"
            width="140"
            cover
            alt="logo"
        /></a>
        <!-- TODO: change navbar condition -->
        <div v-if="showNavberItems">
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
                :color="
                  !isActive(item)
                    ? 'rgba(var(--v-theme-text-high-emphasis))'
                    : 'rgba(var(--v-theme-text-hint-error))'
                "
                text
                tag="nav"
                class="text-body-2 font-weight-bold"
              >
                {{ $t(item.title) }}
              </v-btn>
            </a>
          </template>
        </div>
        <v-spacer></v-spacer>
        <search @choose:article="toItem($event)" v-if="showNavberItems" />
        <v-divider vertical class="my-6 mx-4"></v-divider>
        <v-btn
          v-if="auth.user.loggedIn"
          prepend-icon="custom:plus"
          color="secondary-base"
          class="text-button"
          @click="goToPageBuilder"
        >
          {{ $t("add_new_post") }}
        </v-btn>
        <auth-handler />
      </v-container>
    </v-app-bar>
    <v-expand-transition>
      <search class="search-overlay pt-15 mt-4" v-if="openSearch" />
    </v-expand-transition>
    <v-navigation-drawer
      v-model="drawer"
      location="start"
      v-if="!lgAndUp"
      sticky
    >
      <v-card>
        <v-list>
          <!-- <v-list-item class="d-flex justify-center" border="0">
            <v-img width="100" src="/images/logo/3.svg" alt="logo" />
          </v-list-item>
          <v-divider class="mt-2 mx-5"></v-divider> -->
          <v-list-item
            v-if="auth.user.loggedIn"
            :to="localePath({ name: 'dashboard-user-account' })"
          >
            <div class="mx-1 text-icon-high-emphasis text-button">
              <v-avatar
                start
                size="30"
                :image="auth.user?.avatarUrl"
              ></v-avatar>
              <span class="mr-2">{{
                `${auth.user.firstName} ${auth.user.lastName}`
              }}</span>
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
          </v-list-item></v-list
        >
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
import AuthHandler from "./components/AuthHandler.vue";
import Search from "./components/Search.vue";
import { useAuthStore } from "@core/stores/auth";
const auth = useAuthStore();

const items = useNavItems();
const { lgAndUp } = useDisplay();
const drawer = ref();
const route = useRoute();
const openSearch = ref(false);
const localePath = useLocalePath();
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
const goToPageBuilder = (item) => {
  navigateTo(
    localePath({
      name: `blog-panel-post-id-draft`,
    })
  );
};
const toItem = (e) => {
  navigateTo(
    localePath({
      path: `/article/${e?.slug}`,
    })
  );
};
</script>

<style lang="scss">
#navbar {
  .v-btn--variant-text .v-btn__overlay {
    background: transparent !important;
  }

  .v-navigation-drawer {
    top: 0 !important;
    z-index: 1008 !important;
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
