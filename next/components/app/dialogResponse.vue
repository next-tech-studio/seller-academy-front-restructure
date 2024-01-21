<template>
  <v-dialog
    v-model="mutedShow"
    :fullscreen="lgAndUp ? false : true"
    width="500"
  >
    <v-card>
      <v-card-text class="text-center">
        <div class="d-flex justify-space-between">
          <div class="text-subtitle text-text-high-emphasis">
            {{ $t(title) }}
          </div>
          <v-btn @click="$emit('update:show', false)" size="24" icon variant="outlined">
            <v-icon icon="custom:x" size="12"></v-icon>
          </v-btn>
        </div>
        <v-btn flat size="48" icon :color="type?.color">
          <v-icon size="24" :icon="type?.icon"></v-icon>
        </v-btn>
        <div class="my-4 text-text-low-emphasis text-body-2">
          {{ $t(text) }}
        </div>
        <v-btn @click="$emit('update:show', false)" color="primary-base">{{
          $t("close")
        }}</v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
const emit = defineEmits(['update:show'])
import { useDisplay } from "vuetify";
const { lgAndUp } = useDisplay();
const props = defineProps({
  show: false,
  type: "success",
  title: "title",
  text: "text",
});
let mutedShow = computed({
  get: () => props.show,
  set: (value) => emit('update:show', value)
})
const type = computed(() => {
  let value;
  if (props.type == "success") {
    value = {
      color: "success",
      icon: "custom:check",
    };
  } else if (props.type == "error") {
    value = {
      color: "error",
      icon: "custom:x",
    };
  }
  return value;
});
</script>
