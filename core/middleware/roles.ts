import { useAuthStore } from "@core/stores/auth";
export default defineNuxtRouteMiddleware(
  (to, from) => {
    const auth = useAuthStore();
    const requiredPermissions = to.meta.permissions || [];
    if (!auth.hasPermission(requiredPermissions)) {
      return navigateTo('/login');
    }
  }
);
