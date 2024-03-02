<template>
  <v-container v-if="auth.step == 0" class="h-100">
    <v-row justify="center" align-content="center" class="h-100">
      <v-col v-for="item in auth.types" :key="item.id" cols="12" md="4" sm="12">
        <login-is-seller-card
          height="100%"
          :item="item"
          @continue="auth.setType(item.is_seller)"
        />
      </v-col>
    </v-row>
  </v-container>
  <div v-else class="h-100 d-flex align-center justify-center">
    <template v-for="item in auth.steps" :key="item.title">
      <login-form
        v-if="item.value == auth.step"
        :item="auth.user"
        :fields="item.fields"
        :title="item.title"
        :btn-title="item.btnTitle"
        @back="back"
        @continue="keepGoing($event)"
        @forget:password="auth.setStep('C1')"
      ></login-form>
    </template>
  </div>
</template>

<script setup>
import { useAuthStore } from "@core/stores/auth";
const auth = useAuthStore();
const { t } = useI18n();
watch(
  auth,
  (newValue) => {
    let layout = newValue.step == 0 || !newValue.step ? "no-footer" : "login";
    setPageLayout(layout);
  },
  { immediate: true, deep: true }
);

onMounted(() => {
  if (!auth.user.loggedIn) auth.initUserState();
});

const back = () => {
  switch (auth.step) {
    case 1:
      auth.setStep(0);
      break;
    case "A1":
    case "B1":
      auth.setStep(1);
      break;
    case "B2":
      auth.setStep("B1");
      break;
    case "C1":
      auth.setStep("A1");
      break;
    case "C2":
      auth.setStep("C1");
      break;
    case "C3":
      auth.setStep("C1");
      break;
  }
};

const keepGoing = (step) => {
  if (typeof step != "object") auth.step = step;
  switch (auth.step) {
    case 1:
      auth.checkUserExists(auth.user);
      break;
    case "A1":
      auth.login(auth.user);
      break;
    case "B1":
      auth.validateRegistrationCode(auth.user);
      break;
    case "B2":
      auth.register(auth.user);
      break;
    case "C1":
      auth.sendResetPasswordCode(auth.user);
      break;
    case "C2":
      auth.validateResetPasswordCode(auth.user);
      break;
    case "C3":
      auth.changePassword(auth.user);
      break;
    default:
  }
};

useHead(
  useHeadTags({
    title: `${t("login")} /\ ${t("sign_up")}`,
  })
);
</script>
