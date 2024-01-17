//@ts-ignore
import { Mapping, mapper, mapperCollection } from "~/mappers";

function noPaginationCollection(object: any, mapping: Mapping, raw:boolean) : Mapping {
    return {
        'data': {
            setValue: (object) => mapperCollection(object, mapping, raw)
        }
    }
};

export default noPaginationCollection