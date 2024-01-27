<template>
  <v-form
    ref="authForm"
    :class="smAndDown ? 'w-75' : 'w-50'"
    @submit.prevent="submit"
    v-model="validForm"
  >
    <v-card>
      <v-card-text v-if="!smAndDown" class="text-center py-0">
        <v-avatar rounded="0" size="fit-content">
          <v-img width="94" height="48" src="/images/logo/2.svg"></v-img>
        </v-avatar>
      </v-card-text>
      <v-card-title class="desktop-h3 text-text-heading mt-6 mb-12 text-center">
        {{ $t(title) }}
      </v-card-title>
      <v-card-text class="px-0">
        <v-text-field
          v-if="fields.includes('username')"
          v-model="item.username"
          :rules="$rules({ username: 'required|english' }, item.username)"
          flat
          base-color="n300"
          density="compact"
          variant="solo-filled"
          dir="ltr"
          :label="$t('mobile')"
          type="email"
          persistent-placeholder
          class="outside-label"
        ></v-text-field>
        <v-text-field
          v-if="fields.includes('first_name')"
          v-model="item.firstName"
          :rules="$rules({ firstName: 'required|persian' }, item.firstName)"
          flat
          base-color="n300"
          density="compact"
          variant="solo-filled"
          :label="$t('first_name')"
          persistent-placeholder
          class="outside-label"
          persistent-hint
        ></v-text-field>
        <v-text-field
          v-if="fields.includes('last_name')"
          v-model="item.lastName"
          :rules="$rules({ lastName: 'required|persian' }, item.lastName)"
          flat
          base-color="n300"
          density="compact"
          variant="solo-filled"
          :label="$t('last_name')"
          persistent-placeholder
          class="outside-label"
          persistent-hint
        ></v-text-field>
        <!-- <v-text-field
          v-if="fields.includes('registrationToken')"
          v-model="item.registrationToken"
          :rules="
            $rules({ registrationToken: 'required' }, item.registrationToken)
          "
          flat
          base-color="n300"
          density="compact"
          variant="solo-filled"
          :label="$t('recieved_code')"
          persistent-placeholder
          class="outside-label"
          persistent-hint
        ></v-text-field> -->
        <app-otp
          v-if="fields.includes('registrationToken')"
          v-model="item.registrationToken"
          @update:modelValue="updateOTP(item.registrationToken)"
          @submit="submit(1)"
        ></app-otp>
        <!-- <v-text-field
          v-if="fields.includes('resetToken')"
          v-model="item.resetToken"
          :rules="$rules({ resetToken: 'required' }, item.resetToken)"
          flat
          base-color="n300"
          density="compact"
          variant="solo-filled"
          :label="$t('recieved_code')"
          persistent-placeholder
          class="outside-label"
          persistent-hint
        ></v-text-field> -->
        <app-otp
          v-if="fields.includes('resetToken')"
          v-model="item.resetToken"
          @update:modelValue="updateOTP(item.resetToken)"
          @submit="submit('C1')"
        ></app-otp>
        <v-text-field
          v-if="fields.includes('password')"
          v-model="item.password"
          :rules="$rules({ password: 'required' }, item.password)"
          flat
          base-color="n300"
          density="compact"
          variant="solo-filled"
          :label="$t('password')"
          :type="passwordVisibility.password ? 'text' : 'password'"
          persistent-placeholder
          class="outside-label"
          persistent-hint
          hide-details="auto"
          :append-inner-icon="
            passwordVisibility.password ? 'custom:closedEye' : 'custom:eye'
          "
          @click:append-inner="toggleVisibility('password')"
        >
        </v-text-field>
        <v-text-field
          v-if="fields.includes('new_password')"
          v-model="item.newPassword"
          :rules="$rules({ new_password: 'required' }, item.newPassword)"
          flat
          base-color="n300"
          density="compact"
          variant="solo-filled"
          :label="$t('new_password')"
          :type="passwordVisibility.newPassword ? 'text' : 'password'"
          persistent-placeholder
          class="outside-label"
          persistent-hint
          hide-details="auto"
          :append-inner-icon="
            passwordVisibility.newPassword ? 'custom:closedEye' : 'custom:eye'
          "
          @click:append-inner="toggleVisibility('newPassword')"
        >
        </v-text-field>
        <v-text-field
          v-if="fields.includes('repeat_new_password')"
          :rules="
            $rules({ repeat_new_password: 'required' }, item.repeatNewPassword)
          "
          v-model="item.repeatNewPassword"
          flat
          base-color="n300"
          density="compact"
          variant="solo-filled"
          :label="$t('repeat_new_password')"
          :type="passwordVisibility.repeatNewPassword ? 'text' : 'password'"
          persistent-placeholder
          class="outside-label"
          persistent-hint
          hide-details="auto"
          :append-inner-icon="
            passwordVisibility.repeatNewPassword
              ? 'custom:closedEye'
              : 'custom:eye'
          "
          @click:append-inner="toggleVisibility('repeatNewPassword')"
        >
        </v-text-field>
        <v-btn
          v-if="fields.includes('forget_password')"
          class="px-0"
          variant="text"
          color="text-secondary text-button"
          @click="$emit('forget:password')"
        >
          <span class="desktop-body-2 font-weight-regular">{{
            `${$t("forget_password")}؟`
          }}</span>
        </v-btn>
        <v-checkbox
          v-if="fields.includes('accept_rules')"
          :rules="$rules({ rulesAccepted: 'required' }, item.rulesAccepted)"
          v-model="item.rulesAccepted"
          color="primary-base"
          height="0"
          true-icon="custom:squareCheck"
          false-icon="custom:square"
          variant="compact"
          class="mt-7"
          hide-details
        >
          <template v-slot:label>
            <span
              class="text-body-1 text-text-low-emphasis"
              v-html="$t('accepting_rules_by_signing_up')"
            ></span>
          </template>
        </v-checkbox>
      </v-card-text>
      <v-card-actions class="px-0">
        <v-btn v-if="backable" @click="$emit('back')" variant="outlined" color="primary-base">
          <v-icon
            class="ml-4 text-button"
            size="small"
            icon="custom:chevronRight"
          ></v-icon>
          {{ $t("back") }}
        </v-btn>
        <v-btn
          :disabled="!validForm"
          class="flex-grow-1 text-button"
          variant="flat"
          type="submit"
          :color="validForm ? 'button-primary' : 'button-disabled'"
          :class="validForm ? 'white' : 'text-button-content-on-disabled'"
        >
          {{ $t("continue") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script setup>
import { useDisplay } from "vuetify/lib/framework.mjs";

const { smAndDown } = useDisplay();
const emit = defineEmits(["continue"]);
const authForm = ref(null);
const validForm = ref(false);
const { $rules } = useNuxtApp();
const props = defineProps({
  title: {
    default: "",
    type: String,
  },
  fields: {
    type: Array,
    default: ["email"],
  },
  item: {
    type: Object,
    default: () => {},
  },
  backable: {
    type: Boolean,
    default: true
  }
});

const passwordVisibility = ref({
  password: false,
  newPassword: false,
  repeatNewPassword: false,
});

const toggleVisibility = (item) => {
  passwordVisibility.value[item] = !passwordVisibility.value[item];
};

const submit = async (step) => {
  const { valid } = await authForm.value.validate();
  if (valid) emit("continue", step);
};

const updateOTP = async (item) => {
  validForm.value = item.length == 6;
};
</script>
