<template>
  <v-container class="d-flex flex-column justify-center">
    <app-breadcrumbs class="pt-2" color="text-high-emphasis" page="requestedForms" />
    <div class="mb-10 bg-background-dark py-10 px-lg-16 px-8 rounded-lg">
      <h2 class="text-h2 text-center mb-4">معرفی کوتاهی درباره‌ی فرم‌ها</h2>
      <p class="text-center px-lg-16 mx-lg-16 text-body-1 text-text-high-emphasis"
        >لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده
        از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و
        سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای
        متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه
        درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد.</p
      >
    </div>
    <v-row class="mb-4">
      <v-col v-for="(item, index) in items" :key="index" cols="12" lg="6">
        <app-form :item="item"></app-form>
      </v-col>
    </v-row>
    <v-btn
      flat
      @click="getAllForms"
      class="align-self-center text-button mt-6"
      height="48px"
      color="primary-base"
      >{{ $t("see_more") }}</v-btn
    >
  </v-container>
</template>
<script setup>
const { $repos } = useNuxtApp();
let items = reactive([]);
let page = reactive(1);
let totalPages = reactive();
let lastPage = ref(false);
const getAllForms = async () => {
  await $repos.other
    .forms({
      page,
    })
    .then((res) => {
      Object.assign(items, [...items, ...res.data]);
      lastPage.value = res.lastPage === res.currentPage ? true : false;
      totalPages = res.total;
      if (res.total != page) page++;
    });
};
useAsyncData(async () => await getAllForms());
// onMounted(()=>{
//   getAllForms()
// })
</script>
