<template>
  <v-card
    class="rounded-lg rounded-t-0 align-lg-center d-flex"
    color="n800"
    height="364"
  >
    <v-container>
      <v-row justify="space-between mt-lg-0">
        <v-col cols="12" lg="7">
          <div class="text-h2 text-text-light">{{ $t("faq") }}</div>
          <div class="text-body-1 text-text-light">
            {{ $t("faq_description") }}
          </div>
          <v-text-field
            color="n300"
            class="py-0 mt-4"
            variant="outlined"
            clear-icon="custom:x"
            clearable
            v-model="model"
            bg-color="rgba(255, 255, 255, 0.1)"
            :label="$t('your_question')"
            type="email"
            theme="dark"
            hide-details
          >
            <!-- <template #append-inner>
              <v-btn
                class="bg-transparent"
                flat
                v-if="model"
                ripple="false"
                icon="custom:x"
                @click="clearSearch"
              />
            </template> -->
          </v-text-field>
        </v-col>
        <v-col cols="12" lg="3">
          <div class="d-flex justify-center align-center">
            <v-img :max-width="lgAndUp ? 450 : 255" src="/images/faq.svg" />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup>
import { useDisplay } from "vuetify";
const { lgAndUp } = useDisplay();
const emit = defineEmits(["update:modelValue","clear:search"]);
const props = defineProps({
  modelValue: String,
});
const clearSearch = () => {

  emit("clear:search");
};
// let model = defineModel({ default: "" })
let model = computed({
  get() {
    props.modelValue;
  },
  set(value) {
    console.log("oeooeoe", value);
    emit("update:modelValue", value);
  },
});
</script>
