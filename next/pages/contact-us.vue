<template>
  <v-container fluid class="mb-10">
    <v-row>
      <v-col cols="12" lg="6">
        <div class="text-h2 font-weight-bold mb-2">
          {{ $t("stay_in_touch_with_us_title") }}
        </div>
        <div class="text-body-1 mb-6">
          {{ $t("stay_in_touch_with_us_description") }}
        </div>
        <div class="rounded-lg overflow-hidden">
          <v-img
            cover
            height="370"
            class="rounded-e-pill"
            src="/images/start-up-header.png"
          ></v-img>
        </div>
      </v-col>
      <v-col cols="12" lg="6" class="d-flex flex-column">
        <v-card v-if="!showSuccessMessage" variant="outlined" color="n100">
          <v-card-text class="text-text-heading">
            <div class="text-h3 pb-4 font-weight-bold">
              {{ $t("send_message") }}
            </div>
            <v-form>
              <v-row>
                <v-col cols="6" class="pb-0 pt-6">
                  <v-text-field
                    v-model="requestFormStore.form.first_name"
                    class="text-body-2 text-text-low-emphasis"
                    variant="solo-filled"
                    flat
                    :label="$t('first_name')"
                  />
                </v-col>
                <v-col cols="6" class="pb-0 pt-6">
                  <v-text-field
                    v-model="requestFormStore.form.last_name"
                    class="text-body-2 text-text-low-emphasis"
                    variant="solo-filled"
                    flat
                    :label="$t('last_name')"
                  />
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-text-field
                    v-model="requestFormStore.form.email"
                    class="text-body-2 text-text-low-emphasis"
                    variant="solo-filled"
                    flat
                    :label="$t('email_address')"
                  />
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-textarea
                    v-model="requestFormStore.form.message"
                    class="text-body-2"
                    variant="solo-filled"
                    flat
                    :label="$t('message_description')"
                  ></v-textarea>
                </v-col>
              </v-row>
              <v-btn
                @click="send"
                class="mt-6"
                color="primary-base"
                variant="flat"
                >{{ $t("send_message") }}</v-btn
              >
            </v-form>
          </v-card-text>
        </v-card>
        <v-card
          v-else
          variant="outlined"
          color="n100"
          class="flex-grow-1 d-flex justify-center align-center"
        >
          <div class="text-center pa-4">
            <v-btn
              class="mb-6"
              flat
              color="icon-hint-success"
              icon="custom:check"
            ></v-btn>
            <div class="text-text-low-emphasis">
              {{ $t("your_message_sent_successfully") }}
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRequestFormStore } from "~/stores/requestForm";
const requestFormStore = useRequestFormStore();
const showSuccessMessage = ref(false);
const send = () => {
  requestFormStore.send().then(() => (showSuccessMessage.value = true));
};
const item = reactive({});
</script>
