<template>
  <div class="text-h3 text-text-heading text-center mb-6">
    {{ $t("headings") }}
  </div>
  <v-row>
    <v-col cols="12" md="9">
      <v-card id="headings" variant="outlined" color="n200">
        <v-expansion-panels>
          <v-expansion-panel
            v-for="(item, index) in headings"
            :key="index"
            :style="
              index != headings?.length - 1
                ? 'border-bottom: 1px solid rgba(var(--v-theme-n200)) !important; border-radius: 0px !important;'
                : ''
            "
            collapse-icon="custom:chevronTop"
            expand-icon="custom:chevronDown"
          >
            <template #title>
              <span
                class="text-text-low-emphasis text-body-1 font-weight-bold"
                >{{ item?.title }}</span
              >
              <v-spacer></v-spacer>
              <span class="text-button text-primary-base me-2">{{
                $t("more_info")
              }}</span>
            </template>
            <template #text>
              <span class="text-text-low-emphasis text-body-2">{{
                item?.description
              }}</span>
            </template>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
    </v-col>
    <v-col cols="12" md="3">
      <v-card variant="outlined" color="n200">
        <v-card-text>
          <div class="text-text-heading text-h5">{{ item?.title }}</div>
          <v-divider class="mt-4 mb-2" color="n800" />
          <div class="d-flex justify-space-between align-center">
            <span class="text-text-low-emphasis"
              >{{ $t("rate_with_vote") }} {{ item?.commentsCount }}
              {{ $t("vote") }}</span
            >
            <v-btn height="40" flat color="n100" class="ps-2 pe-4" rounded>
              <v-icon
                size="24"
                icon="custom:star"
                color="icon-hint-caution"
              ></v-icon>
              <span class="text-secondary-base" dir="ltr"
                >{{ item?.rate }}/5</span
              >
            </v-btn>
          </div>
          <v-divider class="mb-4 mt-2" color="n800" />
          <div class="d-flex flex-column align-start">
            <course-features-chips :features="item?.features" />
          </div>
          <v-btn block height="48" class="bg-primary-base text-button mt-2" flat>
            {{ $t("participate_in_the_course") }}
            <v-icon end icon="custom:chevronLeft"></v-icon>
          </v-btn>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
const props = defineProps({
  item: Object,
});

const headings = computed(() => props?.item?.headings);
// const items = [
//   {
//     title: "title",
//     description: "description",
//   },
//   {
//     title: "title",
//     description: "description",
//   },
//   {
//     title: "title",
//     description: "description",
//   },
// ];
</script>

<style lang="scss">
#headings .v-expansion-panel__shadow {
  box-shadow: none;
}

::before,
::after {
  border: none !important;
}
#headings .v-expansion-panel-title__icon {
  color: rgba(var(--v-theme-primary-base));
}
#headings .v-expansion-panel-title--active > .v-expansion-panel-title__overlay,
#headings
  .v-expansion-panel-title[aria-haspopup="menu"][aria-expanded="true"]
  > #headings
  .v-expansion-panel-title__overlay {
  opacity: 0 !important;
}
</style>
