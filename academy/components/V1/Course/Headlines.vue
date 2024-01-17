<template>
  <v-card class="rounded-lg">
    <v-card-text>
      <div class="text-h2 text-text-heading">{{ $t("headlines") }}</div>
    </v-card-text>
    <template v-if="lgAndUp">
      <v-card-text
        v-for="(headline, index) in item.chapters"
        :key="index"
        class="pb-0"
        :class="{ 'pb-4': index == item?.chapters?.length - 1 }"
      >
        <v-card color="n200" variant="outlined">
          <div
            class="d-flex"
            :class="{
              mask:
                index == item?.chapters?.length - 1 &&
                item?.chapters?.length > 4,
            }"
          >
            <v-card-text>
              <div
                style="width: 147px"
                class="bg-text-secondary d-flex flex-column rounded-md"
              >
                <v-card-text class="pa-3 d-flex flex-column">
                  <v-btn disabled block variant="flat" class="mb-6">
                    <span class="text-text-secondary">{{
                      headline.title
                    }}</span>
                  </v-btn>
                  <span class="mb-4">
                    <v-icon icon="custom:book"></v-icon>
                    {{
                      headline.totalMinutesToRead + " " + $t("study_duration")
                    }}
                  </span>
                  <span class="mb-4">
                    <v-icon icon="custom:quiz"></v-icon>
                    {{ headline.totalQuizQuestionsCount + " " + $t("quiz") }}
                  </span>
                  <span>
                    <v-icon icon="custom:play"></v-icon>
                    {{ headline.totalVideoDuration + ' ' + $t("video_duration") }}
                  </span>
                </v-card-text>
              </div>
            </v-card-text>
            <div class="text w-100">
              <v-card-title class="text-text-heading text-h4 pb-0">{{
                headline.title
              }}</v-card-title>
              <v-card-subtitle
                class="text-text-high-emphasis text-body-2 pt-0 pb-4"
              >
                {{ item.totalDuration }}
              </v-card-subtitle>
              <v-card-text class="text-text-high-emphasis text-body-2 py-0">{{
                headline.description
              }}</v-card-text>
            </div>
          </div>
        </v-card>
      </v-card-text>
    </template>
    <v-card-text class="pt-0" v-else>
      <app-content-faq
        colored
        :bordered="false"
        bordered-text
        hide-title
        :content="{ faq: item.chapters }"
        gap="8"
      >
        <template #title="{ item }">
          <div style="white-space: nowrap">{{ item.title }}</div>
        </template>
        <template #text="{ item }">
          <v-card-title class="text-text-heading text-h4 pb-0">{{
            item.title
          }}</v-card-title>
          <v-card-subtitle
            class="text-text-high-emphasis text-body-2 pt-0 pb-2"
          >
            {{ props.item.totalDuration }}
          </v-card-subtitle>
          <v-card-text class="pt-0">
            <span class="mb-4 me-2 text-text-high-emphasis">
              <v-icon
                class="text-icon-low-emphasis"
                icon="custom:book"
              ></v-icon>
              {{ item.totalMinutesToRead + " " + $t("study_duration") }}
            </span>
            <span class="mb-4 me-2 text-text-high-emphasis">
              <v-icon
                class="text-icon-low-emphasis"
                icon="custom:quiz"
              ></v-icon>
              {{ item.totalQuizQuestionsCount + " " + $t("quiz") }}
            </span>
            <span class="text-text-high-emphasis">
              <v-icon
                class="text-icon-low-emphasis"
                icon="custom:play"
              ></v-icon>
              {{ item.totalVideoDuration + ' ' + $t("video_duration") }}

            </span>
          </v-card-text>
          <v-card-text class="text-text-high-emphasis text-body-2 pt-0">{{
            item.description
          }}</v-card-text>
        </template>
      </app-content-faq>
    </v-card-text>
    <v-card-text class="pb-4 pt-0" v-if="item?.chapters?.length > 4">
      <v-btn class="animated px-0" color="text-secondary" variant="text">{{
        $t("see_more")
      }}</v-btn>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { useDisplay } from "vuetify";

const { lgAndUp } = useDisplay();
const props = defineProps({
  item: Object,
});
</script>

<style>
.mask {
  mask-image: linear-gradient(to top, rgba(255, 255, 255, 0) 0%, #ffffff 100%);
}
</style>
