<template>
  <v-dialog
    v-model="store.dialog"
    id="dialog-form"
    persistent
    :width="mdAndUp ? '640' : '100%'"
    :fullscreen="mdAndUp ? false : true"
    class="text-body-1"
  >
    <template v-slot:activator="{ props }">
      <v-btn
        v-show="addNewItem"
        :color="buttonColor"
        class="text-button"
        size="large"
        @click="$emit('show:dialog')"
        v-bind="props"
      >
        {{ $t(buttonTitle) }}
      </v-btn>
    </template>
    <v-form @submit.prevent="submit" ref="form" class="h-100">
      <v-card class="h-100">
        <div class="d-flex align-center justify-space-between mb-4">
          <div class="px-2">
            <v-card-title class="pb-0">
              <span class="text-h5">{{ $t(title) }}</span>
            </v-card-title>
            <v-card-subtitle>
              <span class="text-body-2">{{ $t(subtitle) }}</span>
            </v-card-subtitle>
          </div>
          <v-btn icon="custom:x" flat @click="close" />
        </div>
        <v-card-text class="pt-0">
          <v-row no-gutters>
            <template v-for="(item, index) in store.editForm" :key="index">
              <v-col
                class="d-flex align-center px-1"
                :cols="item.sm || item.size"
                :md="item.md || item.size"
                :lg="item.size"
                v-if="showFormItem(item)"
              >
                <div
                  v-if="item.type === 'label'"
                  class="text-body-2 font-weight-bold d-flex"
                  :class="{ ' justify-space-between w-100': item.spaceBetween }"
                >
                  <p
                    class="me-1"
                    :class="
                      item?.color
                        ? `text-${item?.color}`
                        : 'text-text-low-emphasis '
                    "
                  >
                    {{ $t(item.label) }}
                  </p>
                  <span class="text-text-heding"> {{ item?.modelValue }}</span>
                </div>
                <div v-if="item.type === 'divider'" class="w-100 mb-4 mt-2">
                  <v-divider></v-divider>
                  <!-- <span class="text-text-heding"> {{ item?.modelValue }}</span> -->
                </div>
                <v-text-field
                  v-if="item.type === 'text-field'"
                  v-model="item.modelValue"
                  @update:model-value="computedValue(item)"
                  :rules="
                    item?.validations
                      ? $rules(
                          { [item.name]: item?.validations },
                          item.modelValue
                        )
                      : ''
                  "
                  flat
                  base-color="n300"
                  :type="item.textFieldType || 'text'"
                  density="compact"
                  :hint="item.hint"
                  :hide-details="!item.hint"
                  variant="solo-filled"
                  :label="$t(item.label)"
                  :readonly="item.readonly"
                  persistent-placeholder
                  class="outside-label mb-4"
                  persistent-hint
                ></v-text-field>
                <div
                  v-if="item.type === 'select'"
                  class="d-flex flex-column w-100"
                >
                  <span class="text-body-2 text-text-low-emphasis">{{
                    $t(item.label)
                  }}</span>
                  <v-select
                    v-model="item.modelValue"
                    :item-title="item.selectTitle"
                    :item-value="item.selectValue"
                    :rules="
                      item?.validations
                        ? $rules(
                            { [item.name]: item?.validations },
                            item.modelValue
                          )
                        : ''
                    "
                    flat
                    class="mb-4"
                    :items="item.items"
                    base-color="n300"
                    density="compact"
                    :hint="item.hint"
                    :hide-details="!item.hint"
                    :readonly="item.readonly"
                    variant="solo-filled"
                    :placeholder="$t(item.label)"
                    persistent-placeholder
                    persistent-hint
                  >
                    <template v-slot:append-inner>
                      <v-icon icon="custom:caretDownSolid" size="12" />
                    </template>
                    <template v-slot:selection="{ item }">
                      {{ $t(item.title) }}
                    </template>
                    <template v-slot:item="{ props, item }">
                      <v-list-item
                        v-bind="props"
                        :title="$t(item.title)"
                      ></v-list-item>
                    </template>
                  </v-select>
                </div>
                <v-textarea
                  v-if="item.type === 'text-area'"
                  v-model="item.modelValue"
                  @update:model-value="computedValue(item)"
                  flat
                  no-resize
                  :rows="item.rows"
                  :rules="
                    item?.validations
                      ? $rules(
                          { [item.name]: item?.validations },
                          item.modelValue
                        )
                      : ''
                  "
                  base-color="n300"
                  density="compact"
                  :hint="item.hint"
                  variant="solo-filled"
                  :label="$t(item.label)"
                  class="outside-label mb-4"
                  persistent-placeholder
                  persistent-hint
                  :readonly="item.readonly"
                  :hide-details="!item.hint"
                ></v-textarea>
                <div
                  v-if="item.type === 'uploader'"
                  class="d-flex align-center"
                >
                  <span
                    v-if="item.title"
                    class="nowrap text-text-low-emphasis text-body-2"
                    style="white-space: nowrap"
                    >{{ $t(item.title) }}</span
                  >
                  <app-uploader
                    ref="uploader"
                    :upload-path="item.uploadPath"
                    v-model="item.modelValue"
                    :multiple="item?.multiple"
                    v-model:max="max"
                    :round-images="item.roundImages || false"
                    :has-start-button="item.hasStartButton"
                    :size="40"
                    class="me-2"
                  ></app-uploader>
                </div>
                <v-btn
                  v-if="item.type === 'button'"
                  :color="item.color"
                  :icon="item.icon"
                  :size="item.buttonSize || 'default'"
                  :variant="item.variant"
                  :text="item.icon ? '' : $t(item.label)"
                  :prepend-icon="item.prependIcon"
                  :append-icon="item.appendIcon"
                  @click="item.function()"
                >
                </v-btn>
                <div
                  class="w-100 me-1 align-self-baseline"
                  v-if="item.type == 'date-picker'"
                >
                  <div
                    class="text-text-low-emphasis text-body-2"
                    style="margin-bottom: 3px"
                  >
                    {{ $t(item.label) }}
                  </div>
                  <input
                    type="text"
                    class="custom-input bg-n050 rounded px-4 py-2 w-100"
                    style="height: 46px"
                    :value="item.modelValue"
                  />
                  <date-picker
                    auto-submit
                    color="rgba(var(--v-theme-primary-base))"
                    v-model="item.modelValue"
                    custom-input=".custom-input"
                    format="YYYY-MM-DD"
                    simple
                    display-format="jYYYY-jMM-jDD"
                    popover="bottom-left"
                  ></date-picker>
                </div>
                <div
                  v-if="item.type === 'radio'"
                  :class="{
                    'd-flex justify-space-between w-100': item.spaceBetween,
                  }"
                >
                  <div>{{ $t(item.label) }}</div>
                  <div>
                    <v-spacer />
                    <v-radio-group v-model="item.modelValue" :inline="item.inline">
                      <v-radio
                        v-for="option in item.options"
                        :key="option.key"
                        :label="$t(option.label)"
                        :value="option.key"
                        class="ms-3"
                        :color="item.modelValue == option.key ? 'primary-base' : ''"
                        :class="{'bg-primary-lighten1 text-primary-base rounded-lg py-1 px-2': item.modelValue == option.key}"
                        false-icon="custom:radioFalse"
                        true-icon="custom:radioTrue"
                      >
                    </v-radio>
                    </v-radio-group>
                  </div>
                </div>
                <div v-if="item.type == 'slot'" class="w-100">
                  <!-- <template v-slot:[item.name]="slotProps"></template> -->
                  <slot :name="item.name"></slot>
                </div>
              </v-col>
            </template>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-container class="pt-0 d-flex justify-end">
            <slot name="formActions">
              <v-btn
                color="background-primary"
                class="text-button"
                :disabled="sharedStore.sendingRequest"
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
import { useSharedPanelStore } from "@core/stores/sharedPanel";
let sharedStore = useSharedPanelStore();
let form = ref(null);
import { useDisplay } from "vuetify";
const { mdAndUp } = useDisplay();
let { $rules } = useNuxtApp();
const props = defineProps({
  title: String,
  subtitle: String,
  buttonTitle: String,
  buttonColor: { type: String, default: "primary-base" },
  saveTitle: String,
  addNewItem: { type: Boolean, default: true },
  store: Object,
  slugGeneratorTitle: { type: String, default: "title" },
});
let computedValue = (item) => {
  if (item.name == props.slugGeneratorTitle) {
    let slug = props.store.editForm.find((element) => element.name == "slug");
    if (slug) slug.modelValue = sharedStore.slugGenerator(item?.modelValue);
  }
};
let max = computed({
  get() {
    let uploader = props.store.editForm.find(
      (item) => item.type === "uploader"
    );
    if (props.store.edit) {
      if (!uploader.multiple) {
        console.log("mmaxx",uploader.maxImage);
        if (Object.keys(uploader.modelValue).includes("url")) return 0;
        else return 1;
      }
    }
    console.log("not edit", uploader.maxImage, uploader.modelValue);
    return uploader.maxImage;
  },
  set(value) {
    let uploader = props.store.editForm.find(
      (item) => item.type === "uploader"
    );
    if (uploader?.multiple) {
      uploader.maxImage = value;
    }
  },
});
let emit = defineEmits(["update:dialog", "update:fields", "show:dialog", "close:dialog"]);
let submit = async () => {
  const { valid } = await form.value.validate();
  console.log("yeyeyyyeuuue", valid);
  if (valid) {
    emit("update:fields");
    sharedStore.sendingRequest = true;
  }
};
const showFormItem = (item) => {
  if (Object.keys(item).includes("show")) {
    return item.show;
  } else {
    return true;
  }
};
const close = () => {
  props.store.closeDialog();
  emit('close:dialog')
};
// defineExpose({ close });
</script>

<style lang="scss">
#dialog-form {
  .vpd-is-popover[data-placement="bottom-left"] .vpd-container {
    top: -45px !important;
  }
}
</style>
