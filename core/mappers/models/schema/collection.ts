//@ts-ignore
import { Mapping, mapper, mapperCollection } from "~/mappers";
import pagination from "../schema/pagination";

function collection(object: any, mapping: Mapping) : Mapping {
    return {
        'data': {
            processValue: (value) => mapperCollection(value, mapping)
        },
        'pagination': {
            setValue: (object) => mapper(object, pagination)
        }
    }
};

export default collection