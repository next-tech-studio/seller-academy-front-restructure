<template>
  <app-dialog-page-container>
    <course-lesson
      :lesson="lesson"
      :class="{ 'mx-4 mb-4': !lgAndUp }"
      class="overflow-y-auto"
    >
      <template v-for="(item, index) in lesson.content" :key="index">
        <app-content
          :type="item.type"
          :content="item.content"
          :started="started"
          v-model="trueAnswers"
          @start:quiz="startQuiz"
          @previous="onNavigate('previous')"
        ></app-content>
      </template>

      <template #actions>
        <v-card-text
          class="actions"
          :class="{
            'align-self-end': item.content?.userQuizStatus != 'started',
          }"
        >
          <v-btn
            v-if="
              lesson?.dominantType == 'exam' &&
              lesson?.userQuizStatus == 'started'
            "
            variant="flat"
            :color="
              lesson?.dominantType == 'exam'
                ? 'button-secondary'
                : 'primary-base'
            "
            @click="setAnswer"
          >
            {{ $t("set_answer") }}
          </v-btn>
          <template
            v-else-if="
              lesson?.dominantType == 'exam' && lesson?.userQuizStatus == 'fail'
            "
          >
            <v-btn
              variant="outlined"
              color="primary-base"
              class="ml-6"
              @click="startQuiz"
              :disabled="!item.examAllowed"
            >
              {{
                $t(item.examAllowed ? "quiz_again" : "quiz_again_after_an_hour")
              }}
            </v-btn>
            <v-btn
              variant="flat"
              color="primary-base"
              @click="onNavigate('previous')"
              :disabled="!item.previous"
            >
              {{ $t("study_previous_cotent") }}
            </v-btn>
          </template>
          <template
            v-else-if="
              lesson?.dominantType != 'exam' && !lesson?.currentUserStatus
            "
          >
            <v-btn
              class="ml-4"
              variant="outlined"
              color="primary-base"
              @click="onNavigate('previous')"
              :disabled="!item.previous"
            >
              {{ $t("previous") }}
            </v-btn>
            <v-btn
              variant="flat"
              color="primary-base"
              @click="onNavigate('next')"
              :disabled="!item.next"
            >
              {{ $t("next") }}
            </v-btn>
          </template>
        </v-card-text>
      </template>
    </course-lesson>
  </app-dialog-page-container>
</template>

<script setup>
import { useDisplay } from "vuetify";

const { lgAndUp } = useDisplay();
const props = defineProps({
  item: Object,
});
definePageMeta({
  middleware: ["auth"],
});
let emit = defineEmits(["update:sidebar"]);
const { $repos } = useNuxtApp();
const lesson = reactive({});
const route = useRoute();
const trueAnswers = reactive([]);
const localePath = useLocalePath();
let exam = ref(null);

useAsyncData(() => {
  $repos.academy
    .getLesson({
      slug: route.params.lessonSlug,
    })
    .then((res) => {
      Object.assign(lesson, { ...res });
      let references = lesson.content.filter(
        (item) => item.type == "reference"
      );
      if (references) {
        for (let reference of references) {
          $repos.other.groupSearch({ ids: reference.content }).then((res) => {
            reference.content.splice(0, reference.content.length);
            Object.assign(reference.content, res);
            console.log(reference.content);
          });
        }
      }
      emit("update:sidebar", lesson);
    });
});

watch(
  lesson,
  () => {
    if (lesson?.content?.length) {
      lesson.content.forEach((item, index) => {
        if (item.type == "exam") {
          lesson.content[index] = {
            ...item,
            content: {
              ...item.content,
              currentUserStatus: lesson.currentUserStatus,
              userQuizStatus: lesson.userQuizStatus,
              score: lesson.score,
            },
          };
        }
      });
    }
  },
  { immediate: true }
);
const startQuiz = () => {
  lesson.userQuizStatus = "started";
  // lesson.content[0].content.userQuizStatus = "started";
};
const setAnswer = () => {
  $repos.academy
    .participateInQuiz({
      quizId: lesson.id,
      body: {
        trueAnswers,
        version: 0,
      },
    })
    .then((res) => {
      lesson.content[0].content.userQuizStatus = res.status;
      lesson.content[0].content.score = res.score;
      if (res.status == "fail") props.item.examAllowed = false;
    });
};
const onNavigate = (dir) => {
  navigateTo(
    localePath({
      name: "academy-courses-slug-chapterSlug-lessonSlug",
      params: {
        slug: props?.item?.course?.slug,
        chapterSlug: props?.item?.chapter?.slug,
        lessonSlug: props?.item[dir]?.slug,
      },
    })
  );
};
</script>

<style scoped>
.actions {
  display: block;
}

.actions:not(.actions:has(.v-btn)) {
  display: none;
}
</style>