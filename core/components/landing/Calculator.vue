<template>
  <v-card color="n800" rounded="0" class="mt-n2 bottom-background-calculator">
    <v-container class="py-lg-10 py-6">
      <v-row justify="space-between">
        <v-col cols="12" lg="6" class="d-flex flex-column">
          <h4 class="text-h4 text-text-low-emphasis">
            {{ $t("calculate_average_income") }}
          </h4>
          <h2 class="text-h2 text-text-low-emphasis my-2">
            {{ $t("with_selling_in_digikala") }}
          </h2>
          <div class="text-body-1 text-text-light">
            {{ $t("with_selling_in_digikala_description") }}
          </div>
          <div class="mt-auto">
            <v-btn
              variant="text"
              color="text-light"
              min-width="fit-content"
              class="px-0 text-h4"
            >
              <v-icon
                color="text-light"
                icon="custom:info"
                class="me-2"
              ></v-icon>
              <h4 class="text-h4">{{ $t("do_you_need_more_info") }}</h4>
            </v-btn>
            <div class="text-body-1 text-text-light my-2">
              {{ $t("for_more_info_about_your_intended_group") }}
            </div>
            <v-btn class="text-button" size="large" color="primary-base" @click="openDialog">
              {{ $t("request_more_info") }}
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12" lg="5">
          <v-card rounded="lg" height="459">
            <v-card-text>
              <div class="text-center">
                <div class="d-flex justify-center">
                  <v-img
                    src="/images/logo/logo.svg"
                    max-height="100"
                    max-width="200"
                    cover
                    alt="logo"
                  />
                </div>
                <!-- <v-avatar tile size="85">
                  <v-img
                    src="/images/logo/logo.png"
                    max-height="31.26px"
                    max-width="55.36"
                    cover
                    alt="logo"
                  />
                </v-avatar> -->
                <h4 class="text-h4 text-text-heading mb-6">
                  {{ $t("your_average_income") }}
                </h4>
              </div>
              <span class="text-text-low-emphasis text-body-1">{{
                $t("in_which_category_you_want_to_buy")
              }}</span>
              <v-select
                v-model="current"
                :items="items"
                :label="$t('category')"
                flat
                base-color="n300"
                density="compact"
                variant="outlined"
                class="mt-4 mb-6"
                item-value="id"
                item-title="title"
                return-object
              ></v-select>
              <div class="d-flex justify-space-between mb-4">
                <span class="text-text-low-emphasis text-body-1">{{
                  $t("average_income")
                }}</span>
                <span class="text-text-heading text-body-1 font-weight-bold">{{
                  currentValue?.averageIncome || "-"
                }}</span>
              </div>
              <div class="d-flex justify-space-between mb-4">
                <span class="text-text-low-emphasis text-body-1">{{
                  $t("commission_margin")
                }}</span>
                <span class="text-text-heading text-body-1 font-weight-bold">
                  {{ currentValue?.shippingFeeMin }} تا
                  {{ currentValue?.shippingFeeMax }} میلیون تومان
                </span>
              </div>
              <div class="d-flex justify-space-between mb-4">
                <span class="text-text-low-emphasis text-body-1">{{
                  $t("shipping_fee_margin")
                }}</span>
                <span class="text-text-heading text-body-1 font-weight-bold">
                  {{ currentValue?.commission_min }} تا
                  {{ currentValue?.commission_max }} میلیون تومان
                </span>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
  <app-dialog-form
    :store="sharedStore"
    button-title=""
    subtitle=""
    save-title="submit"
    title="subscribe_product"
    ref="dialogForm"
    :add-new-item="false"
    @update:category = "$emit('get:subCategories',$event)"
    @update:fields="$emit('submit:subCategory')"
  >
    <template #formActions>
      <slot name="formActions"></slot>
    </template>
  </app-dialog-form>
</template>

<script setup>
import { useSharedPanelStore } from "@core/stores/sharedPanel";
const sharedStore = useSharedPanelStore();
const props = defineProps({
  items: Array,
  calculatorCategories:Array,
  subCategories: Array
});

let current = ref(1);

let dataForm =ref([
{
    type: "select",
    name: "category",
    modelValue: null,
    selectValue: "id",
    selectTitle:"title",
    validations: "required",
    items: computed(() => props?.calculatorCategories),
    label: "choose_category",
    multiple:false,
    size: 12,
    hint: false,
    show:true
  },
  {
    type: "select",
    name: "subcategories",
    modelValue: null,
    selectValue: "id",
    disabled:computed(() => !!!props?.subCategories.length),
    selectTitle:"title",
    validations: "required",
    items: computed(() => props?.subCategories),
    label: "choose_product_from_category",
    multiple:true,
    size: 12,
    hint: false,
    show:true
  },
  {
    type: "text-field",
    name: "email",
    modelValue: ref(""),
    validations: "required|email",
    label: "email",
    size: 12,
    hint: false,
  },
  {
    type: "text-field",
    textFieldType:'number',
    name: "mobile",
    modelValue: ref(""),
    validations: "required|mobile",
    label: "mobile",
    size: 12,
    hint: false,
  },
])
const openDialog = () => {
  sharedStore.dialog = true;
  sharedStore.currentItem = props.information;
  sharedStore.initForm(dataForm.value);
};

let currentValue = computed(() => {
  if (typeof current.value == "number") {
    console.log("number");
    return props.items[0];
  } else {
    return current.value;
  }
});
</script>

<style lang="scss">
.bottom-background-calculator {
  background: url("../../public/images/two-circle.svg") no-repeat !important;
  background-position: left 20% center !important;
  background-color: rgba(var(--v-theme-n800)) !important;
}
</style>
