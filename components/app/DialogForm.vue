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
            <template v-for="(element, index) in store.editForm" :key="index">
              <v-col
                class="d-flex align-center px-1"
                :cols="element.sm || element.size"
                :md="element.md || element.size"
                :lg="element.size"
                v-if="showFormItem(element)"
              >
                <div
                  v-if="element.type === 'label'"
                  class="text-body-2 font-weight-bold d-flex"
                  :class="{ ' justify-space-between w-100': element.spaceBetween }"
                >
                  <p
                    class="me-1"
                    :class="
                      element?.color
                        ? `text-${element?.color}`
                        : 'text-text-low-emphasis '
                    "
                  >
                    {{ $t(element.label) }}
                  </p>
                  <span class="text-text-heding"> {{ element?.modelValue }}</span>
                </div>
                <div v-if="element.type === 'divider'" class="w-100 mb-4 mt-2">
                  <v-divider></v-divider>
                  <!-- <span class="text-text-heding"> {{ element?.modelValue }}</span> -->
                </div>
                <v-text-field
                  v-if="element.type === 'text-field'"
                  v-model="element.modelValue"
                  @update:model-value="computedValue(element)"
                  :rules="
                    element?.validations
                      ? $rules(
                          { [element.name]: element?.validations },
                          element.modelValue
                        )
                      : ''
                  "
                  flat
                  base-color="n300"
                  :disabled="element?.disabled"
                  :type="element.textFieldType || 'text'"
                  density="compact"
                  :hint="element.hint"
                  :hide-details="!element.hint"
                  variant="solo-filled"
                  :label="$t(element.label)"
                  :readonly="element.readOnly"
                  persistent-placeholder
                  class="outside-label mb-4"
                  persistent-hint
                ></v-text-field>
                <div
                  v-if="element.type === 'select'"
                  class="d-flex flex-column w-100"
                >
                  <span class="text-body-2 text-text-low-emphasis">{{
                    $t(element.label)
                  }}</span>
                  <v-select
                    v-model="element.modelValue"
                    :item-title="element.selectTitle"
                    :item-value="element.selectValue"
                    :rules="
                      element?.validations
                        ? $rules(
                            { [element.name]: element?.validations },
                            element.modelValue
                          )
                        : ''
                    "
                    flat
                    class="mb-4"
                    :items="element.items"
                    base-color="n300"
                    @update:model-value="$emit(`update:${element.name}`, element.modelValue)"
                    density="compact"
                    :multiple="element?.multiple"
                    :chips="element?.multiple"
                    :disabled="element?.disabled"
                    :closable-chips = "element?.multiple"
                    :hint="element.hint"
                    :hide-details="!element.hint"
                    :readonly="element.readOnly"
                    variant="solo-filled"
                    :placeholder="$t(element.label)"
                    persistent-placeholder
                    persistent-hint
                  >
                    <template v-slot:append-inner>
                      <v-icon icon="custom:caretDownSolid" size="12" />
                    </template>
                    <template v-slot:selection="{ item }">
                      {{ $t(item.title) }}
                    </template>
                    <template v-slot:chip = "{item}">
                      <div style="cursor: pointer;">
                        <v-chip close-icon="custom:x" @click:close="removeTag(element, item)" />
                      </div>
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
                  v-if="element.type === 'text-area'"
                  v-model="element.modelValue"
                  @update:model-value="computedValue(element)"
                  flat
                  no-resize
                  :rows="element.rows"
                  :rules="
                    element?.validations
                      ? $rules(
                          { [element.name]: element?.validations },
                          element.modelValue
                        )
                      : ''
                  "
                  base-color="n300"
                  density="compact"
                  :hint="element.hint"
                  variant="solo-filled"
                  :label="$t(element.label)"
                  class="outside-label mb-4"
                  persistent-placeholder
                  persistent-hint
                  :disabled="element?.disabled"
                  :readonly="element.readOnly"
                  :hide-details="!element.hint"
                ></v-textarea>
                <div
                  v-if="element.type === 'uploader'"
                  class="d-flex align-center"
                >
                  <span
                    v-if="element.title"
                    class="nowrap text-text-low-emphasis text-body-2"
                    style="white-space: nowrap"
                    >{{ $t(element.title) }}</span
                  >
                  <app-uploader
                    ref="uploader"
                    :upload-path="element.uploadPath"
                    v-model="element.modelValue"
                    :multiple="element?.multiple"
                    v-model:max="max"
                    :round-images="element.roundImages || false"
                    :has-start-button="element.hasStartButton"
                    :size="40"
                    class="me-2"
                  ></app-uploader>
                </div>
                <v-btn
                  v-if="element.type === 'button'"
                  :color="element.color"
                  :icon="element.icon"
                  :size="element.buttonSize || 'default'"
                  :variant="element.variant"
                  :text="element.icon ? '' : $t(element.label)"
                  :prepend-icon="element.prependIcon"
                  :append-icon="element.appendIcon"
                  @click="element.function()"
                >
                </v-btn>
                <div
                  class="w-100 me-1 align-self-baseline"
                  v-if="element.type == 'date-picker'"
                >
                  <div
                    class="text-text-low-emphasis text-body-2"
                    style="margin-bottom: 3px"
                  >
                    {{ $t(element.label) }}
                  </div>
                  <input
                    type="text"
                    class="custom-input bg-n050 rounded px-4 py-2 w-100"
                    style="height: 46px"
                    :value="$moment(element.modelValue).format('jYYYY/jMM/jDD')"
                  />
                  <date-picker
                    auto-submit
                    color="rgba(var(--v-theme-primary-base))"
                    v-model="element.modelValue"
                    custom-input=".custom-input"
                    format="YYYY-MM-DD"
                    simple
                    display-format="jYYYY-jMM-jDD"
                    popover="bottom-left"
                  ></date-picker>
                </div>
                <div
                  v-if="element.type === 'radio'"
                  :class="{
                    'd-flex justify-space-between w-100': element.spaceBetween,
                  }"
                >
                  <div>{{ $t(element.label) }}</div>
                  <div>
                    <v-spacer />
                    <v-radio-group
                      v-model="element.modelValue"
                      :inline="element.inline"
                    >
                      <v-radio
                        v-for="option in element.options"
                        :key="option.key"
                        :label="$t(option.label)"
                        :value="option.key"
                        class="ms-3"
                        :color="
                          element.modelValue == option.key ? 'primary-base' : ''
                        "
                        :class="{
                          'bg-primary-lighten1 text-primary-base rounded-lg py-1 px-2':
                            element.modelValue == option.key,
                        }"
                        false-icon="custom:radioFalse"
                        true-icon="custom:radioTrue"
                      >
                      </v-radio>
                    </v-radio-group>
                  </div>
                </div>
                <div v-if="element.type === 'checkbox'">
                  <div>
                    <v-checkbox
                      v-model="element.modelValue"
                      :label="$t(element.label)"
                      color="primary-base"
                      false-icon="custom:square"
                      true-icon="custom:squareCheck"
                      :value="1"
                      hide-details
                    ></v-checkbox>
                  </div>
                </div>
                <div v-if="element.type == 'slot'" class="w-100">
                  <!-- <template v-slot:[item.name]="slotProps"></template> -->
                  <slot :name="element.name"></slot>
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
import { useSharedPanelStore } from "~/stores/sharedPanel";
let sharedStore = useSharedPanelStore();
let form = ref(null);
let dialog = ref(false);
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
        console.log("mmaxx", uploader.maxImage);
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
let emit = defineEmits([
  "update:dialog",
  "update:fields",
  "show:dialog",
  "close:dialog",
]);
let submit = async () => {
  const { valid } = await form.value.validate();
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
const removeTag = (element, item) => {
  const foundIndex = element.modelValue.findIndex((object) => {
    return object[element.selectValue] === item.value;
  });
  element.modelValue.splice(foundIndex, 1);
  console.log('uuuuuuwwwwww',element,item.value)
};
const close = () => {
  props.store.closeDialog();
  // dialog.value = false
  // props.store.editForm = ref([])
  emit("close:dialog");
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
<!-- closeDialog() {
  this.sendingRequest = false;
  this.dialog = false;
  this.editForm = ref([]);
  this.commentRejectForm = ref([]);
  this.edit = false;
  this.reject = false;
}, -->
