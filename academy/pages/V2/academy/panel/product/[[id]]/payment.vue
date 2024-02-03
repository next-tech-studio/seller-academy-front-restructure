<template>
  <v-container fluid class="px-0 py-8" id="event-location">
    <app-stepper v-slot="scope" :store="sharedStore" type="product">
      <div class="d-flex align-center">
        <v-btn
          variant="text"
          class="me-5"
          :text="$t('editor.save_draft')"
          @click="
            productStore.validation(
              'payment',
              false,
              scope.next,
              false,
              false,
              false
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
              'payment',
              false,
              scope.next,
              false,
              true,
              false
            )
          "
        ></v-btn>
        <v-btn
          :text="$t('editor.previous_step')"
          color="button-secondary"
          @click="
            productStore.validation(
              'payment',
              false,
              scope.next,
              true,
              false,
              false
            )
          "
          class="me-5"
          variant="outlined"
        ></v-btn>
        <v-btn
          :text="$t('editor.publish')"
          color="button-secondary"
          @click="
            productStore.saveDraft(
              'payment',
              false,
              scope.next,
              false,
              false,
              true
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
          <p class="mb-2 text-h3">{{ $t("fee") }}</p>
          <v-text-field
            v-model="productStore.content.fee"
            flat
            type="number"
            base-color="n300"
            density="compact"
            variant="outlined"
            :placeholder="$t('fee')"
            persistent-placeholder
            persistent-hint
          ></v-text-field>
        </div>
        <div class="mb-8">
          <p class="text-h3">{{ $t("payment_type") }}</p>
          <v-select
            v-model="productStore.content.paymentType"
            :items="productStore.paymentTypes"
            flat
            base-color="n400"
            density="compact"
            item-value="value"
            item-title="title"
            variant="outlined"
            menu-icon=""
            :placeholder="$t('choose_payment_type')"
          >
            <template v-slot:append-inner>
              <v-icon icon="custom:caretDownSolid" size="12" />
            </template>
            <template v-slot:item="{ props, item }">
              <v-list-item v-bind="props" subtitle="">
                {{ $t(item.title) }}
              </v-list-item>
            </template>
            <template v-slot:selection="{ item }">
              {{ $t(item.title) }}
            </template>
          </v-select>
        </div>
      </section>
      <section class="bg-background-light rounded-lg pa-6" style="width: 49%">
        <div class="mb-8">
          <p class="text-h3">{{ $t("registration_type") }}</p>
          <v-select
            v-model="productStore.content.registrationType"
            :items="productStore.registrationType"
            flat
            base-color="n400"
            density="compact"
            item-value="value"
            item-title="title"
            variant="outlined"
            menu-icon=""
            :placeholder="$t('choose_payment_type')"
          >
            <template v-slot:append-inner>
              <v-icon icon="custom:caretDownSolid" size="12" />
            </template>
            <template v-slot:item="{ props, item }">
              <v-list-item v-bind="props" title="">
                {{ $t(item.title) }}
              </v-list-item>
            </template>
            <template v-slot:selection="{ item }">
              {{ $t(item.title) }}
            </template>
          </v-select>
        </div>
        <div class="mb-8">
          <p class="text-h3">{{ $t("register_requirements") }}</p>
          <div
            v-for="(item, index) in productStore.registerRequirements"
            :key="item.value"
          >
            <v-checkbox
              v-model="productStore.content.registerRequirements"
              :label="item.title"
              :value="item"
              true-icon="custom:squareCheck"
              false-icon="custom:square"
              hide-details
            ></v-checkbox>
            <!-- <v-radio-group v-model="productStore.content.registerRequirements[index].type" inline>
              <v-radio
                label="text"
                value="text"
                false-icon="custom:circle"
                true-icon="custom:circleThick"
              ></v-radio>
              <v-radio
                label="file"
                value="file"
                false-icon="custom:circle"
                true-icon="custom:circleThick"
              ></v-radio>
            </v-radio-group> -->
          </div>
        </div>
      </section>
    </v-form>
  </v-container>
</template>

<script setup>
// import DatePicker from 'vue3-persian-datetime-picker'
import { useSharedPanelStore } from "@core/stores/sharedPanel";
import { useProductStore } from "@core/stores/product";
let productStore = useProductStore();
const { $moment } = useNuxtApp();
const sharedStore = useSharedPanelStore();
import { storeToRefs } from "pinia";
const route = useRoute();
let form = ref(null);
const UPLOAD_COURSE_PATH = "/main/file/upload";
let primaryValues = {
  title: "",
  description: "",
  category: "",
  bannerUrl: ref([]),
};
onMounted(() => {
  productStore.getCourseCreationCommon();
  productStore.postRouteId = route.params.id;
  sharedStore.setStep(5);
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
#event-location {
  .vpd-icon-btn {
    display: none;
  }
  .vpd-input-group input {
    border-radius: 8px;
    padding: 4px 8px 4px 8px;
    border: 1px solid rgba(var(--v-theme-n200));
  }
}
</style>
