<template>
  <component
    :is="
      item.registrationType == 'register'
        ? RegistrationDialog
        : PreRegistrationDialog
    "
    :item="item"
    :context="context"
    @submit="$emit('submit')"
  >
    <template #activator="{ open }">
      <v-btn
        height="48"
        class="text-primary-base text-button"
        flat
        @click="openDialog(open)"
        v-bind="$attrs"
      >
        {{ $t("participate_in_the_course") }}
        <v-icon end icon="custom:chevronLeft"></v-icon>
      </v-btn>
    </template>
  </component>
</template>
<script setup>
const emit = defineEmits(['open'])
import RegistrationDialog from "@/academy/components/V2/RegistrationDialog.vue";
import PreRegistrationDialog from "@/academy/components/V2/PreRegistrationDialog.vue";

const props = defineProps({
  item: Object,
  context: String,
});

const openDialog = (open) => {
  open(props.context)
  emit('open')
}
</script>
