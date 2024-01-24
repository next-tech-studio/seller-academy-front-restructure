export default defineNuxtRouteMiddleware((to, from) => {
  // if (to.path === "/" || !to.path.endsWith("/")) {
  //   return;
  // }

  // const nextPath = to.path.replace(/\/+$/, "") || "/";
  // const nextRoute = { path: nextPath, query: to.query, hash: to.hash };

  // // 301 Permanent Redirect
  // return navigateTo(nextRoute, { redirectCode: 301 });
});
