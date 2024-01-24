<template>
  <v-otp-input
    id="otp"
    dir="ltr"
    :model-value="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
    length="6"
    class="px-0"
  ></v-otp-input>
  <div class="text-caption text-center">
    <span class="me-2">{{ $t("did_not_receive_the_code") }}</span>
    <v-btn
      v-if="!remaining.minutes && !remaining.seconds"
      size="x-small"
      variant="text"
      class="text-secondary-base"
      @click="submit"
    >
      {{ $t("send_again") }}
    </v-btn>
    <app-countdown v-else v-model="remaining" color="text-secondary-base" />
  </div>
</template>

<script setup>
// import { VOtpInput } from "vuetify/labs/VOtpInput";
const emit = defineEmits("submit");
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
});
let remaining = ref({
  minutes: 2,
  seconds: 0,
});
const submit = () => {
  emit("submit");
};
</script>

<style lang="scss">
#otp .v-otp-input__content {
  padding-inline: 0;

  :nth-child(6) {
    margin-right: 0 !important;
  }

  :nth-child(1) {
    margin-left: 0 !important;
  }
}
</style>
