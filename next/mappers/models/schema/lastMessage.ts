//@ts-ignore
import { Mapping, mapper, $moment } from "~/mappers";
import user from "./user";

const lastMessage: Mapping = {
  date: {
    newName:'since',
    processValue: (value) => (process.client ? $moment(value).fromNow() : ""),
  },
  sender:{
    processValue: (value) => mapper(value, user)
  },
};

export default lastMessage;
