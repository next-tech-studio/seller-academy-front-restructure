<template>
  <v-container fluid class="pa-8">
    <app-stepper
      v-slot="scope"
      :store="academyStore"
      :type="academyStore.type()"
    >
      <div class="d-flex align-center">
        <v-btn
          icon="custom:eye"
          size="small"
          color="text-high-emphasis"
          class="me-5"
          @click="
            academyStore.validation(
              'content',
              false,
              scope.next,
              false,
              true,
              false
            )
          "
        ></v-btn>
        <v-btn
          :text="$t('editor.previous_step')"
          color="button-secondary"
          @click="
            academyStore.validation(
              'content',
              false,
              scope.next,
              true,
              false,
              false
            )
          "
          class="me-5"
          variant="outlined"
        ></v-btn>
        <v-btn
          :text="$t('save_changes')"
          color="button-secondary"
          @click="
            academyStore.saveLesson(
              scope.next,
              route.query.chapterIndex,
              route.query.lessonIndex
            )
          "
        ></v-btn>
      </div>
    </app-stepper>
  </v-container>
  <v-container>
    <div v-if="lesson">
      <v-text-field
        placeholder="عنوان"
        bg-color="background-light"
        variant="solo-folled"
        v-model="lesson.title"
      ></v-text-field>
    </div>
    <draggable v-model="contentModel">
      <template #item="{ element: section, index }">
        <section
          class="rounded-lg mb-4 position-relative overflow"
          :class="getClassName(section)"
          @click="setFocus(section, true)"
        >
          <div class="d-flex flex-column edit-position" v-if="section.focused">
            <v-btn
              icon
              variant="outlined"
              @click.stop="onDeleteComponent(index)"
              color="secondary-base"
              size="40"
            >
              <v-icon icon="custom:trash" color="secondary-base" size="24"
            /></v-btn>
          </div>
          <v-icon icon="custom:draggable" size="18" class="drag-position" />
          <component
            :is="section.component || getComponent(section.type)"
            v-model="section.content"
            v-bind="getProps(section.type, index)"
          >
          </component>
        </section>
      </template>
    </draggable>
    <section
      class="bg-background-light rounded-lg pa-6 mb-4"
      v-if="addNewSection && !singleContentType"
    >
      <app-panel-new-section @update:newsection="onNewSection" />
    </section>
    <section class="bg-background-light rounded-lg pa-6 mb-4" v-if="newSection">
      <app-panel-content-type
        @add:content="openSelectedContentSection"
        :options="contentBasedOptions"
      />
    </section>
    <v-btn
      v-if="contentModel?.some((element) => element.type === 'exam')"
      prepend-icon="custom:plus"
      class="font-weight-bold mt-4"
      flat
      @click="addNewQuestion"
      color="secondary-base"
    >
      {{ $t("add_new_question") }}
    </v-btn>
  </v-container>
</template>

<script setup>
import { useAcademyStore } from "@core/stores/academy";
import TextEditor from "~/components/app/panel/TextEditor.vue";
import Divider from "~/components/app/panel/Divider.vue";
import BlogContentUploader from "~/components/app/panel/BlogContentUploader.vue";
import Banner from "~/components/app/panel/Banner.vue";
import Exam from "~/components/app/panel/Exam.vue";
import Reference from "~/components/app/panel/Reference.vue";
import VideoUploader from "~/components/app/panel/VideoUploader.vue"
import Media from "~/components/app/panel/Media.vue";
import draggable from "vuedraggable";
let academyStore = useAcademyStore();
import { storeToRefs } from "pinia";
const UPLOAD_ARTICLE_PATH = "/panel/articles/inline_media";
const route = useRoute();
let addNewSection = ref(true);
let lesson = computed(
  () =>
    academyStore.courseContent.chaptersList[route.query.chapterIndex]?.lessons[
      route.query.lessonIndex
    ]
);
let contentModel = computed(
  () =>
    academyStore.courseContent.chaptersList[route.query.chapterIndex]?.lessons[
      route.query.lessonIndex
    ]?.content
);
const addNewQuestion = () => {
  contentModel.value[0].content.questions.push({
    title: "",
    choices: [],
    id: contentModel.value[0].content.questions.length + 1,
  });
};
let singleContentType = computed(() => {
  if (
    lesson.value?.dominantType == "video" ||
    lesson.value?.dominantType == "exam"
  )
    return true;
  else return false;
});
const onNewSection = () => {
  newSection.value = true;
  addNewSection.value = !addNewSection.value;
};
let pictureAlignment = [
  { icon: "custom:alignWhole", title: "هیچ کدام" },
  { icon: "custom:alignRightCard", title: "راست چین" },
  { icon: "custom:alignLeftCard", title: "چپ چین" },
  { icon: "custom:justifyCard", title: "وسط چین" },
  { icon: "custom:alignWhole", title: "تمام صفحه" },
];
let uploaderProps = ref({
  "area-size": { width: "100%", height: "327px" },
  "upload-path": UPLOAD_ARTICLE_PATH,
  "blog-content": true,
});
let audioProps = ref({
  type: "audio",
});
let newSection = ref(false);
let onDeleteComponent = (index) => {
  academyStore.courseContent.chaptersList[route.query.chapterIndex].lessons[
    route.query.lessonIndex
  ].content?.splice(index, 1);
  newSection.value = true;
};
let contentBasedOptions = computed(() => {
  if (lesson.value.dominantType == "text")
    return ["img", "html", "reference", "divider"];
  else {
    return ["img", "html", "reference", "exam", "vid", "divider"];
  }
});
const openSelectedContentSection = (type) => {
  addNewSection.value = true;
  newSection.value = false;
  switch (type) {
    case "img":
      contentModel.value.push({
        type: "img",
        component: BlogContentUploader,
        content: {},
      });
      lesson.value.dominantType = "text";
      contentBasedOptions.value = ["img", "html", "reference", "divider"];
      break;
    case "vid":
      contentModel.value.push({
        type: "vid",
        component: VideoUploader,
        content: {},
      });
      lesson.value.dominantType = "video";
      contentBasedOptions.value = ["video"];
      singleContentType.value = true;
      newSection.value = false;

      break;
    case "audio":
      contentModel.value.push({
        type: "audio",
        component: Media,
        content: {},
      });
      break;
    case "html":
      contentModel.value.push({
        type: "html",
        component: TextEditor,
        content: {},
      });
      lesson.value.dominantType = "text";
      contentBasedOptions.value = ["img", "html", "reference", "divider"];
      break;
    case "banner":
      contentModel.value.push({
        type: "banner",
        component: Banner,
        content: {},
      });
      lesson.value.dominantType = "text";
      break;
    case "divider":
      contentModel.value.push({
        type: "divider",
        component: Divider,
        content: {
          html: "<br>",
        },
      });
      lesson.value.dominantType = "text";
      contentBasedOptions.value = ["img", "html", "reference", "divider"];
      break;

    case "exam":
      contentModel.value.push({
        type: "exam",
        component: Exam,
        content: {
          questions: [{ title: "", choices: [], id: 1 }],
          description: "",
        },
      });
      lesson.value.dominantType = "exam";
      singleContentType.value = true;
      contentBasedOptions.value = ["exam"];
      newSection.value = false;

      break;

    case "reference":
      contentModel.value.push({
        type: "reference",
        component: Reference,
        content: [],
        references: [],
      });
      lesson.value.dominantType = "text";
      contentBasedOptions.value = ["img", "html", "reference", "divider"];

      break;
    case "column":
      break;
  }
};
const setFocus = (section, focused) => {
  section.focused = focused ? true : false;
};

let getComponent = (type) => {
  switch (type) {
    case "img":
      return BlogContentUploader;
    case "vid":
      return VideoUploader;
    case "audio":
      return Media;
    case "html":
      return TextEditor;
    case "banner":
      return Banner;
    case "reference":
      return Reference;
    case "exam":
      return Exam;
    case "divider":
      return Divider;
    case "column":
      break;
  }
};
let getProps = (type, index) => {
  let props;
  if (type == "audio") props = audioProps.value;
  else if (type === "img") {
    props = uploaderProps.value;
  } else if (type === "exam") {
    props = { index, store: academyStore };
  } else if (type === "reference") {
    props = {
      store: academyStore,
      references: contentModel.value[index]?.references,
    };
  }
  return props;
};
const getClassName = (section) => {
  let classes = "bg-background-light";
  if (section.focused == true) {
    classes = classes.concat(" border-sm border-secondary");
    return classes;
  } else {
    return classes;
  }
};
const { courseContent } = storeToRefs(academyStore);
watch(
  courseContent,
  () => {
    academyStore.postSavedState = false;
  },
  { deep: true }
);
// definePageMeta({
//   middleware: ["auth"],
//   layout: false,
// });
onMounted(() => {
  academyStore.postRouteId = route.params.id;
  academyStore.getChaptersList(
    route.query.chapterIndex,
    route.query.lessonIndex
  );
  academyStore.setStep(5);
});
</script>

<style lang="scss" scoped>
.edit-position {
  position: absolute;
  right: -48px;
}

.drag-position {
  position: absolute;
  right: -36px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}
.v-list-item__prepend > .v-icon {
  margin-inline-end: 16px !important;
}
.v-list-item__prepend > .v-icon {
  opacity: 1;
}
.border-secondary {
  border-color: rgba(var(--v-theme-secondary-base)) !important;
}
.divider-height {
  height: 20px;
}
</style>
