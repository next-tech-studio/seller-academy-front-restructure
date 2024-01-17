<template>
  <v-card rounded="lg" color="transparent">
    <div class="bg-n800 rounded-lg pa-6 pb-8">
      <div>
        <div class="d-flex align-center">
          <v-avatar v-if="icon">
            <v-img :src="icon"></v-img>
          </v-avatar>
          <span class="text-h2 text-text-light ms-2">{{ title }}</span>
        </div>
        <span class="text-text-disabled text-body-1">{{ description }}</span>
      </div>
    </div>
    <v-card class="mx-4 mt-n3">
      <app-content-faq
        gap="16"
        density="compact"
        hide-title
        :content="items"
      />
    </v-card>
  </v-card>
</template>

<script setup>
const props = defineProps({
  items: Array,
  title: {
    default: "",
    type: String,
  },
  description: {
    default: "",
    type: String,
  },
  icon: {
    type: String,
    default: '/images/box-out.svg'
  }
});
</script>
