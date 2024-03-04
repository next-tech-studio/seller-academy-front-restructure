<template>
  <v-card color="background-light" :rounded="mdAndUp ? 'lg' : 0">
    <v-card-actions class="py-lg-3 py-1">
      <v-list-item class="w-100">
        <template v-slot:prepend>
          <v-avatar
            :size="mdAndUp ? 104 : 48"
            color="grey-darken-3"
            :image="auth?.user?.avatarUrl?.url || auth?.user?.avatarUrl"
          ></v-avatar>
        </template>

        <v-list-item-title class="text-lg-h4 text-h5 text-text-heading">
          {{ auth?.user?.name }}
        </v-list-item-title>

        <v-list-item-subtitle class="text-lg-body-1 text-body-2 text-text-high-emphasis">
          {{ auth.user.roles[0] }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-card-actions>
    <v-card-text class="py-0">
      <v-divider></v-divider>
    </v-card-text>
    <v-card-text class="py-lg-3 py-1">
      <v-tabs
        v-model="tab"
        selected-class="text-button-primary"
        hide-slider
        height="48"
        mandatory
      >
        <v-tab
          v-for="(value, key) of items"
          :key="key"
          :value="key"
          class="text-text-disabled"
          min-width="fit-content"
          >{{ $t(key) }}</v-tab
        >
        <!-- <v-tab :value="2" class="text-text-disabled">{{ $t("completed") }}</v-tab>
        <v-tab :value="3" class="text-text-disabled">{{ $t("not_completed") }}</v-tab>
        <v-tab :value="4" class="text-text-disabled">{{ $t("saved") }}</v-tab> -->
      </v-tabs>
    </v-card-text>
  </v-card>
  <v-card class="mt-6 rounded-lg">
    <v-window v-model="tab" class="py-2">
      <v-window-item v-for="(value, key) of items" :key="key" :value="key">
        <template v-for="item in value" :key="item.id">
          <v-card-text class="py-2">
            <course-card-horizontal :item="item" />
          </v-card-text>
        </template>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script setup>
import { useAuthStore } from "@core/stores/auth";
import { useDisplay } from "vuetify";
const { lgAndUp, mdAndUp } = useDisplay();
const auth = useAuthStore();
let tab = ref(0);
const props = defineProps({
  items: Object,
});
</script>
