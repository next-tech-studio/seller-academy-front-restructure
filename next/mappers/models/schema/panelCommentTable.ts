//@ts-ignore
import { Mapping, $moment } from "~/mappers";
const panelCommentTable: Mapping = {
  author: {
    processValue: (value) => {return value.displayName},
  },
  publicationDate: {
    processValue: (value) => process.client ? $moment(value).format('jYYYY/jM/jD HH:mm:ss') : ""
  },
  date:{
    processValue: (value) => process.client ? $moment(value).format('jYYYY/jM/jD HH:mm:ss') : ""
  },
  
};

export default panelCommentTable;