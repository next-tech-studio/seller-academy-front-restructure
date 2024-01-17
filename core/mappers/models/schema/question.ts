//@ts-ignore
import { Mapping, mapper, mapperCollection, $moment } from "~/mappers";
import user from "./user";

const question: Mapping = {
  asker: {
    newName: "user",
    processValue: (value) => {
      return mapper(value, user)
    },
  },
  user: {
    processValue: (value) => mapper(value, user)
  },
  topAnswers: {
    processValue: (value) => mapperCollection(value, user)
  },
  creationDate: {
    processValue: (value) => process.client ? $moment(value).fromNow() : ""
  },
};

export default question;
