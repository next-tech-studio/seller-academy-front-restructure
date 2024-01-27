export const useNavItems = () => {
  return ref([
    {
      title: "academy",
      to: "/academy/courses",
      children: ["academy"],
    },
    {
      title: "forum",
      to: "/forum",
      children: ["forum"],
    },
    {
      title: "blog",
      to: "/blog",
      children: ["blog", "video", "article", "podcast"],
    },
    { title: "requested_forms", to: "/forms",  children: ["forms"], },
    {
      title: "be_seller_in_digikala",
      to: "/",
    },
  ]);
};
