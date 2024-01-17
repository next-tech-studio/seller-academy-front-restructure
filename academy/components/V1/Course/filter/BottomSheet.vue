import { set } from 'nuxt/dist/app/compat/capi'; import { Script } from 'vm';
<template>
  <v-btn flat rounded @click="sheet = !sheet">
    <v-icon icon="custom:filter"></v-icon>
    <span class="mx-2">{{ $t("filters") }}</span>
    <v-icon size="x-small" icon="custom:caretDownSolid"></v-icon>
  </v-btn>
  <v-bottom-sheet v-model="sheet">
    <v-card class="rounded-t-md">
      <v-list v-if="!showed" lines="one" density="compact">
        <v-list-item>
          <div class="d-flex justify-space-between">
            <span>{{ $t("filters") }}</span>
            <v-icon @click="close" size="small" icon="custom:x"></v-icon>
          </div>
        </v-list-item>
        <v-list-item
          v-for="(value, key) in items"
          :key="key"
          @click="setShowed(key)"
        >
          <div class="d-flex justify-space-between">
            <span>{{ $t(value.title) }}</span>
            <v-icon size="small" icon="custom:chevronLeftLight"></v-icon>
          </div>
        </v-list-item>
      </v-list>
      <course-filter
        v-else
        class="mt-2"
        :items="items[showed]"
        v-model="model[showed].model"
      >
        <template #title>
          <v-card-title class="text-body-1 font-weight-bold text-text-heading">
            <div>
              <v-btn
                class="me-2"
                density="compact"
                size="small"
                flat
                icon="custom:arrowRight"
                @click="back"
              ></v-btn>
              <span>
                {{ $t(items[showed].title) }}
              </span>
            </div>
          </v-card-title>
        </template>
      </course-filter>
    </v-card>
  </v-bottom-sheet>
</template>

<script setup>
// import { VBottomSheet } from "vuetify/labs/VBottomSheet";
// const emit = defineEmits(['update:modelValue'])
const sheet = ref(false);
const showed = ref(null);
const props = defineProps({
  items: Array,
  modelValue: [Object, String, Number],
});
// const model = ref(null)
const model = computed({
  get: () => props.modelValue,
  set: (newValue) => emit("update:modelValue", newValue),
});
const close = () => {
  sheet.value = false;
  showed.value = null;
};
const back = () => {
  showed.value = null;
}
const setShowed = (key) => {
  console.log(key);
  showed.value = key;
};
</script>
