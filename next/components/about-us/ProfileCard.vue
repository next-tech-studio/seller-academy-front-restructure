<template>
  <v-card color="transparent" :class="{ grey: grey }" height="fit-content">
    <v-card-text class="d-flex align-center">
      <div class="h-100">
        <v-img
          class="align-self-start rounded-lg"
          :width="lgAndUp ? '207' : '96'"
          :src="item?.headAvatar"
        />
      </div>
      <div class="ms-4 my-auto">
        <div class="font-weight-bold" :class="!xlAndUp  ? 'mb-1' : 'mb-4'">
          {{ item?.firstName + " " + item?.lastName }}
        </div>
        <div class="text-subtitle-1" :class="!xlAndUp  ? 'mb-1' : 'mb-4'">
          {{ item?.jobTitle }}
        </div>
        <div :class="!xlAndUp ? 'mb-1' : 'mb-4'">
          <v-btn
            tag="a"
            size="small"
            density="compact"
            variant="flat"
            icon
            class="me-4 bg-transparent"
            :href="item?.linkedin"
            target="_blank"
          >
            <v-icon
              :color="dark ? 'text-light' : 'primary-base'"
              icon="custom:linkedin"
            ></v-icon>
          </v-btn>
          <v-btn
            tag="a"
            size="small"
            density="compact"
            variant="flat"
            icon
            class="bg-transparent"
            :href="`mailto:${item?.email}`"
          >
            <v-icon
              :color="dark ? 'text-light' : 'primary-base'"
              icon="custom:smsTracking"
            ></v-icon>
          </v-btn>
        </div>
        <div
          class="d-lg-block d-none"
          :class="xl || lgAndUp ? 'text-body-2' : 'text-body-1'"
        >
          {{ item?.description }}
        </div>
      </div>
    </v-card-text>
    <v-card-text class="d-lg-none d-block">
      <div class="text-body-1">{{ item?.description }}</div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { useDisplay } from "vuetify";

const { lgAndUp, xl,xlAndUp } = useDisplay();
const props = defineProps({
  item: Object,
  dark: {
    type: Boolean,
    default: false,
  },
  grey: {
    type: Boolean,
    default: false,
  },
});
onMounted(() => {
  console.log(useDisplay());
});
</script>

<style setup>
.grey {
  filter: grayscale(100%);
}
</style>
