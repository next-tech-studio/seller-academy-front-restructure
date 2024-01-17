<template>
  <v-card height="472">
    <v-row class="h-100">
      <v-col cols="12" md="10">
        <div>
          <div class="text-h3 text-text-heading font-weight-bold">
            {{ $t("diginext_on_instagram") }}
          </div>
          <div class="text-body-2 text-text-high-emphasis my-4">
            {{ $t("follow_us_on_instagram_descriptoin") }}
          </div>
          <v-btn class="instagram_theme text-button text-text-light" flat>{{
            $t("follow_us_on_instagram")
          }}</v-btn>
        </div>
        <v-row class="mt-4">
          <v-col v-for="(post, i) in item?.socials" :key="i" cols="12" md="4">
            <v-card
              height="215"
              color="background-dark"
              :image="post?.imageUrl"
              :href="post?.link"
              target="_blank"
            ></v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="2">
        <v-card>
          <v-img src="/images/instagram-overview.png"></v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
const props = defineProps({
  item: Object,
});
</script>

<style lang="scss">
.instagram_theme {
  background: linear-gradient(
    92deg,
    #4f5dcd 0%,
    #9639af 30.92%,
    #c03c7c 52.95%,
    #e36c3c 71.05%,
    #f8d983 100%
  );
}
</style>
