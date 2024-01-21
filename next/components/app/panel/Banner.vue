<template>
  <div
    class="bg-primary-base rounded-lg overflow-hidden pa-4 position-relative"
    id="editor-banner"
  >
    <div class="position size">
      <v-btn
        size="x-small"
        v-if="!expandedSearch"
        icon
        variant="flat"
        class="mt-3"
        @click="expandedSearch = !expandedSearch"
        color="secondary-lighten1"
      >
        <v-icon color="icon-light" icon="custom:link" />
      </v-btn>
      <div class="d-flex align-center h-100" v-if="expandedSearch">
        <v-text-field
          v-model="value.link"
          flat
          :class="
            expandedSearch
              ? 'search-input search-input--active'
              :''
          "
          label="لینک بنر"
          hide-details
          :clearable="true"
          direction="ltr"
          clear-icon="custom:x"
          density="compact"
          base-color="text-low-emphasis"
          variant="tonal"
          rounded
          bg-color="background-light"
          single-line
        >
          <template v-slot:prepend-inner>
            <v-icon
              size="x-small"
              color="icon-high-emphasis"
              icon="custom:link"
            />
          </template>
        </v-text-field>
      </div>
    </div>
    <v-text-field
      :placeholder="$t('editor.add_banner_title')"
      bg-color="background-primary"
      variant="solo"
      flat
      hide-details
      v-model="value.title"
    ></v-text-field>
    <v-text-field
      :placeholder="$t('editor.add_banner_description')"
      bg-color="background-primary"
      variant="solo"
      hide-details
      flat
      v-model="value.description"
    ></v-text-field>
  </div>
</template>

<script setup>
let expandedSearch = ref(false);
let emit = defineEmits(["update:modelValue"]);
let props = defineProps({
  modelValue: Object,
});
let value = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit("upate:modelValue", newValue);
  },
});
</script>

<style lang="scss">
#editor-banner {
  .v-text-field input {
    text-align: center !important;
  }
  .size {
  height: 60px;
}
.position{
  position:absolute;
  top:0;
  left:1%;
  z-index: 1;
}
}
</style>
