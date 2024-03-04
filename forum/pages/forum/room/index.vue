<template>
  <NuxtLayout name="no-footer">
  <div>
    <app-rejection-approval
      v-model:dialog="dialog"
      :approval-or-rejection-message="message"
      v-if="auth.hasPermission(['seller'])"
    ></app-rejection-approval>
    <not-logged-in-room-preview
      v-model="roomInfo"
      btn-title="seller_login_signup"
      info-text=" see_room_seller"
      @continue="goToSellerPanel"
      v-if="!auth.hasPermission(['seller'])"
    ></not-logged-in-room-preview>
  </div>
</NuxtLayout>
</template>

<script setup>
import { useAuthStore } from "~/core/stores/auth";
let roomInfo = ref({})
let dialog = ref(true);
let message = ref("");
const auth = useAuthStore();
const { $repos } = useNuxtApp();
const route = useRoute();
const membershipRequest = () => {
  $repos.community.membershipRequest(route.query["join-token"]).then((res) => {
    message.value = res.message;
  });
};
const goToSellerPanel = () => {
  window.open(useRuntimeConfig().public.sellerPanelLoginUrl);
};
onMounted(() => {
  console.log("quuueessrryyyy", route.query);
  membershipRequest();
});
definePageMeta({
  middleware: ["auth"],
  layout:false
});
</script>
