//@ts-ignore
import { Mapping, mapperCollection } from "~/mappers";
import user from "./user";

const room: Mapping = {
  name: {
    setValue: (value) => value.title || value.name,
  },
  previewedMembers: {
    newName: "members",
    processValue: (value, object) => {
      if (object.previewedMembers) {
        return mapperCollection(object.previewedMembers, user);
      } else {
        return object.membersListSummary;
      }
    },
  },
  membersListSummary: {
    newName: "members",
    processValue: (value, object) => {
      if (object.membersListSummary) {
        return mapperCollection(object.membersListSummary, user);
      } else {
        return object.previewedMembers;
      }
    },
  },
  members: {
    processValue: (value, object) => {
      if (object.members) {
        return mapperCollection(object.members, user);
      } else {
        return object.previewedMembers;
      }
    },
  },
  subtitle: {
    setValue: (object) => `${object.membersCount} عضو`,
  },
};

export default room;
