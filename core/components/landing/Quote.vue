<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="6" class="d-flex flex-column">
        <h2 class="text-h2 text-text-heading">از زبان فروشندگان</h2>
        <div class="text-body-2 text-text-heading">
          ۸۰ درصد از فروشندگان دیجی‌کالا در هفته‌ اولی که کالاهای خود را در
          وب‌سایت موجود کردند، فروش را تجربه کردند.
        </div>
        <div class="text-body-1 text-tex-low-emphasis">
          تو شب اولی که کالاهام رو تو دیجی‌کالا گذاشتم، دو تا یخچال ساید فروختم!
          در حالی که تو مغازه حداقل پنج روز یه بار یه یخچال ساید فروش می‌رفت.
          دیجی‌کالا واقعا برای من یه ابزار قدرتمند بود و هست. اگه تو دیجی‌کالا
          فروش رو شروع نمی‌کردم، شاید هیچ وقت نمی‌تونستم کارم رو حتی در فضای
          آفلاین تا اینجا توسعه بدم.
        </div>
        <div class="d-lg-block d-flex align-center order-lg-last order-first" >
          <v-avatar class="my-6 me-6">
            <v-img
              cover
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaH95MYy4lQdqXKOR2FCcv2KIHRhz7rCj4N8VKm4zbQmfaOU7lU_m_ykDR6sWGMMEKof8&usqp=CAU"
              alt="user"
            ></v-img>
          </v-avatar>
          <div>
            <div class="text-subtitle-1 text-text-heading font-weight-bold">
              احد علیزادگان، فروشنده برتر
            </div>
            <div class="text-body-1 text-text-low-emphasis">
              فروشگاه لذت اعتماد
            </div>
          </div>
        </div>
      </v-col>
      <v-col cols="12" lg="6">
        <app-video-player
          video-poster="/images/home-header.png"
          video-src="https://www.aparat.com/v/6GYax"
          small
        />
      </v-col>
    </v-row>
  </v-container>
</template>
