//@ts-ignore
import { Mapping, mapperCollection } from "~/mappers";
import roles from "../schema/roles";

const editorCommon: Mapping = {
    authorOptions: {
        processValue: (value) => mapperCollection(value, roles)
    },
};

export default editorCommon