<template>
  <div :style="sticky">
    <mentors-mentorship-request
      ref="requestForm"
      :item="requestFormStore.form"
      :categories="Object.values(categories).map(x => {
        return {...x.category, mentors: x.mentors}
      })"
      :current-mentor="currentMentor"
      @upload="upload"
      @send="send"
    />
  </div>
  <v-container fluid class="mb-16 mt-16 pt-16">
    <mentors-header />
  </v-container>
  <mentors-advantages class="my-10" />
  <v-container fluid class="mb-16 py-0 px-0" id="mentors">
    <mentors-tab
      :categories="categories"
      v-model="currentCategory"
      @click:mentorship="onMentorshipClick"
      @click:info="onInfoClick"
    />
  </v-container>

  <app-dialog-response
    v-bind="requestStatus"
    @update:show="requestStatus.show = false"
  />
</template>

<script setup>
import { useRequestFormStore } from "@core/stores/requestForm";
import { useAuthStore } from "@core/stores/auth";
import { useDisplay } from "vuetify";
const requestFormStore = useRequestFormStore();
const { $repos } = useNuxtApp();
const categories = ref({});
const requestForm = ref(null);
const currentMentor = ref(null);
const currentCategory = ref(0);
const requestStatus = ref({});
const auth = useAuthStore();
useAsyncData(() => {
  $repos.main.mentors().then((res) => {
    requestFormStore.form.first_name = auth.user.firstName;
    requestFormStore.form.last_name = auth.user.lastName;
    // categories.value = res.data;

    let data = res.data.reduce((accumulator, currentValue) => {
      const categoryId = currentValue?.category?.id;
      if (!accumulator[categoryId]) {
        accumulator[categoryId] = {
          category: currentValue?.category,
          mentors: []
        };
      }
      accumulator[categoryId].mentors.push(currentValue);
      return accumulator;
    }, {});
    Object.assign(categories.value, data)
    
    categories.value['0'] = {
      category: {
        id: 0,
        title: 'همه'
      },
      mentors: res.data
    }
    
    if (auth.afterLogin) requestForm.value.openDialog();
  });
});
const upload = (e) => {
  requestFormStore.upload(e);
};
const send = () => {
  requestFormStore
    .send({ type: "Profile", alert: false })
    .then(() => {
      currentMentor.value = null;
      Object.assign(requestStatus.value, {
        title: "mentorship_request",
        show: true,
        text: "your_request_submited_and_we_call_you_later",
        type: "success",
      });
      requestForm.value.closeDialog();
    })
    .catch((err) => {
      console.log(err.response);
      Object.assign(requestStatus.value, {
        title: "mentorship_request",
        show: true,
        text: err.response._data.message,
        type: "error",
      });
    });
};
const onMentorshipClick = (e) => {
  currentMentor.value = e;
  requestFormStore.form.category = e.category;
  requestFormStore.form.mentor_id = e;
  requestForm.value.openDialog();
};
const onInfoClick = (e) => {
  currentMentor.value = e;
  requestForm.value.openInfoDialog();
};

const sticky = ref({
  backgroundColor: "#c0c0c0",
  position: "fixed",
  top: 0,
  width: "100%",
  zIndex: 100,
  marginTop: "64px",
});
</script>

<style lang="scss">
#mentors {
  scroll-margin-top: 10rem;
}
</style>
