import { useGlobalStore } from "../stores/global";
export default defineNuxtRouteMiddleware((to, from) => {
  // This middleware won't execute for specific routes in the array
  if (["sales-route", "ad-services", "contact-us", "about-us"].includes(to.name as string)) {
    return;
  }

  const store = useGlobalStore();
  const router = useRouter();
  const route = router.currentRoute.value;
  let skeleton = "";
  if (process.server) return;
  if (process.client) {
    if (to.name == "blog") skeleton = "skeleton-blog";
    else if (to.name == "article-archive")
      skeleton = "skeleton-article-archive";
    else if (to.name == "article-category-slug")
      skeleton = "skeleton-article-category-slug";
    else if (to.name == "article-tag-slug")
      skeleton = "skeleton-article-tag-slug";
    else if (to.name == "podcast-archive")
      skeleton = "skeleton-podcast-archive";
    else if (to.name == "forum") skeleton = "skeleton-forum";
    else if (to.name == "academy-courses")
      skeleton = "skeleton-academy-courses";
    else if (to.name == "academy-courses-category-slug")
      skeleton = "skeleton-academy-courses-category-slug";
    else if (to.name == "academy-products")
      skeleton = "skeleton-academy-products";
    else skeleton = "loading-indicator";

    store.skeleton = skeleton;
    store.skeletonLoading = true;
  }
});
