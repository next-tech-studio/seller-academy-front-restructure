<template>
  <product-enroll :item="item" />
  <v-container fluid>
    <product-holding class="my-12" :item="item" />
    <product-description :item="item" />
    <div class="my-16">
      <product-mentors
        v-if="item?.teachers"
        :title="$t('teachers')"
        :items="item?.teachers"
        class="mb-4"
      />
      <product-mentors
        v-if="item?.mentors"
        :title="$t('mentors')"
        :items="item?.mentors"
        class="mb-4"
      />
      <product-mentors
        v-if="item?.speakers"
        :title="$t('sprakers')"
        :items="item?.speakers"
      />
    </div>
  </v-container>
  <product-goals :item="item" />
  <v-container fluid class="mt-16">
    <product-headings :item="item" />
    <div class="my-16 pt-4">
      <product-certificate />
    </div>
    <div class="my-16">
      <landing-testimonial
        v-if="item?.comments?.length > 0"
        :items="item?.comments"
      />
    </div>
    <div v-if="item?.faq?.content?.faq?.length" class="mb-16">
      <v-row>
        <v-col cols="12" md="3">
          <div class="text-h3 text-text-heading">{{ $t("faq") }}</div>
          <div class="text-body-1 text-text-high-emphasis">
            {{ $t("faq_description") }}
          </div>
        </v-col>
        <v-col cols="12" md="9">
          <app-content
            type="faq"
            :content="item?.faq?.content"
            :hide-title="true"
          ></app-content>
        </v-col>
      </v-row>
    </div>

    <registration-dialog :item="item" />
    <pre-registration-dialog :item="item" />
  </v-container>
</template>

<script setup>
const { $repos } = useNuxtApp();
const route = useRoute();
const item = reactive({});

useAsyncData(async () => {
  await $repos.academyProduct
    .getProduct({
      slug: route.params.slug,
    })
    .then((res) => Object.assign(item, res.data));
});
</script>
