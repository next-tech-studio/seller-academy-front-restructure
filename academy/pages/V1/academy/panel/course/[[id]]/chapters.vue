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
              'chapters',
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
              'chapters',
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
          :text="$t('editor.publish')"
          color="button-secondary"
          @click="
            academyStore.saveDraft(
              'chapters',
              false,
              scope.next,
              false,
              false,
              true
            )
          "
        ></v-btn>
      </div>
    </app-stepper>

    <section class="bg-background-light rounded-lg pa-6">
      <app-content-faq
        :bordered="false"
        :bordered-text="bordered"
        class="mb-4"
        parrent-padding="pa-0"
        :has-extra-desc="true"
        hide-title
        icon-postion="start"
        :content="{ faq: academyStore.courseContent.chaptersList }"
        gap="8"
      >
        <template #actions="{ expanded, item, index }">
          <div>
            <v-icon
              :icon="expanded ? 'custom:chevronTop' : 'custom:chevronDown'"
              class="me-2"
              size="small"
            />
            <span class="text-h5">{{ item.title }} </span>
          </div>
          <div>
            <v-btn
              class="text-subtitle-1 font-weight-bold"
              color="secondary-lighten2"
              variant="text"
              @click.stop="editChapter(item)"
              >{{ $t("edit") }}</v-btn
            >
            <v-btn
              class="text-subtitle-1 font-weight-bold"
              color="text-hint-error"
              variant="text"
              @click.stop="deleteChapter(item)"
              >{{ $t("remove") }}</v-btn
            >
            <v-btn
              class="text-subtitle-1 font-weight-bold"
              @click.stop="editCreateLesson(item, index, false)"
              color="secondary-base"
              variant="text"
            >
              <v-icon icon="custom:plus" class="me-2" />
              {{ $t("add_new_content") }}</v-btn
            >
          </div>
        </template>
        <template #text="{ item, index }">
          <div v-if="item.lessons?.length > 0" :style="hasChild(item.lessons)">
            <div class="border-b d-flex py-4 px-6">
              <div class="me-16">
                <v-icon icon="custom:play" size="x-large" />
                <span class="ms-1 text-body-2 text-text-low-emphasis"
                  >{{ item.totalVideoDuration }}دقیقه ویدیو</span
                >
              </div>
              <div class="me-16">
                <v-icon icon="custom:quiz" size="x-large" />
                <span class="ms-1 text-body-2 text-text-low-emphasis"
                  >{{ item.totalQuizQuestionsCount }} آزمون</span
                >
              </div>
              <div class="me-16">
                <v-icon icon="custom:book" size="x-large" />
                <span class="ms-1 text-body-2 text-text-low-emphasis"
                  >{{ item.totalMinutesToRead }} دقیقه مطالعه</span
                >
              </div>
            </div>
            <div
              class="py-4 px-6 d-flex align-center"
              v-for="(lesson, lessonIndex) in item.lessons"
              :key="lessonIndex"
            >
              <v-icon
                :icon="lessonType(lesson.dominantType)"
                size="x-large"
                class="me-3"
              />
              <div
                style="min-width: 350px"
                class="text-body-1 font-weight-bold"
              >
                {{ lesson.title }}
              </div>
              <v-btn
                flat
                icon
                @click="editCreateLesson(item, index, lessonIndex, true)"
              >
                <v-icon icon="custom:pencil" color="secondary-base"></v-icon
              ></v-btn>
              <v-btn
                flat
                icon
                @click="deleteLesson(lesson, lessonIndex, index)"
              >
                <v-icon icon="custom:trash" color="primary-base"></v-icon>
              </v-btn>
            </div>
          </div>
        </template>
      </app-content-faq>
      <app-dialog-form
        :button-title="$t('add_new_chapter')"
        button-color="background-secondary"
        :save-title="$t('save_chapater')"
        :subtitle="$t('new_chapter_hint')"
        :title="$t('add_new_chapter')"
        ref="chapterForm"
        icon="custom:plus"
        :add-new-item="true"
        :store="sharedStore"
        @update:fields="submitNewChapter"
        @show:dialog="sharedStore.initForm(dataForm)"
      >
      </app-dialog-form>
    </section>
  </v-container>
</template>
<script setup>
import { useAcademyStore } from "@core/stores/academy";
import {useSharedPanelStore} from "@core/stores/sharedPanel"
let academyStore = useAcademyStore();
let sharedStore = useSharedPanelStore();
const localePath = useLocalePath();
const { $repos } = useNuxtApp();
let chapterForm = ref(null);
import { storeToRefs } from "pinia";
const route = useRoute();
onMounted(() => {
  academyStore.postRouteId = route.params.id;
  academyStore.getChaptersList();
  academyStore.setStep(4);
});
const lessonType = (type) => {
  let icon;
  switch (type) {
    case "exam":
      icon = "custom:quiz";
      break;
    case "video":
      icon = "custom:play";
      break;
    case "text":
      icon = "custom:book";
      break;
  }
  return icon;
};
let bordered = ref(false);
const hasChild = (lessons) => {
  bordered.value = lessons?.length ? true : false;
};
const editCreateLesson = (item, index, lessonIndex = 0, edit = false) => {
  navigateTo(
    localePath({
      name: "academy-panel-course-id-lessonContent",
      params: { id: academyStore.postRouteId },
      query: {
        chapterIndex: index,
        lessonIndex: edit ? lessonIndex : item?.lessons?.length,
      },
    })
  );
};
let dataForm = ref([
  {
    type: "text-field",
    name: "title",
    modelValue: ref(""),
    validations: "required",
    label: "title",
    size: 12,
    hint: "به زبان فارسی و بدون استفاده از هیچ کاراکتری نوشته شود.",
  },
  {
    type: "text-area",
    name: "description",
    modelValue: ref(""),
    size: 12,
    label: "related_descriptions",
  },
]);
const submitNewChapter = () => {
  let payload;
  let formTitle = sharedStore.editForm.find((item) => item.name === "title");
  let formDescription = sharedStore.editForm.find(
    (item) => item.name === "description"
  );
  if (sharedStore.edit) {
    let itemIndex = academyStore.courseContent.chaptersList.findIndex(
      (item) => item.id === sharedStore.currentItem.id
    );
    payload = {
      body: {
        id: sharedStore.currentItem.id,
        courseId: academyStore.postRouteId,
        title: formTitle.modelValue,
        description: formDescription.modelValue,
      },
    };
    $repos.academyPanel.createChapter(payload).then((res) => {
      Object.assign(academyStore.courseContent.chaptersList[itemIndex], res.data);
      sharedStore.edit = false;
      sharedStore.closeDialog();
    });
  } else {
    payload = {
      body: {
        id: 0,
        courseId: academyStore.postRouteId,
        title: formTitle.modelValue,
        description: formDescription.modelValue,
      },
    };
    $repos.academyPanel.createChapter(payload).then(() => {
      academyStore.getChaptersList();
      sharedStore.closeDialog();
    });
  }
};
const deleteChapter = (item) => {
  let index = academyStore.courseContent.chaptersList.findIndex(
    (element) => element.slug == item.slug
  );
  $repos.academyPanel.deleteChapter(item.slug).then(() => {
    academyStore.courseContent.chaptersList.splice(index, 1);
  });
};
const deleteLesson = (item, lessonIndex, index) => {
  $repos.academyPanel.deleteLesson(item.slug).then(() => {
    academyStore.courseContent.chaptersList[index].lessons.splice(
      lessonIndex,
      1
    );
  });
};
const editChapter = (item, index) => {
  sharedStore.edit = true;
  Object.assign(sharedStore.currentItem, {
    id: item.id,
    title: item.title,
    description: item.description,
  });
  sharedStore.initForm(dataForm.value);
  sharedStore.dialog = true;
};
const { courseContent } = storeToRefs(academyStore);
watch(
  courseContent,
  (newChapter, oldChapter) => {
    nextTick(() => {
      console.log("ieieieiuuuurru", newChapter, oldChapter);
    if(newChapter != oldChapter) academyStore.postSavedState = false;
    });
  },
  { deep: true }
);
// definePageMeta({
//   middleware: ["auth"],
//   layout: false,
// });
</script>
