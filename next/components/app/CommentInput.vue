<template>
  <v-card id="comment-input">
    <v-card-title class="text-h4 text-text-heading pa-0">
      {{ $t("write_your_comments") }}
    </v-card-title>
    <template v-if="Object.keys(replyTo).length">
      <app-comment
        :item="replyTo"
        @reply="replyTo = {}"
        action-btn-text="cancel_replying"
        action-color="text-low-emphasis"
      ></app-comment>
      <span class="text-h4 text-text-heading">{{ $t("replying") }}</span>
    </template>
    <v-card-text class="py-md-4 pt-4 pb-2 px-0">
      <v-textarea
        :model-value="modelValue"
        @update:modelValue="update($event)"
        hide-details
        :label="$t('your_comment')"
        color="n400"
        flat
        rows="1"
        no-resize
        auto-grow
        class="pt-0 rounded-lg"
        style="border: 1px solid rgba(var(--v-theme-n400));"
      >
        <template #prepend-inner v-if="!smAndDown">
          <v-avatar size="32">
            <v-img
              :src="authStore?.user?.avatarUrl"
              :alt="authStore?.user?.displayName"
            ></v-img>
          </v-avatar>
        </template>
      </v-textarea>
    </v-card-text>
    <v-card-actions class="px-0">
      <v-spacer></v-spacer>
      <v-btn
        :disabled="!modelValue"
        @click="submit"
        class="text-button"
        variant="flat"
        :color="modelValue ? 'primary-base' : 'n200'"
      >
        <span class="px-md-8 px-2" :class="modelValue ? 'white' : 'text-n400'">
          {{ $t("write_comment") }}
        </span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { useAuthStore } from "@core/stores/auth";
const emit = defineEmits(["submit", "update:modelValue"]);
import { useDisplay } from "vuetify";
const { smAndDown } = useDisplay();
const props = defineProps({
  modelValue: String,
  replyTo: Object,
});
const authStore = useAuthStore();

const submit = () => {
  emit("submit", props.modelValue);
};

const update = ($event) => {
  emit("update:modelValue", $event);
};
</script>

<style lang="scss">
#comment-input {
  .v-field__overlay {
    background-color: transparent;
  }
}
</style>
