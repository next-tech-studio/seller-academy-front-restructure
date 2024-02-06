<template>
  <v-card rounded="0" color="primary-base py-10">
    <div class="text-center text-h2 text-text-light mb-6">
      {{ $t("mentors_advantages") }}
    </div>
    <v-container fluid>
      <v-row>
        <v-col cols="6" lg="3">
          <v-card>
            <v-card-text class="text-center">
              <v-avatar
                size="56"
                color="primary-base"
                variant="outlined"
                image="/images/mentors/pros/strong-connection.png"
              ></v-avatar>
              <div class="font-weight-bold mt-4">ارتباطات قوی</div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6" lg="3">
          <v-card>
            <v-card-text class="text-center">
              <v-avatar
                size="56"
                color="primary-base"
                variant="outlined"
                image="/images/mentors/pros/fast-support.png"
              ></v-avatar>
              <div class="font-weight-bold mt-4">پشتیبانی سریع</div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6" lg="3">
          <v-card>
            <v-card-text class="text-center">
              <v-avatar
                size="56"
                color="primary-base"
                variant="outlined"
                image="/images/mentors/pros/topics-variation.png"
              ></v-avatar>
              <div class="font-weight-bold mt-4">تنوع موضوعات</div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6" lg="3">
          <v-card>
            <v-card-text class="text-center">
              <v-avatar
                size="56"
                color="primary-base"
                variant="outlined"
                image="/images/mentors/pros/experienced-mentors.png"
              ></v-avatar>
              <div class="font-weight-bold mt-4">منتورهای باسابقه</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
