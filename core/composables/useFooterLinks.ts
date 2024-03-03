export const useFooterLinks = () => {
  return ref([
    {
      title: "enroll_course",
      links: [
        {
          id: 1,
          title: "title_1",
          to: "",
        },
        {
          id: 2,
          title: "title_2",
          to: "",
        },
        {
          id: 3,
          title: "title_3",
          to: "",
        },
        {
          id: 4,
          title: "title_4",
          to: "",
        },
      ],
    },
    {
      title: "seller_panel",
      links: [
        {
          title: "contact_us",
          to: "/contact-us",
        },
        {
          title: "about_us",
          to: "/about-us",
        },
        {
          title: "be_seller_in_digikala",
          to: "/",
        }
      ],
    },
  ]);
};
