<template>
  <div>
    <not-logged-in-text-field v-if="!authStore.user.loggedIn" />

    <v-card v-show="authStore.user.loggedIn && !confirmed" id="question-form">
      <v-card-title
        class="text-body-1 text-text-low-emphasis"
        v-if="!showQuestionFooter && hasPreview"
        @click="showFullCard()"
      >
        <div class="d-flex justify-space-between">
          <div>
            <v-avatar class="me-1">
              <v-img :src="authStore.user.avatarUrl" />
            </v-avatar>
            {{ $t(placeholder) }}
          </div>
          <v-btn
            color="button-disabled"
            variant="flat"
            class="text-button-content-on-disabled text-button"
          >
            {{ $t(btnText) }}
          </v-btn>
        </div>
      </v-card-title>
      <v-form ref="form" v-model="isFormValid" @submit.prevent>
        <v-expand-transition>
          <v-textarea
            flat
            :label="$t(placeholder)"
            rows="6"
            density="compact"
            class="outside-label"
            base-color="n300"
            variant="solo-filled"
            persistent-placeholder
            hide-details=""
            :rules="$rules({ answer: 'required' }, questionContent.text)"
            v-model="questionContent.text"
            no-resize
            v-show="showQuestionFooter"
            required
          >
          </v-textarea>
        </v-expand-transition>
        <v-card-item v-show="showQuestionFooter" class="px-0">
          <v-divider v-if="!justText"></v-divider>
          <v-card-title
            v-if="!justText"
            class="d-flex justify-space-between w-100 py-md-1"
            ref="cardTitle"
          >
            <span class="text-body-1 font-weight-bold align-center d-flex">{{
              $t("choose_category")
            }}</span>
            <div class="d-flex align-center">
              <span
                class="text-body-1 font-weight-bold mx-md-4 d-none d-md-block"
                >{{ questionContent.categorySlug }}</span
              >
              <app-category
                v-model="questionContent.categorySlug"
                menu-origin="overlap"
                :butto-style="{
                  color: 'rgba(var(--v-theme-text-secondary))',
                }"
                :full-width="true"
                :offset="430"
                :card-width="cardWidth"
                :categories="categories"
              ></app-category>
            </div>
          </v-card-title>
          <v-divider v-if="!justText"></v-divider>
          <v-card-actions class="pa-0 flex-column flex-md-row">
            <v-checkbox
              color="red"
              required
              true-icon="custom:squareCheck"
              false-icon="custom:square"
              hide-details
              class="d-flex align-start"
              v-model="questionContent.acceptedRules"
              v-if="needAcception"
            >
              <template v-slot:label>
                <div class="text-text-low-emphasis w-content nowrap-lg">
                  با
                  <v-btn
                    flat
                    class="text-text-secondaryvtext-button ma-0 pa-0"
                    >{{ $t("rules_and_conditions") }}</v-btn
                  >
                  انتشار پرسش در مرکز فروشندگان دیجی‌کالا موافقم.
                </div>
              </template>
            </v-checkbox>
            <v-spacer></v-spacer>
            <div class="d-flex align-md-center w-100 justify-end">
              <app-uploader
                ref="uploader"
                :upload-path="UPLOAD_QUESTION_PATH"
                v-model="attachments"
                v-model:max="maxImage"
                :size="35"
              ></app-uploader>
              <v-spacer></v-spacer>
              <v-btn
                variant="flat"
                type="submit"
                @click="submit"
                :loading="loading"
                :disabled="!isFormValid"
                :color="isFormValid ? 'button-primary' : 'button-disabled'"
                :class="
                  isFormValid
                    ? 'text-text-light'
                    : 'text-button-content-on-disabled'
                "
                class="text-text-light text-button ms-2"
              >
                {{ $t("set_answer") }}
              </v-btn>
            </div>
          </v-card-actions>
        </v-card-item>
      </v-form>
    </v-card>
  </div>
</template>
<script setup>
import { useAuthStore } from "@core/stores/auth";
const emit = defineEmits(["submit"]);
const props = defineProps({
  placeholder: {
    type: String,
    default: "your_question",
  },
  btnText: {
    type: String,
    default: "ask_question",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  categories: {
    type: Array,
  },
  justText: {
    type: Boolean,
    default: false,
  },
  needAcception: {
    type: Boolean,
    default: true,
  },
  confirmed: {
    type: Boolean,
  },
  hasPreview: {
    type: Boolean,
    default: true,
  },
});
let isFormValid = ref(false);
let questionContent = ref({
  text: "",
  categorySlug: "",
  acceptedRules: false,
  attachments: [],
});
let attachments = ref([]);

const UPLOAD_QUESTION_PATH = "/community/questions/attachment";
let rowNumbers = ref(1);
let maxImage = ref(3);
let showQuestionButtonInNarrowStyle = ref(true);
let showQuestionFooter = ref(false);
const form = ref(null);
const authStore = useAuthStore();
const showFullCard = () => {
  rowNumbers.value = 6;
  showQuestionButtonInNarrowStyle.value = false;
  showQuestionFooter.value = true;
};
defineExpose({ showFullCard });
let cardWidth = ref(null);
const validate = async () => {
  const { valid } = await form.value.validate();
  return valid;
};
const submit = async () => {
  console.log('anssweerrrr')
  const validated = validate();
  if (validated) {
    attachments.value.map((item) => {
      questionContent.value.attachments.push(item?.id);
    });
    emit("submit", questionContent.value);
    Object.assign(questionContent.value, {
      text: "",
      categorySlug: "",
      acceptedRules: false,
      attachments: [],
    });
    attachments.value = []
  }
};
onMounted(() => {
  if (!props.needAcception) questionContent.acceptedRules = true;
  cardWidth = document.getElementById("question-form").offsetWidth;
});
</script>

<style lang="scss">
#question-form {
  .v-overlay--contained {
    overflow: visible !important;
  }
  .v-checkbox-btn {
    @include respond("xxl") {
      align-items: center;
    }
    @include respond("md") {
      align-items: flex-start;
    }
  }
  .v-selection-control__wrapper {
    height: 40px;
  }
  .nowrap-lg {
    @include respond("xxl") {
      white-space: nowrap;
    }
    @include respond("md") {
      white-space: pre-wrap;
    }
  }
}
</style>
