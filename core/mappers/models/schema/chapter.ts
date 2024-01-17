//@ts-ignore
import { Mapping, mapper, mapperCollection, $moment } from "~/mappers";
import lesson from "./lesson";
const chapter: Mapping = {
  sidebar: {
    processValue: (value, object) => {
      value.chapters = value.chapters.map((chapter: any) => {
        return { ...chapter, courseSlug: object.course.slug };
      });
      let chapters = mapperCollection(value.chapters, chapter).map((x) => {
        x.lessons = x.lessons.map((lesson: any) => {
          return {
            ...lesson,
            courseSlug: object?.course?.slug,
            chapterSlug: object.slug,
          };
        });
        return { ...x, lessons: mapperCollection(x.lessons, lesson) };
      });
      return { ...value, chapters };
    },
  },
  url: {
    setValue: (object) => {
      return {
        name: "academy-courses-slug-chapterSlug",
        params: { slug: object.courseSlug || object?.course?.slug, chapterSlug: object?.slug },
      };
    },
  },
};

export default chapter;
