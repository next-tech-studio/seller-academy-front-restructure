export const useBreadrumbs = (item = {}) => {
  const { t } = useI18n();
  const localePath = useLocalePath();

  const article = () => [
    {
      title: t("blog"),
      disabled: false,
      to: localePath({ name: "blog" }),
    },
    {
      title: t("articles"),
      disabled: false,
      to: localePath({ name: "article-archive" }),
    },
    {
      title: item?.title,
      disabled: true,
      to: localePath({
        name: "article-preview-slug",
        params: { slug: item.slug },
      }),
    },
  ];

  const articles = () => [
    {
      title: t("blog"),
      disabled: false,
      to: localePath({ name: "blog" }),
    },
    {
      title: t("articles"),
      disabled: true,
      to: localePath({ name: "article" }),
    },
  ];

  const articleCategory = () => [
    {
      title: t("blog"),
      disabled: false,
      to: localePath({ name: "blog" }),
    },
    {
      title: item?.category?.split("-").join(" "),
      disabled: true,
      to: localePath({ name: "article" }),
    },
  ];
  const articleTag = () => [
    {
      title: t("blog"),
      disabled: false,
      to: localePath({ name: "blog" }),
    },
    {
      title: item?.tag,
      disabled: true,
      to: localePath({ name: "article" }),
    },
  ];
  const articlesArchive = () => [
    {
      title: t("blog"),
      disabled: false,
      to: localePath({ name: "blog" }),
    },
    {
      title: t("articles"),
      disabled: true,
      to: localePath({ name: "article-archive" }),
    },
  ];

  const video = () => [
    {
      title: t("blog"),
      disabled: false,
      to: localePath({ name: "blog" }),
    },
    {
      title: t("videos"),
      disabled: false,
      to: localePath({ name: "video" }),
    },
    {
      title: item?.title,
      disabled: true,
      to: localePath({ name: "video-slug", params: { slug: item.slug } }),
    },
  ];

  const videos = () => [
    {
      title: t("blog"),
      disabled: false,
      to: localePath({ name: "blog" }),
    },
    {
      title: t("videos"),
      disabled: true,
      to: localePath({ name: "video" }),
    },
  ];

  const videosArchive = () => [
    {
      title: t("blog"),
      disabled: false,
      to: localePath({ name: "blog" }),
    },
    {
      title: t("videos"),
      disabled: true,
      to: localePath({ name: "video-archive" }),
    },
  ];

  const podcast = () => [
    {
      title: t("blog"),
      disabled: false,
      to: localePath({ name: "blog" }),
    },
    {
      title: t("podcasts"),
      disabled: false,
      to: localePath({ name: "podcast-archive" }),
    },
    {
      title: item?.title,
      disabled: true,
      to: localePath({
        name: "podcast-slug",
        params: { slug: item.slug },
      }),
    },
  ];

  const podcastArchive = () => [
    {
      title: t("blog"),
      disabled: false,
      to: localePath({ name: "blog" }),
    },
    {
      title: t("podcasts"),
      disabled: true,
      to: localePath({ name: "podcast-archive" }),
    },
  ];

  const forum = () => [
    {
      title: t("forum"),
      disabled: false,
      to: localePath({ name: "forum" }),
    },
    {
      title: item?.category,
      disabled: false,
      to: localePath({ name: "article" }),
    },
    {
      title: item?.name,
      disabled: true,
      to: localePath({
        name: "article-preview-slug",
        query: { slug: item.slug, category: item?.category?.slug },
      }),
    },
  ];

  const academyCategory = () => [
    {
      title: t("academy"),
      disabled: false,
      to: localePath({ name: "academy" }),
    },
    {
      title: item?.category,
      disabled: true,
      to: localePath({ name: "academy-category-slug" }),
    },
  ];

  const academyProduct = () => [
    {
      title: t("academy_of_company"),
      disabled: false,
      to: localePath({ name: "academy-courses" }),
    },
    {
      title: item?.category?.title,
      disabled: true,
      to: localePath({ name: "academy-courses-category-slug" }),
    },
    {
      title: item?.title,
      disabled: true,
      to: localePath({ name: "academy-courses-slug", params: { slug: item.slug } }),
    },
  ];

  return {
    article,
    articles,
    articlesArchive,
    video,
    videos,
    videosArchive,
    forum,
    articleCategory,
    articleTag,
    academyCategory,
    academyProduct,
    podcast,
    podcastArchive,
  };
};
