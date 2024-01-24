<template>
  <v-dialog v-model="dialogModel" :fullscreen="!lgAndUp" :width="lgAndUp? '30%':'100%'">
    <template v-slot:default>
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center px-4">
          <span>{{
            $t("startup_use_services", { startup: startup.title })
          }}</span>
          <v-btn icon="custom:x" flat size="small" @click="dialogModel = false"/>
        </v-card-title>
        <v-card-text class="pa-4">
          <v-row>
            <v-col cols="12" md="6" class="pb-0">
              <v-text-field
                v-model="model.first_name"
                flat
                base-color="n400"
                density="compact"
                variant="solo-filled"
                :placeholder="$t('first_name')"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="pb-0">
              <v-text-field
                v-model="model.last_name"
                flat
                base-color="n400"
                density="compact"
                variant="solo-filled"
                :placeholder="$t('last_name')"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="pb-0">
              <v-text-field
                v-model="model.email"
                flat
                base-color="n400"
                density="compact"
                variant="solo-filled"
                :placeholder="$t('used_service_email')"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="pb-0">
              <v-select
                v-model="model.subject"
                item-title="kjgbchjsvhvs"
                :items="startup.services"
                flat
                base-color="n400"
                density="compact"
                variant="solo-filled"
                menu-icon=""
                append-inner-icon="custom:chevronDown"
                :placeholder="$t('intended_service')"
              >
              </v-select>
            </v-col>
            <v-col cols="12" md="12" class="pt-0">
              <v-textarea
                v-model="model.message"
                flat
                no-resize
                base-color="n300"
                density="compact"
                hint="item.hint"
                variant="solo-filled"
                class="outside-label"
                persistent-placeholder
                persistent-hint
                hide-details="!item.hint"
                :placeholder="$t('more_explanation')"
              >
              </v-textarea>
            </v-col>
            <v-col cols="12" md="12" class="pt-0">
              <v-btn
                variant="flat"
                color="primary-base"
                @click="$emit('send')"
                >{{ $t("send_message") }}</v-btn
              >
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>
<script setup>
import { useDisplay } from "vuetify";
const { lgAndUp } = useDisplay();
const emit = defineEmits(["update:dialog"]);
const props = defineProps({
  dialog: Boolean,
  modelValue: Object,
  startup: Object,
});
let dialogModel = computed({
  get() {
    return props.dialog;
  },
  set(value) {
    emit("update:dialog", value);
  },
});
let model = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit("update:modelValue", newValue);
  },
});
</script>
