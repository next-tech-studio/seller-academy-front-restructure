export const useNavItems = () => {
  return ref([
    {
      title: "home",
      to: "/",
      children: ["home"],
    },
    {
      title: "startups",
      to: "/portfo",
      children: ["portfo"],
    },
    {
      title: "mentorship",
      to: "/mentors",
      children: ["mentors"],
    },
    {
      title: "courses",
      to: "/academy/courses",
      children: ["academy"],
    },
    // {
    //   title: "research_and_development",
    //   to: "/tech-studio",
    //   children: ["tech-studio"],
    // },
    {
      title: "blog",
      to: "/blog",
      children: ["blog"],
    },
    {
      title: "about_us",
      to: "/about-us",
      children: ["about-us"],
    },
    {
      title: "our_team",
      to: "/our-team",
      children: ["our-team"],
    },
  ]);
};
