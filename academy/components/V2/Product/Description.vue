<template>
  <v-row>
    <v-col cols="12" md="5">
      <v-card image="/images/BG-light-opacity.svg" color="secondary-lighten1">
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <div class="text-body-1 text-text-heading">
                {{ $t("course_capacity") }}
              </div>
              <div class="text-subtitle font-weight-bold text-text-heading">
                {{ item?.sessionCapacity }}
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="text-body-1 text-text-heading">
                {{ $t("payment_method") }}
                <v-icon
                  color="text-high-emphasis"
                  icon="custom:messageQuestion"
                ></v-icon>
              </div>
              <div class="text-subtitle font-weight-bold text-text-heading">
                {{ $t(item?.paymentType || "") }}
              </div>
            </v-col>
            <v-col cols="12" md="12">
              <div class="text-body-1 text-text-heading">
                {{ $t("price_for_paticipate_in_course") }}
              </div>
              <div class="text-subtitle font-weight-bold text-text-heading">
                {{ item?.fee }} {{ $t("money_unit") }}
              </div>
            </v-col>
            <v-col cols="12" md="12">
              <registration
                color="secondary-base"
                class="text-text-light text-button"
                :item="item"
                context="description"
                @submit="$emit('submit')"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="7">
      <v-card>
        <span class="text-body-1 text-text-high-emphasis">
          {{ item?.description }}
        </span>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
const props = defineProps({
  item: Object,
});
</script>
