<template>
  <v-dialog v-model="approvalDialog" width="401px" class="pa-4">
    <v-card class="pa-1">
        <div class="text-center">
          <v-icon
            size="48"
            class="my-4"
            icon="custom:circleCheckSolid"
            color="icon-hint-success"
          ></v-icon>
        </div>
        <v-card-title class="text-body-2">
          <span>
            {{ $t("successfully_asked_question") }}
          </span>
        </v-card-title>
        <v-card-actions class="py-0 justify-center">
          <v-btn
            color="primary-base"
            variant="flat"
            block
            class="text-button"
            @click="approvalDialog = !approvalDialog"
          >
            {{ $t("close") }}
          </v-btn>
        </v-card-actions>

    </v-card>
  </v-dialog>
</template>

<script setup>
let emit = defineEmits(["update:confirmed", "update:dialog"]);
let props = defineProps({
  dialog: { type: Boolean, default: false },
});
let approvalDialog = computed({
  get() {
    return props.dialog;
  },
  set(value) {
    emit("update:dialog", value);
  },
});
</script>
