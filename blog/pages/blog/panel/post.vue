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
  permissions: ["create-article","blogs"],
});
onMounted(()=>{
  layout.value = auth.hasPermission(['blogs'])? 'sidebar':'no-footer'
  setPageLayout(layout.value)
})
</script>

<style></style>
