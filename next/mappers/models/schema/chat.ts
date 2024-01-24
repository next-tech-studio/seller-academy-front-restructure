//@ts-ignore
import { Mapping, mapper, $moment } from "~/mappers";
import user from "./user";

const chat: Mapping = {
  user: {
    setValue: (object) => {return mapper(object,user, false)}
  },
  date: {
    newName: "time",
    processValue: (value) => {
      if (value) return $moment(value).format("HH:MM");
    },
  },
  dateTime: {
    setValue: (value) => {
      if (value.date) return $moment(value.date).format("LL");
    },
  },
  replyTo: {
    processValue: (value) => mapper(value, chat),
  },
};

export default chat;
