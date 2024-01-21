//@ts-ignore
import { Mapping, mapper, $moment } from "~/mappers";
import profile from "./profile";
const panelTable: Mapping = {
  // author: {
  //   processValue: (value) => {return value.displayName},
  // },
  publicationDate: {
    processValue: (value) =>
      process.client ? $moment(value).format("jYYYY/jMM/jDD - HH:mm") : "",
  },
  date: {
    processValue: (value) =>
      process.client ? $moment(value).format("jYYYY/jMM/jDD - HH:mm") : "",
  },
  profile: {
    processValue: (value) => mapper(value, profile),
  },

  startAt: {
    processValue: (value) =>
      process.client ? $moment(value).format("jYYYY/jMM/jDD - HH:mm") : "",
  },
  endAt: {
    processValue: (value) =>
      process.client ? $moment(value).format("jYYYY/jMM/jDD - HH:mm") : "",
  },
  createAt: {
    processValue: (value) =>
      process.client ? $moment(value).format("jYYYY/jMM/jDD - HH:mm") : "",
  },
};

export default panelTable;
