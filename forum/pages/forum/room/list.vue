<template>
  <div class="bg-background-dark">
    <div
      :style="lgAndUp ? 'height: 425px' : ''"
      class="bg-background-light position-relative mb-lg-16 mb-0"
    >
      <v-container
        class="d-flex justify-space-between h-100 py-0 pt-lg-16 pt-4"
      >
        <div>
          <h2>{{ $t("rooms") }}</h2>
          <span>{{ $t("rooms_description") }}</span>
        </div>
        <div class="align-self-end d-none d-lg-block">
          <v-img
            width="300px"
            src="/images/roomlist_header.png"
            alt="rooms_header"
          ></v-img>
        </div>
      </v-container>
      <div class="d-flex bg-half" :class="{ 'top-room-postion': lgAndUp }">
        <v-container>
          <v-row class="mb-lg-8 mb-6">
            <v-col cols="12" lg="6">
              <v-text-field
                v-model="search"
                placeholder="نام اتاق"
                prepend-inner-icon="custom:search"
                single-line
                flat
                class="text-text-low-emphasis w-100 text-body-1"
                density="compact"
                variant="outlined"
                bg-color="background-light"
                type="search"
                @update:model-value="onSearch($event, 3000)"
                @keyup.enter="onSearch($event, 0)"
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>

          <app-switch-wrapper class="pa-0 me-0" one-side-margin>
            <client-only>
              <v-slide-group>
                <v-slide-group-item
                  v-for="(item, index) in topRooms"
                  :key="index"
                  :value="item.slug"
                >
                  <div class="me-2">
                    <room-card
                      :item="item"
                      @to:item="toRoom"
                      :max-width="296"
                    ></room-card>
                  </div>
                </v-slide-group-item>
              </v-slide-group>
            </client-only>
          </app-switch-wrapper>
        </v-container>
      </div>
    </div>
    <div v-if="categories.length" class="mt-lg-16 mt-0 pt-0 pt-lg-16">
      <app-filterings
        @filter="getRooms(true)"
        class="mb-2 pt-lg-16 pt-10"
        arrow-bg-gradient-end="--v-theme-background-dark"
        :filters="filters"
      />
    </div>
    <v-container class="pb-10">
      <v-row justify="center" :class="isClient ? 'd-flex' : 'd-none'">
        <v-col cols="12" lg="3" md="6" v-for="item in rooms" :key="item.id">
          <room-card :item="item" @to:item="toRoom"></room-card>
        </v-col>
        <span v-if="rooms.length == 0" class="text-text-low-emphasis mb-6">{{
          $t("no_result_found")
        }}</span>
      </v-row>
      <v-row justify="center" v-if="rooms.length != 0 && !lastPage">
        <v-btn
          @click="getRooms(false)"
          flat
          class="mt-6 text-button"
          color="primary-base"
          >{{ $t("see_more") }}</v-btn
        >
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { useDisplay } from "vuetify";
const { lgAndUp } = useDisplay();
const { $repos } = useNuxtApp();
const localePath = useLocalePath();
const { isClient } = useSsrCorrection();
const { t } = useI18n();
import { useFilterStore } from "@core/stores/filter";
const store = useFilterStore();
let page = reactive(1);
let rooms = ref([]);
let search = ref("");
const categories = ref([]);
const topRooms = reactive([]);
let lastPage = ref(false);
let timeoutId = ref()
const getRooms = (resetPage = false) => {
  if (resetPage) page = 1;
  let payload = {
    page,
    search: search.value,
    categorySlug: store.buttonDefault,
  };
  $repos.community.getRoomsData(payload).then((res) => {
    if (resetPage) {
      rooms.value.splice(0, rooms.value.length);
      Object.assign(rooms.value, res.data);
    } else {
      Object.assign(rooms.value, [...rooms.value, ...res.data]);
    }
    lastPage.value = res.last_page === res.current_page ? true : false;
    if (res.pagination.total != page) page++;
  });
};
const getCommon = () => {
  $repos.community.getRoomsCommon().then((res) => {
    Object.assign(categories.value, res.categories);
    Object.assign(topRooms, res.top_rooms);
    store.buttonDefault = categories.value[0].slug;
  });
};

function debounce(func, timeout) {
  return (...args) => {
    clearTimeout(timeoutId.value);
    timeoutId.value = setTimeout(() => {
      func(...args);
    }, timeout);
    console.log(timeoutId.value);
  };
}

const onSearch = (e, timeout) => {
  if (typeof e != 'string') clearTimeout(timeoutId.value)
  debounce(getRooms, timeout)(true)
}

onMounted(() => {
  getCommon();
  getRooms();
});

let filters = computed(() => {
  return [{ type: "button", items: categories.value }];
});
const toRoom = (item) => {
  console.log(item);
  navigateTo(
    localePath({
      name: "forum-room-slug",
      params: { slug: item?.slug },
      query: {
        category: item?.category?.slug,
        roomId: item?.roomId,
      },
    })
  );
};

definePageMeta({
  middleware: ["auth"],
});

useHead(
  useHeadTags({
    title: t("rooms"),
  })
);
</script>
<style lang="scss">
.top-room-postion {
  position: absolute;
  top: 35%;
  width: 100%;
}
.bg-half {
  background: linear-gradient(
    to top,
    rgba(var(--v-theme-background-dark)) 0 40.5%,
    transparent 0 50%
  );
}
</style>
