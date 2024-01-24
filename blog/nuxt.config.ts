export default defineNuxtConfig({
  routeRules: {
    "/panel/**": { ssr: false },
  },
  hooks: {
    "pages:extend"(pages) {
      pages.push({
        name: "blog-panel-podcast-id-content",
        path: "/blog/panel/podcast/:id?/content",
        file: "~/blog/pages/blog/panel/post/[[id]]/content.vue",
        meta: {
          layout: "sidebar",
        },
      });

      pages.push({
        name: "blog-panel-podcast-id-draft",
        path: "/blog/panel/podcast/:id?/draft",
        file: "~/blog/pages/blog/panel/post/[[id]]/draft.vue",
        meta: {
          layout: "sidebar",
        },
      });

      pages.push({
        name: "blog-panel-podcast-id-seo",
        path: "/blog/panel/podcast/:id?/seo",
        file: "~/blog/pages/blog/panel/post/[[id]]/seo.vue",
        meta: {
          layout: "sidebar",
        },
      });

      pages.push({
        name: "blog-panel-listings-podcasts",
        path: "/blog/panel/listings/podcasts",
        file: "~/blog/pages/blog/panel/listings/posts",
      });
    },
  },
});
