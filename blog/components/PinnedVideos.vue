<template>
    <v-card min-height="124" class="mb-10 d-none d-md-block">
      <v-row>
        <v-col v-for="item in items" cols="12" md="6">
          <video-player
            small
            video-src=""
            :video-poster="item.previewUrl"
            :to="
              localePath({ name: 'video-slug', params: { slug: item.slug } })
            "
          >
            <client-only>
              <div class="details">
                <h1 class="text-h3 text-text-light">{{ item.title }}</h1>
                <span class="text-subtitle text-text-disabled">{{
                  $moment(item.publicationDate).fromNow()
                }}</span>
              </div>
            </client-only>
          </video-player>
        </v-col>
      </v-row>
    </v-card>
    <v-carousel
      v-if="items?.length"
      cycle
      height="220"
      hide-delimiters
      :show-arrows="false"
      class="d-md-none"
    >
      <v-carousel-item class="px-1" v-for="(item, i) in items" :key="item.slug">
        <video-player
          small
          video-src=""
          :video-poster="item.previewUrl"
          :to="localePath({ name: 'video-slug', params: { slug: item.slug } })"
          is-header
        >
          <client-only>
            <div class="details">
              <h1 class="text-md-h3 text-body-1 text-text-light font-weight-bold">{{ item.title }}</h1>
              <div
                class="d-flex align-center text-text-high-emphasis text-body-2 d-md-none"
              >
              <template v-if="item.author">
                    <span class="text-subtitle text-text-disabled">{{item.author}}</span>
                    <span class="line mx-2 bg-text-low-emphasis"></span>
                </template>
                <span
                  class="text-subtitle text-text-disabled"
                  >{{ $moment(item.publicationDate).fromNow() }}</span
                >
              </div>
              <span class="text-subtitle text-text-disabled d-none d-md-block">{{ $moment(item.publicationDate).fromNow() }}</span>
            </div>
          </client-only>
        </video-player>
      </v-carousel-item>
    </v-carousel>
</template>

<script setup>
const props = defineProps({
    items: Array
})
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
