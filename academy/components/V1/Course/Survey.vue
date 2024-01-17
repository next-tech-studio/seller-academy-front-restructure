<template>
  <v-card v-if="!data.passed">
    <v-card-text class="d-flex align-center">
      <span class="text-body-1 font-weight-bold text-text-heading">{{
        $t("your_certificate")
      }}</span>
      <v-spacer></v-spacer>
      <span class="ml-6 text-body-2 text-text-low-emphasis">{{
        $t("complete_syllabus_for_getting_certificate")
      }}</span>
      <v-btn variant="flat" color="primary-base" class="text-button">{{
        $t("see_syllabus")
      }}</v-btn>
    </v-card-text>
  </v-card>
  <v-card class="rounded-md mt-4" v-if="data.passed">
    <template class="d-flex">
      <v-card-text style="flex: 0 0 auto" class="rounded-lg">
        <v-img
          :src="data.certificate"
          class="rounded-lg bg-background-dark"
          width="188"
          height="100%"
          aspect-ratio="1.35"
          cover
        ></v-img>
      </v-card-text>
      <v-card-text style="flex: 1 0 auto">
        <div>
          <span class="text-body-1 font-weight-bold text-text-heading">
            {{ $t("congratulations_for_getting_certificate") }}
          </span>
        </div>
        <div class="text-text-low-emphasis text-body-1 my-2">
          {{ $t("completed_at") }} ۲۵ مهر ۱۴۰۲
        </div>
        <div class="d-flex">
          <v-btn
            size="large"
            variant="flat"
            color="primary-base"
            class="ml-4"
            >{{ $t("share") }}</v-btn
          >
          <v-btn
            download
            size="large"
            variant="outlined"
            color="primary-base"
            :href="data.certificate"
            target="_blank"
            tag="a"
            >{{ $t("download_certificate") }}</v-btn
          >
        </div>
      </v-card-text>
      <v-card-text class="d-flex flex-column justify-center">
        <span
          class="text-center mb-4 text-text-secondary text-body-1 font-weight-bold"
          >{{ $t("your_score_from_100") + ' ' + data.score }}</span
        >
        <v-progress-linear
          :model-value="data.score"
          color="icon-secondary"
          bg-color="bg-background-dark"
          rounded
          height="8"
        ></v-progress-linear>
      </v-card-text>
    </template>
    <v-divider color="n-100" class=""></v-divider>
    <v-card-text class="d-flex align-center">
      <span class="text-subtitle font-weight-bold">{{
        $t("your_rate_to_course")
      }}</span>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" width="30%">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            color="text-secondary"
            class="text-body-1 font-weight-bold"
            variant="text"
          >
            {{ $t("submit_rate") }}
          </v-btn>
        </template>

        <v-card>
          <v-card-text class="d-flex align-center">
            <span class="text-body-1 font-weight-bold text-text-heading">{{
              $t("submit_rate")
            }}</span>
            <v-spacer></v-spacer>
            <v-btn
              variant="icon"
              density="compact"
              @click="dialog = false"
              icon="custom:x"
            ></v-btn>
          </v-card-text>
          <v-card-text class="d-flex justify-space-between align-center">
            <span class="text-body-1 text-text-low-emphasis">{{
              $t("your_rate")
            }}</span>
            <v-rating
              v-model="data.rate"
              dir="ltr"
              active-color="icon-hint-caution"
              color="icon-disabled"
              density="compact"
              full-icon="custom:star"
              empty-icon="custom:star"
              size="small"
            ></v-rating>
          </v-card-text>
          <v-card-text class="py-0">
            <v-textarea
              v-model="data.comment"
              flat
              no-resize
              base-color="n300"
              density="compact"
              hint="item.hint"
              variant="solo-filled"
              :label="$t('your_idea_about_course')"
              class="outside-label"
              persistent-placeholder
              persistent-hint
              hide-details="!item.hint"
              :placeholder="$t('what_was_attractive_in_this_course')"
            ></v-textarea>
          </v-card-text>
          <v-card-text class="align-self-end">
            <v-btn variant="flat" color="primary-base" @click="save">{{
              $t("get_rate")
            }}</v-btn>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-rating
        dir="ltr"
        readonly
        :model-value="data.rate"
        active-color="icon-hint-caution"
        color="icon-disabled"
        density="compact"
        full-icon="custom:star"
        empty-icon="custom:star"
      ></v-rating>
    </v-card-text>
  </v-card>
</template>

<script setup>
const emit = defineEmits("rate");
let dialog = ref(false);
defineProps({
  data: Object,
});
const save = () => {
  emit("rate", data);
  dialog.value = false;
};
</script>
