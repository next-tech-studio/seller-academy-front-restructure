function useAsset(path: string): string {
  const assets = import.meta.glob('~/assets/**/*', {
    eager: true,
    import: 'default',
  })
  return assets['/assets/' + path]
}

//Usage: <img :src="useAsset(dynamic_image_name + '.svg')" alt="Discover Nuxt 3" />
