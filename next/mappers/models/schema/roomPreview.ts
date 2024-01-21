//@ts-ignore
import { Mapping, mapper } from "~/mappers";
import lastMessage from "./lastMessage";

const roomPreview: Mapping = {
  lastMessage: {
    processValue: (value) => mapper(value,lastMessage)
  },

};

export default roomPreview;
