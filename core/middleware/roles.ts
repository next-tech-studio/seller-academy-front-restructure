import { useAuthStore } from "@core/stores/auth";
export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore();
  const router = useRouter();
  const requiredPermissions = to.meta.permissions || [];
  if (!auth.hasPermission(requiredPermissions)) {
    router.push("/login");
  }
});
