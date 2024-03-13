<template>
  <div id="responsive-table">
    <v-data-table
      class="d-none d-lg-flex"
      :items="items.data"
      :headers="headers"
      hide-default-footer
      :items-per-page="itemsPerPage"
    >
      <template
        v-for="header in headers"
        :key="header.key"
        v-slot:[`item.${header.key}`]="{ item }"
      >
        <slot
          :name="header.key"
          :item="{ item }"
          :header="{ header }"
          class="pe-10"
        >
          <div class="text-truncate">
            <span class="text-body-1 ms-3" v-if="header.key != 'operation'">
              {{ item[header.key] }}</span
            >
          </div>
          <div v-if="header.key == 'operation'">
            <v-btn
              v-for="(action, index) in tableActions"
              :key="index"
              class="px-0"
              variant="text"
              color="secondary-base"
              flat
              @click="action.function(item, action)"
            >
              {{ action.title }}
            </v-btn>
          </div>
        </slot>
      </template>
      <template v-slot:bottom> </template>
    </v-data-table>
    <v-expansion-panels :style="dynamicStyle()" class="d-lg-none" multiple v-model="openExpansion">
      <v-expansion-panel
        v-for="(item, index) in items.data"
        :key="index"
        class="mb-4 border rounded"
      >
        <v-expansion-panel-title
          expand-icon="custom:chevronTop"
          collapse-icon="custom:chevronDown"
          :hide-actions="hasExpansionBody ? false : true"
          class="pa-3 align-start d-flex justify-space-between"
        >
          <div class="d-flex flex-column">
            <div class="mb-4 d-flex">
              <v-avatar
                :image="handler.getDeepData(item, responsiveHeaders[0])"
                size="24"
                class="me-2"
              />
              <p class="text-body-2">
                {{ handler.getDeepData(item, responsiveHeaders[1]) }}
              </p>
            </div>
            <p class="text-body-2 text-text-heading">
              {{ handler.getDeepData(item, responsiveHeaders[2]) }}
            </p>
          </div>
          <v-btn
            flat
            class="px-0 icon-position"
            size="x-small"
            @click="navigateToItem(item)"
          >
            <v-icon icon="custom:eye" size="20" color="secondary-base"></v-icon>
          </v-btn>
        </v-expansion-panel-title>
        <v-expansion-panel-text class="px-4" v-if="hasExpansionBody">
          <v-divider class="mb-1" />
          <p class="text-caption text-text-low-emphasis">
            {{ $t("in_response_to") }}
          </p>
          <p class="text-body-2 text-text-heading my-1">
            {{ handler.getDeepData(item, responsiveHeaders[3]) }}
          </p>
          <v-divider />
        </v-expansion-panel-text>
        <div class="d-flex justify-space-between">
          <div
            :class="
              sharedStore.statusColor(
                handler.getDeepData(
                  item,
                  responsiveHeaders[responsiveHeaders?.length - 2]
                )
              )
            "
            class="d-flex align-center px-4"
          >
            <v-icon icon="custom:dot" size="12" class="me-2" />
            <span class="text-end text-body-2">
              {{
                $t(
                  handler.getDeepData(
                    item,
                    responsiveHeaders[responsiveHeaders?.length - 2]
                  )
                )
              }}
            </span>
          </div>
          <p class="text-end text-body-2 px-4 py-2">
            {{
              handler.getDeepData(
                item,
                responsiveHeaders[responsiveHeaders?.length - 1]
              )
            }}
          </p>
        </div>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-pagination
      v-if="items.last_page > 1"
      v-model="pageNumber"
      :length="items.last_page"
      class="mt-4 align-center"
      density="compact"
      border
      active-color="primary-base"
      next-icon="custom:chevronRight"
      prev-icon="custom:chevronLeft"
      total-visible="5"
    >
      <template #prev="{ icon, onClick }">
        <v-btn
          flat
          variant="text"
          size="x-small"
          icon
          @click="onClick"
          :disabled="pageNumber == 1"
        >
          <v-icon :icon="icon" size="12" />
        </v-btn>
      </template>
      <template #next="{ icon, onClick }">
        <v-btn
          flat
          variant="text"
          size="x-small"
          icon
          @click="onClick"
          :disabled="pageNumber == items.last_page"
        >
          <v-icon :icon="icon" size="12" />
        </v-btn>
      </template>
    </v-pagination>
  </div>
</template>
<script setup>
import APIHandler from "@core/services/APIHandler";
import { useSharedPanelStore } from "~/stores/sharedPanel";
const sharedStore = useSharedPanelStore();
const localePath = useLocalePath();
const emit = defineEmits(["update:page","navigateTo:item"]);
const props = defineProps({
  items: Object,
  headers: Object,
  responsiveHeaders: Array,
  tableActions: Array,
  page: Number,
  hasExpansionBody: {
    type: Boolean,
    default: true,
  },
});
let openExpansion = props.hasExpansionBody
  ? ref([])
  : ref([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
const handler = new APIHandler();
let pageNumber = computed({
  get() {
    return props.page;
  },
  set(value) {
    console.log("page", value);
    emit("update:page", value);
  },
});
let itemsPerPage = 10;
let dynamicStyle = () => {
  console.log(props.hasExpansionBody);
  return {
    "--expansion-panel-icon-position":
    props.hasExpansionBody? "30px" : "10px",
  };
};
const navigateToItem = (item, action = "view") => {
  emit('navigateTo:item',item)
  navigateTo(localePath({ path: `/${item.type}/` + `${item.slug}` }), {
    external: true,
  });
};
defineExpose({ navigateToItem });
</script>
<style lang="scss">
#responsive-table .v-expansion-panel__shadow {
  box-shadow: none;
}

::before,
::after {
  border: none !important;
}

#responsive-table
  .v-expansion-panel-title--active
  > .v-expansion-panel-title__overlay,
#responsive-table
  .v-expansion-panel-title[aria-haspopup="menu"][aria-expanded="true"]
  > #responsive-table
  .v-expansion-panel-title__overlay {
  opacity: 0 !important;
}
#responsive-table.colored .v-expansion-panel-title {
  background-color: rgba(var(--v-theme-text-secondary));
  color: white;
  border-radius: 8px;
}
#responsive-table .v-expansion-panel-text__wrapper {
  padding: 0;
  margin-top: 0;
}
#responsive-table .icon-position {
  position: absolute;
  left: var(--expansion-panel-icon-position);
  top: 8px;
}
</style>
