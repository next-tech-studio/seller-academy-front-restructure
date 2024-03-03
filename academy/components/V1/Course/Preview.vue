<template>
  <v-card class="rounded-lg">
    <v-card-title class="text-h5 text-text-heading pt-6 px-6 pb-0">
      {{ item.title }}
    </v-card-title>
    <v-card-text class="pa-6">
      <!-- <v-divider></v-divider> -->
      <!-- <app-share-in
        class="py-4"
        style="width: fit-content"
        justify=""
      /> -->
      <v-divider></v-divider>
      <div class="d-flex justify-space-between my-4">
        <span class="text-body-1 text-text-low-emphasis">{{
          $t("submitted_comments_count") + item?.ratingsCount
        }}</span>
        <div class="d-flex align-center">
          <span class="text-body-1 text-text-high-emphasis ml-2">{{
            item.averageRating
          }}</span>
          <v-icon color="icon-hint-caution" icon="custom:star"></v-icon>
        </div>
      </div>
      <v-card color="n800">
        <v-card-title
          v-if="item.level"
          class="text-body-2 text-text-light pb-0"
          >{{ $t(item.level) }}</v-card-title
        >
        <v-card-text class="text-body-2 text-text-disabled pt-0">{{
          $t(
            item?.level == "begginer"
              ? "not_have_prerequisite"
              : "have_prerequisite"
          )
        }}</v-card-text>
      </v-card>
      <div class="mt-6">
        <div class="d-flex mb-4" v-if="item.certificateEnabled">
          <v-icon
            size="24"
            class="rounded-xl bg-icon-secondary pa-1 ml-3"
            color="icon-light"
            variant="compact"
            icon="custom:pencil"
          ></v-icon>
          <span>{{ $t("certificate_enabled") }}</span>
        </div>
        <div class="d-flex mb-4" v-if="item.instructoSupport">
          <v-icon
            size="24"
            class="rounded-xl bg-icon-secondary pa-1 ml-3"
            color="icon-light"
            variant="compact"
            icon="custom:pencil"
          ></v-icon>
          <span>{{ $t("instructo_support") }}</span>
        </div>
        <div class="d-flex" v-if="item.moneyReturnGuarantee">
          <v-icon
            size="24"
            class="rounded-xl bg-icon-secondary pa-1 ml-3"
            color="icon-light"
            variant="compact"
            icon="custom:pencil"
          ></v-icon>
          <span>{{ $t("money_return_guarantee") }}</span>
        </div>
      </div>
    </v-card-text>
    <v-card-text class="pb-6 pt-0">
      <v-btn
        @click="toItem(item)"
        exact
        variant="flat"
        block
        color="primary-base"
        :disabled="!item?.chapters?.length"
      >
        {{ $t("participate_in_the_course") }}
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { useDisplay } from "vuetify";
const { lgAndUp } = useDisplay();
import { VListItemSubtitle } from "vuetify/lib/components/index.mjs";

const props = defineProps({
  item: Object,
});
const localePath = useLocalePath();
const toItem = (item) => {
  navigateTo(localePath(item?.chapters[0]?.url));
};
</script>
