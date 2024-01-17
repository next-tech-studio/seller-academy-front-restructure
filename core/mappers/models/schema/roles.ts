//@ts-ignore
import { Mapping } from "~/mappers";

const roles: Mapping = {
  displayName: {
    newName: "title",
  },
  slug: {
    setValue: (object) => {return {id:object.id, type:object.type, title:object.displayName}}
  }
};

export default roles;
