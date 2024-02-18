<template>
  <sales-route-header />
  <div class="mt-16 pt-4">
    <div class="text-h2 text-text-heading text-center">
      {{ $t("steps_to_become_seller") }}
    </div>
    <sales-route-step
      class="mb-md-10 mb-6"
      order="1"
      title="ثبت ‌نام و تکمیل مدارک"
      description="ابتدا باید در دیجی‌کالا به عنوان فروشنده حقیقی یا حقوقی ثبت‌نام کنید."
    >
      <v-row>
        <v-col cols="12" lg="3" md="4" v-for="n in 5" :key="n">
          <sales-route-info-card
            color="n100"
            description="جهت ثبت‌نام چه مدارکی را لازم ‌دارید؟"
            action-text="مدارک و شرایط ثبت‌نام"
            icon="custom:check"
          ></sales-route-info-card>
        </v-col>
      </v-row>
    </sales-route-step>
    <sales-route-step
      class="mb-md-10 mb-6"
      order="2"
      title="شرکت در کلاس آموزشی"
      description="بعد از ثبت‌نام، باید در یک کلاس آموزشی آنلاین شرکت کنید تا مقدمات فروش در دیجی‌کالا را با یکدیگر مرور کنیم. \n
این وبینار هر روز در ۴ ساعت مختلف برگزار می‌شود برای شرکت در این کلاس می‌توانید از لینک‌های زیر استفاده کنید، راس ساعت وارد لینک شوید و در انتهای وبینار نیز فرم نظرسنجی را تکمیل کنید تا حضورتان در کلاس تایید شده و وارد مرحله بعد شوید."
    >
      <v-row>
        <v-col cols="12" lg="3" md="4" v-for="n in 3" :key="n">
          <sales-route-info-card
            color="n100"
            title="ساعت ۱۲ ظهر"
            action-text="ورود"
            :flex-on-mobile="smAndDown"
          ></sales-route-info-card>
        </v-col>
      </v-row>
    </sales-route-step>
    <sales-route-step class="mb-md-10 mb-6" order="3" title="درج کالا">
      <sales-route-horizontal-info-card
        class="mb-4"
        url="https://www.aparat.com/v/rqHOB"
        action-text="مشاهده اطلاعات بیشتر"
        description="۱-حالت اول: \n
 در صورتی کالای شما در حال حاضر در دیجی‌کالا به فروش می‌رسد، شما هم باید همان کالا را به پنل خود انتقال دهید و در مرحله بعد قیمت‌گذاری کنید، این نکته بسیار مهم است که کالای شما از لحاظ تمامی ویژگی‌ها و مشخصات باید همان کالای موجود در وب‌سایت باشد."
      ></sales-route-horizontal-info-card>
      <sales-route-horizontal-info-card
        class="mb-4"
        url="https://www.aparat.com/v/rqHOB"
        action-text="مشاهده اطلاعات بیشتر"
        description="۲-حالت دوم: \n
 در صورتی کالای شما در حال حاضر در دیجی‌کالا به فروش می‌رسد، شما هم باید همان کالا را به پنل خود انتقال دهید و در مرحله بعد قیمت‌گذاری کنید، این نکته بسیار مهم است که کالای شما از لحاظ تمامی ویژگی‌ها و مشخصات باید همان کالای موجود در وب‌سایت باشد."
      ></sales-route-horizontal-info-card>
      <sales-route-horizontal-info-card
        class="mb-4"
        action-text="مشاهده اطلاعات بیشتر"
        description="۱-حالت اول: \n
 در صورتی کالای شما در حال حاضر در دیجی‌کالا به فروش می‌رسد، شما هم باید همان کالا را به پنل خود انتقال دهید و در مرحله بعد قیمت‌گذاری کنید، این نکته بسیار مهم است که کالای شما از لحاظ تمامی ویژگی‌ها و مشخصات باید همان کالای موجود در وب‌سایت باشد."
      ></sales-route-horizontal-info-card>
    </sales-route-step>
    <sales-route-step class="mb-md-10 mb-6" order="4" title="ایجاد تنوع و قیمت‌گذاری">
      <sales-route-horizontal-info-card
        class="mb-10"
        action-text="مشاهده اطلاعات بیشتر"
        description="۱-حالت اول: \n
 در صورتی کالای شما در حال حاضر در دیجی‌کالا به فروش می‌رسد، شما هم باید همان کالا را به پنل خود انتقال دهید و در مرحله بعد قیمت‌گذاری کنید، این نکته بسیار مهم است که کالای شما از لحاظ تمامی ویژگی‌ها و مشخصات باید همان کالای موجود در وب‌سایت باشد."
      ></sales-route-horizontal-info-card>
      <v-card color="n100" class="mb-4">
        <v-card-text class="text-center">
          <v-img
            class="mx-auto"
            width="150"
            src="/images/certificate.png"
          ></v-img>
          <div class="text-text-heading text-h4">{{ $t("congrates") }}</div>
          <div class="text-text-high-emphasis text-h5">
            {{ $t("congrates_description") }}
          </div>
        </v-card-text>
      </v-card>
    </sales-route-step>
    <sales-route-step
      class="mb-md-10 mb-6"
      order="5"
      title="ثبت ‌نام و تکمیل مدارک"
      description="ابتدا باید در دیجی‌کالا به عنوان فروشنده حقیقی یا حقوقی ثبت‌نام کنید."
    >
      <sales-route-horizontal-info-card
        class="mb-4"
        url="https://www.aparat.com/v/rqHOB"
        action-text="مشاهده اطلاعات بیشتر"
        description="۱-حالت اول: \n
 در صورتی کالای شما در حال حاضر در دیجی‌کالا به فروش می‌رسد، شما هم باید همان کالا را به پنل خود انتقال دهید و در مرحله بعد قیمت‌گذاری کنید، این نکته بسیار مهم است که کالای شما از لحاظ تمامی ویژگی‌ها و مشخصات باید همان کالای موجود در وب‌سایت باشد."
      ></sales-route-horizontal-info-card>
    </sales-route-step>
    <sales-route-step
      class="mb-md-10 mb-6"
      order="6"
      title="بسته‌بندی کالا"
      description="برای بسته‌بندی هر کالا باید شرایطی را رعایت کنیم تا کالاها آسیبی نبینند و به بهترین شکل به دست خریدار برسند."
    >
      <v-row>
        <v-col cols="12" lg="3" md="4" v-for="n in 5" :key="n">
          <sales-route-info-card
            color="n100"
            title="ساعت ۱۲ ظهر"
            description="جهت ثبت‌نام چه مدارکی را لازم ‌دارید؟"
            icon="custom:check"
            :actionable="false"
          ></sales-route-info-card>
        </v-col>
      </v-row>
    </sales-route-step>
    <sales-route-step
      class="mb-md-10 mb-6"
      order="7"
      title="ارسال سفارش‌ها"
      description="حالا باید کالاهای خود را به انبار ارسال کنید، برای ارسال کالا به انبار این مقالات را بررسی کنید."
    >
      <v-row>
        <v-col cols="12" lg="3" md="4" v-for="n in 8" :key="n">
          <sales-route-info-card
            color="n100"
            title="ساعت ۱۲ ظهر"
            action-text="مدارک و شرایط ثبت‌نام"
            :flex-on-mobile="smAndDown"
          ></sales-route-info-card>
        </v-col>
      </v-row>
    </sales-route-step>
  </div>
  <sales-route-receive-income class="mb-5" />
</template>

<script setup>
import { useDisplay } from "vuetify";
const { smAndDown } = useDisplay();
</script>
