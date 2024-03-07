<template>
  <v-hover>
    <template v-slot:default="{ isHovering, props }">
      <v-card
        v-bind="{ ...props, ...$attrs }"
        exact
        :height="horizontal ? 'auto' : '100%'"
        variant="outlined"
        class="mx-auto rounded-lg d-flex flex-column bg-background-light"
        :color="isHovering ? 'primary-base' : 'n100'"
        @click="toItem"
      >
        <div :class="{ 'd-flex flex-row-reverse align-center justify-space-between my-2': horizontal, 'd-block': !horizontal }">
          <v-img
            :src="item?.bannerUrl"
            :alt="item?.slug"
            class="rounded-t-md"
            :class="{'ml-2 rounded-md my-2': horizontal}"
            :style="!horizontal ? 'flex: 0 0 50%' : 'flex: 0 0 35%'"
            cover
            aspect-ratio="1.64"
          />
          <div :style="!horizontal ? 'flex: 1 0 auto' : 'flex: 0 0 50%'">
            <slot name="content">
              <v-card-text class="py-0 mt-4">
                <v-avatar class="me-1" size="24" :image="item?.instructor?.avatarUrl"></v-avatar>
                <span class="text-caption text-high-emphasis">
                  {{ item?.instructor?.name }}
                </span>
              </v-card-text>

              <v-card-text class="py-0" v-if="item.title || item.duration">
                <div
                  class="text-body-1 font-weight-bold text-text-heading"
                  :style="horizontal ? 'width: 150px;' : ''"
                  :class="{'text-truncate': horizontal}"
                  v-if="item.title"
                >
                  {{ item?.title }}
                </div>
                <div
                  class="text-text-low-emphasis text-body-2"
                  v-if="item.totalDuration"
                >
                  {{ item.totalDuration }}
                </div>
              </v-card-text>
            </slot>
          </div>
        </div>

        <v-divider :class="horizontal ? '' : 'my-4'" color="n400" thickness="1"></v-divider>

        <div style="flex: 0 0 auto" class="mb-4">
          <slot name="footer">
            <v-card-text class="py-0">
              <v-icon
                size="x-large"
                icon="custom:star"
                color="icon-hint-caution"
              />
              <span class="text-body-1 text-text-heading font-weight-bold px-2">
                {{ item.averageRating }}
              </span>
              <span class="text-text-low-emphasis text-body-2">
                ({{ item.commentCount }}) {{ $t("comment") }}
              </span>
              &nbsp;
              <span class="text-text-heading text-body-2">
                {{ $t("contain_course") }} {{ item.lessonsCount }}
              </span>
            </v-card-text>
            <v-card-text
              class="text-body-2 text-text-low-emphasis py-0"
              v-if="(item.level || item.certificateEnabled) && !horizontal"
            >
              <span v-if="item.level">{{ $t(item.level) }}</span>
              <span v-if="item.certificateEnabled">
                . {{ $t("certificate") }}</span
              >
            </v-card-text>
          </slot>
        </div>
      </v-card>
    </template>
  </v-hover>
</template>

<script setup>
const emit = defineEmits(["to:item"]);
const props = defineProps({
  item: Object,
  horizontal: {
    default: false,
    type: Boolean,
  },
});
const localePath = useLocalePath();
const toItem = () => {
  emit("to:item", props.item);
  navigateTo(localePath(props.item.url));
};
</script>
