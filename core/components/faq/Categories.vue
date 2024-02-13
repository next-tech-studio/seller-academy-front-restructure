<template>
  <div class="text-h2 text-text-heading mb-7">دسته‌بندی پرسش‌ها</div>
  <v-row>
    <v-col cols="12" lg="3" md="6" v-for="(item, index) in items" :key="index">
      <v-card align="center" @click="$emit('choose:category',item)">
        <v-card-text class="d-md-block d-flex">
          <v-avatar :image="item.avatarUrl" :size="mdAndUp ? 100 : 48"/>
          <!-- <v-icon :size="mdAndUp ? 100 : 48" :icon="item.icon"></v-icon> -->
          <div
            class="text-text-heading text-h4 d-flex align-center justify-center"
            :class="{
              'w-100 justify-space-between align-center ms-2': !mdAndUp,
            }"
          >
        
            <div class="text-truncate">{{ item.title }} ({{ item?.faqCount }} پرسش)</div>
            <v-icon class="ms-2" size="small" icon="custom:arrowLeft"></v-icon>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { useDisplay } from "vuetify";

const { mdAndUp } = useDisplay();
const props = defineProps({
  items: Array,

});
</script>
