//@ts-ignore
import { Mapping, mapper } from "~/mappers";

const profile: Mapping = {
  avatarUrl: {
    processValue: (value) => {
      console.log("value", value);
      return { url: value };
    },
  },
};

export default profile;
