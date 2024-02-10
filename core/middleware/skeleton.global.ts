import { useGlobalStore } from "../stores/global";
export default defineNuxtRouteMiddleware((to, from) => {
  const store = useGlobalStore();
  const route = useRoute()
  
  let skeleton = "";
  if (route.name == "blog") skeleton = "skeleton-blog";
  else if (route.name == "article-archive") skeleton = "skeleton-article-archive";
  else if (route.name == "article-category-slug") skeleton = "skeleton-article-category-slug";
  else if (route.name == "article-tag-slug") skeleton = "skeleton-article-tag-slug";
  else if (route.name == "podcast-archive") skeleton = "skeleton-podcast-archive";
  else if (route.name == "forum") skeleton = "skeleton-forum";
  else if (route.name == "academy-courses") skeleton = "skeleton-academy-courses";
  else if (route.name == "academy-courses-category-slug") skeleton = "skeleton-academy-courses-category-slug";
  else if (route.name == "academy-products") skeleton = "skeleton-academy-products";
  if (skeleton && !process.server) {
    store.skeleton = skeleton;
    store.skeletonLoading = true && skeleton;
  }
});
