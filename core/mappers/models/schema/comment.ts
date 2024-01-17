//@ts-ignore
import { Mapping, mapper, mapperCollection } from "~/mappers";
import user from "./user";

function comment(object: any, mapping: Mapping): Mapping {
  return {
    user: {
      processValue: (value) => mapper(value, user, false),
    },
  };
}

export default comment;
