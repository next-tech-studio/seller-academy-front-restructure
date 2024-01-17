<template>
  <app-dialog-page-container>
    <course-chapter
      class="overflow-y-auto"
      :class="{ 'mx-4 mb-4': !lgAndUp }"
      :chapter="chapter"
    ></course-chapter>
  </app-dialog-page-container>
</template>

<script setup>
import { useDisplay } from "vuetify";
const { lgAndUp } = useDisplay();
const props = defineProps({
  item: Object,
});
const { $repos } = useNuxtApp();
const route = useRoute();
let chapter = reactive({});
let emit = defineEmits(["update:sidebar"]);
definePageMeta({
  middleware: ["auth"],
});
useAsyncData(() => {
  $repos.academy
    .getChapter({
      slug: route.params.chapterSlug,
    })
    .then((res) => {
      Object.assign(chapter, { ...res });
      emit("update:sidebar", chapter);
    });
});
</script>
