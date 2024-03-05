<template>
  <!-- <div v-if="!authStore.user.loggedIn" class="textarea-elevation textarea-bt">
    <not-logged-in-text-field />
  </div> -->
  <v-card
    class="rounded-0 overflow-visible position-relative"
    id="chat-text-field"
    flat
    :class="{
      'rounded-t-md': Object.keys(replyTo).length,
    }"
    style="height: fit-content;"
  >
    <v-card-text
    v-if="Object.keys(replyTo).length"
      class="d-flex align-center pa-1 position-absolute reply-postion"
    >
      <div class="d-flex">
        <span class="ps-4 d-flex align-center">
          <v-icon icon="custom:reply" size="x-large"></v-icon>
        </span>
        <span class="line-long"></span>
      </div>
      <div class="w-100 d-flex justify-space-between align-center">
        <div class="ms-4">
          <span class="text-text-heading text-body-2 font-weight-bold">{{
            replyTo.userDisplayName
          }}</span>

          <div class="text-body-2 text-low-emphasis">
            {{ replyTo.message }}
          </div>
        </div>
        <v-btn @click="close" size="x-small" icon variant="text">
          <v-icon icon="custom:x" size="18"></v-icon
        ></v-btn>
      </div>
    </v-card-text>
    <v-form
      id="textarea"
      @submit.prevent="submit"
      :class="{ 'textarea-elevation': true }"
    >
      <v-textarea
        v-model="message"
        hide-details
        :placeholder="$t('your_message')"
        variant="solo"
        flat
        rounded="0"
        no-resize
        auto-grow
        rows="1"
        class="bg-white textarea-bt pt-0 ou"
      >
        <template #prepend>
          <v-avatar
            class="mr-4"
            size="36"
            :image="authStore?.user?.avatarUrl"
          />
        </template>
        <template #append>
          <app-uploader
            ref="uploader"
            :upload-path="UPLOAD_CHAT_PATH"
            v-model="attachments"
            v-model:max="maxImage"
            :round-images="false"
            :size="32"
            class="me-1"
          ></app-uploader>
          <v-btn
            size="small"
            variant="text"
            icon="custom:plane"
            :loading="loading"
            :color="message ? 'icon-primary' : 'icon-low-emphasis'"
            type="submit"
            :disabled="!message && !attachments.length"
          ></v-btn>
        </template>
      </v-textarea>
    </v-form>
  </v-card>
</template>

<script setup>
import { useAuthStore } from "@core/stores/auth";
const authStore = useAuthStore();
const emit = defineEmits(["submit"]);
const props = defineProps({
  replyTo: Object,
});
let attachments = ref([]);
let maxImage = ref(3);
let message = ref("");
let loading = ref(false);
const UPLOAD_CHAT_PATH = "/community/chat/attachment";
const uploader = ref(null);

const close = () => {
  for (const key in props.replyTo) {
    delete props.replyTo[key];
  }
};

const submit = () => {
  let attachmentIds = ref([]);
  attachments.value.map((item) => {
    attachmentIds.value.push(item?.id);
  });
  emit("submit", {
    replyTo: props.replyTo.id,
    message: message.value,
    attachments: attachmentIds.value,
  });
  message.value = "";
  attachments.value.splice(0, attachments.value.length);
  maxImage.value = 3;
  close();
};
onMounted(()=>{
  document.getElementById('chat-text-field').addEventListener('keyup',function(e){
    if(e.ctrlKey && e.key ==="Enter") submit();
  })
})

</script>

<style lang="scss">
#textarea {
  .v-input__append,
  .v-input__prepend {
    margin: auto;
    padding-top: 0;
  }
}
</style>

<style lang="scss" scoped>
.textarea-elevation {
  // box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.08);
}
.reply-postion{
  top: -105%;
  z-index: 10;
  width: 100%;
  background-color:rgba(var(--v-theme-background-light));
}
.textarea-bt {
  border-top: 1px solid rgb(var(--v-theme-n200));
}
</style>
