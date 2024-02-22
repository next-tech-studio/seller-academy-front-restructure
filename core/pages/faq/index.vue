<template>
  <faq-search
    v-model="payload.search"
    @update:modelValue="onSearch"
  />
  <div class="bg-n100 pt-3">
    <v-container>
      <div class="pt-7 pb-10" v-if="!payload.search?.length">
        <faq-categories :items="categories" @choose:category="getFaqs" />
      </div>
      <faq-result
        v-if="payload.category?.slug.length && !payload.search?.length"
        class="pt-7 pb-10"
        :title="payload?.category?.title"
        :description="payload.category?.description"
        :items="faqs"
      />
      <faq-result
        v-if="payload.search?.length"
        class="pt-7 pb-10"
        icon=""
        title="نتایج جستجو"
        description="یکی از پرطرفدارترین شبکه‌های اجتماعی در سراسر دنیا تلگرام است. این اپلیکیشن به دلیل سرعت بالا، سادگی و امنیت مناسب، بسیار موردتوجه کاربران است و محبوبیت بسیار زیادی دارد. این موضوع، در کنار امکانات تلگرام باعث شده است این رسانه، محیط بسیار خوبی برای کسب‌وکارهای الکترونیکی نیز باشد. این اپلیکیشن رایگان است، فضای ذخیره‌سازی ..."
        :items="faqs"
      />
    </v-container>
  </div>

  <faq-frequent
    :categories="frequentCategories"
    v-model="currentCategory"
    @click:mentorship="onMentorshipClick"
    @click:info="onInfoClick"
  />
</template>

<script setup>
const { $repos } = useNuxtApp();
let faqs = ref([]);
let frequentFaqs = ref([]);
let frequentCategories = ref([]);
let search = ref("");
const currentCategory = ref(0);
let categories = ref([]);
let payload = ref({
  search: search.value,
  category: { slug: "" },
});

const getFaqs = async (e = {}) => {
  Object.assign(payload.value.category, e);

  await $repos.other.faqs(payload.value).then((res) => {
    faqs.value.splice(0, faqs.value.length);
    Object.assign(faqs.value, res.data);
    Object.assign(frequentFaqs.value, res.isFrequent);
    if (!payload.value.category.slug.length) {
      let data = res.isFrequent.reduce((accumulator, currentValue) => {
        const categoryId = currentValue?.category?.id;
        if (!accumulator[categoryId]) {
          accumulator[categoryId] = {
            category: currentValue?.category,
            frequentFaqs: [],
          };
        }
        accumulator[categoryId].frequentFaqs.push(currentValue);
        return accumulator;
      }, {});
      Object.assign(frequentCategories.value, data);
      frequentCategories.value["0"] = {
        category: {
          id: 0,
          title: "همه",
        },
        frequentFaqs: res.data,
      };
      frequentCategories.value = frequentCategories.value.filter(
        (val) => val != null
      );
    }
  });
};
const getCategories = async () => {
  await $repos.other.faqsCommon().then((res) => {
    Object.assign(categories.value, res.data);
  });
};

const onSearch = useDebounceFn(async () => await getFaqs(), 1000, {
  maxWait: 5000,
});

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
