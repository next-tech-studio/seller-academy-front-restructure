<template>
  <NuxtLayout name="no-footer">
    <app-rejection-approval
      v-model:dialog="dialog"
      :approval-or-rejection-message="message"
    ></app-rejection-approval>
  </NuxtLayout>
</template>

<script setup>
let dialog = ref(true);
let message = ref("");
const { $repos } = useNuxtApp();
const route = useRoute();
const membershipRequest = () => {
  $repos.community.membershipRequest(route.query["join-token"]).then((res) => {
    message.value = res.message;
  });
};
onMounted(() => {
  console.log("quuueessrryyyy", route.query);
  membershipRequest();
});
definePageMeta({
  middleware: ["auth"],
  layout: false,
});
</script>
