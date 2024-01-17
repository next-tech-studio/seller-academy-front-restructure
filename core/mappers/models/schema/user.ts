import { Mapping } from "mappers";

const user: Mapping = {
  id: {},
  userId: { newName: "id" },
  displayName: {
    newName: "name",
    setValue: (object) => {
      if (!object?.displayName && !object?.userDisplayName) {
        return object?.firstName + " " + object?.lastName;
      } else {
        return object?.displayName || object?.userDisplayName
      }
    },
  },
  userDisplayName: {
    newName: "name",
  },
  firsName: {},
  lastName: {},
  avatarUrl: { defaultValue: "/images/user.jpeg" },
  secondaryText: {},
  roles: {
    setValue: (object) => ["seller"],
  },
};

export default user;
