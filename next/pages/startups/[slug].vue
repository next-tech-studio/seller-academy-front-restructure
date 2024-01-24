<template>
  <div>
    <div class="w-100" style="height: 35vh">
      <v-img
        cover
        width="100%"
        height="100%"
        src="https://storage.diginext.ai/main-diginext/abstract-wavy-background.webp"
      />
    </div>
    <v-container fluid class="mt-n30 mb-13 position-relative rounded-t-lg">
      <v-card color="transparent">
        <v-card-text class="bg-background-light rounded-lg">
          <start-up-header class="mb-10" :item="startup"> </start-up-header>
          <start-up-services
            class="mb-lg-16"
            :services="startup.services"
          ></start-up-services>
          <start-up-about-us
            class="mt-6 my-lg-16"
            :item="startup"
          ></start-up-about-us>
          <start-up-use-service
            @open:dialog="dialog = true"
            class="mb-10"
          ></start-up-use-service>
          <start-up-slider :items="startup.images"></start-up-slider>
          <!-- <start-up-job-opportunities
          :opportunities="opportunities.data"
        ></start-up-job-opportunities> -->
          <start-up-services-dialog
            @send="send"
            :startup="startup"
            v-model:dialog="dialog"
            v-model="requestFormStore.form"
          ></start-up-services-dialog>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>
<script setup>
import { useLocaleStore } from "@core/stores/locale";
import { useRequestFormStore } from "@core/stores/requestForm";
let requestFormStore = useRequestFormStore();
let localeStore = useLocaleStore();
const route = useRoute();
let startup = reactive({});
let dialog = ref(false);
const { $repos } = useNuxtApp();
let opportunities = ref([]);

const getStartupData = async () => {
  await $repos.main.startupData({ slug: route.params.slug }).then((res) => {
    Object.assign(startup, res.data);
    requestFormStore.setForm({ type: "startup", id: res.data.id });
  });
};
const send = () => {
  requestFormStore.send();
  dialog.value = false;
};
const getOppotunities = async () => {
  opportunities.value = await queryContent(
    `${localeStore.locale || "fa"}/opportunities`
  ).findOne();
};
Promise.all([
  useAsyncData(async () => await getStartupData()),
  useAsyncData(async () => await getOppotunities()),
]);
onMounted(() => {
  window.scrollTo(0, 0);
});
</script>
<style lang="scss">
.mt-n30 {
  margin-top: -120px;
}
.mt-24 {
  margin-top: 96px;
}
</style>
