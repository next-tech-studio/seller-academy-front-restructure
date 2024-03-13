<template>
  <course-survey :data="data" @rate="rate" />
  <app-listing
    :items="items"
    class="mt-4"
    :store="sharedStore"
    :headers="headers"
    :has-header="false"
    :show-dialog="false"
    :selectable="false"
  >
    <template #title="{ item }">
      <v-btn flat :to="localePath(item.item.url)">
        <div class="text-body-1 text-text-heading">
          {{ item.item.title }}
        </div>
        <div class="text-body-2 text-text-low-emphasis">
          {{ item.item.description }}
        </div>
      </v-btn>
    </template>
    <template #currentUserStartTime="{ item }">
      <span class="text-body-1 text-text-heading">{{
        item.item.currentUserStartTime
          ? $moment(item.item.currentUserStartTime).fromNow()
          : "_"
      }}</span>
    </template>
    <template #userQuizStatus="{ item }">
      <v-icon
        :color="stausColor(item.item.userQuizStatus)"
        :icon="
          item.item.userQuizStatus == 'not_started'
            ? 'custom:lock'
            : 'custom:lockOpen'
        "
      ></v-icon>
      <span class="mr-1 text-body-1 text-text-heading" :class="`text-${stausColor(item.item.userQuizStatus)}`">{{
        $t(item.item.userQuizStatus)
      }}</span>
    </template>
  </app-listing>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
});
import { useSharedPanelStore } from '~/stores/sharedPanel';
const sharedStore = useSharedPanelStore()
const localePath = useLocalePath();
const emit = defineEmits(["update:sidebar"]);
const { $repos } = useNuxtApp();
const route = useRoute();
const { t } = useI18n();
const item = reactive({});
let items = reactive({});
const data = reactive({});
let headers = ref([]);
useAsyncData(() => {
  $repos.academy
    .getQuizzes({
      slug: route.params.slug,
    })
    .then((res) => {
      headers.value = [
        {
          align: "start",
          key: "title",
          sortable: false,
          title: t("quiz_title"),
        },
        { key: "userQuizStatus", title: t("status"), sortable: false },
        { key: "currentUserStartTime", title: t("date"), sortable: false },
        { key: "score", title: t("score"), sortable: false },
      ];
      Object.assign(items, res);
      Object.assign(data, { ...items });
      items.data = res.quizzes;
      emit("update:sidebar", item);
    });
});
const rate = (e) => {
  $repos.academy.rate({
    body: { rate: data.rate, comment: data.comment, courseId: items.id },
  });
};
const stausColor = (status) => {
  let color = "icon-text-heading";
  switch (status) {
    case "success":
      color = "icon-hint-success";
      break;
    case "fail":
      color = "icon-hint-error";
      break;
  }
  return color;
};
</script>
