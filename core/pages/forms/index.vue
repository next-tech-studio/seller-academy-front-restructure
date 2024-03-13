<template>
  <v-container class="d-flex flex-column justify-center">
    <app-breadcrumbs
      class="pt-2"
      color="text-high-emphasis"
      page="requestedForms"
    />
    <div class="mb-10 bg-background-dark py-10 px-lg-16 px-8 rounded-lg">
      <h2 class="text-h2 text-center mb-4">فرم‌های درخواست</h2>
      <p
        class="text-center px-lg-16 mx-lg-16 text-body-1 text-text-high-emphasis"
      >
        بعضی از فرآیندهای همکاری بین دیجی‌کالا و فروشندگان، نیازمند تکمیل فرم
        است. در این صفحه به راحتی به همه فرم‌های درخواست دسترسی دارید. لطفا در
        تکمیل هر فرم به نکاتی که در آن نوشته شده است، توجه کنید. همکاران شما در
        دیجی‌کالا تلاش می‌کنند، در سریع‌ترین زمان پاسخگو باشند. در صورتی که
        درخواستی دارید که فرم مربوط به آن را در این صفحه پیدا نمی‌کنید، از قسمت
        «درخواست پشتیبانی» پنل خود اقدام کنید.
      </p>
    </div>
    <v-row class="mb-4">
      <v-col v-for="(item, index) in items" :key="index" cols="12" lg="6">
        <app-form :item="item"></app-form>
      </v-col>
    </v-row>
    <v-btn
      v-if="!lastPage"
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
const { t } = useI18n();
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
      lastPage.value = res.last_page === res.current_page ? true : false;
      totalPages = res.total;
      if (res.total != page) page++;
    });
};
useAsyncData(async () => await getAllForms());
useHead(
  useHeadTags({
    title: t("requested_forms"),
  })
);
</script>
