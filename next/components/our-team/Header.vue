<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="10">
        <div class="text-h3 font-weight-bold text-center mb-2">
          {{ $t("company_team") }}
        </div>
        <div class="text-body-1 text-center mb-16 w-75 mx-auto">
          {{ $t("company_team_description") }}
        </div>
        <about-us-profile-card
          :item="item"
          class="bg"
          :class="{ 'bg__qoute--ltr': !$vuetify.locale.isRtl, bg__qoute: lgAndUp }"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useDisplay } from "vuetify/lib/framework.mjs";

const { lgAndUp } = useDisplay();
const props = defineProps({
  item: Object,
});
</script>

<style lang="scss">
.bg {
  background: linear-gradient(
    rgba(var(--v-theme-n100)),
    rgba(var(--v-theme-n100))
  ) !important;
  &__qoute {
    background: url("../../public/images/“.png") no-repeat,
      linear-gradient(rgba(var(--v-theme-n100)), rgba(var(--v-theme-n100))) !important;
    background-position: 58px 32px !important;
    &--ltr {
      background-position: 95% 32px !important;
    }
  }
}
</style>
