<template>
  <div
    id="course-header"
    class="bg-n800"
    :style="`height: ${
      lgAndUp ? '431px' : mdAndUp ? '800px' : '563px'
    }; position: relative !important`"
  >
    <v-container class="h-100">
      <v-card
        height="100%"
        rounded="0"
        color="transparent"
        class="d-flex flex-column"
        :class="{ 'justify-center w-50': lgAndUp }"
      >
        <app-breadcrumbs color="text-light" page="article" :data="item" />
        <div class="text-text-light text-h2 text-lg-h1 font-weight-bold mb-2">
          {{ item.title }}
        </div>
        <div class="text-body-2 text-text-light mb-2">
          {{ item.description }}
        </div>
        <div class="text-body-2 text-text-light font-weight-bold mb-4">
          <v-avatar size="24" :image="item?.instructor?.avatarUrl" class="ml-2"></v-avatar>
          {{ `${$t("instructor")} : ${item?.instructor?.name}` }}
        </div>
        <div class="d-lg-flex">
          <div class="mb-lg-0 mb-4">
            <v-btn
              color="primary-base"
              variant="flat"
              class="text-button"
              @click="toItem(item)"
            >
              {{ $t("participate_in_the_course") }}
            </v-btn>
            <v-btn
              color="primary-base mx-4"
              variant="outlined"
              class="text-button"
              @click="$emit('bookmark')"
            >
              {{ item.currentUserBookmarked ? $t("bookmarked") : $t("save") }}
            </v-btn>
          </div>
          <span class="text-text-light text-body-2">
            {{ item.participantsCount + " " + $t("course_participants") }}
          </span>
        </div>
      </v-card>
    </v-container>
    <v-img
      :gradient="`to ${
        lgAndUp ? 'right' : 'top'
      }, rgba(35, 41, 51, 0), rgba(35, 41, 51, 1)`"
      src="/images/digikala_banner.png"
      :alt="item?.title"
      style="flex: 0 0 auto; position: absolute; left: 0"
      :style="lgAndUp ? 'top: 0' : 'bottom: 0'"
      :class="{ 'w-100': mdAndUp && !lgAndUp }"
    ></v-img>
  </div>
</template>

<script setup>
import { useDisplay } from "vuetify";

const { lgAndUp, mdAndUp } = useDisplay();
const props = defineProps({
  item: Object,
});
const localePath = useLocalePath();
const toItem = (item) => {
  navigateTo(localePath(item?.chapters[0]?.url));
};
</script>

<style>
#course-header .v-img__img {
  position: relative;
}
</style>
