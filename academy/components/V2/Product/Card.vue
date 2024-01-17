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
        <div
          :class="{
            'd-flex flex-row-reverse align-center justify-space-between my-2':
              horizontal,
            'd-block': !horizontal,
          }"
        >
          <v-img
            :src="item?.bannerUrl"
            :alt="item?.slug"
            class="rounded-t-md"
            :class="{ 'ml-2 rounded-md my-2': horizontal }"
            :style="!horizontal ? 'flex: 0 0 50%' : 'flex: 0 0 35%'"
            cover
            aspect-ratio="1.64"
          />
          <div :style="!horizontal ? 'flex: 1 0 auto' : 'flex: 0 0 50%'">
            <slot name="content">
              <v-card-text class="py-0">
                <div
                  class="text-body-1 font-weight-bold text-text-heading mt-4 mb-2"
                  :style="horizontal ? 'width: 150px;' : ''"
                  :class="{ 'text-truncate': horizontal }"
                  v-if="item.title"
                >
                  {{ item?.title }}
                </div>
                <div v-if="item?.productType" class="d-flex justify-space-between">
                  <div class="text-text-low-emphasis text-body-2">{{ $t('course_type') }}</div>
                  <div class="text-text-high-emphasis font-weight-bold">{{ $t(`academy.product.${item.productType}`) }}</div>
                </div>
                <div v-if="item.startAt" class="d-flex justify-space-between">
                  <div class="text-text-low-emphasis text-body-2">{{ $t('course_start_at') }}</div>
                  <div class="text-text-high-emphasis font-weight-bold">{{ $moment(item.startAt).format('jYYYY-jMM-jDD') }}</div>
                </div>
                <div v-if="item.platform" class="d-flex justify-space-between">
                  <div class="text-text-low-emphasis text-body-2">{{ $t('platform') }}</div>
                  <div class="text-text-hint-success font-weight-bold">{{ $t(`academy.product.${item.platform}`) }}</div>
                </div>
                <div v-if="item.status" class="d-flex justify-space-between">
                  <div class="text-text-low-emphasis text-body-2">{{ $t('status') }}</div>
                  <div class="text-text-high-emphasis font-weight-bold">{{ $t(`academy.product.${item.status}`) }}</div>
                </div>
              </v-card-text>
            </slot>
          </div>
        </div>

        <v-divider
          :class="horizontal ? '' : 'my-4'"
          color="n400"
          thickness="1"
        ></v-divider>

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
                ({{ item.commentsCount }}) {{ $t("comment") }}
              </span>
              &nbsp;
              <span class="text-text-heading text-body-2">
                {{ $t("contain_course") }} 6
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
