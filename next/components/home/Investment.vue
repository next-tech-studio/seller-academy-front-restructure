<template>
  <v-row>
    <v-col cols="12" md="3">
      <div class="text-h3 font-weight-bold">
        {{ $t("investment_fields") }}
      </div>
      <div class="my-2 text-body-1 text-text-low-emphasis">
        {{ $t("investment_fields_brief") }}
      </div>
      <v-img max-width="190" src="/images/home-investment-fields.png"></v-img>
    </v-col>
    <v-col cols="12" md="9">
      <v-row>
        <v-col cols="12" md="4" v-for="n in 15" :key="n">
          <div>
            <v-avatar color="n700" class="me-4" size="x-large"></v-avatar>
          </div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
