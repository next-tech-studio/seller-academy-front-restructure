import { useAuthStore } from "@core/stores/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuthStore();
  const { $router } = useNuxtApp();
  const router = useRouter();
  if (!auth.user.loggedIn) {
    return router.push('/login')
    // return  navigateTo("/login")
    // setTimeout(() => navigateTo("/login"), 10);
  }
});
