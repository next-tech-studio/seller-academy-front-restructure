//@ts-ignore
import { Mapping, mapper, mapperCollection, $moment } from "~/mappers";
import user from "./user";
import chapter from "./chapter";
import room from "./room";
import lesson from "./lesson";
const course: Mapping = {
  totalDurationMinutes: {
    newName: "duration",
    processValue: (value) => {
      if (value) return $moment(value);
    },
  },
  url: {
    setValue: (object) => {
      return {
        name: "academy-courses-slug",
        params: { slug: object.slug },
      };
    },
  },
  comments: {
    processValue: (value) => {
      return value.map((comment: any) => {
        return { ...comment, user: mapper(comment.user, user) };
      });
    },
  },
  chapters: {
    processValue: (value, object) => {
      const chapters = value.map((chapter: any) => {
        return { ...chapter, courseSlug: object.slug };
      });
      return mapperCollection(chapters, chapter);
    },
  },
  sidebar: {
    processValue: (value, object) => {
      value.chapters = value.chapters.map((chapter: any) => {
        return { ...chapter, courseSlug: object.slug };
      });
      let chapters = mapperCollection(value.chapters, chapter).map((x) => {
        x.lessons = x.lessons.map((lesson: any) => {
          return {
            ...lesson,
            courseSlug: object.slug,
            chapterSlug: object.slug,
          };
        });
        return { ...x, lessons: mapperCollection(x.lessons, lesson) };
      });
      return { ...value, chapters };
    },
  },
  instructorCourses: {
    processValue: (value) => mapperCollection(value, course),
  },
  rooms: {
    processValue: (value) => mapperCollection(value, room),
  },
  quizzes: {
    processValue: (value, object) => {
      return mapperCollection(value, lesson)
    },
  },
};

export default course;
