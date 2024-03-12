<template>
  <div id="search-navbar" :class="!lgAndUp ? 'px-4' : ''">
  <!-- {{ searchItems }} -->
    <div class="position-relative size">
      <v-btn
        size="small"
        v-if="!expandedSearch && lgAndUp"
        icon
        variant="outlined"
        class="mt-3"
        @click="expandedSearch = !expandedSearch"
        color="border-grade-2"
      >
        <v-icon color="border-grade-2" icon="custom:search" />
      </v-btn>
      <div class="d-flex align-center h-100">
        <v-combobox
          v-model="search"
          :items="searchItems"
          flat
          :class="
            expandedSearch && lgAndUp
              ? 'search-input search-input--active'
              : !lgAndUp
              ? ''
              : lgAndUp
              ? 'search-input'
              : ''
          "
          type="search"
          label="جستجوی مقالات و پادکست‌ها ..."
          item-title="title"
          hide-details
          :menu="showMenu"
          menu-icon=""
          :clearable="true"
          open-on-clear
          clear-icon="custom:x"
          density="compact"
          base-color="text-low-emphasis"
          variant="outlined"
          single-line
          @update:search="onSearch"
          @keydown.enter="onUniversalSearch"
          :menu-props="{
            contentClass: 'search-input__content--bordered',
            offset: lgAndUp ? '-2px' : '0px',
            maxWidth: '383px',
            closeOnContentClick: true,
            minHeight: !lgAndUp ? '85vh' : 'auto',
          }"
        >
          <template v-slot:prepend-inner>
            <v-icon
              size="x-small"
              color="icon-high-emphasis"
              icon="custom:search"
            />
          </template>
          <template v-slot:item="{ item }">
            <div
              class="d-flex flex-column py-1"
              style="cursor: pointer"
              @click="chooseArticle(item.raw)"
            >
              <div class="d-flex text-body-1">
                <v-avatar class="me-3">
                  <v-img cover :src="item.raw.bannerUrl" />
                </v-avatar>
                <span>{{ item.title }}</span>
              </div>
              <span class="ms-13 text-subtitle-1"
                >در
                <span class="text-secondary-base">{{
                  $t(item.raw.type)
                }}</span>
              </span>
            </div>
          </template>
          <!-- <template v-slot:no-data>
            <span>چنین عنوانی وجود ندارد</span>
          </template> -->
        </v-combobox>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDisplay } from "vuetify";
const { $repos } = useNuxtApp();
const localePath = useLocalePath();
const { lgAndUp } = useDisplay();
const emit = defineEmits(["search",'choose:article']);
import { useDebounceFn } from "@vueuse/core";
const props = defineProps({
  universal: {
    type: Boolean,
    default: false
  }
})
let search = ref("");
let searchItems = ref([]);
let showMenu = ref(false)
let expandedSearch = ref(false);
const onSearch = !props.universal ? useDebounceFn(
  async () => {
    await $repos.other.search(search.value).then((res) => {
      searchItems.value = res;
      if(res) showMenu.value = true
      console.log('searchItems',searchItems.value, searchItems.value.length)
    });
  },
  100,
  { maxWait: 100 }
) : () => {};

const onUniversalSearch = () => {
  navigateTo(localePath({ name: 'blog-search', query: { q: search.value } }))
}

const chooseArticle= (item) => {
  search.value = item.title;
  emit('choose:article', item)
  search.value = "";
  // searchItems.value = "";
  expandedSearch.value = false;
};
watch(search, (newSearchValue) => {
  console.log('wwatch',!newSearchValue)
  console.log('83883838383838383838',searchItems.value)
  if (!newSearchValue) searchItems.value.splice(0, searchItems.value.length);
});
</script>

<style lang="scss">
.size {
  height: 60px;
}
.search-input {
  position: relative;
  opacity: 0;
  width: 10px;
  outline: none;
  transition: all 0.5s;
  &--active {
    width: 383px;
    top: 0;
    opacity: 1;
  }
}
.search-input__content--bordered {
  @include respond("md") {
    border: 0 !important;
    border-radius: 0 !important;
  }
  border: 1px solid rgba(var(--v-theme-n200)) !important;
  border-radius: 0 0 20px 20px !important;
  .v-list {
    padding: 16px;
    box-shadow: none !important;
  }
  // top: -2px !important;
}

.v-field--focused {
  border-color: rgba(var(--v-theme-n200)) !important;
  // color: rgba(var(--v-theme-n200)) !important;
}
</style>
