<template>
  <our-team-header class="mb-16" :item="manager" />
  <our-team-heads :items="heads" />
  <our-team-departments class="mt-16" :items="members" />
  <v-container class="mb-lg-16 mb-8" fluid>
    <our-team-culture />
  </v-container>
  <v-container fluid class="mb-lg-16 mb-8">
    <our-team-cooperation-request
      :item="requestFormStore.form"
      @upload="upload($event)"
      @send="send"
    />
  </v-container>
</template>

<script setup>
import { useRequestFormStore } from "@core/stores/requestForm";
const { $repos } = useNuxtApp();
const requestFormStore = useRequestFormStore();
const members = ref([]);
useAsyncData(() => {
  $repos.main.team().then((res) => {
    Object.assign(members.value, res.data.members)
    requestFormStore.setForm({ type: "team", id: res.data.id });
  });
});
const manager = computed(() =>
  members.value.find((m) => m.position == "manager")
);
const heads = computed(() => members.value.filter((m) => m.position == "head"));
const upload = (e) => {
  requestFormStore.upload(e);
};
const send = () => {
  requestFormStore.send();
};
</script>
