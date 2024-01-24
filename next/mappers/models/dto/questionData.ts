//@ts-ignore
import { Mapping, mapper, mapperCollection } from "~/mappers";
import pagination from "../schema/pagination";
import question from "../schema/question";

const questionData: Mapping = {
    'data': {
        processValue: (value) => mapperCollection(value, question)
    },
    'pagination': {
        setValue: (object) => mapper(object,{}, pagination)
    }
};

export default questionData