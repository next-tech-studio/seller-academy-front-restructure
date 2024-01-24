<template>
  <v-container fluid class="pa-8">
    <app-stepper v-slot="scope" :store="academyStore" :type="academyStore.type()">
      <div class="d-flex align-center">
        <v-btn
          variant="text"
          class="me-5"
          :text="$t('editor.save_draft')"
          @click="
            academyStore.validation('supplementary', false, scope.next, false, false, false,form)
          "
        ></v-btn>
        <v-btn
          icon="custom:eye"
          size="small"
          color="text-high-emphasis"
          class="me-5"
          @click="
            academyStore.validation('supplementary', false, scope.next, false, true, false,form)
          "
        ></v-btn>
        <v-btn
          :text="$t('editor.previous_step')"
          color="button-secondary"
          @click="
            academyStore.validation('supplementary', false, scope.next, true, false, false)
          "
          class="me-5"
          variant="outlined"
        ></v-btn>
        <v-btn
          :text="$t('editor.next_step')"
          color="button-secondary"
          @click="
            academyStore.validation('supplementary', true, scope.next, false, false, false,form)
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
        <div class="mb-8">
          <p class="text-h3">{{ $t("course_coverage_items") }}</p>
          <div class="text-body-2 mb-4">
            {{ $t("course_coverage_items_desc") }}
          </div>
          <v-text-field
            flat
            v-for="(item, index) in academyStore.content.supportItems"
            v-model="academyStore.content.supportItems[index]"
            :key="index"
            base-color="n300"
            :rules="$rules({ title: 'required' }, academyStore.content.supportItems[index])"
            class="mb-4"
            density="compact"
            hide-details
            variant="outlined"
            :placeholder="$t('option_title')"
            persistent-placeholder
            persistent-hint
            :append-inner-icon="index > 1 ? 'custom:trash' : ''"
            @click:appendInner="removeFrom(academyStore.content.supportItems, index)"
          ></v-text-field>
          <v-btn
            variant="text"
            density="compact"
            @click="academyStore.addNewSupportItem"
            class="font-weight-bold px-1"
            color="text-secondary"
            >{{ $t("add_new_item") }}</v-btn
          >
        </div>
        <div>
          <app-multiple-selector
            title="upgradable_skills"
            select-key="id"
            :return-object="false"
            label="choose_upgradable_skills"
            v-model="academyStore.content.skills"
            :items="academyStore.skills"
          />
        </div>
      </section>
      <section
        class="bg-background-light rounded-lg pa-6"
        style="width: 49%; height: fit-content"
      >
        <div>
          <p class="text-h3">{{ $t("course_goals") }}</p>

          <div
            v-for="(item, index) in academyStore.content.learningPoints"
            :key="index"
          >
            <v-text-field
              flat
              v-model="academyStore.content.learningPoints[index].title"
              base-color="n300"
              class="mb-4"
              :rules="$rules({ title: 'required' }, academyStore.content.learningPoints[index].title)"
              density="compact"
              hide-details
              variant="outlined"
              :placeholder="$t('goal_title')"
              persistent-placeholder
              persistent-hint
              :append-inner-icon="index > 0 ? 'custom:trash' : ''"
            @click:appendInner="removeFrom(academyStore.content.learningPoints, index)"
            ></v-text-field>
            <v-textarea
              base-color="n300"
              class="mb-4"
              :rules="$rules({ title: 'required' }, academyStore.content.learningPoints[index].description)"
              density="compact"
              hide-details
              variant="outlined"
              :placeholder="$t('goal_description')"
              persistent-placeholder
              persistent-hint
              flat
              no-resize
              v-model="academyStore.content.learningPoints[index].description"
            ></v-textarea>
          </div>
          <v-btn
            variant="text"
            density="compact"
            @click="academyStore.addNewLearningPoint"
            class="font-weight-bold px-1"
            color="text-secondary"
            >{{ $t("add_new_goal") }}</v-btn
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
const UPLOAD_ARTICLE_PATH = "/panel/articles/upload_cover";
const primaryValues = {
  learningPoints: ref([{ title: "", description: "" }]),
  supportItems: ref(["", ""]),
};
onMounted(() => {
  academyStore.getCourseCreationCommon();
  academyStore.postRouteId = route.params.id;
  academyStore.setStep(2);
  if (route.params.id) academyStore.getDraftInfo();
  Object.assign(academyStore.content, primaryValues);
});
const { content } = storeToRefs(academyStore);
const removeFrom = (items, index) => {
  items.splice(index, 1)
}
watch(
  content,
  (newDraft) => {
    academyStore.postSavedState = false;
  },
  { deep: true }
);
// definePageMeta({
//   middleware: ["auth"],
//   layout: false,
// });
</script>
