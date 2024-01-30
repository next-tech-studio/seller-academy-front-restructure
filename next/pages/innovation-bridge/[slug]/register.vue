<template>
  <!-- <v-btn @click="openDialog">PRE REGISTRATION DIALOG</v-btn> -->
  <app-dialog-form
    :store="sharedStore"
    button-title=""
    subtitle=""
    save-title="set_request"
    :title="$t('sign_up')"
    ref="dialogForm"
    :add-new-item="false"
    @update:fields="save"
    @close:dialog="closeDialog"
  ></app-dialog-form>
</template>

<script setup>
import { useSharedPanelStore } from "@core/stores/sharedPanel";
import { useAuthStore } from "@core/stores/auth";
const auth = useAuthStore();
const sharedStore = useSharedPanelStore();
const localePath = useLocalePath();
const route = useRoute();
const { $repos } = useNuxtApp();
const props = defineProps({
  item: Object,
});
let dataForm = ref([
  {
    type: "slot",
    name: "description",
    size: 12,
  },
  {
    type: "text-field",
    name: "firstName",
    modelValue: auth.user.firstName,
    validations: "required",
    label: "first_name",
    size: 6,
    hint: true,
    default: true
  },
  {
    type: "text-field",
    name: "lastName",
    modelValue: auth.user.lastName,
    validations: "required",
    label: "last_name",
    size: 6,
    hint: true,
    default: true
  },
  {
    type: "text-field",
    name: "email",
    modelValue: auth.user.email,
    validations: "required|email",
    label: "email",
    size: 6,
    hint: true,
    default: true
  },
  {
    type: "text-field",
    name: "mobile",
    modelValue: auth.user.mobile,
    validations: "required|mobile",
    label: "mobile",
    size: 6,
    hint: true,
    default: true
  },
  {
    type: "text-field",
    name: "university",
    modelValue: ref(""),
    validations: "required",
    label: "university",
    size: 12,
    hint: true,
  },
  {
    type: "text-field",
    name: "grade",
    modelValue: ref(""),
    validations: "required",
    label: "grade",
    size: 6,
    hint: true,
  },
  {
    type: "text-field",
    name: "major",
    modelValue: ref(""),
    validations: "required",
    label: "major",
    size: 6,
    hint: true,
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
const openDialog = () => {
  if (auth.user.loggedIn) {
    sharedStore.dialog = true;
    sharedStore.currentItem = props.item;
    console.log(dataForm, props.item);
    sharedStore.initForm(dataForm.value);
  } else {
    auth.afterLogin = true;
    navigateTo(localePath({ name: "login" }));
  }
};
const closeDialog = () => {
  navigateTo(
    localePath({
      name: "innovation-bridge-slug",
      params: { slug: route.params.slug },
    })
  );
  sharedStore.closeDialog()
};
const save = (e) => {
  let body = {};
  sharedStore.editForm.forEach((field) => {
    const name = field.name
      .split(/(?=[A-Z])/)
      .join("_")
      .toLowerCase();
    console.log(name);
    body[name] = sharedStore.editForm.find(
      (item) => item.name === field.name
    )?.modelValue;
  });

  $repos.main
    .message({
      body: {
        ...body,
        message: `Inoovation Bridge Event`,
        type: "innovation_bridge",
      },
    })
    .then(() => {
      sharedStore.sendingRequest = false;
      closeDialog()
    })
    .catch(() => {
      sharedStore.sendingRequest = true;
    });
};
onMounted(() => openDialog());
</script>
