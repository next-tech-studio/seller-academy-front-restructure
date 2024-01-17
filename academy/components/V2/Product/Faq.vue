<template>
  <v-card id="faq">
    <v-card-text>
      <div class="text-h2 text-text-heading">{{ $t("faq") }}</div>

      <v-expansion-panels>
        <v-expansion-panel
          v-for="(item, index) in items"
          :key="index"
          style="
            border: 1px solid rgba(var(--v-theme-n200)) !important;
            border-radius: 8px !important;
            margin-top: 24px;
          "
          collapse-icon="custom:chevronTop"
          expand-icon="custom:chevronDown"
        >
          <template #title>
            <span class="text-text-low-emphasis text-body-1 font-weight-bold">{{
              item.title
            }}</span>
          </template>
          <template #text>
            <span class="text-text-low-emphasis text-body-2">{{
              item.text
            }}</span>
          </template>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>
  </v-card>
</template>

<script setup>
const props = defineProps({
  items: Array,
});
</script>

<style lang="scss">
#faq .v-expansion-panel__shadow {
  box-shadow: none;
}

::before,
::after {
  border: none !important;
}

#faq .v-expansion-panel-title--active > .v-expansion-panel-title__overlay,
#faq
  .v-expansion-panel-title[aria-haspopup="menu"][aria-expanded="true"]
  > #faq
  .v-expansion-panel-title__overlay {
  opacity: 0 !important;
}
</style>
