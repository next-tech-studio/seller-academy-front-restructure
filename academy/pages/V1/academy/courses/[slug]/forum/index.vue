<template>
  <course-room class="mb-4" v-for="room in data.rooms" :key="room.title" :room="room" />
</template>

<script setup>
const emit = defineEmits(['update:sidebar'])
definePageMeta({
  middleware: ["auth"],
});
const { $repos } = useNuxtApp();
const route = useRoute();
let data = reactive({});
useAsyncData(() => {
  $repos.academy
    .getRooms({
      slug: route.params.slug,
    })
    .then((res) => {
      Object.assign(data, res);
      emit("update:sidebar", data);
    });
});
</script>
