<template>
  <div
    v-if="
      content.userQuizStatus == 'not_started' ||
      content.userQuizStatus == 'started'
    "
  >
    <div class="text-body-2 text-high-emphasis mb-6">
      {{ content.description }}
    </div>
    <div class="d-flex justify-end" v-if="content.userQuizStatus != 'started'">
      <v-btn
        color="primary-base"
        variant="outlined"
        class="ml-6"
        @click="$emit('previous')"
        >{{ $t("previous") }}</v-btn
      >
      <v-btn color="primary-base" variant="flat" @click="$emit('start:quiz')">{{
        $t("start_quiz")
      }}</v-btn>
    </div>
    <template v-if="content.userQuizStatus == 'started'">
      <div v-for="question in content.questions" :key="question.title">
        <div class="text-h5 text-text-high-emphasis mb-2">
          {{ question.title }}
        </div>
        <v-radio-group>
          <v-radio
            v-for="(choice, index) in question.choices"
            :key="choice.text"
            :label="choice.text"
            :value="index + 1"
            @click="setAnswers(question.id, index + 1)"
            false-icon="custom:circle"
            true-icon="custom:circleThick"
            class="text-body-2 text-text-high-emphasis mb-2"
          ></v-radio>
        </v-radio-group>
      </div>
    </template>
  </div>
  <div class="text-center" v-else>
    <div class="mb-2 text-body-1 text-text-heading font-weight-bold">
      {{
        $t(
          content.userQuizStatus == "fail"
            ? "finished_failed_text"
            : "finished_success_text"
        )
      }}
    </div>
    <div class="text-text-high-emphasis text-body-2 mb-6">
      {{
        $t(
          content.userQuizStatus == "fail"
            ? "finished_failed_description"
            : "finished_success_description"
        )
      }}
    </div>
    <div
      class="d-flex flex-column justify-content-center align-center"
      style="width: 50%; margin: auto"
    >
      <span
        :class="{
          'text-icon-hint-error': content.userQuizStatus == 'fail',
        }"
        class="text-center mb-4 text-text-secondary text-body-1 font-weight-bold"
        >{{ $t("your_score_from_100") + " " + content.score }}</span
      >
      <v-progress-linear
        :model-value="content.score"
        :color="
          content.userQuizStatus == 'fail'
            ? 'icon-hint-error'
            : 'icon-secondary'
        "
        bg-color="bg-background-dark"
        rounded
        height="8"
      ></v-progress-linear>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  content: Object,
  modelValue: Object,
});
const emit = defineEmits(["update:modelValue"]);
const setAnswers = (id, choice) => {
  trueAnswersModel.value.push({ [id]: choice });
};
let trueAnswersModel = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit("update:modelValue", newValue);
  },
});
</script>
