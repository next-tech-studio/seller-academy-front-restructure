import { Mapping, $moment } from "~/mappers";

const personalInfo: Mapping = {
  avatarUrl: {
    processValue: (value) => {
      return { url: value };
    },
  },
  displayName: {
    newName: "name",
    setValue: (object) => {
      if (!object?.displayName && !object?.userDisplayName) {
        return object?.firstName + " " + object?.lastName;
      } else {
        return object?.displayName || object?.userDisplayName;
      }
    },
  },
  userDisplayName: {
    newName: "name",
  },
  //   birthday: {
  //     processValue: (value) =>
  //       process.client ? $moment(value).format("jYYYY/jMM/jDD") : "",
  //   },
};

export default personalInfo;
