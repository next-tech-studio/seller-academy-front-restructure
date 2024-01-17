<template>
  <v-card
    flat
    :ripple="false"
    :class="{
      'd-flex justify-space-between': horizontal || isBanner,
      horizontal: horizontal,
      'flex-row-reverse': reverse,
      'bg-n200': selectCard,
    }"
  >
    <div
      class="h-100"
      :style="{ flex: isBanner || horizontal ? '1 1 50%' : '' }"
      :class="{ 'flex-1-1-50': hideImageDetails }"
    >
      <v-img
        cover
        :aspect-ratio="
          horizontal && smAndDown ? '1.09' : imageSquare ? '1' : '1.64'
        "
        class="rounded-lg mb-2 text-subtitle-1 bg-n300"
        :src="content?.bannerUrl || content?.bannerUrlPodcast"
        :alt="content.slug"
        :max-width="playable ? 124 : ''"
      >
        <div
          class="d-flex"
          :class="
            mdAndUp && content.type != 'podcast'
              ? 'justify-space-between'
              : ' justify-end'
          "
          v-if="!hideImageDetails"
        >
          <v-chip
            size="small"
            v-if="content.type != 'podcast'"
            :to="
              localePath({
                name: 'article-category-slug',
                params: { slug: content?.category?.slug },
              })
            "
            class="bg-background-light ma-2 text-text-low-emphasis d-none d-md-flex align-center"
          >
            {{ content?.category?.title }}
          </v-chip>
          <v-chip
            size="small"
            class="bg-background-light ma-2 text-text-low-emphasis"
          >
            {{ content?.minutesToRead }} {{ $t("minutes") }}
            <v-icon icon="custom:book" class="ms-2"></v-icon>
          </v-chip>
        </div>
        <div class="d-flex justify-center align-center h-100" v-if="playable">
          <v-btn class="play-btn" icon size="small" theme="dark">
            <v-icon color="white" size="small" class="ml-1">fas fa-play</v-icon>
          </v-btn>
        </div>
      </v-img>
    </div>
    <div
      :style="{ flex: isBanner || (horizontal && smAndDown) ? '1 1 50%' : '' }"
      :class="{
        'horizontal-detail': horizontal,
        'w-50': isBanner,
        'w-100': !isBanner,
        'ms-4': !reverse,
      }"
    >
      <div class="px-0">
        <div class="d-flex flex-column">
          <v-card-text class="px-0 py-0" :class="isBanner ? 'order-3' : ''">
            <div
              :class="{
                'text-truncate': mdAndUp,
                'truncate-2': !mdAndUp,
                'text-md-h1 text-h5': isBanner,
                'text-md-body-1 text-body-2': !isBanner,
              }"
              class="text-text-heading"
              style="font-weight: bold !important"
            >
              {{ content.title }}
            </div>
          </v-card-text>
          <div :class="smAndDown ? 'order-2' : 'order-1'">
            <client-only>
              <span class="text-body-2 text-text-low-emphasis">
                {{ $moment(content.publicationDate).fromNow() }}
              </span>
            </client-only>
          </div>
          <div
            v-if="content.author && !hideAuthor"
            class="my-2 align-center"
            :class="smAndDown ? 'order-1' : 'order-2'"
          >
            <v-avatar
              :size="smAndDown ? 25 : 32"
              :image="content?.author?.avatarUrl"
              color="n100"
            ></v-avatar>
            <span class="mx-2 text-text-high-emphasis text-caption">{{
              content?.author?.displayName
            }}</span>
          </div>
        </div>
      </div>
      <v-card-item class="px-0 mt-auto mt-md-0" v-if="content.type != 'podcast' && !hideDetail ">
        <v-card-subtitle
          class="py-0"
          style="opacity: 1"
          v-if="content.type != 'podcast'"
        >
          <v-chip
            size="small"
            color="#E7F7FA"
            :to="
              localePath({
                name: 'article-category-slug',
                params: { slug: content?.category?.slug },
              })
            "
            class="text-text-secondary text-caption d-md-none mb-4"
          >
            {{ content?.category?.title }}
          </v-chip>
        </v-card-subtitle>
        <v-card-text
          v-if="!hideDetail"
          class="pa-0 mt-2 text-text-low-emphasis d-none d-md-flex align-start text-md-body-1 text-body-2"
        >
          <span :class="isBanner ? 'text-body-2' : 'truncate-2'">{{
            content.summary
          }}</span>
        </v-card-text>
      </v-card-item>
    </div>
  </v-card>
</template>

<script setup>
import { useDisplay } from "vuetify";
import Play from "@core/components/icons/play.vue";

const { mdAndUp, md, smAndDown } = useDisplay();
const localePath = useLocalePath();

const props = defineProps({
  content: {
    default: () => {},
    type: Object,
  },
  horizontal: {
    type: Boolean,
    default: false,
  },
  hideDetail: {
    type: Boolean,
    default: false,
  },
  hideAuthor: {
    type: Boolean,
    default: false,
  },
  isBanner: {
    type: Boolean,
    default: false,
  },
  index: { type: Number, default: 0 },
  reverse: {
    type: Boolean,
    default: false,
  },
  hideImageDetails: {
    type: Boolean,
    default: false,
  },
  imageSquare: {
    type: Boolean,
    default: false,
  },
  playable: {
    type: Boolean,
    default: false,
  },
  selectCard: {
    type: Boolean,
    default: false,
  },
});

const imageHeight = computed(() => {
  let height;
  if (props.horizontal && props.isBanner && !smAndDown.value) {
    height = 369;
  } else if (smAndDown.value) {
    height = 97;
  } else {
    height = 243;
  }
  return height;
});

const contentHeight = computed(() => {
  let height;
  if (props.horizontal && props.isBanner && !smAndDown.value) {
    height = 369;
  } else if (smAndDown.value) {
    height = 155;
  } else {
    height = "content-fit";
  }
  return height;
});

const imageWidth = computed(() => {
  let width;
  if (props.horizontal && props.isBanner && !smAndDown.value) {
    width = 608;
  } else if (props.horizontal && smAndDown.value) {
    width = 160;
  } else {
    width = "auto";
  }
  return width;
});

const computeHeight = () => {
  return {
    height: height,
  };
};
</script>

<style lang="scss" scoped>
.horizontal {
  display: flex;
  // flex-direction: row-reverse;
  &-detail {
    display: flex;
    flex-direction: column;
    padding-left: 16px;
  }
}
.flex-1-1-50 {
  flex: 1 1 50% !important;
}
.play-btn {
  background-color: rgba(var(--v-theme-background-scrim-dark), 30%);
}
</style>
