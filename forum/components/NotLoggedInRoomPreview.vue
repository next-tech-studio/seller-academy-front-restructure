<template>
  <v-dialog
    scrim="bg-red"
    v-model="noSellerDialog"
    width="406px"
    id="no-seller-dialog"
    persistent
  >
    <v-card class="pa-4">
      <v-card-text class="d-flex justify-space-between align-center px-0 pt-0">
        <app-profile-list-item
          avatar-size="48px"
          :item="modelValue"
          subtitle-key="subtitle"
          :hover="false"
          class="px-0"
        >
          <template #title>
            <span class="text-caption text-text-heading">{{
              modelValue.name
            }}</span>
          </template>
          <template #subtitle>
            <app-avatar-group :members="modelValue.members" size="20px" />
          </template>
          <template #append>
            <div></div>
          </template>
        </app-profile-list-item>
        <v-btn icon flat class="d-flex justify-end" @click="goBack">
          <v-icon icon="custom:arrowLeft" />
        </v-btn>
      </v-card-text>
      <v-img
        height="182px"
        class="rounded"
        cover
        :src="modelValue?.bannerUrl"
      />
      <!-- <p class="text-body-2 text-text-low-emphasis my-4" v-html="modelValue?.description"></p> -->
      <p class="text-body-2 text-text-low-emphasis my-4">
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده
        از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و
        سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای
        متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه
        درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با
        نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان
        خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید
        داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان
        رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
        پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
      </p>
      <v-divider thickness="2" />
      <div class="d-flex my-4">
        <v-icon icon="custom:info" color="text-secondary" class="me-2" />
        <span class="text-caption">{{ $t(infoText) }}</span>
      </div>
      <v-btn
        block
        flat
        color="button-primary"
        @click="$emit('continue')"
        class="text-button"
        >{{ $t(btnTitle) }}</v-btn
      >
    </v-card>
  </v-dialog>
</template>
<script setup>
const router = useRouter();
const goBack = () => {
  router.back();
};
let noSellerDialog = ref(true);
let emit = defineEmits(["continue"]);
let props = defineProps({
  modelValue: Object,
  btnTitle: { type: String, default: "seller_login_signup" },
  infoText: { type: String, default: "see_room_seller" },
});
</script>

<style scoped>
.v-btn:hover :deep(.v-btn__overlay) {
  opacity: 0 !important;
}
</style>
