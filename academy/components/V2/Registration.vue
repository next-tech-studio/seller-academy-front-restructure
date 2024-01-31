<template>
  <component
    :is="
      item.registrationType == 'register'
        ? RegistrationDialog
        : PreRegistrationDialog
    "
    :item="item"
    @submit="$emit('submit')"
  >
    <template #activator="{ open }">
      <v-btn
        height="48"
        class="text-primary-base text-button"
        flat
        @click="open(context)"
        v-bind="$attrs"
      >
        {{ $t("participate_in_the_course") }}
        <v-icon end icon="custom:chevronLeft"></v-icon>
      </v-btn>
    </template>
  </component>
</template>
<script setup>
import RegistrationDialog from "@/academy/components/V2/RegistrationDialog.vue";
import PreRegistrationDialog from "@/academy/components/V2/PreRegistrationDialog.vue";

const props = defineProps({
  item: Object,
  context: String,
});
</script>
