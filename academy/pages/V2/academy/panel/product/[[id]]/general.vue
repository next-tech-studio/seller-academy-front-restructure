<template>
  <v-container fluid  class="px-0 py-8">
    <app-stepper v-slot="scope" :store="sharedStore" type="product">
      <div class="d-flex align-center">
        <v-btn
          variant="text"
          class="me-5"
          :text="$t('editor.save_draft')"
          @click="
            productStore.validation(
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
            productStore.validation(
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
            productStore.validation(
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
      :model-value="productStore.content"
      class="d-flex justify-space-between"
      ref="form"
      validate-on="blur"
    >
      <section class="bg-background-light rounded-lg pa-6" style="width: 49%">
        <div class="mb-8">
          <p class="mb-2 text-h3">{{ $t("course_title") }}</p>
          <v-text-field
            v-model="productStore.content.title"
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
        <div class="mb-8">
          <p class="text-h3 mb-2">{{ $t("course_summary") }}</p>
          <p class="text-body-2 mb-3">{{ $t("course_summary_hint") }}</p>
          <v-textarea
            flat
            variant="outlined"
            base-color="n300"
            class="text-low-emphasis pb-3"
            rows="6"
            :rules="
              $rules(
                { description: 'digits_between:1,500' },
                productStore.content.summary
              )
            "
            hint="حداکثر ۵۰۰ کاراکتر"
            v-model="productStore.content.summary"
            no-resize
            required
          />
        </div>
        <div class="mb-8">
          <p class="text-h3 mb-2">{{ $t("course_description") }}</p>
          <p class="text-body-2 mb-3">{{ $t("course_description_hint") }}</p>
          <v-textarea
            flat
            variant="outlined"
            base-color="n300"
            class="text-low-emphasis pb-3"
            rows="6"
            :rules="
              $rules(
                { description: 'digits_between:1,1000' },
                productStore.content.description
              )
            "
            hint="حداکثر ۱۰۰۰ کاراکتر"
            v-model="productStore.content.description"
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
              :upload-path="UPLOAD_COURSE_PATH"
              single-step
              v-model="productStore.content.bannerUrl"
              :area-size="{ width: '60%', height: '239px' }"
              description="desktop_banner_hint"
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
            :rules="$rules({ title: 'required' }, productStore.content.category)"
            base-color="n300"
            v-model="productStore.content.category"
            hide-details=""
            :items="productStore.categories"
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
            title-key="title"
            label="course_key_features"
            return-object
            v-model="productStore.content.features"
            :items="productStore.keyFeatures"
          />
        </div>
        <div class="mb-8">
          <app-multiple-selector
            title="course_instructors"
            select-key="id"
            title-key="displayName"
            label="choose_course_instructor"
            :return-object="false"
            v-model="productStore.content.teachers"
            :items="productStore.teachers"
          />
        </div>
        <div class="mb-8">
          <app-multiple-selector
            title="course_speakers"
            select-key="id"
            title-key="displayName"
            label="choose_course_speakers"
            :return-object="false"
            v-model="productStore.content.speakers"
            :items="productStore.speakers"
          />
        </div>
        <div class="mb-8">
          <app-multiple-selector
            title="course_mentors"
            select-key="id"
            title-key="displayName"
            label="choose_course_mentors"
            :return-object="false"
            v-model="productStore.content.mentors"
            :items="productStore.mentors"
          />
        </div>
        <div class="mb-8">
          <p class="text-h3">{{ $t("event_type") }}</p>
          <v-select
            v-model="productStore.content.platform"
            :items="productStore.platforms"
            flat
            base-color="n400"
            density="compact"
            item-value="value"
            item-title="title"
            variant="outlined"
            menu-icon=""
            :placeholder="$t('choose_event_type')"
          >
            <template v-slot:append-inner>
              <v-icon icon="custom:caretDownSolid" size="12" />
            </template>
            <template v-slot:item="{props,item }">
              <v-list-item v-bind="props" subtitle="">
                {{ $t(item.title) }}
              </v-list-item>
            </template>
            <template v-slot:selection="{item }">
                {{  $t(item.title)}}
            </template>
          </v-select>
        </div>
      </section>
    </v-form>
  </v-container>
</template>

<script setup>
import { useSharedPanelStore } from "@core/stores/sharedPanel";
import { useProductStore } from "@core/stores/product";
let productStore = useProductStore();
const sharedStore = useSharedPanelStore();
import { storeToRefs } from "pinia";
const route = useRoute();
let form = ref(null);
const UPLOAD_COURSE_PATH = "/panel/articles/inline_media";
let primaryValues = {
  title: "",
  summary: "",
  category: "",
  bannerUrl: ref([]),
};
onMounted(() => {
  productStore.getCourseCreationCommon();
  productStore.postRouteId = route.params.id;
  sharedStore.setStep(1);
  if (route.params.id) productStore.getDraftInfo();
  else Object.assign(productStore.content, primaryValues);
  productStore.postSavedState = true;
});
const { content } = storeToRefs(productStore);
watch(
  content,
  (newDraft) => {
    productStore.postSavedState = false;
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
