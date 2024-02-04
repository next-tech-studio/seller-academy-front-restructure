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
  pagination: {
    setValue: (value) => {
      console.log('value', value);
      
      return !value.meta ? mapper(value, pagination, false) : mapper(value.meta, pagination, false);
    },
  },
  // meta: {
  //   newName: "pagination",
  //   processValue: (value) => {
  //     return mapper(value, pagination);
  //   },
  // }
};
console.log('ccolleccttiion',collection)
export default collection;
