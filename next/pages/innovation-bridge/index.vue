<template>
  <!-- HEADER -->
  <div
    id="innovation-bridge-header"
    class="bg-n800 rounded-b-lg"
    :style="`height: ${
      lgAndUp ? '520px' : mdAndUp ? '800px' : '563px'
    }; position: relative !important`"
  >
    <v-container class="h-100" fluid>
      <v-card
        height="100%"
        rounded="0"
        color="transparent"
        class="d-flex flex-column"
        :class="{ 'justify-center w-50': lgAndUp }"
      >
        <div class="text-text-light text-h2 font-weight-bold mb-2">
          <div>پل نوآوری؛</div>
          <div>پل ارتباطی بین دانشگاه و صنعت</div>
        </div>
        <div class="text-body-2 text-text-light mb-2">
          ارتباط بین صنعت و دانشگاه یکی از موضوعات تاثیرگذار بر وضعیت اقتصادی هر
          جامعه ای است. در دانشگاهها افراد متخصصی تربیت می شوند که می توانند با
          به کارگیری علم خود در صنعت، رشد اقتصادی را به ارمغان آورند. از این رو،
          دیجی نکست با برگزاری رویداد پل نوآوری با هدف حفظ و محکم تر کردن ارتباط
          میان صنعت و دانشگاه و معرفی چالش های موجود در صنعت، از دانشجویان،
          اساتید و علاقمندان حوزه کارآفرینی دعوت می کند تا در حل این چالش ها
          همراه شوند و ایده ها و طرح های نوآورانه خود را ارائه دهند. 
        </div>
      </v-card>
    </v-container>
    <v-img
      :gradient="`to ${
        lgAndUp ? 'right' : 'top'
      }, rgba(35, 41, 51, 0), rgba(35, 41, 51, 1)`"
      src="/images/innovation-bridge/header.png"
      style="flex: 0 0 auto; position: absolute; left: 0"
      :style="lgAndUp ? 'top: 0' : 'bottom: 0'"
      :class="{ 'w-100': mdAndUp && !lgAndUp }"
      class="rounded-b-lg"
    ></v-img>
  </div>

  <!-- UNIVERSITY -->
  <v-container fluid class="py-md-16 my-md-4 py-8 my-2">
    <v-row>
      <v-col cols="12" md="6">
        <div class="text-h3 text-text-heading font-weight-bold mb-4">
          برگزاری ۱۲ پل نوآوری توسط دیجی‌نکست
        </div>
        <div class="text-body-2 text-text-high-emphasis">
          دیجی‌نکست تا کنون ۱۲ پل نوآوری در دانشگاه‌های تهران، صنعتی شریف، علامه
          طباطبایی، علم و صنعت، امیرکبیر، دانشگاه زنجان، دانشگاه گیلان، 
          مازندران، دانشگاه صنعتی اصفهان و… برگزار کرده است. از جمله موضوعاتی که
          در این رویدادها مورد بحث قرار گرفته‌اند می‌توان به موارد زیر اشاره
          کرد:
        </div>
        <v-row class="mt-10">
          <v-col cols="6" v-for="(topic, index) in topics" :key="index">
            <div class="d-flex flex-md-row flex-column align-center">
              <v-avatar
                class="me-md-4 me-0"
                size="64"
                color="background-dark"
                :image="topic.image"
              ></v-avatar>
              <span
                class="text-text-heading text-body-2 font-weight-bold w-75 text-md-right text-center"
                >{{ topic.title }}</span
              >
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="6">
        <v-row>
          <v-col cols="6" md="4" v-for="n in 9" :key="n">
            <v-card variant="outlined" class="text-center" color="n200">
              <v-card-text>
                <v-avatar
                  rounded="0"
                  size="86"
                  :image="`/images/innovation-bridge/logos/University-Logos-${n}.png`"
                ></v-avatar>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>

  <!-- PREVIOUS INNOVATION BRIDGE -->
  <v-container fluid class="pb-md-16 mb-md-4 pb-8 mb-2">
    <div class="text-h4 mb-6 text-center">پل‌های نوآوری پیش رو</div>
    <!-- <v-row>
      <v-col
        cols="12"
        md="4"
        v-for="(university, index) in universities.data"
        :key="index"
      > -->
      <v-sheet min-width="420">
      <v-slide-group
      v-model="model"
      class="pa-md-4 pa-0"
      next-icon="custom:chevronRightLight"
      prev-icon="custom:chevronLeftLight"
      show-arrows
      center-active
    >
      <v-slide-group-item
        v-for="(university, index) in universities.data"
        :key="index"
      >
        <v-card :height="smAndDown ? 213 : 287" :width="smAndDown?300:400" class="me-2">
          <v-img
            height="100%"
            cover
            :src="university.image"
            class="align-end"
            gradient="180deg, rgba(255, 255, 255, 0.00) 2.87%, rgba(0, 0, 0, 0.90) 100%"
          >
            <v-card-text>
              <div class="d-flex justify-space-between align-center">
                <div class="text-text-light text-h4">
                  {{ university.title }}
                </div>
                <v-btn
                  v-if="!university.disable_navigation"
                  :to="
                    localePath({
                      name: 'innovation-bridge-slug',
                      params: { slug: university.slug },
                    })
                  "
                  size="x-small"
                  icon="custom:chevronLeft"
                ></v-btn>
              </div>
              <div class="d-flex align-center">
                <div class="text-text-light">
                  <v-icon
                    size="24"
                    color="icon-light"
                    icon="custom:calendar"
                  ></v-icon>
                  <span class="text-text-light text-body-2 ms-2">{{
                    university.date
                  }}</span>
                </div>
                <div class="text-text-light ms-6">
                  <v-icon
                    size="24"
                    color="icon-light"
                    icon="custom:location"
                  ></v-icon>
                  <span class="text-text-light text-body-2 ms-2">{{
                    university.location
                  }}</span>
                </div>
              </div>
            </v-card-text>
          </v-img>
        </v-card>
      </v-slide-group-item>
      </v-slide-group>
    </v-sheet>
    <!-- </v-col>
    </v-row> -->
  </v-container>
</template>

<script setup>
import { useDisplay } from "vuetify";
const { lgAndUp, mdAndUp, smAndDown } = useDisplay();
const universities = ref([]);
const topics = [
  {
    title: "زنجیره ارزش تجارت الکترونیک",
    image: "/images/innovation-bridge/topics/Icon-03.png",
  },
  {
    title: "رباتیک",
    image: "/images/innovation-bridge/topics/Icon-05.png",
  },
  {
    title: "لجستیک",
    image: "/images/innovation-bridge/topics/Icon-06.png",
  },
  {
    title: "پردازش ابری",
    image: "/images/innovation-bridge/topics/Icon-01.png",
  },
  {
    title: "هوش مصنوعی",
    image: "/images/innovation-bridge/topics/Icon-02.png",
  },
  {
    title: "بلاکچین",
    image: "/images/innovation-bridge/topics/Icon-04.png",
  },
];

useAsyncData(async () => {
  universities.value = await queryContent(`/fa/innovation-bridge`).findOne();
});
</script>

<style>
#innovation-bridge-header .v-img__img {
  position: relative;
}
</style>
