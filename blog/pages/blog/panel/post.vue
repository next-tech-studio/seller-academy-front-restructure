<template>
  <!-- <NuxtLayout> -->
    <div :class="layout == 'no-footer'? 'pa-1 bg-background-dark':''">
      <NuxtPage />
    </div>
  <!-- </NuxtLayout> -->
</template>

<script setup>
import { useAuthStore } from "@core/stores/auth";
const auth = useAuthStore();
let layout = ref(null);

definePageMeta({
  middleware: ["auth"],
  permissions: ["create-article","blog"],
});
onMounted(()=>{
  layout.value = auth.hasPermission(['blog'])? 'sidebar':'no-footer'
  console.log('9393939',layout.value)
  setPageLayout(layout.value)
})
</script>

<style></style>
