<template>
  <div>
    <template v-if="!auth?.user?.loggedIn">
      <landing-header />
      <landing-calculator :items="incomes" />
      <landing-quote class="my-10 py-lg-10 py-0" />
      <v-container v-if="articles.length">
        <app-content-card-listing
          :content="articles.slice(0, 4)"
          title="relevant_content"
          :responsive-horizontal="true"
          @to:item="toItem($event)"
          :show-see-more="false"
          :show-filter="false"
          grid="3"
        ></app-content-card-listing>
      </v-container>
      <landing-roadmap />
      <landing-stories />
    </template>
    <template v-else>
      <v-container>
        <v-row>
          <v-col>
            <v-card
              flat
              :height="lgAndUp ? 380 : 205"
              width="100%"
              class="mb-8 mt-lg-8 mt-4"
            >
              <v-img
                height="100%"
                width="100%"
                cover
                src="/images/loggedin-landing-header.png"
              ></v-img>
            </v-card>
          </v-col>
        </v-row>
        <app-content-card-listing
          :class="isClient ? 'd-flex' : 'd-none'"
          title="latest_articles_and_news"
          :content="articles?.slice(0, 3)"
          :responsive-horizontal="true"
          @to:item="toArticle($event)"
          @load:more="navigateTo(localePath({ name: 'article-archive' }))"
          see-more-title="see_more"
          :showFilter="false"
        />
        <course-landing-our-courses
          class="my-10"
          :categories="categories"
        ></course-landing-our-courses>
        <client-only>
          <h2 class="text-h2 text-text-high-emphasis mb-6">
            {{ $t("most_popular_rooms") }}
          </h2>
          <app-switch-wrapper class="pa-0 me-0" one-side-margin>
            <v-slide-group>
              <v-slide-group-item
                v-for="(item, index) in rooms"
                :key="index"
                :value="item.slug"
              >
                <div class="me-2">
                  <room-card
                    :item="item"
                    @to:item="toRoom"
                    :max-width="296"
                  ></room-card>
                </div>
              </v-slide-group-item>
            </v-slide-group>
          </app-switch-wrapper>
        </client-only>
        <v-row class="mb-10">
          <v-btn
            flat
            @click="navigateTo(localePath({ name: 'forum-room-list' }))"
            class="align-self-center text-button mt-6 mx-auto"
            height="48px"
            color="primary-base"
            >{{ $t("see_more") }}
          </v-btn>
        </v-row>
      </v-container>
    </template>
  </div>
</template>

<script setup>
import { useDisplay } from "vuetify";
import { useAuthStore } from "@core/stores/auth";
import { useFilterStore } from "@core/stores/filter";
const { lgAndUp } = useDisplay();
const store = useFilterStore();
const { isClient } = useSsrCorrection();
const auth = useAuthStore();
const { $repos } = useNuxtApp();
const localePath = useLocalePath();
const articles = ref([]);
const rooms = ref([]);
const categories = ref({});
let calculatorCategories = ref([]);
// const categories = ref({});
const incomes = ref([]);
useAsyncData(async () => {
  if (!auth?.user?.loggedIn) {
    await $repos.other.homepage().then((res) => {
      articles.value = res.articles;
      incomes.value = res.incomes;
    });
  } else {
    await $repos.other.loggedinHomepage().then((res) => {
      articles.value = res.articles;
      rooms.value = res.chatRooms;
      categories.value = res.categories;
      store.buttonDefault = res.categories[0].slug;
    });
  }
});
const toRoom = (item) => {
  navigateTo(
    localePath({
      name: "forum-room-slug",
      params: { slug: item?.slug },
      query: {
        category: item?.category?.slug,
        roomId: item?.roomId,
      },
    })
  );
};
onMounted(() => {
  $repos.other.calculatorCategories().then((res) => {
    console.log("calculatorCategories", res);
    Object.assign(calculatorCategories.value, res.incomes);
    // calculatorCategories.value = res.incomes;
  });
});
function toArticle(e) {
  navigateTo(
    localePath({ name: "article-preview-slug", params: { slug: e.slug } })
  );
}
</script>
