import { useAuthStore } from "@core/stores/auth";
export default defineNuxtRouteMiddleware((to, from) => {
    const auth = useAuthStore();
    if (!auth.user.loggedIn) {
      return navigateTo("/login");
    }
  });