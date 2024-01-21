//@ts-ignore
import { Mapping, mapper, mapperCollection } from "~/mappers";
import room from "~/mappers/models/schema/room";
import category from "~/mappers/models/schema/category";

const roomListData: Mapping = {
  categories: {
    processValue: (value) => mapperCollection(value, category),
  },
  rooms: {
    processValue: (value) => mapperCollection(value, room),
  },
  top_rooms: {
    newName: "topRooms",
    processValue: (value) => mapperCollection(value, room),
  },
};

export default roomListData;
