<template>
  <v-card :title="$t('user_account')" class="px-6 py-4">
    <dashboard-menu
      v-model="tabs"
      :menu="menu"
      selected-class="text-high-emphasis"
      :grow="false"
    ></dashboard-menu>
    <v-window v-model="tabs" class="pa-4">
      <v-window-item value="general">
        <dashboard-general-info
          :information="userInfo.personalInfo"
        ></dashboard-general-info>
      </v-window-item>
      <v-window-item value="address">
        <dashboard-address
          :information="userInfo.addressInfo"
        ></dashboard-address>
      </v-window-item>
    </v-window>

    <app-dialog-form
      :store="sharedStore"
      button-title=""
      subtitle=""
      save-title="edit"
      title="edit_general_info"
      ref="dialogForm"
      :add-new-item="false"
      @update:fields="editGeneralInformation"
    >
      <template #formActions>
        <slot name="formActions"></slot>
      </template>
    </app-dialog-form>
  </v-card>
</template>
<script setup>
import { useSharedPanelStore } from "@core/stores/sharedPanel";
import { useAuthStore } from "@core/stores/auth";
const auth = useAuthStore();
const sharedStore = useSharedPanelStore();
let userInfo = ref({});
const { $repos } = useNuxtApp();
let dialogForm = ref(null);
let tabs = ref(null);
const menu = ref([
  { title: "general_information", value: "general" },
  { title: "address_information", value: "address" },
]);
const getUserInfo = () => {
  $repos.other.userInfo().then((res) => {
    Object.assign(userInfo.value, res);
    auth.user = { ...res.personalInfo, loggedIn: true };
  });
};
const editGeneralInformation = () => {
  let body = {};
  sharedStore.editForm.forEach((field) => {
    body[field.name] = sharedStore.editForm.find(
      (item) => item.name === field.name
    )?.modelValue;
  });
  if (body.avatarUrl) body.avatarUrl = body.avatarUrl.url;

  let payload = { body };
  $repos.other
    .editUserInfo(payload)
    .then((res) => {
      Object.assign(userInfo.value, res);
      sharedStore.closeDialog();
      getUserInfo();
    })
    .catch(() => {
      sharedStore.sendingRequest = false;
    });
};
onMounted(() => {
  getUserInfo();
});
</script>
