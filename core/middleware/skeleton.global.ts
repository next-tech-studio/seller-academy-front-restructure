import { useGlobalStore } from "../stores/global";
export default defineNuxtRouteMiddleware((to, from) => {
  const store = useGlobalStore();
  const route = useRoute();
  let skeleton = '';
  if (route.name.indexOf("blog") !== -1) skeleton = "skeleton-blog";
  store.skeleton = skeleton;
  store.skeletonLoading = true && skeleton;
});
