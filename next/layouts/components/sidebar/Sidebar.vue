<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    class="round-s-0"
    :elevation="1"
    :rail-width="75"
    permanent
    id="sidebar"
    floating
  >
    <div class="d-flex w-75">
      <v-list-item
        :title="authStore?.user?.name"
        :subtitle="authStore?.user?.mobile"
        nav
        class="pt-8 pb-6"
      >
        <template v-slot:prepend>
          <v-avatar size="50">
            <v-img
              :src="authStore?.user?.avatarUrl"
              :alt="authStore?.user?.displayName"
            ></v-img>
          </v-avatar>
        </template>
      </v-list-item>
      <v-btn
        size="x-small"
        color="button-primary"
        :class="
          $i18n.locale == 'fa' ? 'rtl-rail-position' : 'ltr-rail-position'
        "
        :icon="
          rail && $i18n.locale == 'fa'
            ? 'custom:chevronLeft'
            : !rail && $i18n.locale == 'fa'
            ? 'custom:chevronRight'
            : rail && $i18n.locale != 'fa'
            ? 'custom:chevronRight'
            : 'custom:chevronLeft'
        "
        @click.stop="rail = !rail"
      ></v-btn>
    </div>

    <v-divider class="mx-4" v-if="!rail"></v-divider>

    <v-list density="compact" nav v-model:opened="opened">
      <div v-for="(item, index) in sidebarItems" :key="index">
        <v-list-group v-if="item.children && item.show">
          <template v-slot:activator="{ props, isOpen }">
            <v-list-item
              v-bind="props"
              class="text-text-low-emphasis"
              color="text-high-emphasis"
              :title="$t(item.title)"
            >
              <template v-slot:prepend>
                <v-icon :icon="item.icon" size="16" />
              </template>
              <template v-slot:append>
                <v-icon
                  :icon="isOpen ? 'custom:chevronTop' : 'custom:chevronDown'"
                  size="12"
                />
              </template>
            </v-list-item>
          </template>
          <div v-for="(child, index) in item.children" :key="index">
            <v-list-group v-if="child.children && child.show">
              <template v-slot:activator="{ props, isOpen }">
                <v-list-item
                  v-bind="props"
                  class="text-text-low-emphasis"
                  color="text-high-emphasis"
                  :title="$t(child.title)"
                  prepend-icon=""
                >
                  <template v-slot:append>
                    <v-icon
                      :icon="
                        isOpen ? 'custom:chevronTop' : 'custom:chevronDown'
                      "
                      size="12"
                    />
                  </template>
                </v-list-item>
              </template>
              <v-list-item
                v-for="(grandChild, index) in child.children"
                class="text-text-low-emphasis"
                color="text-high-emphasis"
                :key="index"
                :title="$t(grandChild.title)"
                :value="grandChild.title"
                @click="navigateToPage(grandChild.to)"
              ></v-list-item>
            </v-list-group>
            <v-list-item
              v-if="!child.children && child.show"
              class="text-text-low-emphasis"
              color="text-high-emphasis"
              @click="navigateToPage(child.to)"
              :title="$t(child.title)"
            />
          </div>
        </v-list-group>
        <v-list-item
          v-if="!item.children && item.show"
          class="text-text-low-emphasis"
          @click="navigateToPage(item.to)"
          color="text-high-emphasis"
          :prepend-icon="item.icon"
          :title="$t(item.title)"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon" size="16" />
          </template>
        </v-list-item>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { useAuthStore } from "@core/stores/auth";
const authStore = useAuthStore();
let drawer = ref(true);
let rail = ref(false);
let opened = ref([]);
watch(rail, (newValue, oldValue) => {
  console.log("opened", opened);
  if (newValue == true) {
    opened.value.splice(0, opened.value.length);
  }
});
const navigateToPage = (address) => {
  navigateTo(address, {
    external: true,
  });
};
const sidebarItems = useSidebar(authStore.user);
onMounted(() => {
  if (rail.value === true) opened.value.splice(0, opened.value.length);
});
</script>
<style lang="scss">
#sidebar {
  .rtl-rail-position {
    position: absolute;
    left: 0;
    top: 35px;
    transform: translateX(-50%);
  }
  .ltr-rail-position {
    position: absolute;
    right: 0;
    top: 35px;
    transform: translateX(50%);
  }
  .opacity-0 {
    opacity: 0 !important;
  }
  .v-list-item__prepend {
    // width: 65px !important;
  }
}
</style>
