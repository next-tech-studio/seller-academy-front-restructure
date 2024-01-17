<template>
  <div
    v-if="$route.name != 'academy-courses-slug'"
    class="bg-background-dark"
    style="height: 100vh; overflow-y: auto"
  >
    <NuxtLayout name="no-footer">
      <v-container>
        <v-row>
          <v-col cols="12" md="12" lg="3">
            <course-tracker :items="items" :item="data" />
          </v-col>
          <v-col cols="12" md="9">
            <NuxtPage :item="data" @update:sidebar="updateSidebar" />
          </v-col>
        </v-row>
      </v-container>
    </NuxtLayout>
  </div>
  <div v-else class="bg-background-dark">
    <NuxtLayout name="default">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
definePageMeta({
  // middleware: ["auth"],
  layout: false,
});

let data = reactive({});

const updateSidebar = (e) => {
  Object.assign(data, { ...e });
};

let items = computed(() => [
  {
    title: "موارد درسی",
    chapters: data?.sidebar?.chapters,
  },
  {
    id: 6,
    title: "نمرات و گواهینامه",
    url: { name: "academy-courses-slug-quizzes" },
  },
  {
    id: 7,
    title: "اتاق گفتگو",
    url: { name: "academy-courses-slug-forum" },
  },
]);
</script>

<style></style>
