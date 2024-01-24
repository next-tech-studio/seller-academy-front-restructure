//@ts-ignore
import { Mapping, mapper, mapperCollection } from "~/mappers";
import pagination from "../schema/pagination";

const collection: Mapping = {
  data: {
    processValue: (value,{}, mapping) => {
      // console.log("hanieh", mapperCollection(value, mapping));
      return mapperCollection(value, mapping);
    },
  },
  meta: {
    newName: "pagination",
    processValue: (value) => {
      return mapper(value, pagination);
    },
  },
};
console.log('ccolleccttiion',collection)
export default collection;
