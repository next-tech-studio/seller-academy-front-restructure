<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="8">
        <v-card>
          <div class="text-h3 mb-6">
            <span class="text-n400">{{ $t("result_for") }}</span>
            {{ route.query.q }}
          </div>
          <v-tabs
            v-model="tab"
            align-tabs="start"
            color="primary-base"
            class="mb-10"
          >
            <v-tab
              v-for="(item, index) in tabs"
              :key="index + 1"
              :value="index + 1"
              >{{ $t(item.title) }}</v-tab
            >
          </v-tabs>
          <v-window v-model="tab">
            <v-window-item
              v-for="(item, index) in tabs"
              :key="index + 1"
              :value="index + 1"
            >
              <div v-if="item.title == 'users'">
                <template v-for="(user, index) in users" :key="index">
                  <app-profile-list-item
                    :item="user"
                    :title="user.displayName"
                    subtitle-key="description"
                    :avatar="user.avatarUrl"
                    avatar-size="48"
                    :hover="false"
                    class="mb-4 px-1 rounded"
                  >
                    <template #append>
                      <v-btn flat size="small" variant="outlined">{{
                        $t("follow")
                      }}</v-btn>
                    </template>
                  </app-profile-list-item>
                </template>
              </div>
              <div v-if="item.title == 'posts'">
                <app-content-card-listing
                  :class="isClient ? 'd-flex' : 'd-none'"
                  :content="posts"
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
                  <v-chip v-for="tag in 40" :key="tag">
                    {{ item.title }}
                  </v-chip>
                </v-chip-group>
              </div>
              <div v-if="item.title == 'tags'">
                <v-chip-group selected-class="text-primary" column>
                  <v-chip v-for="tag in 40" :key="tag">
                    {{ item.title }}
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
            <template v-for="(item, index) in posts.slice(0, 5)" :key="index">
              <app-profile-list-item
                :item="item"
                :title="item.displayName"
                subtitle-key="description"
                :avatar="item.avatarUrl"
                avatar-size="48"
                :hover="false"
                class="mb-4 px-1 rounded"
              >
                <template #append>
                  <v-btn flat size="small" variant="outlined">{{
                    $t("follow")
                  }}</v-btn>
                </template>
              </app-profile-list-item>
            </template>
          </template>

          <template v-if="tab != 2">
            <v-card-title class="mt-10">{{ $t("top_posts") }}</v-card-title>
            <template v-for="(item, index) in users.slice(0, 5)" :key="index">
              <app-profile-list-item
                :item="item"
                :title="item.displayName"
                subtitle-key="description"
                :avatar="item.avatarUrl"
                avatar-size="48"
                :hover="false"
                class="mb-4 px-1 rounded"
              >
                <template #prepend>
                  <div></div>
                </template>
                <template #title>
                  <v-avatar color="n050" size="36">
                    <v-img cover :alt="item.name" :src="item.avatarUrl"></v-img>
                  </v-avatar>
                  <small class="ps-1">{{ item.name }}</small>
                </template>
                <template v-slot:subtitle>
                  <div class="font-weight-bold text-body-1">
                    {{ item.description }}
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
              <v-chip v-for="tag in 6" :key="tag">
                <!-- {{ item.title }} -->
                category
              </v-chip>
            </v-chip-group>
          </template>

          <template v-if="tab != 4">
            <v-card-title class="mt-10">{{ $t("top_tags") }}</v-card-title>
            <v-chip-group selected-class="text-primary" column>
              <v-chip v-for="tag in 6" :key="tag">
                <!-- {{ item.title }} -->
                tag
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
const tab = ref(null);
let lastPage = ref(false);
const tabs = ref([
  {
    title: "users",
    api: "",
  },
  {
    title: "posts",
    api: "",
  },
  {
    title: "categories",
    api: "",
  },
  {
    title: "tags",
    api: "",
  },
]);
const users = ref([{ title: "title" }]);
const posts = ref([{ title: "title" }]);
</script>
