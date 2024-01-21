export const useShema = (item, identity) => {
  const config = useRuntimeConfig();
  const identities = {
    article: [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: () => item.title,
        image: () => {
          return {
            "@type": "ImageObject",
            url: item.bannerUrl,
          };
        },
        author: {
          "@type": "Corporation",
          id: "https://www.digikala.com/#corporation",
          name: "دیجی‌کالا",
          url: "https://www.digikala.com",
        },
        datePublished: () => toIso(item.publicationDate),
        dateModified: () => toIso(item.publicationDate),
      },
    ],
    video: [
      {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: () => item.title || "",
        description: () => item.description,
        thumbnailUrl: () => item.previewUrl,
        uploadDate: () => toIso(item.publicationDate),
        duration: () => toIsoDuration(item.duration),
        contentUrl: () => item.videoUrl,
      },
    ],
    breadcrumb: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: () => {
          return item.map((i, index) => {
            return {
              "@type": "ListItem",
              position: index + 1,
              name: i.title,
              item: config.public.domain + i.to,
            };
          });
        },
      },
    ],
  };

  return useSchemaOrg(identities[identity]);
};
