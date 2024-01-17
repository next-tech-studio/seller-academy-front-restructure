//@ts-ignore
import { Mapping, mapper, mapperCollection } from "~/mappers";
import question from "../schema/question";

const singleQuestion: Mapping = {
    question: {
        processValue: (object) => mapper(object, question)
    },
    answers: {
        processValue: (value) => mapperCollection(value, question) 
    }
};

export default singleQuestion