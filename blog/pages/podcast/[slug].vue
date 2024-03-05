<template>
  <v-container class="pt-0 pb-12 pt-md-6">
    <app-breadcrumbs
      density="compact"
      color="text-heading"
      page="podcast"
      :data="item"
    />
    <v-row>
      <v-col cols="12" lg="8" md="12" tag="article">
        <v-card flat class="article-card mx-auto over-flow-hidden rounded-0">
          <v-card-text>
            {{ itemContent }}
            <app-audio-player
              :audio-src="itemContent.url"
              :audio-poster="item.bannerUrl"
            />
          </v-card-text>
          <post-content
            @reactto:article="reactPost(item)"
            @bookmark:article="bookmarkPost(item)"
            :item="item"
            :show-banner-url="false"
            inline-bookmark
          ></post-content>
        </v-card>
      </v-col>
      <v-col cols="12" md="4" tag="section">
        <v-card flat>
          <div class="mb-6" v-if="item?.information?.length">
            <p class="text-h3 mb-4 text-text-heading text-h3">
              {{ $t(`editor.listen_in`) }}
            </p>
            <div v-for="(channel, index) in item.information" :key="channel.id">
              <v-btn
                v-if="channel.link"
                :href="channel.link"
                target="_blank"
                icon
                flat
                class="me-1"
              >
                <v-img width="40" height="40" cover :src="channel.logo"></v-img>
              </v-btn>
            </div>
          </div>
          <h2 class="text-h3 text-text-heading mb-4">
            {{ $t("relevant_podcasts") }}
          </h2>
          <app-content-card
            v-for="podcast in item.relevantContentCards"
            :key="podcast.title"
            image-square
            horizontal
            :reverse="false"
            hide-image-details
            @click="
              navigateTo(
                localePath({
                  name: 'podcast-slug',
                  params: { slug: podcast.slug },
                })
              )
            "
            :content="podcast"
            hide-detail
            hide-author
            playable
            class="mb-4"
          />
        </v-card>
      </v-col>
    </v-row>
    <v-row tag="section">
      <v-col cols="12" md="12">
        <BecomeSeller />
      </v-col>
      <v-col cols="12" lg="8" md="12">
        <v-card :class="mdAndUp ? 'w-75 mx-auto' : 'w-100'">
          <v-card-text class="px-4">
            <v-divider class="mt-10 mb-4 d-none d-md-block"></v-divider>
            <app-comment-input
              :reply-to="replyedComment"
              v-model:modelValue="comment"
              @submit="addComment"
              class="pb-1"
            />
            <app-comments
              :is-last-page="page > last_page"
              :items="comments"
              :replies-paginations="repliesPaginations"
              @see:more="getComments"
              @see:replies="getCommentReplies($event)"
              @react="reactComment"
              @reply="replyComment"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- <content-card-listing
      :posts="item.relavantContentCards"
      title="relevant_content"
      :responsive-horizontal="true"
      @to:item="toItem($event)"
      :show-see-more="false"
      :show-filter="false"
    ></content-card-listing> -->
  </v-container>
</template>

<script setup>
// import BecomeSeller from "@core/layouts/components/BecomeSeller.vue";
import { useDisplay } from "vuetify";
const localePath = useLocalePath();
let item = reactive({});
const route = useRoute();
const { $repos } = useNuxtApp();
const { smAndDown } = useDisplay();
const {
  comments,
  replyedComment,
  comment,
  addComment,
  replyComment,
  getComments,
  reactComment,
  reactPost,
  bookmarkPost,
  page,
  last_page,
} = usePostActions("podcast");

useAsyncData(
  async () => {
    await $repos.article
      .show({
        slug: route.params.slug,
        type: "podcast",
      })
      .then((res) => {
        Object.assign(item, { ...res, type: "podcast" });
      });
  },
  { server: false }
);
function toItem(e) {
  navigateTo(
    localePath({ name: "article-preview-slug", params: { slug: e.slug } })
  );
}
onMounted(() => getComments());
const itemContent = computed(() => {
  let content = {};
  if (item.content?.length > 0) content = item.content[0]?.content;
  return content;
});
useHead(useHeadTags(item));
useShema(item, "video");
</script>

<style lang="scss" scoped>
.details {
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.95) 100%
  );
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 4px;
}
</style>
