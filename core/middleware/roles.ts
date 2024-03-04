import { useAuthStore } from "@core/stores/auth";
export default defineNuxtRouteMiddleware(
  (to, from) => {
    const auth = useAuthStore();
    console.log('oeoeooe',from)
    const requiredPermissions = to.meta.permissions || [];
    if (!auth.hasPermission(requiredPermissions)) {
      return navigateTo('/login');
    }
  }
);
