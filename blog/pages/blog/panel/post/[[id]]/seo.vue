<template>
  <v-container fluid class="pa-8">
    <app-stepper v-slot="scope" :store="sharedStore" :type="type">
      <div class="d-flex align-center">
        <v-btn
          variant="text"
          class="me-5"
          :text="$t('editor.save_draft')"
          @click="
            panelStore.saveDraft('seo', false, scope.next, false, false, false)
          "
        ></v-btn>
        <v-btn
          icon="custom:eye"
          size="small"
          color="text-high-emphasis"
          class="me-5"
          @click="
            panelStore.saveDraft('seo', false, scope.next, false, true, false)
          "
        ></v-btn>
        <v-btn
          :text="$t('editor.previous_step')"
          color="button-secondary"
          @click="
            panelStore.saveDraft('seo', false, scope.next, true, false, false)
          "
          class="me-5"
          variant="outlined"
        ></v-btn>
        <v-btn
          v-if="auth.hasPermission(['blogs'])"
          :text="$t('editor.publish')"
          color="button-secondary"
          @click="
            panelStore.saveDraft('seo', false, scope.next, false, false, true)
          "
        ></v-btn>
      </div>
    </app-stepper>
    <v-form class="d-flex justify-start">
      <section class="bg-background-light rounded-lg pa-6" style="width: 49%">
        <div class="mb-4">
          <p class="mb-2 text-h3">{{ $t("editor.seo_title") }}</p>
          <v-text-field
            v-model="panelStore.draftContent.seoTitle"
            flat
            base-color="n300"
            density="compact"
            variant="outlined"
            :placeholder="$t('editor.your_seo_title')"
            persistent-placeholder
            persistent-hint
          ></v-text-field>
        </div>
        <div class="mb-4">
          <p class="mb-2 text-h3">{{ $t("editor.tags") }}</p>
          <v-select
            :placeholder="$t('editor.add_tags')"
            density="compact"
            base-color="n300"
            v-model="panelStore.draftContent.tags"
            hide-details
            multiple
            chips
            closable-chips
            :items="panelStore.editorTags"
            return-object
            variant="outlined"
          >
            <template v-slot:append-inner>
              <v-icon icon="custom:caretDownSolid" size="12" />
            </template>
            <template v-slot:chip="{ item }">
              <v-chip close-icon="custom:x" @click="removeTag(item)" />
            </template>
          </v-select>
        </div>
        <div class="mb-4">
          <p class="mb-2 text-h3">{{ $t("slug") }}</p>
          <v-text-field
            v-model="panelStore.draftContent.slug"
            flat
            base-color="n300"
            density="compact"
            variant="outlined"
            :placeholder="$t('editor.add_slug')"
            persistent-placeholder
            persistent-hint
          ></v-text-field>
        </div>
        <div class="mb-4">
          <p class="mb-2 text-h3">{{ $t("editor.seo_description") }}</p>
          <v-text-field
            v-model="panelStore.draftContent.seoDescription"
            flat
            base-color="n300"
            density="compact"
            variant="outlined"
            :placeholder="$t('editor.add_seo_description')"
            persistent-placeholder
            persistent-hint
          ></v-text-field>
        </div>
        <div class="mb-4">
          <p class="mb-2 text-h3">{{ $t("editor.key_words") }}</p>
          <v-text-field
            v-model="panelStore.draftContent.seoKeyword"
            flat
            base-color="n300"
            density="compact"
            variant="outlined"
            :placeholder="$t('editor.add_key_word')"
            persistent-placeholder
            persistent-hint
          ></v-text-field>
        </div>
      </section>
    </v-form>
  </v-container>
</template>

<script setup>
import { usePanelStore } from "~/stores/panel";
import { useSharedPanelStore } from "~/stores/sharedPanel";
import { useAuthStore } from "@core/stores/auth";
const auth = useAuthStore();
let panelStore = usePanelStore();
const sharedStore = useSharedPanelStore();
import { storeToRefs } from "pinia";
const route = useRoute();
const removeTag = (item) => {
  const indexOfTag = panelStore.draftContent.tags.findIndex((object) => {
    return object.slug === item.slug;
  });
  panelStore.draftContent.tags.splice(indexOfTag, 1);
};
const { draftContent } = storeToRefs(panelStore);
watch(
  draftContent,
  (newDraft) => {
    panelStore.postSavedState = false;
  },
  { deep: true }
);
onMounted(() => {
  panelStore.postRouteId = route.params.id;
  sharedStore.setStep(3);
  panelStore.getDraftInfo();
  panelStore.getEditorPanelCommon();
  panelStore.postSavedState = true;
});
const type = computed(() =>
  route.name.includes("podcast") ? "podcast" : "article"
);
// definePageMeta({
//   middleware: ["auth"],
//   layout: 'sidebar',
// });
</script>
