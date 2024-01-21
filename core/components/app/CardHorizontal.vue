<template>
  <v-card
    color="n200"
    :variant="cardVariant"
    class="rounded-lg d-flex flex-lg-row flex-column"
    @click="toItem"
  >
    <div class="d-flex">
      <v-card-text style="flex: 0 0 auto">
        <v-img
          class="rounded-lg"
          :width="lgAndUp || mdAndUp ? 243 : 106"
          :src="item.bannerUrl"
          aspect-ratio="1.64"
          cover
        ></v-img>
      </v-card-text>
      <v-card-text class="ps-0" style="flex: 1 0 25%">
        <div>
          <v-icon class="ml-2" icon="custom:digikala"></v-icon>
          <span class="text-caption text-text-high-emphasis">{{
            item?.instructor?.displayName
          }}</span>
        </div>
        <div class="text-text-heading text-body-1">
          {{ item.title }}
        </div>
        <div class="text-text-low-emphasis text-body-2">
          {{ item.totalDuration }}
        </div>
        <div
          v-if="lgAndUp"
          class="text-text-high-emphasis text-body-1 truncate-2 mb-4"
        >
          {{ item.description }}
        </div>
        <div v-if="item?.passedPercentage < 100">
          <span class="text-text-heading">{{ item.passedPercentage }} {{ $t('percentage') }}</span>
          <v-progress-linear
            rounded="lg"
            :model-value="item.passedPercentage"
            rounded-bar
            height="12px"
            bg-color="icon-disables"
            color="icon-secondary"
          ></v-progress-linear>
        </div>
        <div v-if="item?.passedPercentage == 100">
          <div class="d-flex align-center">
            <v-icon
              icon="custom:circleCheckSolid"
              color="icon-hint-success"
              size="20px"
              class="me-2"
            />
            <span
              class="text-icon-hint-success text-subtitle-1 font-wight-bold"
            >
              {{ $t("completed_in_date") }}
            </span>
            <span
              class="text-icon-hint-success text-subtitle-1 font-wight-bold"
            >
              {{ item.completedDate }}
            </span>
          </div>
        </div>
      </v-card-text>
    </div>
    <v-spacer />
    <v-card-actions
      class="d-flex flex-column justify-center align-start align-lg-center py-0"
    >
      <slot name="actions">
        <div
          v-if="!lgAndUp"
          class="text-text-high-emphasis text-body-1 truncate-2 mb-4 mx-2"
        >
          {{ item.description }}
        </div>
        <v-btn
          :block="!lgAndUp"
          class="mt-lg-9 mt-0"
          width="264"
          variant="flat"
          color="primary-base"
          >{{ $t("go_to_course") }}</v-btn
        >
        <span class="text-text-hint-caution text-body-1 mt-2 align-self-center">
          {{
            item.passedCount +
            " " +
            $t("from") +
            " " +
            item.lessonsCount +
            " " +
            $t("passed_section")
          }}
        </span>
      </slot>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { useDisplay } from "vuetify";

const { lgAndUp, mdAndUp } = useDisplay();
const emit = defineEmits(["to:item"]);
const props = defineProps({
  item: Object,
  cardVariant: {
    type: String,
    default: "outlined",
  },
});
const localePath = useLocalePath();
const toItem = () => {
  emit("to:item", props.item);
  navigateTo(localePath(props.item.url));
};
</script>
