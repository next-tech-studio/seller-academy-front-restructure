<template>
  <v-container>
    <v-card>
      <h2 class="text-h2 text-textheading">
        {{ $t("selling_roadmap_in_digikala") }}
      </h2>
      <div class="text-body-1 text-text-low-emphasis">
        {{ $t("selling_roadmap_in_digikala_subtitle") }}
      </div>
      <v-img
        max-height="579"
        :src="mdAndUp ? '/images/line.svg' : '/images/vertical-line.svg'"
        class="mt-10"
        style="width: 91.5%; overflow: visible"
        :style="mdAndUp ? 'margin-bottom: 8px;' : 'margin-bottom: 132px;'"
      >
        <div
          class="d-flex justify-space-between flex-md-row flex-column h-100 align-center"
        >
          <div
            v-for="(step, index) in steps"
            :key="index"
            :style="mdAndUp ? '' :`position: absolute; left: ${step.left}; top: ${step.top}`"
          >
            <span class="text-h2 text-text-light step">
              <v-icon size="56" color="white" :icon="step.icon"></v-icon>
            </span>
            <div v-if="!mdAndUp">
              <div class="text-text-heading text-h4">{{ step?.title }}</div>
              <div class="text-text-low-emphasis text-body-1">
                {{ step?.description }}
              </div>
            </div>
          </div>
        </div>
      </v-img>
      <div
        v-if="mdAndUp"
        class="d-flex justify-space-between flex-md-row flex-column h-100 align-center"
      >
        <div v-for="(step, index) in steps" :key="index">
          <div class="text-text-heading text-h4">{{ step?.title }}</div>
          <div class="text-text-low-emphasis text-body-1">
            {{ step?.description }}
          </div>
        </div>
      </div>
    </v-card>
  </v-container>
</template>

<script setup>
import { useDisplay } from "vuetify";

const { mdAndUp } = useDisplay();
let steps = [
  {
    title: "ثبت‌نام ",
    description: "در کمتر از ۵ دقیقه ثبت‌نام کنید!",
    left: "50%",
    top: "-5%",
    icon: 'custom:desktopChat'
  },
  {
    title: "ثبت کالا و قیمت‌گذاری",
    description: "در کمتر از ۵ دقیقه ثبت‌نام کنید!",
    left: "20%",
    top: "33%",
    icon: 'custom:findContent'
  },
  {
    title: "ارسال سفارش‌ها",
    description: "در کمتر از ۵ دقیقه ثبت‌نام کنید!",
    left: "-5%",
    top: "66%",
    icon: 'custom:truck'
  },
  {
    title: "کسب درآمد",
    description: "در کمتر از ۵ دقیقه ثبت‌نام کنید!",
    left: "10%",
    top: "100%",
    icon: 'custom:wallet'
  },
];
</script>

<style lang="scss">
.step {
  background-color: rgba(var(--v-theme-primary-base));
  width: 80px;
  height: 80px;
  border-radius: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
