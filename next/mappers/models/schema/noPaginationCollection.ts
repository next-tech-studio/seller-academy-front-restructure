//@ts-ignore
import { Mapping, mapper, mapperCollection } from "~/mappers";

const noPaginationCollection: Mapping = {
  data: {
    setValue: (object,mapping,raw) => mapperCollection(object, mapping, raw),
  },
};

export default noPaginationCollection;
