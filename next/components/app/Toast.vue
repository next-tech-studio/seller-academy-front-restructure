<template>
  <v-snackbar theme="dark" right top v-model="toast.visible" v-bind="toast.config" :text="$t(toast.config.text)" :icon="toast.config.icon">
    <template #actions>
        <v-btn @click="toast.hide" icon="custom:x"></v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { useToastStore } from '~/stores/toast';
const toast = useToastStore()
</script>
