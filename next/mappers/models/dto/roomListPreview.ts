//@ts-ignore
import { Mapping, mapperCollection } from "~/mappers";
import roomPreview from "~/mappers/models/schema/roomPreview";

const roomListPreview: Mapping = {
  rooms: {
    processValue: (value) => mapperCollection(value, roomPreview),
  },
  recentChatSidebar:{
    processValue: (value) => mapperCollection(value, roomPreview),
  }
};

export default roomListPreview;
