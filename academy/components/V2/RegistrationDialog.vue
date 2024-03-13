<template>
  <slot name="activator" :open="openDialog">
    <v-btn @click="openDialog">{{ $t("participate_in_the_course") }}</v-btn>
  </slot>
  <app-dialog-form
    v-if="sharedStore.currentContext == context"
    :store="sharedStore"
    button-title=""
    subtitle=""
    save-title="final_payment"
    title="registrationType.register"
    ref="dialogForm"
    :add-new-item="false"
    @update:fields="$emit('submit')"
  >
    <template #formActions>
      <slot name="formActions"></slot>
    </template>
    <template #installments>
      <v-row class="py-4">
        <v-col v-for="(installment, i) in installments" :key="i" cols="4">
          <v-card :color="i == 0 ? 'primary-base' : ''">
            <v-card-text
              class="text-caption"
              :class="{ 'text-text-light': i == 0 }"
            >
              <div class="font-weight-bold">
                {{ installment.percent }}
              </div>
              <div>
                {{ installment.description }}
              </div>
              <div class="font-weight-bold">
                {{ installment.price }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </app-dialog-form>
</template>

<script setup>
import { useSharedPanelStore } from "~/stores/sharedPanel";
const sharedStore = useSharedPanelStore();
const props = defineProps({
  item: Object,
  context: String,
});
let dataForm = ref([
  {
    type: "label",
    name: "title",
    modelValue: ref(""),
    label: "course_title",
    size: 12,
    hint: "",
    spaceBetween: true,
  },
  {
    type: "label",
    name: "courseDuration",
    modelValue: ref(""),
    label: "course_duration",
    size: 12,
    hint: "",
    spaceBetween: true,
  },
  {
    type: "label",
    name: "startAt",
    modelValue: ref(""),
    label: "startAt",
    size: 12,
    hint: "",
    spaceBetween: true,
  },
  {
    type: "label",
    name: "paymentType",
    modelValue: ref(""),
    label: "paymentType",
    size: 12,
    hint: "",
    spaceBetween: true,
  },
  {
    type: "label",
    name: "price",
    modelValue: ref(""),
    label: "price",
    size: 12,
    hint: "",
    spaceBetween: true,
  },
  { type: "divider", size: 12 },
  {
    type: "radio",
    name: "paymentType",
    modelValue: ref(""),
    label: "choose_payment_type",
    size: 12,
    hint: false,
    spaceBetween: true,
    options: [
      { label: "cash_payment", key: "cash_payment" },
      { label: "installment_payment", key: "installment_payment" },
    ],
    inline: true,
  },
  { type: "slot", name: "installments", size: 12 },
  { type: "divider", size: 12 },
  {
    type: "label",
    name: "price",
    modelValue: ref(""),
    label: "payable_price",
    size: 12,
    hint: "",
    spaceBetween: true,
    color: "text-text-high-emphsis",
  },
]);
const installments = ref([
  {
    percent: "قسط اول (۵۰٪)",
    description: "جهت ثبت‌نام",
    price: "۲.۲۵۰.۰۰۰ تومان",
  },
  {
    percent: "قسط دوم (۲۵٪)",
    description: "پیش از جلسه ۴ ام",
    price: "۱.۲۵۰.۰۰۰ تومان",
  },
  {
    percent: "قسط سوم (۲۵٪)",
    description: "پیش از جلسه ۸ ام",
    price: "۱.۲۵۰.۰۰۰ تومان",
  },
]);
const openDialog = (context) => {
  console.log("context", context);
  sharedStore.dialog = true;
  sharedStore.currentItem = props.item;
  sharedStore.edit = true;
  console.log(dataForm, props.item);
  sharedStore.initForm(dataForm.value);
};
</script>
