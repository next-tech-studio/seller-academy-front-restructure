<template>
  <article id="contact-us">
    <header class="header">
      <v-container>
        <v-row>
          <v-col cols="12" lg="6">
            <p class="text-h2">{{ $t("contact_us_title") }}</p>
            <p class="text-body-1">{{ $t("contact_us_desc") }}</p>
          </v-col>
          <v-col cols="12" lg="6">
            <v-img src="/images/contactus/contactus.svg" alt="contact us banner" />
          </v-col>
        </v-row>
      </v-container>
    </header>
    <div class="bg-n700">
      <v-container>
        <v-row>
          <v-col v-for="(item, index) in socials" cols="12" lg="3" :key="index">
            <v-alert color="n600" rounded="lg">
              <v-btn flat color="icon-hint-caution" icon>
                <v-icon :icon="item.icon" color="text-light" />
              </v-btn>
              <p class="text-subtitle-1 font-weight-bold text-text-light text-truncate">
                {{ $t(item.title) }}
              </p>
              <v-btn
                block
                size="large"
                class="d-flex justify-space-between"
              >
                <p class="text-secondary-base text-subtitle-1">{{ $t(item.text) }}</p>
                <template v-slot:append>
                  <v-icon icon="custom:arrowLeft" color="icon-secondary"></v-icon>
                </template>
              </v-btn>
            </v-alert>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </article>
</template>
<script setup>
const { t } = useI18n();
const socials = [
  {
    title: "contact_us_phone",
    icon: "custom:phone",
    text: "021-61930600",
    link: "021-61930600",
  },
  {
    title: "contact_us_request",
    icon: "custom:pencil",
    text: "digikala_seller_panel",
    link: "",
  },
  {
    title: "contact_us_telegram",
    icon: "custom:telegram",
    text: "Digikala_Marketplace@",
    link: "",
  },
  {
    title: "contact_us_instagram",
    icon: "custom:instagram",
    text: "Digikala.Marketplace@",
    link: "",
  },
];

useHead(
  useHeadTags({
    title: t("contact_us")
  })
);
</script>

<style lang="scss" scoped>
#contact-us {
  .header {
  }
}
</style>
