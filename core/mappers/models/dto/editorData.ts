//@ts-ignore
import { Mapping,mapper, mapperCollection } from "~/mappers";
import roles from "../schema/roles";

const editorCommon: Mapping = {
    author: {
        processValue: (value) => mapper(value, roles)
    },
};

export default editorCommon