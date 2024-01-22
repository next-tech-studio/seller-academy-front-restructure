<template>
  <v-container fluid class="pa-8">
    <app-stepper v-slot="scope" :store="academyStore"  :type="academyStore.type()">
      <div class="d-flex align-center">
        <v-btn
          variant="text"
          class="me-5"
          :text="$t('editor.save_draft')"
          @click="
            academyStore.validation('faq', false, scope.next, false, false, false,form)
          "
        ></v-btn>
        <v-btn
          icon="custom:eye"
          size="small"
          color="text-high-emphasis"
          class="me-5"
          @click="
            academyStore.validation('faq', false, scope.next, false, true, false,form)
          "
        ></v-btn>
        <v-btn
          :text="$t('editor.previous_step')"
          color="button-secondary"
          @click="
            academyStore.validation('faq', false, scope.next, true, false, false)
          "
          class="me-5"
          variant="outlined"
        ></v-btn>
        <v-btn
          :text="$t('editor.next_step')"
          color="button-secondary"
          @click="
            academyStore.validation('faq', true, scope.next, false, false, false,form)
          "
        ></v-btn>
      </div>
    </app-stepper>
    <v-form
      :model-value="academyStore.content"
      class="d-flex justify-space-between"
      ref="form"
      validate-on="blur"
    >
      <section
        class="bg-background-light rounded-lg pa-6"
        style="width: 49%; height: fit-content"
      >
        <div>
          <p class="text-h3">{{ $t("faq") }}</p>

          <div
            v-for="(item, index) in academyStore.content.faq.content.faq"
            :key="index"
          >
            <v-text-field
              flat
              v-model="academyStore.content.faq.content.faq[index].question"
              base-color="n300"
              class="mb-4"
              density="compact"
              hide-details
              variant="outlined"
              :placeholder="$t('question_title')"
              persistent-placeholder
              persistent-hint
            >
              <template v-slot:append-inner>
                <v-btn icon flat density="compact" @click="remove(index)">
                  <v-icon icon="custom:x" size="small"></v-icon>
                </v-btn>
              </template>
            </v-text-field>
            <v-textarea
              base-color="n300"
              class="mb-4"
              density="compact"
              hide-details
              variant="outlined"
              :placeholder="$t('question_description')"
              persistent-placeholder
              persistent-hint
              flat
              no-resize
              v-model="academyStore.content.faq.content.faq[index].answers"
            ></v-textarea>
          </div>
          <v-btn
            variant="text"
            density="compact"
            @click="academyStore.addNewFaq"
            class="font-weight-bold px-1"
            color="text-secondary"
            >{{ $t("add_new_question") }}</v-btn
          >
        </div>
      </section>
    </v-form>
  </v-container>
</template>

<script setup>
import { useAcademyStore } from "@core/stores/academy";
let academyStore = useAcademyStore();
import { storeToRefs } from "pinia";
const route = useRoute();
let form = ref(null);
const primaryValues = {
  faq: ref({ type: "faq", content: [{ title: "", description: "" }] }),
};
onMounted(() => {
  academyStore.getCourseCreationCommon();
  academyStore.postRouteId = route.params.id;
  academyStore.setStep(3);
  if (route.params.id) academyStore.getDraftInfo();
  Object.assign(academyStore.content, primaryValues);
});
const { content } = storeToRefs(academyStore);
watch(
  content,
  (newDraft) => {
    academyStore.postSavedState = false;
  },
  { deep: true }
);
const remove = (index)=>{

  academyStore.content.faq.content.faq.splice(index,1)
}
// definePageMeta({
//   middleware: ["auth"],
//   layout: false,
// });
</script>
<style lang="scss">
#level-selection {
  .v-selection-control__wrapper {
    display: none;
  }
}
</style>
