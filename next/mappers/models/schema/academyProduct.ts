//@ts-ignore
import { Mapping, mapper, mapperCollection, $moment } from "~/mappers";
import user from "./user";
const academyProduct: Mapping = {
  bannerUrl: {
    defaultValue: "/images/user.jpeg"
  },
  url: {
    setValue: (object) => {
      return {
        name: "academy-products-slug",
        params: { slug: object.slug },
      };
    },
  },
  comments: {
    processValue: (value) => {
      return value.map((comment: any) => {
        return { ...comment, user: mapper(comment.user, user) };
      });
    },
  },
};

export default academyProduct;
