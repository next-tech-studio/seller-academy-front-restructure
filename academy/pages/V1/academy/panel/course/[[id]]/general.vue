<template>
  <v-container fluid class="pa-8">
    <app-stepper v-slot="scope" :store="academyStore" :type="academyStore.type()">
      <div class="d-flex align-center">
        <v-btn
          variant="text"
          class="me-5"
          :text="$t('editor.save_draft')"
          @click="
            academyStore.validation(
              'general',
              false,
              scope.next,
              false,
              false,
              false,
              form
            )
          "
        ></v-btn>
        <v-btn
          icon="custom:eye"
          size="small"
          color="text-high-emphasis"
          class="me-5"
          @click="
            academyStore.validation(
              'general',
              false,
              scope.next,
              false,
              true,
              false,
              form
            )
          "
        ></v-btn>
        <v-btn
          :text="$t('editor.next_step')"
          color="button-secondary"
          @click="
            academyStore.validation(
              'general',
              true,
              scope.next,
              false,
              false,
              false,
              form
            )
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
      <section class="bg-background-light rounded-lg pa-6" style="width: 49%">
        <div class="mb-8">
          <p class="mb-2 text-h3">{{ $t("course_title") }}</p>
          <v-text-field
            v-model="academyStore.content.title"
            flat
            base-color="n300"
            :hint="$t('course_title_hint')"
            density="compact"
            variant="outlined"
            :placeholder="$t('course_title')"
            persistent-placeholder
            persistent-hint
          ></v-text-field>
        </div>
        <div>
          <p class="text-h3 mb-2">{{ $t("course_summary") }}</p>
          <v-textarea
            flat
            variant="outlined"
            base-color="n300"
            class="text-low-emphasis pb-3"
            rows="6"
            :rules="
              $rules(
                { description: 'digits_between:1,1000' },
                academyStore.content.description
              )
            "
            hint="حداکثر ۱۰۰۰ کاراکتر"
            v-model="academyStore.content.description"
            no-resize
            required
          />
        </div>
        <div class="mb-8">
          <p class="mb-2 text-h3">
            {{ $t("course_banner") }}
          </p>
          <div class="mb-8">
            <app-panel-blog-content-uploader
              :upload-path="UPLOAD_ARTICLE_PATH"
              v-model="academyStore.content.bannerUrl"
              :area-size="{ width: '60%', height: '239px' }"
  
              description="editor.desktop_banner_hint"
              return-url
            >
              <template v-slot:inlineEdit="scope">
                <div class="d-flex justify-end ma-4">
                  <v-btn
                    color="background-dark"
                    class="me-2"
                    @click="scope.fileImport(false)"
                  >
                    <span class="text-button text-text-low-emphasis">
                      <v-icon icon="custom:uploadPicture"></v-icon>
                      {{ $t("change_picture") }}</span
                    >
                  </v-btn>
                  <v-btn color="background-dark" @click="scope.deleteFile()">
                    <span class="text-button text-text-low-emphasis">
                      <v-icon icon="custom:trash"></v-icon>
                      {{ $t("delete_picture") }}</span
                    >
                  </v-btn>
                </div>
              </template>
            </app-panel-blog-content-uploader>
          </div>
        </div>
      </section>
      <section
        class="bg-background-light rounded-lg pa-6"
        style="width: 49%; height: fit-content"
      >
        <div class="mb-8">
          <p class="text-h3">{{ $t("choose_category") }}</p>
          <p class="text-body-2 mb-3">{{ $t("course_category_hint") }}</p>

          <v-select
            :label="$t('editor.category')"
            density="compact"
            :rules="$rules({ title: 'required' }, academyStore.content.category)"
            base-color="n300"
            v-model="academyStore.content.category"
            hide-details=""
            :items="academyStore.categories"
            item-value="id"
            variant="outlined"
          >
            <template v-slot:append-inner>
              <v-icon icon="custom:caretDownSolid" size="12" />
            </template>
          </v-select>
        </div>
        <div class="mb-8">
          <app-multiple-selector
            title="add_course_key_fetures"
            select-key="value"
            label="course_key_features"
            v-model="academyStore.content.features"
            :items="academyStore.keyFeatures"
          />
        </div>
        <div class="mb-8">
          <p class="text-h3">{{ $t("course_level") }}</p>
          <v-select
            :label="$t('choose_course_level')"
            density="compact"
            :rules="$rules({ title: 'required' }, academyStore.content.level)"
            base-color="n300"
            v-model="academyStore.content.level"
            hide-details
            :items="academyStore.levels"
            variant="outlined"
          >
            <template v-slot:selection="{ item }">{{
              $t(item.title)
            }}</template>
            <template v-slot:append-inner>
              <v-icon icon="custom:caretDownSolid" size="12" />
            </template>
            <template v-slot:item="{ item }">
              <!-- {{ $(item.title) }} -->
              <div id="level-selection">
                <v-checkbox
                  :value="item.value"
                  v-model="academyStore.content.level"
                  class="ps-6"
                  hide-details
                  :label="$t(item.title)"
                >
                </v-checkbox>
              </div>
            </template>
          </v-select>
        </div>
        <div class="mb-8">
          <p class="text-h3">{{ $t("course_instructor") }}</p>
          <v-select
            :label="$t('choose_course_instructor')"
            density="compact"
            :rules="
              $rules({ title: 'required' }, academyStore.content.instructor)
            "
            base-color="n300"
            v-model="academyStore.content.instructor"
            hide-details
            :items="academyStore.instructors"
            return-object
            item-value="id"
            item-title="displayName"
            variant="outlined"
          >
            <template v-slot:append-inner>
              <v-icon icon="custom:caretDownSolid" size="12" />
            </template>
          </v-select>
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
let primaryValues = {
  title: "",
  description: "",
  category: "",
  bannerUrl: ref([]),
};
onMounted(() => {
  academyStore.getCourseCreationCommon();
  academyStore.postRouteId = route.params.id;
  academyStore.setStep(1);
  if (route.params.id) academyStore.getDraftInfo();
  else Object.assign(academyStore.content, primaryValues);
  academyStore.postSavedState = true;
});
const { content } = storeToRefs(academyStore);
watch(
  content,
  (newDraft) => {
    academyStore.postSavedState = false;
  },
  { deep: true }
);
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
