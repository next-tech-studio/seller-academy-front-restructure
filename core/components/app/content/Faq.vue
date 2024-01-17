<template>
  <v-card id="faq" :class="{ colored: colored, text__borderd: borderedText }">
    <v-card-text class="pa-sm-auto" :class="parrentPadding">
      <div class="text-h2 text-text-heading mb-6" v-if="!hideTitle">
        {{ $t("faq") }}
      </div>

      <v-expansion-panels>
        <v-expansion-panel
          v-for="(item, index) in mutedContent"
          :key="index"
          :style="`
            border: ${
              bordered ? '1px solid rgba(var(--v-theme-n200)) !important' : ''
            };
            border-radius: 8px !important;
            margin-top: ${index != 0 ? gap : 0}px`"
        >
          <v-expansion-panel-title
            :style="dynamicStyle()"
            class="py-1 px-2"
            collapse-icon="custom:chevronTop"
            expand-icon="custom:chevronDown"
          >
            <template
              #actions="{
                expanded,
                collapseIcon = 'custom:chevronTop',
                expandIcon = 'custom:chevronDown',
              }"
            >
              <v-icon
              class="mx-2"
                v-if="iconPostion === 'end'"
                :icon="expanded ? collapseIcon : expandIcon"
              ></v-icon>
              <slot name="actions" :expanded="expanded" :item="item" :index="index"> </slot>
            </template>

            <slot name="title" :item="item" :index="index">
              <span
                v-if="iconPostion === 'end'"
                class="text-text-low-emphasis px-2 text-body-1 font-weight-bold"
                :class="density == 'compact' ? '' : 'py-4'"
                style="white-space: nowrap"
                >{{ item.question }}</span
              >
            </slot>
          </v-expansion-panel-title>
          <v-expansion-panel-text class="px-2 pb-2">
            <div v-if="hasExtraDesc" class="mb-4">
              {{ item.description }}
            </div>
            <div
              v-if="borderedText && item"
              variant="outlined"
              class="rounded"
              style="border: 1px solid rgba(var(--v-theme-n200)) !important"
            >
              <slot name="text" :item="item" :index="index">
                <span class="text-text-low-emphasis text-body-2">{{
                  item.answers
                }}</span>
              </slot>
            </div>
            <slot v-else name="text" :item="item">
              <span class="text-text-low-emphasis text-body-2 px-2">{{
                item.answers
              }}</span>
            </slot>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>
  </v-card>
</template>

<script setup>
const props = defineProps({
  content: Object,
  colored: {
    default: false,
    type: Boolean,
  },
  bordered: {
    default: true,
    type: Boolean,
  },
  borderedText: {
    default: false,
    type: Boolean,
  },
  gap: {
    default: "24",
    type: String,
  },
  hideTitle: {
    default: false,
    type: Boolean,
  },
  hasExtraDesc: {
    default: false,
    type: Boolean,
  },
  iconPostion: {
    default: "end",
    type: String,
  },
  parrentPadding:{
    default:'pa-lg-4',
    type: String,
  },
  density: String
});
let dynamicStyle = () => {
  console.log(props.iconPostion);
  return {
    "--expansion-panel-icon-position":
      props.iconPostion === "start" ? "absolute" : "relative",
    "--expansion-panel-icon-width":
      props.iconPostion === "start" ? "100%" : "auto",
  };
};
const mutedContent = computed(() => props.content.faq || props.content)
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
#faq.colored .v-expansion-panel-title {
  background-color: rgba(var(--v-theme-text-secondary));
  color: white;
  border-radius: 8px;
}
#faq .v-expansion-panel-text__wrapper {
  padding: 0;
  margin-top: 8px;
}
#faq .v-expansion-panel-title__icon {
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: var(--expansion-panel-icon-width);
  position: var(--expansion-panel-icon-position);
}
</style>
