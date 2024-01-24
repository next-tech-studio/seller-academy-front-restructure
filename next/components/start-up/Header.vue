<template>
  <div class="text-center">
    <h2 class="mb-2 mt-4 text-h2 font-weight-bold">{{ item?.title }}</h2>
    <p class="mb-8 text-body-1">{{ item.description }}</p>
    <!-- <v-row class="d-flex justify-space-around">
      <v-col cols="12" lg="3" class="d-flex flex-md-column align-center justify-md-center">
        <div class="feature-frame mb-lg-4 me-3">
          <span class="text-text-light text-body-1">
            {{ item.startedAt }}
          </span>
        </div>
        <span class="text-body-1">{{ $t("start_up_establish_year") }}</span>
      </v-col>
      <v-col cols="12" lg="3" class="d-flex flex-md-column align-center justify-md-center">
        <div class="feature-frame mb-lg-4 me-3">
          <v-icon icon="custom:trend" color="text-light" size="x-large" />
        </div>
        <span class="text-body-1">{{ item.stage }}</span>
      </v-col>
      <v-col cols="12" lg="3" class="d-flex flex-md-column align-center justify-md-center">
        <div class="feature-frame mb-lg-4 me-3">
          <span class="text-text-light text-body-1">
            {{ item.employee }}
          </span>
        </div>
        <span class="text-body-1">{{ $t("start_up_employee_count") }}</span>
      </v-col>
      <v-col cols="12" lg="3" class="d-flex flex-md-column align-center justify-md-center">
        <span class="feature-frame mb-lg-4 me-3">
          <v-icon icon="custom:stack" color="text-light" size="x-large" />
        </span>
        <span class="text-body-1">{{ $t("start_up_category") }} {{ item.category?.title }}</span>
      </v-col>
    </v-row> -->
  </div>
</template>
<script setup>
const props = defineProps({
  item: Object,
});
</script>
<style lang="scss">
.feature-frame {
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  border-radius: 24px;
  background: rgba(var(--v-theme-n800));
}
</style>
