<template>
  <v-row class="pa-6">
    <v-textarea
      v-model="model.description"
      flat
      no-resize
      base-color="n300"
      density="compact"
      variant="outlined"
      persistent-placeholder
      persistent-hint
      hide-details="!item.hint"
      :placeholder="$t('description')"
    ></v-textarea>
  </v-row>
  <div
    class="pa-1"
    v-for="(item, questionIndex) in model.questions"
    :key="questionIndex"
    :class="model.questions.length - 1 > questionIndex ? 'border-b' : ''"
  >
    <v-row class="pa-5">
      <v-col cols="12" class="d-flex justify-space-between">
        <p class="text-h3 mb-1">
          {{ $t("quiz_question", { index: questionIndex + 1 }) }}
        </p>
        <v-btn icon flat @click="removeQuestion(questionIndex)">
          <v-icon icon="custom:x"></v-icon>
        </v-btn>
      </v-col>

      <v-col cols="12">
        <v-text-field
          base-color="n300"
          variant="outlined"
          v-model="item.title"
          :placeholder="$t('yoour_question_title')"
        />
      </v-col>

      <v-col
        v-for="(option, i) in item.choices"
        :key="i"
        :cols="cols(item.choices)"
      >
        <v-text-field
          base-color="n300"
          :placeholder="$t('question_option', { index: i + 1 })"
          variant="outlined"
          hide-details
          v-model="option.text"
        >
          <template v-slot:prepend>
            <v-checkbox-btn
              v-if="answers[questionIndex]"
              true-icon="custom:squareCheck"
              false-icon="custom:square"
              color="text-hint-success"
              variant="compact"
              hide-details
              :model-value="answers[questionIndex][i]"
              @update:modelValue="addToTrueAnswerList(option, questionIndex)"
            >
            </v-checkbox-btn>
          </template>
          <template v-slot:append-inner>
            <v-btn icon flat @click="removeOption(item,i)" density="compact">
              <v-icon icon="custom:x" color="primary-base" size="small"></v-icon>
            </v-btn>
          </template> </v-text-field
      ></v-col>
      <v-col cols="12">
        <v-btn
          variant="text"
          class="font-weight-bold"
          color="secondary-base"
          @click="addNewOption(item)"
          >{{ $t("add_new_option") }}</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>
<script setup>
const props = defineProps({
  index: Number,
  modelValue: Object,
  store: Object,
});
const emit = defineEmits(["update:modelValue"]);
let model = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit("update:modelValue", newValue);
  },
});
watch(
  model,
  (newModel) => {
    setTrueAnswers();
  },
  { deep: true }
);
let answers = ref([]);
onMounted(() => {
  setTrueAnswers();
});
const setTrueAnswers = () => {
  props.modelValue.questions.forEach((question, i) => {
    answers.value[i] = new Array(4).fill(false);
    answers.value[i].forEach((answer, index) => {
      answers.value[i][index] = isChecked(question, index + 1);
    });
  });
};
const isChecked = (item, index) => {
  if (props.store.quizTrueAnswers.find((element) => element[item.id])) {
    return (
      Object.values(
        props.store.quizTrueAnswers.find((element) => element[item.id])
      )[0] == index
    );
  }
};
const addToTrueAnswerList = (item, ind) => {
  let questionId = ind + 1;
  let existedQuestionIndex = props.store.quizTrueAnswers.findIndex(
    (element) => element[questionId]
  );
  props.store.quizTrueAnswers.splice(existedQuestionIndex, 1);
  props.store.quizTrueAnswers.push({
    [questionId]: item.id,
  });
  setTrueAnswers();
};
let cols = (options) => {
  if (options.length < 4) return 12 / options.length;
  else return 3;
};
const removeQuestion = (index) => {
  console.log("hellloooooooo", index);
  model.value.questions.splice(index, 1);
};
const removeOption = (item,i) =>{
  item.choices.splice(i,1)
}
const addNewOption = (item) => {
  if (item.choices?.length <= 3)
    item.choices?.push({ text: "", id: item?.choices.length + 1 });
};
</script>
