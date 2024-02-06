<template>
  <div class="bg-icon-hint-caution">
    <v-container fluid class="pa-0">
      <v-banner
        border="none"
        lines="two"
        class="bg-transparent py-4"
        density="compact"
      >
        <template v-slot:text>
          <div>
            <div class="text-text-light text-h3">
              {{ $t("do_you_need_mentorship") }}
            </div>
            <div class="text-text-light text-caption">
              {{ $t("do_you_need_mentorship_description") }}
            </div>
          </div>
        </template>

        <template v-slot:actions>
          <v-btn
            class="text-button text-primary-base px-md-10 px-2 bg-background-light"
            variant="outlined"
            size="x-large"
            @click="openDialog(true)"
            rounded="lg"
          >
            {{ $t("set_mentorship_request") }}
            <v-icon class="ms-2" icon="custom:chevronLeft"></v-icon>
          </v-btn>
        </template>
      </v-banner>
    </v-container>
  </div>

  <v-dialog v-model="dialog" :fullscreen="lgAndUp ? false : true" width="640">
    <v-card class="pt-4">
      <v-card-title class="d-flex justify-space-between">
        <span>{{ $t("submit_mentorship_request") }}</span>
        <v-icon size="small" icon="custom:x" @click="closeDialog"></v-icon>
      </v-card-title>
      <v-card-text class="text-text-low-emphasis text-body-2">
        {{ $t("mentorship_form_desc") }}
      </v-card-text>
      <v-card-text>
        <v-form @submit.prevent="submit" ref="form">
          <v-row>
            <v-col cols="12" md="6" class="pb-0 px-0 px-md-3">
              <v-text-field
                v-model="item.first_name"
                :rules="$rules({ first_name: 'required' }, item.first_name)"
                flat
                base-color="n400"
                density="compact"
                variant="solo-filled"
                class="outside-label"
                :label="$t('first_name')"
                :placeholder="$t('first_name')"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="pb-0 px-0 px-md-3">
              <v-text-field
                v-model="item.last_name"
                :rules="$rules({ last_name: 'required' }, item.last_name)"
                flat
                base-color="n400"
                density="compact"
                variant="solo-filled"
                class="outside-label"
                :label="$t('last_name')"
                :placeholder="$t('last_name')"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="pb-0 px-0 px-md-3">
              <v-text-field
                v-model="item.email"
                :rules="$rules({ email: 'required' }, item.email)"
                flat
                base-color="n400"
                density="compact"
                variant="solo-filled"
                class="outside-label"
                :label="$t('used_service_email')"
                :placeholder="$t('used_service_email')"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="pb-0 px-0 px-md-3">
              <v-text-field
                v-model="item.subject"
                :rules="$rules({ subject: 'required' }, item.subject)"
                flat
                base-color="n400"
                density="compact"
                variant="solo-filled"
                class="outside-label"
                :label="$t('subject')"
                :placeholder="$t('subject')"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="pb-0 px-0 px-md-3">
              <v-select
                v-model="item.category"
                :items="categories"
                item-value="id"
                item-title="title"
                flat
                base-color="n400"
                density="compact"
                variant="solo-filled"
                menu-icon=""
                append-inner-icon="custom:chevronDown"
                class="outside-label"
                :label="$t('activity_areas')"
                :placeholder="$t('activity_areas')"
                return-object
                @update:modelValue="changeSubject"
              >
              </v-select>
            </v-col>
            <v-col cols="12" md="6" class="px-0 px-md-3">
              <v-select
                v-model="item.mentorId"
                :items="item?.category?.mentors"
                :rules="$rules({ mentorId: 'required' }, item.mentorId)"
                item-value="id"
                item-title="displayName"
                flat
                base-color="n400"
                density="compact"
                variant="solo-filled"
                menu-icon=""
                class="outside-label"
                :label="$t('mentor')"
                append-inner-icon="custom:chevronDown"
                :placeholder="$t('mentor')"
              >
              </v-select>
            </v-col>
            <v-col cols="12" md="12" class="px-0 px-md-3">
              <v-file-input
                v-model="item.from"
                :label="$t('upload_resume_file')"
                flat
                base-color="n400"
                density="compact"
                variant="solo-filled"
                prepend-icon=""
                append-inner-icon="custom:uploadFile"
                clear-icon="custom:x"
                append-icon=""
                @change="$emit('upload', $event.target.files[0])"
              ></v-file-input>
            </v-col>
            <v-col cols="12" md="12" class="pt-0 px-0 px-md-3">
              <v-textarea
                v-model="item.message"
                :rules="$rules({ message: 'required' }, item.message)"
                flat
                no-resize
                base-color="n300"
                density="compact"
                variant="solo-filled"
                class="outside-label"
                persistent-placeholder
                persistent-hint
                :label="$t('more_explanation')"
                :placeholder="$t('more_explanation')"
              >
              </v-textarea>
            </v-col>
            <v-col cols="12" md="12" class="pt-0">
              <v-btn variant="flat" color="primary-base" type="submit">{{
                $t("send_message")
              }}</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>

  <v-dialog
    v-model="infoDialog"
    :fullscreen="lgAndUp ? false : true"
    width="640"
  >
    <v-card class="pt-4">
      <v-card-title class="d-flex justify-space-between">
        <span>{{ $t("submit_mentorship_request") }}</span>
        <v-icon
          size="small"
          icon="custom:x"
          @click="infoDialog = false"
        ></v-icon>
      </v-card-title>
      <v-card-text class="text-text-low-emphasis text-body-2">
        {{ currentMentor.description }}
      </v-card-text>
      <v-card-actions>
        <v-btn
          class="ms-auto"
          variant="flat"
          color="primary-base"
          @click="openDialog(false)"
        >
          {{ $t("set_request") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
const emit = defineEmits(['send'])
import { useRequestFormStore } from "@core/stores/requestForm";
import { useDisplay } from "vuetify";
import { useAuthStore } from "@core/stores/auth";
const auth = useAuthStore();
const { lgAndUp } = useDisplay();
const localePath = useLocalePath();
const requestFormStore = useRequestFormStore();
const form = ref(null)
const props = defineProps({
  item: Object,
  categories: Array,
  currentMentor: Object,
});
const dialog = ref(false);
const infoDialog = ref(false);
const openDialog = (empty = false) => {
  if (auth.user.loggedIn) {
    if (empty) {
      requestFormStore.form.mentorId = null;
      requestFormStore.form.category = null;
    } else {
      requestFormStore.form.category = props.currentMentor?.category;
      requestFormStore.form.mentorId = props.currentMentor;
    }
    dialog.value = true;
    closeInfoDialog();
  } else {
    auth.afterLogin = true;
    navigateTo(localePath({ name: "login" }));
  }
};
const closeDialog = () => {
  console.log('here close dialog');
  auth.afterLogin = false;
  dialog.value = false;
};
const openInfoDialog = () => {
  infoDialog.value = true;
};
const closeInfoDialog = () => {
  infoDialog.value = false;
};
const changeSubject = () => {
  console.log("changeSubject");
  props.item.mentorId = null;
};
const submit = async () => {
  const { valid } = await form.value.validate();
  if (valid) {
    emit("send");
  }
};
defineExpose({ openDialog, closeDialog, openInfoDialog, closeInfoDialog });
</script>

<style lang="scss">
.v-banner-actions {
  align-self: center !important;
  margin-top: 0 !important;
}
</style>
