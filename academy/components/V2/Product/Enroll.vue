<template>
  <v-card rounded="0" color="primary-base">
    <v-container fluid>
      <div class="d-flex justify-space-between">
        <div>
          <div class="d-flex align-center">
            <span class="text-h3 text-text-light pe-2">{{ item?.title }}</span>
            <v-btn height="40" flat color="primary-darken1" class="ps-2 pe-4">
              <v-icon
                size="24"
                icon="custom:star"
                color="icon-hint-caution"
                class="mt-1"
              ></v-icon>
              <span class="me-1">{{ item?.rate }}</span>
              <span class="text-text-light text-caption">{{
                $t("based_on_previous_course")
              }}</span>
            </v-btn>
          </div>
          <app-breadcrumbs
            class="pa-0"
            color="text-light"
            page="academyProduct"
            :data="item"
          />
        </div>
        <div class="d-flex align-center">
          <app-share-in class="text-caption me-6" :hide-title="false" />
          <registration
            :item="item"
            context="enroll"
            @submit="$emit('submit')"
            @open="open"
          />
        </div>
      </div>
    </v-container>
  </v-card>
</template>

<script setup>
import { useSharedPanelStore } from "@core/stores/sharedPanel";
const sharedStore = useSharedPanelStore();
const props = defineProps({
  item: {
    type: Object,
    default: () => {},
  },
});
const open = () => {
  sharedStore.currentContext = "description"
}
</script>
