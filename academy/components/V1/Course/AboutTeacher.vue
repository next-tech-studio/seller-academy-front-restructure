<template>
  <v-card class="rounded-0">
    <v-container class="py-10">
      <div class="text-center">
        <v-avatar size="120" class="bordered">
          <v-icon size="47" icon="custom:digikala"></v-icon>
        </v-avatar>
        <div class="text-h2 text-text-heading my-4">
          {{ $t("about_teacher") }}
        </div>
        <div class="text-body-2 text-text-low-emphasis">
          {{ item?.instructor?.description }}
        </div>
        <div class="text-h2 text-text-heading mt-8 mb-4">
          {{ $t("other_courses") }}
        </div>
      </div>
      <v-row>
        <v-col
          cols="12"
          lg="3"
          md="6"
          sm="12"
          v-for="course in item?.instructorCourses?.slice(0, 4)"
          :key="course.id"
        >
          <course-card :item="course"></course-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup>
const props = defineProps({
  item: Object,
});
</script>

<style lang="scss" scoped>
.bordered {
  border: 1px solid rgb(var(--v-theme-n200));
}
</style>
