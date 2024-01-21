<template>
  <div id="search-navbar" :class="!lgAndUp ? 'px-4' : ''">
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
        <v-icon color="icon-high-emphasis" icon="custom:search" />
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
          label="جستجوی مقالات و دوره‌ها ..."
          item-title="title"
          hide-details
          menu-icon=""
          :clearable="true"
          open-on-clear
          clear-icon="custom:x"
          density="compact"
          base-color="text-low-emphasis"
          variant="outlined"
          single-line
          @update:search="onSearch"
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
              @click="toItem(item.value)"
            >
              <span>{{ item.title }}</span>
              <span
                >در
                <span class="text-secondary-base">{{
                  $t(item.value.type)
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
let showMenu = ref(false);
const { lgAndUp } = useDisplay();
const emit = defineEmits(["search"]);
import { useDebounceFn } from "@vueuse/core";
let search = ref("");
let searchItems = reactive([]);
let expandedSearch = ref(false);
const onSearch = useDebounceFn(
  async () => {
    showMenu.value = false;
    await $repos.other.search(search.value).then((res) => {
      Object.assign(searchItems, [...res]);
      showMenu.value = true;
    });
  },
  100,
  { maxWait: 100 }
);
const toItem = (item) => {
  search.value = item.title;
  navigateTo(
    localePath({
      path: `/article/${item?.slug}`,
    }), {external: true}
  );
  search.value = ''
  searchItems.value = ''
  expandedSearch.value = false
};
watch([search, showMenu], ([newSearchValue, newMenuValue]) => {
  if(newSearchValue) showMenu.value = true
  if (!newSearchValue) searchItems.splice(0, searchItems.length);
  // if (newMenuValue.value) {
  //   document.querySelector("html").classList.add("overflow-hidden");
  // } else {
  //   document.querySelector("html").classList.remove("overflow-hidden");
  // }
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
