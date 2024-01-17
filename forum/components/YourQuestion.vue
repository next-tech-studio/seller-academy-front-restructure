<template>
    <v-card v-show="authStore.user.loggedIn" id="question-form">
      <v-card-title
        class="text-body-1 text-text-low-emphasis"
      >
        <div class="d-flex justify-space-between">
          <div>
            <v-avatar class="me-1">
              <v-img :src="authStore.user.avatarUrl" />
            </v-avatar>
            {{ $t('ask_or_search') }}
          </div>
          <v-btn
            color="button-primary"
            variant="flat"
            class="text-button"
            @click = "$emit('open:questionDialog')"
          >
            {{ $t('submit_question') }}
          </v-btn> 
        </div>
      </v-card-title>
      </v-card>
  </template>
  
  <script setup>
  import { useAuthStore } from "@core/stores/auth";
  const authStore = useAuthStore();
  </script>
  