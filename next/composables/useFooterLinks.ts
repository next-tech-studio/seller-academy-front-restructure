export const useFooterLinks = () => {
  return ref([
    {
      title: "access",
      links: [
        {
          id: 1,
          title: "home",
          to: "/",
        },
        {
          id: 2,
          title: "startups",
          to: "/portfo",
        },
        {
          id: 3,
          title: "blog",
          to: "/blog",
        },
        {
          id: 4,
          title: "about_us",
          to: "/about-us",
        },
        {
          id: 4,
          title: "our_team",
          to: "/our-team",
        },
      ],
    },
    {
      title: "services",
      links: [
        {
          title: "academy",
          to: "",
        },
        {
          title: "investment_and_startups",
          to: "",
        },
        {
          title: "tech_studio",
          to: "",
        },
      ],
    },
  ]);
};
