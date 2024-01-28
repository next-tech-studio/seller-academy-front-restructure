export const useBreadrumbs = (item = {}) => {
  const { t } = useI18n();
  const localePath = useLocalePath();

  const article = () => [
    {
      title: "blog",
      disabled: false,
      to: localePath({ name: "blog" }),
    },
    {
      title: "articles",
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
      title: "blog",
      disabled: false,
      to: localePath({ name: "blog" }),
    },
    {
      title: "articles",
      disabled: true,
      to: localePath({ name: "article" }),
    },
  ];

  const articleCategory = () => [
    {
      title: "blog",
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
      title: "blog",
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
      title: "blog",
      disabled: false,
      to: localePath({ name: "blog" }),
    },
    {
      title: "articles",
      disabled: true,
      to: localePath({ name: "article-archive" }),
    },
  ];

  const video = () => [
    {
      title: "blog",
      disabled: false,
      to: localePath({ name: "blog" }),
    },
    {
      title: "videos",
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
      title: "blog",
      disabled: false,
      to: localePath({ name: "blog" }),
    },
    {
      title: "videos",
      disabled: true,
      to: localePath({ name: "video" }),
    },
  ];

  const videosArchive = () => [
    {
      title: "blog",
      disabled: false,
      to: localePath({ name: "blog" }),
    },
    {
      title: "videos",
      disabled: true,
      to: localePath({ name: "video-archive" }),
    },
  ];

  const podcast = () => [
    {
      title: "blog",
      disabled: false,
      to: localePath({ name: "blog" }),
    },
    {
      title: "podcasts",
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
      title: "blog",
      disabled: false,
      to: localePath({ name: "blog" }),
    },
    {
      title: "podcasts",
      disabled: true,
      to: localePath({ name: "podcast-archive" }),
    },
  ];

  const forum = () => [
    {
      title: "forum",
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
      title: "academy",
      disabled: false,
      to: localePath({ name: "academy" }),
    },
    {
      title: item?.category,
      disabled: true,
      to: localePath({ name: "academy-category-slug" }),
    },
  ];
  const requestedForms = () => [
    {
      title: "requested_forms",
      disabled: true,
      to: localePath({ name: "forms" }),
    },
  ];

  const course = () => [{}];

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
    requestedForms,
    course,
    podcast,
    podcastArchive,
  };
};
