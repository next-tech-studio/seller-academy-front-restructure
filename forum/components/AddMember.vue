<template>
  <div class="text-text-low-emphasis text-body-2 mb-4">
    {{ $t("invite_memebers") }}
  </div>
  <div v-if="hasLink">
    <div class="text-body-2 font-weight-bold">
      {{ $t("invitation_link_to_room") }}
    </div>
    <div class="text-text-low-emphasis text-body-2 d-flex align-center">
      <span dir="ltr" class="justify-start">{{ url }}</span>
      <v-btn
        variant="text"
        @click="copyText"
        color="icon-high-emphasis"
        icon="custom:copy"
      ></v-btn>
    </div>
  </div>
  <div class="h-100">
    <v-text-field
      flat
      base-color="n300"
      v-model="search"
      @update:model-value="$emit('search', search)"
      density="compact"
      variant="solo-filled"
      persistent-placeholder
      persistent-hint
      prepend-inner-icon="custom:search"
      :placeholder="`${$t('search')}...`"
      class="mt-6"
    ></v-text-field>
    <div style="max-height: 300px; overflow: auto">
      <template v-for="(item, index) in users" :key="index">
        <app-profile-list-item
          :item="item"
          :title="item.name"
          subtitle-key="bio"
          :avatar="item.avatarUrl"
          @click="addMember(item, index)"
          avatar-size="48"
          :hover="false"
          class="mb-4 px-1 rounded"
          :class="chosenIndex[index] ? 'chosen-member' : ''"
        >
          <template #subtitle>
            <span class="text-text-low-emphasis text-caption">{{
              item.bio
            }}</span>
          </template>
        </app-profile-list-item>
      </template>
    </div>
  </div>
  <v-divider></v-divider>
  <div class="w-100 d-flex justify-end">
    <v-btn
      height="48"
      class="mt-2"
      variant="flat"
      @click="submit"
      :color="users.length ? 'primary-base' : 'n100'"
      :class="{ 'text-text-low-emphasis': !users.length }"
      :disabled="!users.length"
      >{{ $t("add_member") }}</v-btn
    >
  </div>
</template>

<script setup>
import { useToastStore } from "~/core/stores/toast";
const toast = useToastStore();
let search = ref("");
let chosenUser = ref({});
const {t} = useI18n()
let chosenIndex = ref([]);
let userCount = ref(0);
const emit = defineEmits(["add:member"]);
const config = useRuntimeConfig();
const props = defineProps({
  hasLink: {
    type: Boolean,
    default: true,
  },
  joinLink: String,
  users: Array,
});
const addMember = (item, index) => {

  if (!!!chosenIndex.value[index]) {
    userCount.value++;
    Object.assign(chosenUser.value, item);
    if (userCount.value < 2) chosenIndex.value[index] = true;
  } else {
    userCount.value--;
    Object.assign(chosenUser.value, {});
    chosenUser.value = {};
    chosenIndex.value[index] = false;
  }
};
const submit = () => {
  emit("add:member", chosenUser.value);
};
// const url = computed(() => decodeURI(document?.URL));
const url = computed(
  () => config.public.domain+ `forum/room?join-token=${props.joinLink}/`
);
function copyText() {
  // Get the text field
  let copyText = url.value;

  navigator.clipboard.writeText(copyText);

  // Alert the copied text
  toast.show({ text: t("successful_copy") }, "success");
}
</script>
<style lang="scss">
.chosen-member {
  background: rgba(var(--v-theme-background-secondary));
}
</style>
