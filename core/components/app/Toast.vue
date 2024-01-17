<template>
  <v-snackbar theme="dark" right top v-model="toast.visible" v-bind="toast.config" :icon="toast.config.icon">
    <!-- {{ $t(toast.config.text) || ''}} -->
    <template #actions>
        <v-btn @click="toast.hide" icon="custom:x"></v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { useToastStore } from '~/stores/toast';
const toast = useToastStore()
</script>
