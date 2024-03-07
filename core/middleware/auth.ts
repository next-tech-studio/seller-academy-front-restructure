import { useAuthStore } from "@core/stores/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuthStore();
  const requiredPermissions = to.meta.permissions || [];
  const router = useRouter();
  if (!auth.user.loggedIn && !auth.hasPermission(requiredPermissions)) {
    router.push("/login");
    // return  navigateTo("/login")
    // setTimeout(() => navigateTo("/login"), 10);
  }
});
