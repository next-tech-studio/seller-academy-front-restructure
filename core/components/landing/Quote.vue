<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="6" class="d-flex flex-column justify-space-between">
        <h2 class="text-h2 text-text-heading">از زبان فروشندگان</h2>
        <div class="text-body-2 text-text-heading">
          ۸۰ درصد از فروشندگان دیجی‌کالا در هفته‌ اولی که کالاهای خود را در
          وب‌سایت موجود کردند، فروش را تجربه کردند.
        </div>
        <div class="text-body-1 text-tex-low-emphasis mb-4">
          شما در دیجی‌کالا، جایی تبلیغ می‌کنین که مشتری حضور داره و می‌تونین
          افزایش فروش رو همون جا تجربه کنین. تیم تبلیغات دیجی‌کالا، مثل تیم خودم
          بود، همراه و پیگیر! به فروشندگانی که برنامه‌اى براى تبليغ برندشون
          دارند، پیشنهاد می‌کنم حتما تبلیغات دیجی‌کالا رو بررسی كنند.
        </div>
        <div class="d-lg-block d-flex align-center order-lg-last">
          <!-- <v-avatar class="my-6 me-6">
            <v-img
              cover
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaH95MYy4lQdqXKOR2FCcv2KIHRhz7rCj4N8VKm4zbQmfaOU7lU_m_ykDR6sWGMMEKof8&usqp=CAU"
              alt="user"
            ></v-img>
          </v-avatar> -->
          <div class="mb-4">
            <div class="text-subtitle-1 text-text-heading font-weight-bold">
              کسری نیکپور، فروشنده برتر
            </div>
            <div class="text-body-1 text-text-low-emphasis">فروشگاه تیرینک</div>
          </div>
        </div>
        <div
            class="bg-background-dark rounded-lg pa-4 text-body-1 quote-background order-last"
          >
            دیجی‌کالا ۷ میلیون بازدید روزانه و ۳۰ میلیون کاربر فعال در ماه دارد.
            دیجی کالا اد سرویس به پشتوانه‌ی تجربه‌ی ۱۵ ساله‌ دیجی‌کالا در تجارت
            الکترونیک، درک و شناخت عمیقی از رفتار کاربران آنلاین هنگام خرید
            دارد.
          </div>
      </v-col>
      <v-col cols="12" lg="6">
        <v-img src="/images/kasra-nikpoor.jpeg" class="rounded-lg"></v-img>
        <!-- <app-video-player
          video-poster="/images/home-header.png"
          video-src="https://www.aparat.com/v/6GYax"
          small
        /> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss">
.quote-background {
  background: url("../../public/images/quote.png") no-repeat;
  background-position: 2% 45% !important;
}
</style>
