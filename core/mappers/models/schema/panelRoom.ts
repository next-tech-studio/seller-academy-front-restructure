//@ts-ignore
import { Mapping, $moment, mapperCollection } from "~/mappers";
import user from "./user";
const panelRoom: Mapping = {
  creationDate: {
    processValue: (value) =>
      process.client ? $moment(value).format("jYYYY/jMM/jDD - HH:mm") : "",
  },
  avatarUrl: {
    defaultValue: "",
    processValue: (value) => {
      console.log("avvaatar", value);
      return { url: value };
    },
  },
  bannerUrl: {
    processValue: (value) => {
      return { url: value };
    },
  },
  members: {
    processValue: (value) => mapperCollection(value, user),
  },
};

export default panelRoom;
