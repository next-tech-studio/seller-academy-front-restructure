//@ts-ignore
import { Mapping, mapperCollection } from "~/mappers";
import course from "../schema/course";
import room from "../schema/room";

const academyHomepage: Mapping = {
  categories: {
    processValue: (value) =>
      value.map((v: any) => {
        return { ...v, courses: mapperCollection(v.courses, course) };
      }),
  },
  recentlyVisitedCourses: {
    processValue: (value) => mapperCollection(value, course),
  },
  topCourses: {
    processValue: (value) => mapperCollection(value, course),
  },
  userCourses: {
    processValue: (value) => {
      const courses = {};
      for (const property in value) {
        courses[property] = mapperCollection(value[property], course);
      }
      return courses
    },
  },
  chatRooms: {
    processValue: (value) => mapperCollection(value, room)
},
};

export default academyHomepage;
