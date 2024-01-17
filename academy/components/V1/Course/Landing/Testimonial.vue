<template>
  <div class="text-lg-h2 text-h3 text-text-heading mb-4">
    {{ $t("from_the_students") }}
  </div>
  <v-carousel
    v-model="current"
    hide-delimiters
    cycle
    :show-arrows="false"
    height="content-fit"
    ref="parent"
  >
    <v-carousel-item v-for="item in items" :key="item?.id">
      <div class="d-flex flex-lg-row flex-column">
        <div v-if="lgAndUp" class="position-relative ml-12">
          <v-icon
            color="n200"
            size="87"
            icon="custom:ovalDots"
            style="position: absolute; left: 0"
          ></v-icon>
          <v-avatar size="200" class="rounded-pill rounded-ts-0">
            <v-img cover :src="item?.user?.avatarUrl" class="align-stretch">
            </v-img>
          </v-avatar>
        </div>
        <div class="d-flex align-center" v-else>
          <v-avatar size="64" class="rounded-pill rounded-ts-0">
            <v-img cover :src="item?.user?.avatarUrl" class="align-stretch">
            </v-img>
          </v-avatar>
          <div class="mr-4">
            <div class="text-subtitle font-weight-bold text-text-heading">
              {{ item?.user?.displayName }}
            </div>
            <div class="text-body-1 text-text-low-emphasis">
              {{ item?.user?.description }}
            </div>
          </div>
        </div>
        <div class="d-flex flex-column h-100 justify-space-around">
          <div class="text-lg-body-1 text-caption text-text-low-emphasis">
            {{ item.text }}
          </div>
          <div v-if="lgAndUp">
            <div class="text-subtitle font-weight-bold text-text-heading">
              {{ item?.user?.displayName }}
            </div>
            <div class="text-body-1 text-text-low-emphasis">
              {{ item?.user?.description }}
            </div>
          </div>
        </div>
      </div>
    </v-carousel-item>
  </v-carousel>
  <div>
    <div class="d-flex justify-space-between align-center w-100">
      <div class="d-lg-block d-none">
        <v-avatar
          v-for="(item, index) in items"
          :key="item?.user?.displayName"
          class="ml-4 my-6"
          :style="index == current ? 'opacity: 1' : 'opacity: .4'"
          @click="toItem(index)"
          tag="button"
        >
          <v-img
            cover
            :src="item?.user?.avatarUrl"
            :alt="item?.user?.avatarUrl"
          ></v-img>
        </v-avatar>
      </div>
      <div class="mt-lg-0 mt-4">
        <v-btn
          size="small"
          :color="current != 0 ? 'primary-base' : 'background-dark'"
          :class="current != 0 ? 'text-white' : 'text-icon-low-emphasis'"
          variant="flat"
          icon="custom:chevronRight"
          class="rounded-xl ml-2"
          @click="prev"
          :disabled="current == 0"
        ></v-btn>
        <v-btn
          size="small"
          :color="
            current != items?.length - 1 ? 'primary-base' : 'background-dark'
          "
          :class="
            current != items?.length - 1 ? 'text-white' : 'text-icon-low-emphasis'
          "
          variant="flat"
          icon="custom:chevronLeft"
          class="rounded-xl"
          @click="next"
          :disabled="current == items?.length - 1"
        ></v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDisplay } from "vuetify";
const props = defineProps({
  items: Array,
});
const current = ref(0);
const parent = ref(null);
const { lgAndUp } = useDisplay();

const next = () => {
  current.value < props.items.length - 1
    ? current.value++
    : (current.value = 0);
};
const prev = () => {
  current.value > 0
    ? current.value--
    : (current.value = props.items.length - 1);
};

const toItem = (index) => {
  current.value = index;
};
</script>
