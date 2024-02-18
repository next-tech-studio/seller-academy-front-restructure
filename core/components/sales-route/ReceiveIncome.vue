<template>
  <v-container>
    <v-card color="n100" rounded="lg">
      <v-card-text class="text-center">
        <v-img
            class="mx-auto"
            width="150"
            src="/images/certificate.png"
          ></v-img>
          <div class="text-text-heading text-h4">{{ $t("receive_income") }}</div>
          <div class="text-text-high-emphasis text-body-1 mb-2">
            {{ $t("receive_income_description") }}
          </div>
        <v-img class="w-75 mx-auto mb-4" src="/images/gain_money_from_digikala.png"></v-img>
      </v-card-text>
    </v-card>
  </v-container>
</template>
