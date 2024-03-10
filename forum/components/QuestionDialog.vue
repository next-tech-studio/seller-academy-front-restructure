<template>
  <v-dialog
    v-model="questionDialog"
    width="640px"
    id="question-dialog"
    :fullscreen="smAndDown"
  >
    <v-card class="pa-4">
      <v-card-text class="d-flex justify-space-between align-center pa-0">
        <span class="text-body-1 font-weight-bold">
          {{ $t("add_question") }}
        </span>
        <v-btn flat icon="custom:x" size="small" @click="close" />
      </v-card-text>
      <v-form
        class="h-100 d-flex flex-column"
        ref="form"
        v-model="isFormValid"
        @submit.prevent
      >
        <div class="flex-grow-1">
          <v-textarea
            flat
            rows="5"
            density="compact"
            class="outside-label mb-6"
            base-color="n300"
            variant="solo-filled"
            :rules="$rules({ questionBody: 'required' }, questionContent.text)"
            persistent-placeholder
            hide-details
            :placeholder="$t('your_question')"
            v-model="questionContent.text"
            no-resize
            required
          >
          </v-textarea>
          <v-card-text class="px-0" v-if="similarQuestions.length > 0">
            <SimilarQuestions
              :items="similarQuestions"
              @to:item="$emit('to:item', $event)"
            >
            </SimilarQuestions>
          </v-card-text>
          <v-select
            :placeholder="$t('choose_category')"
            density="compact"
            persistent-placeholder
            class="my-4"
            base-color="n300"
            persistent-hint
            v-model="questionContent.categorySlug"
            :rules="
              $rules({ category: 'required' }, questionContent.categorySlug)
            "
            :hint="$t('choose_category_hint')"
            :items="categories"
            item-value="slug"
            flat
            variant="solo-filled"
          >
            <template v-slot:append-inner>
              <v-icon icon="custom:caretDownSolid" size="12" />
            </template>
          </v-select>
          <div class="d-flex align-center">
            <span class="text-body-1 font-weight-bold me-2">{{
              $t("add_picture")
            }}</span>
            <app-uploader
              :upload-path="UPLOAD_QUESTION_PATH"
              v-model="attachments"
              v-model:max="maxImage"
              :has-start-button="false"
            ></app-uploader>
          </div>
        </div>
        <v-card-actions class="pa-0 flex-column flex-md-row">
          <v-checkbox
            color="red"
            required
            true-icon="custom:squareCheck"
            false-icon="custom:square"
            :rules="
              $rules({ acceptRules: 'checked' }, questionContent.acceptedRules)
            "
            hide-details
            class="d-flex align-start"
            v-model="questionContent.acceptedRules"
          >
            <template v-slot:label>
              <div class="text-text-low-emphasis w-content nowrap-lg">
                با
                <v-btn flat class="text-text-secondary text-button ma-0 pa-0">{{
                  $t("rules_and_conditions")
                }}</v-btn>
                انتشار پرسش در مرکز فروشندگان دیجی‌کالا موافقم.
              </div>
            </template>
          </v-checkbox>
          <v-spacer></v-spacer>
          <v-btn
            variant="flat"
            type="submit"
            @click="submit"
            :disabled="!isFormValid"
            :color="isFormValid ? 'button-primary' : 'button-disabled'"
            class="text-text-light text-button ms-2"
            :class="{
              'text-text-light': isFormValid,
              'text-button-content-on-disabled': !isFormValid,
              'align-self-end': smAndDown,
            }"
          >
            {{ $t("submit_question") }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { useDisplay } from "vuetify";

const UPLOAD_QUESTION_PATH = "/community/questions/attachment";
const { smAndDown } = useDisplay();
const emit = defineEmits([
  "update:dialog",
  "update:modelValue",
  "submit",
  "search",
]);
let props = defineProps({
  dialog: { type: Boolean, default: false },
  modelValue: String,
  categories: Array,
  similarQuestions: Array,
});
let maxImage = ref(3);
let form = ref(null);
let attachments = ref([]);
let isFormValid = ref(false);
let questionContent = ref({
  text: "",
  acceptedRules: false,
  attachments: [],
});
let questionDialog = computed({
  get() {
    return props.dialog;
  },
  set(value) {
    emit("update:dialog", value);
  },
});
watch(
  questionContent,
  () => {
    emit("search", questionContent.value.text);
  },
  { deep: true }
);
const validate = async () => {
  const { valid } = await form.value.validate();
  return valid;
};
const emptyDialog = () => {
  Object.assign(questionContent.value, {
    text: "",
    categorySlug: null,
    acceptedRules: false,
    attachments: [],
  });
  attachments.value = [];
  maxImage.value = 3;
};
const close = () => {
  questionDialog.value = false;
  emptyDialog();
};

const submit = async () => {
  const validated = validate();
  if (validated) {
    attachments.value.map((item) => {
      questionContent.value.attachments.push(item?.id);
    });
    emit("submit", questionContent.value);
    Object.assign(questionContent.value, {
      text: "",
      categorySlug: null,
      acceptedRules: false,
      attachments: [],
    });
    attachments.value = [];
    questionDialog.value = false;
  }
};
onMounted(() => {
  emptyDialog();
});
onUpdated(() => {
  emptyDialog();
});
</script>

<style lang="scss">
#question-dialog {
  .v-text-field .v-input__details {
    padding-inline-start: 0 !important;
    padding-inline-end: 0 !important;
  }
}
</style>
