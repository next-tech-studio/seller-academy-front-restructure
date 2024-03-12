//@ts-ignore
import { Mapping, mapper } from "~/mappers";
import addressInfo from "../schema/addressInfo";
import personalInfo from "../schema/personalInfo";

const userDashboard: Mapping = {
    addressInfo: {
        processValue: (object) => mapper(object, addressInfo)
    },
    personalInfo: {
        processValue: (object) => mapper(object, personalInfo)
    },
};

export default userDashboard