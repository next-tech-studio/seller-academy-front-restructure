export default defineNuxtConfig({
  components: {
    dirs: [`~/academy/components/V1`, `~/academy/components/V2`],
  },
  dir: {
    pages: process.env.ACADEMY_VERSION
      ? `./pages/${process.env.ACADEMY_VERSION}`
      : "./pages",
  },
  hooks: {
    "pages:extend"(routes) {
      routes.forEach((route) => {
        route.path = route.path.replace(/^\/V1/, "");
        route.name = route.name?.replace("V1-", "");
        route.path = route.path.replace(/^\/V2/, "");
        route.name = route.name?.replace("V2-", "");

        route.children?.forEach((child) => {
          child.name = child.name?.replace("V1-", "");
          child.name = child.name?.replace("V2-", "");
        });
      });
    },
  },
});
