<template>
  <slot v-if="lgAndUp"></slot>
  <v-dialog v-else fullscreen v-model="sheet" class="mt-16" :scrim="false">
    <v-card color="background-dark">
      <div class="py-4">
        <v-btn :block="false" variant="text" @click="sheet = false">
          <v-icon class="me-2" icon="custom:arrowRight"></v-icon>
          {{ $t("back") }}
        </v-btn>
      </div>
      <slot></slot>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { useDisplay } from "vuetify";
const { lgAndUp } = useDisplay();
let sheet = ref(true);
</script>
