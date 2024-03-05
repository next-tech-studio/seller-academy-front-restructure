<template>
  <div id="blog-content">
    <div
      class="d-flex flex-column align-start justify-space-between px-2 px-md-4 bg-white mb-4 mb-md-0"
    >
      <v-card-title
        class="w-100 text text-text-heading px-0 pt-md-4 pb-0 line-break title__width"
        :class="mdAndUp ? 'text-h1' : 'text-h5'"
        v-text="item.title"
        tag="h1"
      />

      <div class="d-flex d-md-none align-start justify-space-between w-100">
        <div class="d-flex">
          <div
            class="text-caption text-text-low-emphasis me-4 d-flex align-center"
          >
            <client-only>
              {{ $moment(item?.publicationDate).fromNow() }}
            </client-only>
            <span class="dot mx-2"></span>
            <div>{{ item?.author?.displayName }}</div>
            <span class="dot mx-2"></span>
            <div>
              <span class="text-caption d-md-none text-text-low-emphasis">
                {{ item?.minutesToRead }} {{ $t("minutes") }}</span
              >
              <v-icon
                icon="custom:book"
                color="icon-low-emphasis"
                class="ms-2"
                size="13"
              />
            </div>
          </div>
        </div>
        <div>
          <v-btn
            flat
            size="x-small"
            :disabled="isPreview"
            class="text-text-high-emphasis text-caption py-1 justify-end align-start"
            @click="$emit('reactto:article')"
          >
            <template #append>
              <v-icon
                :color="
                  item.currentUserLiked ? 'icon-primary' : 'icon-low-emphasis'
                "
                class="me-2"
                icon="custom:heart"
                size="13"
              ></v-icon>
            </template>
            <span class="mt-n-half text-text-low-emphasis">
              {{ item.likesCount || 0 }}</span
            >
          </v-btn>
          <v-btn
            flat
            size="x-small"
            class="text-text-high-emphasis text-caption py-1 justify-start align-start"
            @click="$emit('bookmark:article')"
          >
            <template #append>
              <v-icon
                :icon="
                  item.currentUserBookmarked
                    ? 'custom:bookmarkSolid'
                    : 'custom:bookmark'
                "
                color="text-low-emphasis"
                size="13"
              ></v-icon>
            </template>
          </v-btn>
        </div>
        <div class="d-none d-md-block">
          <span
            class="text-text-high-emphasis text-caption"
            v-text="item.viewsCount || 0"
          />
          <v-icon
            color="text-low-emphasis"
            class="mr-2"
            icon="custom:eye"
            size="12"
          ></v-icon>
        </div>
      </div>
      <div class="d-md-flex d-none align-center justify-start w-100 mb-6">
        <v-card-subtitle class="px-0">
          <div
            class="text-subtitle text-text-low-emphasis me-4 d-flex align-center"
          >
            <client-only>
              {{ $moment(item?.publicationDate).fromNow() }}
            </client-only>
            <span class="dot mx-2"></span>

            <div>{{$t('written')}} {{ item?.author?.displayName }}</div>
          </div>
        </v-card-subtitle>
        <v-card-text class="d-flex align-center py-0 pe-0">
          <v-spacer></v-spacer>
          <!-- <app-share-in /> -->
          <v-divider class="mr-lg-6 mr-3" vertical></v-divider>
          <div class="mx-4 d-flex align-center">
            <v-btn
              flat
              class="text-text-high-emphasis"
              :disabled="isPreview"
              @click="$emit('reactto:article')"
            >
              <template #append>
                <v-icon
                  :color="
                    item.currentUserLiked ? 'icon-primary' : 'icon-low-emphasis'
                  "
                  class="me-2"
                  icon="custom:heart"
                  size="24"
                ></v-icon>
              </template>
              {{ item.likesCount || 0 }}
            </v-btn>
            <div>
              <span
                class="text-text-high-emphasis"
                v-text="item.viewsCount || 0"
              />
              <v-icon
                color="text-low-emphasis"
                class="mr-2"
                icon="custom:eye"
                size="24"
              ></v-icon>
            </div>
            <v-btn
              v-if="inlineBookmark"
              flat
              density="compact"
              class="text-text-low-emphasis ms-2"
              :disabled="isPreview"
              @click="$emit('bookmark:article')"
              :icon="
                item.currentUserBookmarked
                  ? 'custom:bookmarkSolid'
                  : 'custom:bookmark'
              "
            >
            </v-btn>
          </div>
        </v-card-text>
      </div>
    </div>
    <div class="w-100">
      <slot name="content">
        <div id="content">
          <v-card-text
            class="text-text-low-emphasis text-body-1 pt-0 pb-0 content px-lg-4 px-2 mb-6"
            v-html="item?.summary || item.description"
          ></v-card-text>
          <v-card-text v-if="showBannerUrl">
            <v-img
              class="rounded-lg"
              :src="item?.bannerUrl"
              height="495px"
              cover
            ></v-img>
          </v-card-text>
          <v-card-text
            v-for="(element, index) in item?.content"
            :key="index"
            class="pt-0 pb-4 content px-4"
          >
            <app-content :type="element?.type" :content="element?.content" :element="item" />
          </v-card-text>
          <!-- <app-share-in
            justify="justify-start"
            class="d-flex d-md-none px-4"
            :class="item?.tags?.length != 0 ? 'mb-0' : 'mb-4'"
          /> -->
        </div>
      </slot>
    </div>
    <v-card-text v-if="item?.tags?.length">
      <app-tags :items="item.tags" :type="type" />
    </v-card-text>
    <!-- <v-card-text
      class="text-text-low-emphasis text-body-1 content px-0"
      v-html="item.description"
    >
    </v-card-text> -->
  </div>
</template>

<script setup>
import { useDisplay } from "vuetify";
const socials = useSocials();
const { mdAndUp } = useDisplay();
const route = useRoute()
const props = defineProps({
  item: Object,
  useDesktop: { type: Boolean, default: false },
  isPreview: Boolean,
  showBannerUrl: {
    default: true,
    type: Boolean,
  },
  inlineBookmark: {
    default: false,
    type: Boolean,
  },
});
const type = computed(() =>
  route.name.includes("podcast") ? "podcast" : "article"
);
onUpdated(() => {
  let content = document.getElementById("content");
  for (let i = 0; i < content.getElementsByTagName("p").length; i++) {
    content.getElementsByTagName("p")[i].classList.add("text-body-1");
  }
  for (let i = 0; i < content.getElementsByTagName("h3").length; i++) {
    content.getElementsByTagName("h3")[i].classList.add("text-h3");
  }
  for (let i = 0; i < content.getElementsByTagName("h4").length; i++) {
    content.getElementsByTagName("h4")[i].classList.add("text-h4");
  }
  for (let i = 0; i < content.getElementsByTagName("strong").length; i++) {
    content
      .getElementsByTagName("strong")
      [i].classList.add("text-body-1", "font-weight-bold");
  }
});
</script>

<style lang="scss">
.content {
  img,
  video {
    max-width: 100%;
    width: 100%;
    object-fit: contain;
    height: auto;
    display: block;
    margin: 16px auto;
    border-radius: 16px;
  }
}
</style>

<style lang="scss" scoped>
.content :is(h1, h2, h3, h4, h5, h6, strong) {
  color: rgb(var(--v-theme-text-high-emphasis));
  :not(strong) {
    line-height: 55px !important;
  }
}
#blog-content {
  .content img {
    max-width: 100%;
    object-fit: contain;
    height: auto;
    display: flex;
    flex-direction: column;
    margin: 16px auto;
    border-radius: 16px;
  }

  .vertical-socials {
    &__text {
      writing-mode: vertical-rl;
      transform: scale(-1);
    }
    &__icon {
      transform: rotate(-90deg);
    }
  }
  .title__width {
    width: 100%;
    @include respond("sm") {
      width: 60%;
    }
  }
  .mt-n-half {
    margin-top: -2px !important;
  }
}
</style>
