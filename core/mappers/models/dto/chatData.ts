//@ts-ignore
import { Mapping, mapper, mapperCollection } from "~/mappers";
import chat from "../schema/chat";
import pagination from "../schema/pagination";

const chatData: Mapping = {
    'data': {
        processValue: (value) => mapperCollection(value.data, chat)
    },
    'pagination': {
        setValue: (object) => mapper(object.data, pagination)
    },
    'loginUserAllowToChat':{
        processValue: (value) => value
    }
};

export default chatData