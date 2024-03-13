<template>
  <v-btn flat width="100%" class="d-flex justify-start pa-0" @click="$emit('update:newsection')">
    <v-icon icon="custom:plus" class="me-3" size="24"/>
    <span class="text-h5">{{ $t("editor.add_new_section") }}</span></v-btn
  >
</template>
