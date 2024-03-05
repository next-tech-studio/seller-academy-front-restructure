<template>
  <v-container>
    <v-carousel
      hide-delimiters
      cycle
      :show-arrows="false"
      height="content-fit"
      ref="parent"
    >
      <v-carousel-item>
        <v-row>
          <v-col
            cols="12"
            lg="6"
            class="d-flex flex-column justify-space-between"
          >
            <h2 class="text-h2 text-text-heading">از زبان فروشندگان</h2>
            <div class="text-body-1 text-tex-low-emphasis mb-4">
              شما در دیجی‌کالا، جایی تبلیغ می‌کنین که مشتری حضور داره و می‌تونین
              افزایش فروش رو همون جا تجربه کنین. تیم تبلیغات دیجی‌کالا، مثل تیم
              خودم بود، همراه و پیگیر! به فروشندگانی که برنامه‌اى براى تبليغ
              برندشون دارند، پیشنهاد می‌کنم حتما تبلیغات دیجی‌کالا رو بررسی
              كنند.
            </div>
            <div class="d-flex align-center order-lg-last mb-4">
              <v-avatar class="my-6 me-6">
                <v-img
                  cover
                  src="/images/kasra-nikpoor.webp"
                  alt="user"
                ></v-img>
              </v-avatar>
              <div>
                <div class="text-subtitle-1 text-text-heading font-weight-bold">
                  کسری نیکپور، فروشنده برتر
                </div>
                <div class="text-body-1 text-text-low-emphasis">
                  فروشگاه تیرینک
                </div>
              </div>
            </div>
            <div
              class="bg-background-dark rounded-lg pa-4 text-body-1 quote-background order-last"
            >
              دیجی‌کالا ۷ میلیون بازدید روزانه و ۳۰ میلیون کاربر فعال در ماه
              دارد. دیجی کالا اد سرویس به پشتوانه‌ی تجربه‌ی ۱۵ ساله‌ دیجی‌کالا
              در تجارت الکترونیک، درک و شناخت عمیقی از رفتار کاربران آنلاین
              هنگام خرید دارد.
            </div>
          </v-col>
          <v-col cols="12" lg="6">
            <!-- <v-img src="/images/kasra-nikpoor.webp" class="rounded-lg"></v-img> -->
            <app-video-player
              video-poster="/images/home-header.png"
              video-src="https://player.arvancloud.ir/index.html?config=https://next-test.arvanvod.ir/ZaMv0Glomq/51w0ZXnzBE/origin_config.json"
              small
            />
          </v-col>
        </v-row>
      </v-carousel-item>
      <v-carousel-item>
        <v-row>
          <v-col
            cols="12"
            lg="6"
            class="d-flex flex-column justify-space-between"
          >
            <h2 class="text-h2 text-text-heading">از زبان فروشندگان</h2>
            <div class="text-body-1 text-tex-low-emphasis mb-4">
              سال ۹۶ بود که یه بنر تو دیجی‌کالا دیدم که روش نوشته شده بود: «شما
              هم فروشنده شوید» اون موقع فکر می‌کردم ورود به فضای فروش آنلاین
              ریسکه اما این ریسک رو پذیرفتم و حالا تو کمتر از پنج سال، سود
              فروشمون در دیجی کالا به اندازه همه فروش آفلاین‌مون با ۴۰ تا شعبه
              تو کل ایرانه.
            </div>
            <div class="d-flex align-center order-lg-last mb-4">
              <v-avatar class="my-6 me-6">
                <v-img cover src="/images/reza-shafaat.jpg" alt="user"></v-img>
              </v-avatar>
              <div>
                <div class="text-subtitle-1 text-text-heading font-weight-bold">
                  رضا شفاعت - فروشنده برتر
                </div>
                <div class="text-body-1 text-text-low-emphasis">
                  فروشگاه آریان نخ باف
                </div>
              </div>
            </div>
            <div
              class="bg-background-dark rounded-lg pa-4 text-body-1 quote-background order-last"
            >
              تقریبا 80% درصد از کسب‌و‌کارهایی که فروش آنلاین در دیجی‌کالا را
              شروع می‌کنند، بعد از دو ماه رشد درآمد 3.5 درصدی را تجربه می‌کنند.
            </div>
          </v-col>
          <v-col cols="12" lg="6">
            <!-- <v-img src="/images/kasra-nikpoor.webp" class="rounded-lg"></v-img> -->
            <app-video-player
              video-poster="/images/home-header.png"
              video-src="https://player.arvancloud.ir/index.html?config=https://next-test.arvanvod.ir/ZaMv0Glomq/51w0ZXnzBE/origin_config.json"
              small
            />
          </v-col>
        </v-row>
      </v-carousel-item>
      <v-carousel-item>
        <v-row>
          <v-col
            cols="12"
            lg="6"
            class="d-flex flex-column justify-space-between"
          >
            <h2 class="text-h2 text-text-heading">از زبان فروشندگان</h2>
            <div class="text-body-1 text-tex-low-emphasis mb-4">
              تو شب اولی که کالاهام رو تو دیجی‌کالا گذاشتم، دو تا یخچال ساید
              فروختم! در حالی که تو مغازه حداقل پنج روز یه بار یه یخچال ساید
              فروش می‌رفت. دیجی‌کالا واقعا برای من یه ابزار قدرتمند بود و هست.
              اگه تو دیجی‌کالا فروش رو شروع نمی‌کردم، شاید هیچ وقت نمی‌تونستم
              کارم رو حتی در فضای آفلاین تا اینجا توسعه بدم.
            </div>
            <div class="d-flex align-center order-lg-last mb-4">
              <v-avatar class="my-6 me-6">
                <v-img cover src="/images/ahad alizadegan.jpg" alt="user"></v-img>
              </v-avatar>
              <div>
                <div class="text-subtitle-1 text-text-heading font-weight-bold">
                  احد علیزادگان - فروشنده برتر
                </div>
                <div class="text-body-1 text-text-low-emphasis">
                  فروشگاه لذت اعتماد
                </div>
              </div>
            </div>
            <div
              class="bg-background-dark rounded-lg pa-4 text-body-1 quote-background order-last"
            >
              80 درصد از فروشندگان دیجی‌کالا در هفته‌ اولی که کالاهای خود را در
              وب‌سایت موجود کردند، فروش را تجربه کردند.
            </div>
          </v-col>
          <v-col cols="12" lg="6">
            <!-- <v-img src="/images/kasra-nikpoor.webp" class="rounded-lg"></v-img> -->
            <app-video-player
              video-poster="/images/home-header.png"
              video-src="https://player.arvancloud.ir/index.html?config=https://next-test.arvanvod.ir/ZaMv0Glomq/51w0ZXnzBE/origin_config.json"
              small
            />
          </v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<style lang="scss">
.quote-background {
  background: url("../../public/images/quote.png") no-repeat;
  background-position: 2% 45% !important;
}
</style>
