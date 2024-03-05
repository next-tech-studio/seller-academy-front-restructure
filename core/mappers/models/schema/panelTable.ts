//@ts-ignore
import { Mapping, $moment, mapperCollection } from "~/mappers";
import user from "./user";
import uploader from "./uploader";
const panelTable: Mapping = {
  question: {
    processValue: (value) => {
      return value.title || value;
    },
  },
  // slug: {
  //   setValue: (object) => object.article?.slug,
  // },
  address: {
    setValue: (object) => object.article?.slug,
  },

  publicationDate: {
    processValue: (value) =>
      process.client ? $moment(value).format("jYYYY/jMM/jDD - HH:mm") : "",
  },
  creationDate: {
    processValue: (value) =>
      process.client ? $moment(value).format("jYYYY/jMM/jDD - HH:mm") : "",
  },
  createdAt: {
    newName: "creationDate",
    processValue: (value) =>
      process.client ? $moment(value).format("jYYYY/jMM/jDD - HH:mm") : "",
  },
  date: {
    processValue: (value) =>
      process.client ? $moment(value).format("jYYYY/jMM/jDD - HH:mm") : "",
  },
  image: {
    processValue: (value) => {
      return { url: value };
    },
  },
  avatarUrl: {
    defaultValue: "/images/user.jpeg",
    processValue: (value) => {
      return { url: value };
    },
  },
  bannerUrl: {
    processValue: (value) => {
      return { url: value };
    },
  },
  attachments:{
    processValue: (value) => {
      return mapperCollection(value, uploader)
    },
  },

  cover_url: {
    processValue: (value) => {
      return { url: value };
    },
  },
  members: {
    processValue: (value) => mapperCollection(value, user),
  },
};

export default panelTable;
