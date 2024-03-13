<template>
  <v-container fluid  class="px-0 py-8">
    <app-stepper v-slot="scope" :store="sharedStore" type="product">
      <div class="d-flex align-center">
        <v-btn
          variant="text"
          class="me-5"
          :text="$t('editor.save_draft')"
          @click="
            productStore.validation('faq', false, scope.next, false, false, false)
          "
        ></v-btn>
        <v-btn
          icon="custom:eye"
          size="small"
          color="text-high-emphasis"
          class="me-5"
          @click="
            productStore.validation('faq', false, scope.next, false, true, false)
          "
        ></v-btn>
        <v-btn
          :text="$t('editor.previous_step')"
          color="button-secondary"
          @click="
            productStore.validation('faq', false, scope.next, true, false, false)
          "
          class="me-5"
          variant="outlined"
        ></v-btn>
        <v-btn
          :text="$t('editor.next_step')"
          color="button-secondary"
          @click="
            productStore.validation('faq', true, scope.next, false, false, false)
          "
        ></v-btn>
      </div>
    </app-stepper>
    <v-form
      :model-value="productStore.content"
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
            v-for="(item, index) in productStore.content.supportItems"
            v-model="productStore.content.supportItems[index]"
            :key="index"
            base-color="n300"
            class="mb-4"
            density="compact"
            hide-details
            variant="outlined"
            :placeholder="$t('course_title')"
            persistent-placeholder
            persistent-hint
          ></v-text-field>
          <v-btn
            variant="text"
            density="compact"
            prepend-icon="custom:plus"
            @click="productStore.addNewSupportItem"
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
            v-model="productStore.content.skills"
            :items="productStore.skills"
          />
        </div>
      </section>
      <section
        class="bg-background-light rounded-lg pa-6"
        style="width: 49%; height: fit-content"
      >
        <div>
          <p class="text-h3">{{ $t("faq") }}</p>

          <div
            v-for="(item, index) in productStore.content.faq.content.faq"
            :key="index"
          >
            <v-text-field
              flat
              v-model="productStore.content.faq.content.faq[index].question"
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
              v-model="productStore.content.faq.content.faq[index].description"
            ></v-textarea>
          </div>
          <v-btn
            variant="text"
            density="compact"
            prepend-icon="custom:plus"
            @click="productStore.addNewFaq"
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
import { useProductStore } from "@core/stores/product";
let productStore = useProductStore();
import { useSharedPanelStore } from "~/stores/sharedPanel";
const sharedStore = useSharedPanelStore();
import { storeToRefs } from "pinia";
const route = useRoute();
let form = ref(null);
const primaryValues = {
  faq: ref({ type: "faq", content: [{ title: "", description: "" }] }),
};
onMounted(() => {
  productStore.getCourseCreationCommon();
  productStore.postRouteId = route.params.id;
  sharedStore.setStep(3);
  if (route.params.id) productStore.getDraftInfo();
  Object.assign(productStore.content, primaryValues);
});
const { content } = storeToRefs(productStore);
watch(
  content,
  (newDraft) => {
    productStore.postSavedState = false;
  },
  { deep: true }
);
const remove = (index)=>{

  productStore.content.faq.content.faq.splice(index,1)
}
definePageMeta({
  middleware: ["auth"],
  layout: false,
});
</script>
<style lang="scss">
#level-selection {
  .v-selection-control__wrapper {
    display: none;
  }
}
</style>
