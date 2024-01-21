//@ts-ignore
import { Mapping, mapperCollection } from "~/mappers";
import user from "../schema/user";
import room from "../schema/room";

const chatCommon: Mapping = {
    avatarUrl: {
        defaultValue: '/images/user.jpeg'
    },
    bannerUrl: {
        defaultValue: '/images/user.jpeg'
    },
    membersListSummary: {
        newName: "members",
        processValue: (value) => mapperCollection(value, user)
    },
    otherRooms: {
        processValue: (value) => mapperCollection(value, room)
    },
};

export default chatCommon