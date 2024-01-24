//@ts-ignore
import { Mapping, mapperCollection, mapper } from "~/mappers";
import academyProduct from "../schema/academyProduct";
import user from "../schema/user";

const academyProductHomepage: Mapping = {
  slider: {
    processValue: (value) => mapperCollection(value, academyProduct),
  },
  categories: {
    processValue: (value) => value.map((v: any) => {
        return { ...v, courses: mapperCollection(v.courses, academyProduct) };
      }),
  
  },
  comments: {
    processValue: (value) => {
      return value.map((comment: any) => {
        return { ...comment, user: mapper(comment.user, user) };
      });
    },
  },
};

export default academyProductHomepage;
