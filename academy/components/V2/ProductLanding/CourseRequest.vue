<template>
  <v-card class="bg" :class="{ bg__ltr: !$vuetify.locale.isRtl }">
    <v-card-text>
      <div class="mx-auto text-center" :class="{'w-75': lgAndUp}">
        <div class="text-h3 font-weight-bold mb-4 text-text-light">
          {{ $t('new_course_request_title') }}
        </div>
        <div class="text-body-1 text-text-light mb-9">
          {{ $t('new_course_request_description') }}
        </div>
      </div>
      <v-row>
        <v-col cols="12" md="6"></v-col>
        <v-col cols="12" md="6">
          <v-card>
            <v-card-text class="pa-6">
              <v-row>
                <v-col cols="12" md="6" class="pb-0">
                  <v-text-field
                    v-model="item.first_name"
                    flat
                    base-color="n400"
                    density="compact"
                    variant="solo-filled"
                    :placeholder="$t('first_name')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" class="pb-0">
                  <v-text-field
                    v-model="item.last_name"
                    flat
                    base-color="n400"
                    density="compact"
                    variant="solo-filled"
                    :placeholder="$t('last_name')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" class="pb-0">
                  <v-select
                    v-model="item.subject"
                    item-title="kjgbchjsvhvs"
                    :items="items"
                    flat
                    base-color="n400"
                    density="compact"
                    variant="solo-filled"
                    menu-icon=""
                    append-inner-icon="custom:chevronDown"
                    :placeholder="$t('suggested_course_category')"
                  >
                  </v-select>
                </v-col>
                <v-col cols="12" md="6" class="pb-0">
                  <v-text-field
                    v-model="item.course"
                    flat
                    base-color="n400"
                    density="compact"
                    variant="solo-filled"
                    :placeholder="$t('course_name')"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="12" class="pt-0">
                  <v-btn
                    variant="flat"
                    color="primary-base"
                    @click="$emit('send')"
                    >{{ $t("send_new_course_request") }}</v-btn
                  >
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { useDisplay } from 'vuetify';

const {lgAndUp} = useDisplay()
const props = defineProps({
  item: Object,
});
const {t} = useI18n()
const items = computed(() => [
  t("departments.portfolio.title"),
  t("departments.talent.title"),
  t("departments.r_and_d.title"),
]);
// const item = ref({})
</script>

<style lang="scss" scoped>
.bg {
  background: url("../../../../next/public/images/BG12-BG.svg") no-repeat,
    linear-gradient(
      rgba(var(--v-theme-n800)),
      rgba(var(--v-theme-n800))
    ) !important;
  background-position: bottom right !important;

  &__ltr {
    background-position: bottom left !important;
  }
}
</style>
