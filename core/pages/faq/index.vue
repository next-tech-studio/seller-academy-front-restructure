<template>
  <faq-search />
  <div class="bg-n100 pt-3">
    <v-container>
      <div class="pt-7 pb-10">
        <faq-categories :items="categories" />
      </div>

      <faq-result
        class="pt-7 pb-10"
        title="دسته‌بندی فروش"
        description="یکی از پرطرفدارترین شبکه‌های اجتماعی در سراسر دنیا تلگرام است. این اپلیکیشن به دلیل سرعت بالا، سادگی و امنیت مناسب، بسیار موردتوجه کاربران است و محبوبیت بسیار زیادی دارد. این موضوع، در کنار امکانات تلگرام باعث شده است این رسانه، محیط بسیار خوبی برای کسب‌وکارهای الکترونیکی نیز باشد. این اپلیکیشن رایگان است، فضای ذخیره‌سازی ..."
        :items="items[1]"
      />
      <faq-result
        class="pt-7 pb-10"
        icon=""
        title="نتایج جستجو"
        description="یکی از پرطرفدارترین شبکه‌های اجتماعی در سراسر دنیا تلگرام است. این اپلیکیشن به دلیل سرعت بالا، سادگی و امنیت مناسب، بسیار موردتوجه کاربران است و محبوبیت بسیار زیادی دارد. این موضوع، در کنار امکانات تلگرام باعث شده است این رسانه، محیط بسیار خوبی برای کسب‌وکارهای الکترونیکی نیز باشد. این اپلیکیشن رایگان است، فضای ذخیره‌سازی ..."
        :items="items[1]"
      />
    </v-container>
  </div>
  <lazy-faq-frequent :items="items" />
</template>

<script setup>
const { $repos } = useNuxtApp();
let faqs = ref([]);
let frequentFaq = ref([]);
let categories = ref([]);
const getFaqs = async () => {
  await $repos.other.faqs(payload).then((res) => {
    Object.assign(faqs.value, res.data);
    Object.assign(frequentFaq.value, res.isFrequent);
  });
};
const getCategories = async () => {
  await $repos.other.faqsCommon().then((res) => {
    Object.assign(categories.value, res.data);
  });
};

Promise.all([
  useAsyncData(async () => await getFaqs()),
  useAsyncData(async () => await getCategories()),
]);
const items = [
  {
    title: "عمومی",
    icon: "custom:book",
    faq: [
      { question: "question", answers: "answers" },
      { question: "question", answers: "answers" },
      { question: "question", answers: "answers" },
    ],
  },
  {
    title: "پشتیبانی",
    icon: "custom:book",
    faq: [
      { question: "question", answers: "answers" },
      { question: "question", answers: "answers" },
      { question: "question", answers: "answers" },
      { question: "question", answers: "answers" },
      { question: "question", answers: "answers" },
    ],
  },
  {
    title: "فروش",
    icon: "custom:book",
    faq: [
      { question: "question", answers: "answers" },
      { question: "question", answers: "answers" },
    ],
  },
  {
    title: "خرید",
    icon: "custom:book",
    faq: [
      { question: "question", answers: "answers" },
      { question: "question", answers: "answers" },
    ],
  },
];
</script>
