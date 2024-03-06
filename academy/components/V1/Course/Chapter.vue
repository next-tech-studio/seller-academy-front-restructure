<template>
  <v-card class="pa-2" id="chapter">
    <v-card-text>
      <div class="text-h5 text-text-heading">{{ chapter.title }}</div>
      <div class="d-flex">
        <div>
          <v-icon size="20" icon="custom:play"></v-icon>
          <span class="pr-1 pl-5 text-text-low-emphasis text-body-2">
            {{ chapter.totalVideoDuration + " " + $t("minutes") }}
          </span>
        </div>
        <div>
          <v-icon size="20" icon="custom:file"></v-icon>
          <span class="pr-1 pl-5 text-text-low-emphasis text-body-2">
            {{ chapter.totalQuizQuestionsCount + " " + $t("questions") }}
          </span>
        </div>
        <div>
          <v-icon size="20" icon="custom:book"></v-icon>
          <span class="pr-1 pl-5 text-text-low-emphasis text-body-2">
            {{ chapter.totalMinutesToRead + " " + $t("minutes") }}
          </span>
        </div>
      </div>
      <v-divider class="my-6"></v-divider>
      <div class="text-body-2 text-text-low-emphasis">
        {{ chapter.description }}
      </div>
      <!-- <slot /> -->
      <v-card class="mt-6" variant="outlined" color="n200">
        <v-card-text>
          <div class="text-text-high-emphasis text-subtitle-1 font-weight-bold">
            {{ $t("headlines") }}
          </div>
          <v-list>
            <v-list-item
              v-for="(lesson, index) in chapter.lessons"
              :key="index"
            >
              <template #prepend>
                <v-icon
                  :color="completion(lesson)"
                  size="x-large"
                  icon="custom:circleCheckSolid"
                ></v-icon>
              </template>
              <div class="text-body-1 text-text-heading">
                {{ lesson.title }}
              </div>
              <div class="text-body-2 text-text-low-emphasis">
                {{ $t(`${lesson.dominantType}_colon_duration`) }}
                {{
                  lesson.textDuration
                    ? lesson.textDuration + " " + $t("minutes")
                    : lesson.videoDuration
                    ? lesson.videoDuration + " " + $t("minutes")
                    : lesson.examDuration
                    ? lesson.examDuration
                    : ""
                }}
              </div>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script setup>
defineProps({
  chapter: Object,
});
const completion = (lesson) => {
  let color = "red";
  let compeleted = lesson.isCompleted;
  switch (true) {
    case compeleted == 1:
      color = "icon-hint-success";
      break;
    case compeleted < 1 && compeleted > 0:
      color = "icon-hint-caution";
      break;
    case compeleted == 0:
      color = "icon-disabled";
      break;
  }

  return color;
};
</script>

<style>
#chapter .v-list-item__prepend > .v-icon,
.v-list-item__append > .v-icon {
  opacity: 1;
}
#chapter .v-list-item__spacer {
  width: 8px;
}
</style>
