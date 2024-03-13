<template>
  <v-container fluid  class="px-0 py-8" id="event-location">
    <app-stepper v-slot="scope" :store="sharedStore" type="product">
      <div class="d-flex align-center">
        <v-btn
          variant="text"
          class="me-5"
          :text="$t('editor.save_draft')"
          @click="
            productStore.validation(
              'eventInfo',
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
              'eventInfo',
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
              'eventInfo',
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
          :text="$t('editor.next_step')"
          color="button-secondary"
          @click="
            productStore.validation(
              'eventInfo',
              true,
              scope.next,
              false,
              false,
              false
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
          <p class="mb-2 text-h3">{{ $t("event_dates") }}</p>
          <div class="d-flex">
            <div class="w-100 me-1">
              <input
                type="text"
                class="start-input border rounded px-4 py-2 w-100"
                :placeholder="$t('choose_event_start_date')"
              />
              <date-picker
                auto-submit
                color="rgba(var(--v-theme-primary-base))"
                v-model="productStore.content.startAt"
                custom-input=".start-input"
                format="YYYY-MM-DD"
                display-format="jYYYY-jMM-jDD"
                popover="bottom-left"
              ></date-picker>
            </div>
            <div class="w-100 ms-1">
              <input
                type="text"
                class="end-input border rounded px-4 py-2 w-100"
                :placeholder="$t('choose_event_end_date')"
              />
              <date-picker
                auto-submit
                color="rgba(var(--v-theme-primary-base))"
                v-model="productStore.content.endAt"
                display-format="jYYYY-jMM-jDD"
                custom-input=".end-input"
                format="YYYY-MM-DD"
                popover="bottom-left"
              ></date-picker>
            </div>
          </div>
        </div>
        <div class="mb-8">
          <p class="mb-2 text-h3">{{ $t("event_place") }}</p>
          <v-textarea
            flat
            variant="outlined"
            base-color="n300"
            hide-details=""
            class="text-low-emphasis pb-3"
            rows="3"
            v-model="productStore.content.eventPlace"
            no-resize
            required
          />
        </div>
        <div class="mb-8 d-flex justify-space-between">
          <div class="w-100 me-1">
            <p class="mb-2 text-h3">{{ $t("course_capacity") }}</p>
            <v-text-field
              v-model="productStore.content.sessionCapacity"
              flat
              type="number"
              base-color="n300"
              density="compact"
              variant="outlined"
              :placeholder="$t('course_capacity')"
              persistent-placeholder
              persistent-hint
            ></v-text-field>
          </div>
          <div class="w-100 ms-1">
            <p class="mb-2 text-h3">{{ $t("course_sessions") }}</p>
            <v-text-field
              v-model="productStore.content.sessionCount"
              flat
              type="number"
              base-color="n300"
              density="compact"
              variant="outlined"
              :placeholder="$t('course_sessions')"
              persistent-placeholder
              persistent-hint
            ></v-text-field>
          </div>
        </div>
      </section>
      <section
        class="bg-background-light rounded-lg pa-6"
        style="width: 49%; height: fit-content"
      >
        <div class="mb-8">
          <p class="mb-2 text-h3">{{ $t("course_holding_dates") }}</p>
          <div
            v-for="(item, index) in productStore.content.sessionTime"
            :key="index"
          >
            <div class="d-flex mb-4">
              <v-select
                :label="$t('weekday')"
                density="compact"
                class="me-2"
                base-color="n300"
                v-model="productStore.content.sessionTime[index].weekday"
                hide-details=""
                :items="productStore.weekDays"
                item-value="id"
                variant="outlined"
              >
                <template v-slot:append-inner>
                  <v-icon icon="custom:caretDownSolid" size="12" />
                </template>
              </v-select>
              <div class="me-2">
                <!-- <input
                  type="time"
                  class="border rounded px-4 py-2 w-100 me-2"
                  :placeholder="$t('choose_event_start_time')"
                /> -->
                <date-picker
                  v-model="productStore.content.sessionTime[index].startTime"
                  type="time"
                  :placeholder="$t('choose_event_start_time')"
                  :class="`.start-time-${index}`"
                  :jump-minute="15"
                  :round-minute="true"
                />
              </div>
              <div class="me-2">
                <!-- <input
                  type="time"
                  class="border rounded px-4 py-2 w-100"
                  :placeholder="$t('choose_event_end_time')"
                /> -->
                <date-picker
                  v-model="productStore.content.sessionTime[index].endTime"
                  type="time"
                  :placeholder="$t('choose_event_end_time')"
                  :jump-minute="15"
                  :round-minute="true"
                />
              </div>
            </div>
          </div>
        </div>
        <v-btn
          variant="text"
          density="compact"
          @click="productStore.addHoldingDates"
          class="font-weight-bold px-1"
          prepend-icon="custom:plus"
          color="text-secondary"
          >{{ $t("add_new_holding_date") }}</v-btn
        >
      </section>
    </v-form>
  </v-container>
</template>

<script setup>
// import DatePicker from 'vue3-persian-datetime-picker'
import { useProductStore } from "@core/stores/product";
let productStore = useProductStore();
import { useSharedPanelStore } from "~/stores/sharedPanel";
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
  productStore.startAt = $moment(new Date()).format("YYYY-MM-DD");
  productStore.endAt = $moment(new Date()).format("YYYY-MM-DD");
  sharedStore.setStep(2);
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
