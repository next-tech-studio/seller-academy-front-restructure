//@ts-ignore
import { Mapping, mapperCollection } from "~/mappers";
import room from "../schema/room";

const questionCommon: Mapping = {
    suggestedChatRooms: {
        processValue: (value) => mapperCollection(value, room)
    },
    publicRooms: {
        newName: 'rooms',
        processValue: (value) => mapperCollection(value, room)
    },
    userRooms: {
        // newName: 'rooms',
        processValue: (value) => mapperCollection(value, room)
    }
};

export default questionCommon