<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="8">
        <v-card>
          <div class="text-h3 mb-6">
            <span class="text-n400">{{ $t("result_for") }}</span>
            {{ route.query.q }}
          </div>
          <dashboard-menu
            v-model="tab"
            :menu="tabs"
            selected-class="text-high-emphasis"
            :grow="false"
            class="mb-4"
          ></dashboard-menu>
          <v-window v-model="tab">
            <v-window-item
              v-for="(item, index) in tabs"
              :key="index + 1"
              :value="index"
            >
              <div v-if="item.title == 'users'">
                <template v-for="(user, index) in users" :key="index">
                  <app-profile-list-item
                    :item="user"
                    subtitle-key="description"
                    :avatar="user.avatarUrl"
                    avatar-size="48"
                    :hover="false"
                    class="mb-4 px-1 rounded"
                  >
                    <template #title>
                      <div class="ps-1 text-caption font-weight-bold">
                        {{ user.displayName }}
                      </div>
                    </template>
                    <template #append>
                      <v-btn
                        @click="follow(user)"
                        flat
                        size="small"
                        color="primary-base"
                        >{{
                          $t(user.isFollowed ? "unfollow" : "follow")
                        }}</v-btn
                      >
                    </template>
                  </app-profile-list-item>
                </template>
              </div>
              <div v-if="item.title == 'articles'">
                <app-content-card-listing
                  :class="isClient ? 'd-flex' : 'd-none'"
                  :content="articles"
                  :responsive-horizontal="true"
                  @to:item="toItem($event)"
                  @load:more="toMore"
                  @filter="getHomeData($event)"
                  see-more-title="see_more_articles"
                  :show-see-more="!lastPage"
                  grid="12"
                  horizontal
                ></app-content-card-listing>
              </div>
              <div v-if="item.title == 'categories'">
                <v-chip-group selected-class="text-primary" column>
                  <v-chip v-for="category in categories" :key="category.title">
                    {{ category.title }}
                  </v-chip>
                </v-chip-group>
              </div>
              <div v-if="item.title == 'tags'">
                <v-chip-group selected-class="text-primary" column>
                  <v-chip v-for="tag in tags" :key="tag.title">
                    {{ tag.title }}
                  </v-chip>
                </v-chip-group>
              </div>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <template v-if="tab != 1">
            <v-card-title>{{ $t("top_users") }}</v-card-title>
            <template v-for="(user, index) in users.slice(0, 5)" :key="index">
              <app-profile-list-item
                :item="user"
                subtitle-key="description"
                :avatar="user.avatarUrl"
                avatar-size="48"
                :hover="false"
                class="mb-4 px-1 rounded"
              >
                <template #title>
                  <div class="ps-1 text-caption font-weight-bold">
                    {{ user.displayName }}
                  </div>
                </template>
                <template #append>
                  <v-btn
                    @click="follow(user)"
                    flat
                    size="small"
                    variant="outlined"
                    >{{ $t(user.isFollowed ? "unfollow" : "follow") }}</v-btn
                  >
                </template>
              </app-profile-list-item>
            </template>
          </template>

          <template v-if="tab != 2">
            <v-card-title class="mt-10">{{ $t("top_posts") }}</v-card-title>
            <template
              v-for="(article, index) in articles.slice(0, 5)"
              :key="index"
            >
              <app-profile-list-item
                :item="article"
                subtitle-key="description"
                avatar-size="48"
                :hover="false"
                class="mb-4 px-1 rounded"
              >
                <template #prepend>
                  <div></div>
                </template>
                <template #title>
                  <v-avatar color="n050" size="36">
                    <v-img
                      cover
                      :alt="article.title"
                      :src="article.bannerUrl"
                    ></v-img>
                  </v-avatar>
                  <small class="ps-1">{{ article.title }}</small>
                </template>
                <template v-slot:subtitle>
                  <div class="font-weight-bold text-body-1">
                    {{ article.description }}
                  </div>
                </template>
              </app-profile-list-item>
            </template>
          </template>

          <template v-if="tab != 3">
            <v-card-title class="mt-10">{{
              $t("top_categories")
            }}</v-card-title>
            <v-chip-group selected-class="text-primary" column>
              <v-chip v-for="tag in tags.slice(0, 10)" :key="tag">
                {{ tag.title }}
              </v-chip>
            </v-chip-group>
          </template>

          <template v-if="tab != 4">
            <v-card-title class="mt-10">{{ $t("top_tags") }}</v-card-title>
            <v-chip-group selected-class="text-primary" column>
              <v-chip
                v-for="category in categories.slice(0, 10)"
                :key="category"
              >
                {{ category.title }}
              </v-chip>
            </v-chip-group>
          </template>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const { isClient } = useSsrCorrection();
const route = useRoute();
const tab = ref(0);
let lastPage = ref(false);
const { $repos } = useNuxtApp();
const tabs = ref([
  {
    title: "users",
    api: "",
  },
  {
    title: "articles",
    api: "",
  },
  {
    title: "tags",
    api: "",
  },
  {
    title: "categories",
    api: "",
  },
]);
const users = ref([]);
const articles = ref([]);
const tags = ref([]);
const categories = ref([]);

const follow = (item) => {
  let itemIndex = users.value.findIndex(
    (element) => element.id === item.id
  );
  $repos.other
    .follow({
      body: { followId: item.id, do: item.isFollowed ? "unfollow" : "follow" },
    })
    .then((res) => {
      users.value[itemIndex].isFollowed =
        !users.value[itemIndex].isFollowed;
    });
};

const search = async (type) => {
  await $repos.other
    .universalSearch({ type, keyword: route.query.q })
    .then((res) => {
      console.log(type, res);
      if (type == "user") users.value = [...res.data];
      if (type == "article") articles.value = [...res.data];
      if (type == "tag") tags.value = [...res.data];
      if (type == "category") categories.value = [...res.data];
      lastPage.value = res.last_page === res.current_page ? true : false;
    });
};

Promise.all([
  useAsyncData(async () => await search("user")),
  useAsyncData(async () => await search("article")),
  useAsyncData(async () => await search("tag")),
]);
</script>
