export function getPublicImage(src, module = null) {
  // TODO: use build-time envvars?
  if (useRuntimeConfig().public.docker === '1') {
    if (!module || module === 'core') {
      return src;  // no need to redirect, core is already served as default route
    }
    return `/public/${module}${src}`;
    // We can probably use process.env.MODULE as well
    // (unless it's masked by nodejs at buildtime / required at runtime)
  }
  // TODO: We can probably just return "src" in the next line.
  return process.env.NODE_ENV != "production" && module
    ? `/${module}/buildAssets${src}`
    : src;
}
