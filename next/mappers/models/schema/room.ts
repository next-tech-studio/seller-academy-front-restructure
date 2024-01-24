//@ts-ignore
import { Mapping, mapperCollection } from "~/mappers";
import user from "./user";

const room: Mapping = {
  name: {
    setValue: (value) => value.title || value.name
  },
  previewedMembers: {
    newName:'members',
    setValue: (object) => {      
      if (object.previewedMembers) {
        return mapperCollection(object.previewedMembers, user, false)
      } else {
        return object.membersListSummary
      }
    },
  },
  membersListSummary: {
    newName:'members',
    setValue: (object) => {      
      if (object.membersListSummary) {
        return mapperCollection(object.membersListSummary, user, false)
      } else {
        return object.previewedMembers
      }
    },
  },
  subtitle: {
    setValue: (object) => `${object.membersCount} عضو`
  }
};

export default room;
