<template>
  <v-btn
    v-if="!auth.user.loggedIn"
    variant="outlined"
    rounded
    @click="toLogin"
    color="border-grade-2"
    height="41"
  >
    <span class="text-icon-high-emphasis">
      <v-icon
        class="ml-2"
        color="icon-high-emphasis"
        icon="custom:registration"
      />
      {{ $t("login") + " | " + $t("sign_up") }}
    </span>
  </v-btn>
  <v-menu
    v-else
    transition="slide-y-transition"
    content-class="elevation-0"
    offset="4"
  >
    <template v-slot:activator="{ props, isActive }">
      <v-btn
        v-bind="props"
        min-width="fit-content"
        class="px-0"
        variant="outlined"
        rounded
        color="border-grade-2"
        height="41"
      >
        <div class="mx-1 text-icon-high-emphasis text-button">
          <v-avatar
            start
            size="30"
            :image="auth.user?.avatarUrl.url || auth.user?.avatarUrl"
          ></v-avatar>
          <span class="mr-2"
            >{{ `${$t("hello")} ${auth.user.firstName}` }}!</span
          >
          <v-icon
            class="mx-4"
            size="10"
            :icon="isActive ? 'custom:caretTopSolid' : 'custom:caretDownSolid'"
          ></v-icon>
        </div>
      </v-btn>
    </template>
    <v-list elevation="0" :border="true" density="compact" class="py-0">
      <v-list-item v-for="(item, i) in items" :key="i" @click="item.action">
        <div class="d-flex align-center">
          <v-icon
            size="small"
            class="ml-3"
            :icon="item.icon"
            color="icon-low-emphasis"
          ></v-icon>
          <v-list-item-title class="text-high-emphasis">{{
            $t(item.title)
          }}</v-list-item-title>
        </div>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup>
import { useAuthStore } from "~/stores/auth";
const auth = useAuthStore();
const localePath = useLocalePath();
const toLogin = () => {
  auth.setStep(0);
  navigateTo("/login");
};
const logout = () => {
  auth.logout();
  navigateTo("/login");
};
const goToPanel = () => {
  navigateTo(
    localePath({
      path: "/blog/panel/listings/posts",
    }),
    { external: true }
  );
};
const goToDashboard = () => {
  navigateTo(
    localePath({
      path: "/dashboard/user-account",
    }),
    { external: true }
  );
};
const items = [
  {
    title: "user_dashboard",
    icon: "custom:dashboard",
    action: goToDashboard,
  },
  {
    title: "admin_panel",
    icon: "custom:userSolid",
    action: goToPanel,
  },
  {
    title: "logout",
    icon: "custom:logout",
    action: logout,
  },
];
</script>
