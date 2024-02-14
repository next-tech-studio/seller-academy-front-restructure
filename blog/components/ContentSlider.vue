<template>
  <v-card
    id="content-slider"
    v-if="mutedItems?.length"
    tag="section"
    :style="animation"
    :ripple="false"
    class="cursor-pointer"
  >
    <v-card-text class="pa-0">
      <v-row>
        <v-col
          cols="12"
          lg="6"
          md="12"
          @click="$emit('to:more', mutedItems[current])"
        >
          <div class="d-flex justify-space-between">
            <div
              class="text-text-high-emphasis"
              id="blog-title"
              ref="blogTitle"
              :class="[
                mdAndUp ? 'text-h1' : 'text-h2 white-space-nowrap',
                titleWidth >= parentWidth ? 'moving-title' : '',
              ]"
              v-text="mutedItems[current]?.title"
            ></div>
          </div>
          <div
            class="text-subtitle-1 text-text-low-emphasis pt-2 d-flex align-center"
          >
            <client-only>
              {{ $moment(mutedItems[current]?.publicationDate).fromNow() }}
            </client-only>
            <span class="dot mx-2"></span>
            نوشته
            {{
              mutedItems[current]?.author?.displayName ||
              mutedItems[current]?.author?.first_name +
                " " +
                mutedItems[current]?.author?.last_name
            }}
          </div>
          <div
            class="text-body-1 text-text-low-emphasis truncate-4 pt-2 d-none d-md-flex"
          >
            <span class="truncate-3">{{ mutedItems[current]?.summary }}</span>
          </div>
          <v-btn
            @click="$emit('to:more', mutedItems[current])"
            variant="text"
            class="px-0 mt-2 text-button d-none d-md-flex animated"
            color="text-secondary"
            >{{ $t("see_more") }}</v-btn
          >
        </v-col>
        <v-col cols="12" lg="6" md="12" class="my-md-auto my-1">
          <client-only>
            <v-carousel
              class="rounded-lg"
              :height="mdAndUp ? 370 : 199"
              v-model="current"
              :interval="10000"
              cycle
              v-bind="$attrs"
            >
              <template v-slot:prev="{ props }">
                <v-btn
                  :height="mdAndUp ? 50 : 20.36"
                  class="text-white"
                  size="x-small"
                  style="
                    background: rgba(var(--v-theme-background-scrim-dark), 30%);
                    border-radius: 8px 0 0 8px;
                    min-width: fit-content !important;
                  "
                  @click="props.onClick"
                >
                  <v-icon icon="custom:chevronRight"></v-icon>
                </v-btn>
              </template>
              <template v-slot:next="{ props }">
                <v-btn
                  :height="mdAndUp ? 50 : 20.36"
                  class="text-white"
                  size="x-small"
                  style="
                    background: rgba(var(--v-theme-background-scrim-dark), 30%);
                    border-radius: 0 8px 8px 0;
                    min-width: fit-content !important;
                  "
                  @click="props.onClick"
                >
                  <v-icon icon="custom:chevronLeft"></v-icon>
                </v-btn>
              </template>
              <v-carousel-item
                class="d-flex justify-center align-end rounded-lg"
                v-for="(item, i) in mutedItems"
                :key="i"
                aspect-ratio="1.64"
                cover
                :src="item?.bannerUrl"
                :alt="item?.slug"
              >
              </v-carousel-item>
            </v-carousel>
          </client-only>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { useDisplay } from "vuetify";
import { useElementSize } from "@vueuse/core";
const blogTitle = ref(null);
let titleWidth = ref(0);
let parentWidth = ref(0);
const props = defineProps({
  items: {
    type: [Array, Object],
  },
});
onUpdated(() => {
  titleWidth.value = document.getElementById("blog-title")?.offsetWidth;
  parentWidth.value = document.getElementById("content-slider")?.offsetWidth;
});
const getWidth = () => {
  titleWidth.value = document.getElementById("blog-title").offsetWidth;
  parentWidth.value = document.getElementById("content-slider").offsetWidth;
};
const current = ref(0);
const active = ref(true);
const { mdAndUp } = useDisplay();
watch(current, (oldValue, newValue) => {
  nextTick(() => {
    getWidth();
  });
});

let animation = computed(() => {
  return {
    "--title-width": titleWidth.value - parentWidth.value + "px",
  };
});

const mutedItems = computed(() => {
  let result = [];
  if (props.items?.constructor === Array) {
    return props.items;
  } else {
    result.push(props.items);
    return result;
  }
});
</script>

<style lang="scss">
#content-slider {
  .v-window__controls {
    padding: 0 !important;
  }

  .v-carousel__controls {
    left: 50% !important;
    transform: translateX(-50%);
    width: auto !important;
    height: auto !important;
    border-radius: 8px 8px 0 0;
    color: white;
    padding-right: 20px;
    padding-left: 20px;

    @include respond("sm") {
      height: 10px !important;
    }

    .v-btn {
      @include respond("sm") {
        width: auto !important;
        height: auto !important;
        border-radius: 0;
        margin: auto 4px;
      }

      .v-btn__content {
        display: none;
      }

      &::before {
        content: "";
        width: 8px;
        height: 8px;
        background-color: white;
        border-radius: 50%;
        margin: auto;

        @include respond("sm") {
          width: 3.26px;
          height: 3.26px;
        }
      }

      &--active {
        &::before {
          content: "";
          width: 31px;
          background-color: white;
          height: 8px;
          border-radius: 50px;

          @include respond("sm") {
            width: 12.62px;
            height: 3.26px;
          }
        }
      }
    }
  }
  .moving-title {
    animation-iteration-count: infinite;
    animation-timing-function: alternate;
    animation-name: move-horizontal;
    animation-duration: 4s;
    // -webkit-animation-delay: 1s;
    // -moz-animation-delay: 1s;
    // -ms-animation-delay: 1s;
    // -o-animation-delay: 1s;
    // animation-delay: 1s;
    @keyframes move-horizontal {
      from {
        transform: translateX(0);
      }

      to {
        transform: translateX(var(--title-width));
      }
    }
  }
  .white-space-nowrap {
    white-space: nowrap;
  }
}
</style>
