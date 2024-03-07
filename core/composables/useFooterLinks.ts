export const useFooterLinks = () => {
  return ref([
    {
      title: "با مارکت‌پلیس دیجی‌کالا",
      links: [
        {
          title: "contact_us",
          to: "/contact-us",
        },
        {
          title: "about_us",
          to: "/about-us",
        },
        // {
        //   title: "be_seller_in_digikala",
        //   to: "/",
        // },
        {
          title: "academy",
          to: "/academy/courses",
        },
        {
          title: "forum",
          to: "/forum",
        },
        {
          title: "blog",
          to: "/blog",
        }
      ],
    },
    {
      title: "راهنمای فروش در دیجی‌کالا",
      links: [
        {
          id: 1,
          title: "sales_route",
          to: "/sales-route",
        },
        // {
        //   id: 2,
        //   title: "be_seller_in_digikala",
        //   to: "",
        // },
        // {
        //   id: 3,
        //   title: "title_3",
        //   to: "",
        // },
        // {
        //   id: 4,
        //   title: "title_4",
        //   to: "",
        // },
      ],
    },
    {
      title: "خدمات ویژه فروشندگان",
      links: [
        {
          id: 1,
          title: "ad_service",
          to: "/ad-services",
        },
        {
          id: 2,
          title: "کارخانه محتوا",
          to: "https://www.digikala.com/contentfactory/",
        },
        {
          id: 3,
          title: "مگنت، بازاریابی محتوایی",
          to: "https://www.digikala.com/landings/magnet/",
        },
        {
          id: 4,
          title: "تسویه زودهنگام",
          to: "https://demo-sellerhub.diginext.ir/article/%D8%AA%D8%B3%D9%88%DB%8C%D9%87-%D8%AD%D8%B3%D8%A7%D8%A8-%D8%A8%D8%A7-%D8%AF%DB%8C%D8%AC%DB%8C%DA%A9%D8%A7%D9%84%D8%A7-%D8%AF%D8%B1-%D9%87%D8%B1-%D8%B2%D9%85%D8%A7%D9%86",
        },
        {
          id: 4,
          title: "فروش عمده و سازمانی",
          to: "https://demo-sellerhub.diginext.ir/article/%D9%81%D8%B1%D9%88%D8%B4-%D8%B3%D8%A7%D8%B2%D9%85%D8%A7%D9%86%DB%8C-%DB%8C%D8%A7-b2b-%D8%AF%D8%B1-%D8%AF%DB%8C%D8%AC%DB%8C%DA%A9%D8%A7%D9%84%D8%A7",
        },
      ],
    },
  ]);
};
