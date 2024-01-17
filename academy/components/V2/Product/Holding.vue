<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-card class="h-100 d-flex flex-column w-100">
        <v-chip
          color="secondary-base"
          class="mb-4 align-self-start"
          :size="!mdAndUp ? 'small' : 'default'"
        >
          <v-icon color="secondary-darken2" icon="custom:profileAdd"></v-icon>
          <span class="text-secondary-darken2"
            >{{ item?.memberCount }} نفر در این دوره شرکت کرده‌اند</span
          >
        </v-chip>
        <div class="d-none d-md-block">
          <div class="text-text-high-emphasis text-body-2 mb-2">
            {{ item?.summary }}
          </div>
          <course-features-chips :features="item?.features" />
        </div>
        <div class="mt-auto">
          <v-row>
            <v-col cols="12" md="4" v-for="(info, i) in holdingInfo" :key="i">
              <div class="text-caption text-text-low-emphasis">{{ $t(info?.title) }}</div>
              <div class="text-text-heading text-caption font-weight-bold">{{ info?.value }}</div>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <v-card rounded="lg">
        <v-img cover aspect-ratio="1.64" :src="item?.bannerUrl"></v-img>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { useDisplay } from "vuetify";

const { mdAndUp } = useDisplay();
const { t } = useI18n();
const { $moment } = useNuxtApp();
const props = defineProps({
  item: {
    type: Object,
    default: () => {},
  },
});


const holdingInfo = computed(() => {
  return [
    {
      title: "startAt",
      value: props?.item?.startAt && $moment ? $moment(props?.item?.startAt).format('jDD jMMMM jYYYY') : '',
    },
    {
      title: "sessionTime",
      value: props?.item?.sessionTime?.length ? props?.item?.sessionTime?.map(s => s.weekday).join() : '_',
    },
    {
      title: "sessionCount",
      value: `${props?.item?.sessionCount} ${t('session')}`,
    },
    {
      title: "platform",
      value: t(`academy.product.${props?.item?.platform}`),
    },
    {
      title: "eventPlace",
      value: props?.item?.eventPlace,
    },
  ];
});
</script>
