<template>
  <v-card image="/images/bubble.webp">
    <v-card-text
      class="d-flex align-center justify-md-space-between px-4 py-lg-4 py-4"
      :class="{'flex-column': !horizontal}"
    >
      <slot name="text">
        <div
          class="text-md-h5 text-body-2 text-text-light text-lg-start mb-2 mb-lg-0 w-50 me-auto"
          :class="{'text-center': !horizontal}"
        >
          {{ $t("not_logged_in_ask_question") }}
        </div>
      </slot>

      <v-spacer></v-spacer>

      <v-btn
        @click="$emit('change:state')"
        variant="flat"
        class="text-button text-text-secondary"
        :block="!horizontal"
      >
        {{ $t(submitText) }}
      </v-btn>
      <div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
defineEmits(["change:state"]);
const localePath = useLocalePath();
let props = defineProps({
  submitText: { type: String, default: "log_in_or_sign_up" },
  url: String,
  horizontal: {
    default: true,
    type: Boolean
  }
});
const goTo = () => {
  navigateTo(
    localePath({
      name: props.url,
    })
  );
};
</script>
