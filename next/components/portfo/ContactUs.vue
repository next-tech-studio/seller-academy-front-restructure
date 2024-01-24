<template>
  <div class="bg-n800 rounded-lg pa-6 d-flex flex-lg-row flex-column">
    <div class="w-lg-50 w-100 mb-6 mb-lg-0">
      <div :class="{'w-75': lgAndUp}">
        <h3 class="mb-8 text-h3">{{ $t("contact_us") }}</h3>
        <p class="mb-8 text-body-2">{{ $t("contact_us_desc") }}</p>
        <div class="mb-4">
          <v-icon class="me-4" icon="custom:linkedin" />
          <v-icon class="me-4" icon="custom:twitter" />
          <v-icon class="me-4" icon="custom:instagram" />
        </div>
        <div>
          <div class="mb-2">
            <v-icon icon="custom:phone" class="me-2" />
            <span class="text-body-2">{{ $t("diginext_phone_number") }}</span>
          </div>
          <div class="mb-2">
            <v-icon icon="custom:email" class="me-2" />
            <span class="text-body-2">info@diginext.ir</span>
          </div>
          <div class="mb-2">
            <v-icon icon="custom:map" class="me-2" />
            <span class="text-body-2">{{ $t("diginext_phone_map") }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="w-lg-50 w-100 bg-background-light rounded-lg pa-3">
      <v-form>
        <v-row>
          <v-col class="pb-0" cols="12" lg="4">
            <v-text-field
              v-model="item.first_name"
              class="text-body-1 text-text-low-emphasis"
              variant="solo-filled"
              flat
              :label="$t('first_name')"
            />
          </v-col>
          <v-col class="pb-0" cols="12" lg="4">
            <v-text-field
              v-model="item.last_name"
              class="text-body-2 text-text-low-emphasis"
              variant="solo-filled"
              flat
              :label="$t('last_name')"
            />
          </v-col>
          <v-col class="pb-0" cols="12" lg="4">
            <v-text-field
              v-model="item.email"
              class="text-body-2 text-text-low-emphasis"
              variant="solo-filled"
              flat
              :label="$t('email_address')"
            />
          </v-col>
          <v-col class="pt-0" cols="12" lg="12">
            <v-textarea
              v-model="item.message"
              class="text-body-2"
              variant="solo-filled"
              flat
              :label="$t('message_description')"
            ></v-textarea>
          </v-col>
          <v-col class="pt-0" cols="12" lg="12">
            <v-btn @click="$emit('send')" color="primary-base">{{
              $t("send")
            }}</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script setup>
import { useDisplay } from 'vuetify';

const {lgAndUp} = useDisplay()
const props = defineProps({
  item: Object,
});
</script>
