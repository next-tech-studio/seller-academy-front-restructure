import { useGlobalStore } from "../stores/global";
export default defineNuxtRouteMiddleware((to, from) => {
  const store = useGlobalStore();
  const router = useRouter();
  const route = router.currentRoute.value;
  let skeleton = "";
  if (process.server) return
  if (process.client) {
    console.log('============route=============', route.name);
    console.log('============to=============', to.name);
    
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
    else skeleton = "loading-indicator"

    console.log('============skeleton=============', skeleton);

    store.skeleton = skeleton;
    if (to.name != 'sales-route' && to.name != 'ad-services') store.skeletonLoading = true;
  }
});
