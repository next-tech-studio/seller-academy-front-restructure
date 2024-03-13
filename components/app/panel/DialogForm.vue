<template>
  <v-dialog
    v-model="panel.listingDialog"
    persistent
    width="640"
    class="text-body-1"
  >
    <template v-slot:activator="{ props }">
      <v-btn
        v-show="addNewItem"
        :color="buttonColor"
        class="text-button"
        size="large"
        @click="$emit('init:form')"
        v-bind="props"
      >
        {{ $t(buttonTitle) }}
      </v-btn>
    </template>
    <v-form @submit.prevent="submit" ref="form">
      <v-card>
        <div class="d-flex align-center justify-space-between">
          <div>
            <v-card-title class="pb-0">
              <span class="text-h5">{{ $t(title) }}</span>
            </v-card-title>
            <v-card-subtitle>
              <span class="text-body-2">{{ $t(subtitle) }}</span>
            </v-card-subtitle>
          </div>
          <v-btn icon="custom:x" flat @click="close" />
        </div>
        <v-card-text>
          <v-row>
            <v-col
              :cols="item.size"
              v-for="(item, index) in panel.listingEditForm"
              :key="index"
            >
              <div
                v-if="item.type === 'label'"
                class="text-body-2 font-weight-bold"
              >
                <span class="text-text-low-emphasis me-1"
                  >{{ $t(item.label) }}
                </span>
                <span class="text-text-heding"> {{ item.modelValue }}</span>
              </div>
              <v-text-field
                v-if="item.type === 'text-field'"
                v-model="item.modelValue"
                flat
                base-color="n300"
                density="compact"
                :hint="item.hint"
                :hide-details="item.hint"
                variant="solo-filled"
                :label="$t(item.label)"
                persistent-placeholder
                class="outside-label"
                persistent-hint
              ></v-text-field>
              <v-select
                v-if="item.type === 'select'"
                v-model="item.modelValue"
                flat
                :items="item.items"
                base-color="n300"
                density="compact"
                :hint="item.hint"
                variant="solo-filled"
                :label="$t(item.label)"
                persistent-placeholder
                persistent-hint
              >
                <template v-slot:append-inner>
                  <v-icon icon="custom:caretDownSolid" size="12" /> </template
              ></v-select>
              <v-textarea
                v-if="item.type === 'text-area'"
                v-model="item.modelValue"
                flat
                no-resize
                base-color="n300"
                density="compact"
                :hint="item.hint"
                variant="solo-filled"
                :label="$t(item.label)"
                class="outside-label"
                persistent-placeholder
                persistent-hint
                :hide-details="!item.hint"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-container class="pt-0 d-flex justify-end">
            <slot name="formActions">
              <v-btn
                color="background-primary"
                class="text-button"
                type="submit"
                variant="flat"
              >
                {{ $t(saveTitle) }}
              </v-btn>
            </slot>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>
<script setup>
import { usePanelStore } from "~/stores/panel";
let panel = usePanelStore();
let form = ref(null);
let { $rules } = useNuxtApp();
let props = defineProps({
  title: String,
  subtitle: String,
  buttonTitle: String,
  saveTitle: String,
  dialog: Boolean,
  addNewItem: { type: Boolean, default: true },
  buttonColor: {
    type: String,
    default: "background-primary",
  },
});
let emit = defineEmits(["update:dialog", "update:fields", "init:form"]);

let submit = async () => {
  const { valid } = await form.value.validate();
  if (valid) emit("update:fields");
};
const close = () => {
  panel.closeDialog();
};

const open = () => {
  panel.listingDialog = true;
};
defineExpose({ close, open });

let rules = (item) => {
  if (item.validations.some((validation) => validation.title === "required"))
    return $rules({ modelValue: "required" }, item.modelValue);
  else if (
    item.validations.some((validation) => validation.title === "length")
  ) {
    return $rules(
      { modelValue: "digits_between:0," + item.validations[0].value },
      item.modelValue
    );
  }
};
</script>
