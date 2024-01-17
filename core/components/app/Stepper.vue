<template>
  <div class="d-flex justify-space-between mb-6">
    <v-timeline
      direction="horizontal"
      density="compact"
      :height="20"
      align="start"
      class="mt-4 w-50"
      truncate-line="end"
    >
      <v-timeline-item
        :dot-color="
          store.step <= item.value ? 'background-dark' : 'background-primary'
        "
        :line-color="
          store.step <= item.value ? 'background-light' : 'background-primary'
        "
        density="compact"
        heigh="fit-content"
        :fill-dot="store.step > item.value ? true : false"
        size="small"
        :style="dotBorderColor(item.value)"
        v-for="(item, index) in store.steps[type]"
        :key="index"
      >
        <span
          class="text-body-2"
          :class="
            store.step >= item.value
              ? 'text-text-high-emphasis'
              : 'text-text-disabled'
          "
          >{{ $t(item.title) }}</span
        >
        <template v-slot:icon>
          <span class="dot" v-if="store.step === item.value"></span>
          <v-icon icon="custom:check" v-if="store.step > item.value" />
        </template>
      </v-timeline-item>
    </v-timeline>
    <slot :next="changeStep" />
  </div>
</template>
<script setup>
const props = defineProps(["store", "type"]);
let emit = defineEmits(["update:modelValue"]);
const localePath = useLocalePath();

const changeStep = (next, id) => {
  if (next && props.store.step != props.store.steps[props.type].length) {
    props.store.setStep(props.store.step + 1);
    navigateTo(
      localePath({
        name: props.store.steps[props.type][props.store.step].to,
        params: { id: id },
      })
    );
  } else if (!next && props.store.step == props.store.steps[props.type].length) {
    props.store.setStep(props.store.step - 1);
    navigateTo(
      localePath({
        name: props.store.steps[props.type][props.store.step].to,
        params: { id: id },
      })
    );
  } else if (!next && props.store.step != 1) {

    props.store.setStep(props.store.step - 1);
    navigateTo(
      localePath({
        name: props.store.steps[props.type][props.store.step].to,
        params: { id: id },
      }),
      { external: true }
    );
  }
};

let dotBorderColor = (index) => {
  return {
    "--dot-border-color":
      props.store.step <= index - 1
        ? "var(--v-theme-icon-disabled)"
        : "var(--v-theme-icon-primary)",
    "--timeline-line-color":
      props.store.step <= index
        ? "var(--v-theme-n300)"
        : "var(--v-theme-background-primary)",
  };
};
</script>

<style soped>
.dot {
  height: 10px !important;
  width: 10px !important;
  background-color: rgb(var(--v-theme-icon-primary)) !important;
  border-radius: 50% !important;
}
.v-timeline--align-start
  .v-timeline-item:first-child
  .v-timeline-divider__after {
  --v-timeline-line-size-offset: 30px !important;
}
.v-timeline--align-start
  .v-timeline-item:first-child
  .v-timeline-divider__before {
  --v-timeline-line-size-offset: 0px !important;
}
.v-timeline--horizontal.v-timeline--align-start
  .v-timeline-divider
  .v-timeline-divider__before {
  width: 0 !important;
}
.v-timeline--align-start {
  --v-timeline-line-size-offset: 30px !important;
}
.v-timeline--horizontal.v-timeline {
  grid-column-gap: 0px !important;
}
.v-timeline-item__body {
  padding: 0 !important;
}
.v-timeline .v-timeline-divider__dot {
  background: rgba(var(--dot-border-color)) !important;
}
.v-timeline-divider__after {
  background: rgba(var(--timeline-line-color)) !important;
}
.v-timeline--horizontal.v-timeline
  .v-timeline-item:first-child
  .v-timeline-item__body {
  padding: 0 24px 0 0 !important;
}

.v-locale--is-rtl
  .v-timeline--horizontal
  .v-timeline-item:first-child
  .v-timeline-divider__after {
  left: unset !important;
  right: unset !important;
}
.v-timeline-divider__dot--size-small .v-timeline-divider__inner-dot {
  height: calc(100% - 4px) !important;
  width: calc(100% - 4px) !important;
}
</style>
