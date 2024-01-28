<template>
  <div id="listing">
    <div v-if="hasHeader">
      <div class="d-flex align-center justify-space-between mb-1">
        <div>
          <v-icon
            icon="custom:filePen"
            color="text-high-emphasis"
            class="me-4"
          ></v-icon>
          <span>{{ $t(listingTitle) }}</span>
        </div>
        <div class="search-width" id="search">
          <v-text-field
            v-model="search"
            placeholder="جستجو"
            prepend-inner-icon="custom:search"
            single-line
            flat
            class="text-text-low-emphasis text-body-1"
            density="compact"
            variant="outlined"
            bg-color="background-light"
            type="search"
            hide-details
          ></v-text-field>
        </div>
      </div>
      <div class="d-flex" v-if="info">
        <div
          class="text-text-low-emphasis d-flex align-center text-body-1"
          v-for="(value, key, index) in info"
          :key="index"
        >
          <span class="me-3">{{ $t(key) }} ({{ value }})</span>
          <span
            class="line"
            v-if="index + 1 != Object.keys(info).length"
          ></span>
        </div>
      </div>
      <div class="mb-3 mt-4 d-flex align-center justify-space-between">
        <div class="d-flex">
          <v-menu v-model="GroupMenu" v-if="!hideGroupActions">
            <template v-slot:activator="{ props }">
              <v-btn
                flat
                v-bind="props"
                size="large"
                rounded
                class="text-text-high-emphasis border-sm me-4 text-body-1"
              >
                <template v-slot:append>
                  <v-icon
                    size="x-small"
                    :icon="
                      GroupMenu
                        ? 'custom:caretTopSolid'
                        : 'custom:caretDownSolid'
                    "
                  />
                </template>
                {{ $t("group_action") }}
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, i) in groupActions"
                :key="i"
                @click="operateGroupAction(item)"
              >
                <v-list-item-title>{{ item?.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <app-filters
            v-if="filters.length > 0"
            :items="filters"
            @filter="$emit('filter')"
            :no-slide="true"
          />
        </div>
        <app-dialog-form
          v-if="showDialog"
          :store="store"
          :button-title="dialogStartButtonTitle"
          :save-title="saveDialogTitle || dialogTitle"
          :subtitle="dialogSubtitle"
          :slug-generator-title="slugGeneratorTitle"
          :title="dialogTitle"
          ref="dialogForm"
          :add-new-item="addNewItem"
          @update:fields="$emit('update:items')"
          @show:dialog="$emit('show:dialog')"
        >
          <template #formActions>
            <slot name="formActions"></slot>
          </template>
        </app-dialog-form>
      </div>
    </div>
    <v-data-table
      class="rounded rounded-lg"
      v-model:sort-by="store.sortBy"
      v-model="store.selectedTableItems"
      :headers="headers"
      :items="items.data"
      :items-per-page="itemsPerPage"
      @update:sort-by="$emit('filter')"
      hide-default-footer
      return-object
    >
      <template
        v-slot:headers="{
          columns,
          isSorted,
          toggleSort,
          selectAll,
          allSelected,
        }"
      >
        <tr>
          <template v-for="column in columns" :key="column.key">
            <td class="border-b text-text-low-emphasis text-body-1">
              <span v-if="!column.sortable && !column.selectAll">{{
                column?.title
              }}</span>
              <v-checkbox-btn
                v-if="column.selectAll && selectable"
                true-icon="custom:squareCheck"
                false-icon="custom:square"
                :model-value="allSelected"
                :label="column?.title"
                @update:model-value="selectAll"
              >
              </v-checkbox-btn>
              <div class="d-flex">
                <span
                  v-if="column.sortable"
                  class="mr-2 cursor-pointer"
                  @click="() => toggleSort(column)"
                  >{{ column?.title }}</span
                >
                <div style="width: 24px">
                  <template v-if="isSorted(column)">
                    <v-icon :icon="sortedByIconType(column.key)"></v-icon>
                  </template>
                </div>
              </div>
            </td>
          </template>
        </tr>
      </template>
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
          <div class="d-flex cursor-pointer" v-if="header.key == 'title'">
            <div
              class="d-flex align-center justify-start"
              :style="`width: ${header.size} !important; flex: 0 1 0%`"
            >
              <v-checkbox-btn
                v-if="selectable"
                true-icon="custom:squareCheck"
                false-icon="custom:square"
                :value="item"
                multiple
                v-model="store.selectedTableItems"
              >
              </v-checkbox-btn>
              <span class="text-truncate text-body-1" @click="goToItem(item)">{{
                item[header.key]
              }}</span>
            </div>
          </div>
          <div v-if="header.key == 'author'" style="width: fit-content">
            <span class="text-body-1">{{ item.author.displayName }}</span>
          </div>
          <div v-if="header.key == 'viewsCount'" style="width: fit-content">
            <v-icon icon="custom:eye" class="me-2" size="22" />
            <span class="text-body-1">{{ item.viewsCount }}</span>
          </div>
          <div v-if="header.key == 'commentsCount'" style="width: fit-content">
            <v-icon icon="custom:comment" class="me-2" size="22" />
            <span class="text-body-1">{{ item.commentsCount }}</span>
          </div>
          <div
            v-if="header.key == 'bookmarksCount'"
            class="d-flex"
            style="width: 60px"
          >
            <v-icon icon="custom:bookmark" class="me-2" size="22" />
            <span class="text-body-1">{{ item.bookmarksCount }}</span>
          </div>
          <div
            v-if="header.key == 'operation'"
            style="width: fit-content; min-width: 150px"
            class="d-flex align-center"
            id="operation"
          >
            <template v-for="(action, index) in tableActions" :key="index">
              <v-btn
                v-if="action.type == 'button' || !action.type"
                :icon="!action.text"
                flat
                @click="action.function(item, action)"
                v-bind="action.props"
                class="me-2 px-2 position-relative"
                rounded
              >
                <v-icon
                  v-if="setOperationIcon(action.value, item)"
                  :color="setOperationIcon(action.value, item)?.color"
                  :icon="setOperationIcon(action.value, item)?.icon"
                  size="22"
                ></v-icon>
                <v-tooltip activator="parent" location="bottom">
                  {{ $t(action.title) }}</v-tooltip
                >
              </v-btn>
              <v-select
                v-if="action.type == 'select'"
                :items="action.items"
                v-model="item[action.value]"
                :item-title="action.text"
                :item-value="action.key"
                flat
                base-color="n300"
                density="compact"
                hide-details
                variant="solo-filled"
                height="20"
                class="me-2"
                rounded
                @update:modelValue="
                  action.onChange({ action: $event, id: [item.id] })
                "
              >
                <template v-slot:append-inner>
                  <v-icon icon="custom:caretDownSolid" size="12" />
                </template>
                <template v-slot:selection="{ item }">
                  <small>{{ $t(item.title) }}</small>
                </template>
                <template v-slot:item="{ props, item }">
                  <v-list-item
                    v-bind="props"
                    :title="$t(item.title)"
                  ></v-list-item>
                </template>
              </v-select>
            </template>
          </div>
          <div
            :style="`width: ${header.size} !important`"
            class="text-truncate"
          >
            <span
              v-if="!defaultHeders.includes(header.key)"
              class="text-body-1 ms-3"
            >
              {{ item[header.key] }}</span
            >
          </div>
        </slot>
      </template>
      <template v-slot:bottom> </template>
    </v-data-table>
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
const props = defineProps({
  items: Array,
  info: Object,
  filters: { type: Array, default: [] },
  headers: Array,
  listingTitle: String,
  page: Number,
  addNewItem: { type: Boolean, default: true },
  editAddress: String,
  viewAddress: String,
  dialogStartButtonTitle: String,
  dialogTitle: String,
  defaultStatus: String,
  dialogSubtitle: String,
  slugGeneratorTitle: { type: String, default: "title" },
  searchModel: String,
  hasHeader: { type: Boolean, default: true },
  selectable: {
    type: Boolean,
    default: true,
  },
  tableActions: Array,
  groupActions: {
    type: Array,
    default: [
      { title: "پنهان کردن", value: "hidden" },
      { title: "حذف کردن", value: "deleted" },
      { title: "بازگردانی", value: "draft" },
    ],
  },
  hideGroupActions: {
    type: Boolean,
    default: false,
  },
  hardDelete: {
    type: Boolean,
    default: false,
  },
  showDialog: {
    type: Boolean,
    default: false,
  },
  saveDialogTitle: {
    type: String,
    // default: 'save',
  },
  store: Object,
});

let defaultHeders = [
  "title",
  "viewsCount",
  "commentsCount",
  "bookmarksCount",
  "operation",
  "author",
];
const emit = defineEmits([
  "update:page",
  "update:itemStatus",
  "update:items",
  "update:modelValue",
  "update:item",
  "update:searchModel",
  "update:items",
  "filter",
  "show:dialog",
  "navigate:toItem",
  "update:hardDelete",
]);
let pageNumber = computed({
  get() {
    return props.page;
  },
  set(value) {
    emit("update:page", value);
  },
});
let search = computed({
  get() {
    return props.searchModel;
  },
  set(value) {
    emit("update:searchModel", value);
  },
});
let itemsPerPage = 10;
let GroupMenu = ref(false);
const changeItemStatus = (items, action, single = true) => {
  let ids;
  console.log(items.status, action.value);
  if (single) {
    ids = [items.id];
    if (items.status != action.value)
      emit("update:itemStatus", { action: action.value, id: ids });
    else emit("update:itemStatus", { action: props.defaultStatus, id: ids });
  } else {
    ids = items.map((item) => item.id);
    emit("update:itemStatus", { action: action.value, id: ids });
  }
  if (action.value == "deleted" && props.hardDelete && single) {
    emit("update:hardDelete", items.id);
  }
};
const edit = (item, action) => {
  props.store.currentItem = props.items.data.find(
    (element) => element.id == item.id
  );
  console.log("dialog", action);
  if (action.value == "edit") props.store.edit = true;
  else props.store.additionalOperation = true;
  emit("edit", {
    action: action.value,
    api: action.api,
    hasDialog: action.hasDialog,
  });
};
defineExpose({ edit, changeItemStatus });
const goToItem = (item) => {
  props.store.currentItem = item.value;
  emit("navigate:toItem");
};
const operateGroupAction = (action) => {
  changeItemStatus(props.store.selectedTableItems, action, false);
  GroupMenu.value = false;
};

let sortedByIconType = (columnKey) => {
  if (
    props.store.sortBy.some((sortBy) => {
      return sortBy.key === columnKey && sortBy.order == "asc";
    })
  )
    return "custom:arrowUpWideShort";
  else if (
    props.store.sortBy.some((sortBy) => {
      return sortBy.key === columnKey && sortBy.order == "desc";
    })
  )
    return "custom:arrowDownWideShort";
};

const setOperationIcon = (action, item) => {
  if (action == "edit")
    return { icon: "custom:pencil", color: "text-high-emphasis" };
  else if (action == "deleted" && item.status != "deleted")
    return { icon: "custom:trash", color: "text-high-emphasis" };
  else if (action == "deleted" && item.status == "deleted")
    return { icon: "custom:redo", color: "text-high-emphasis" };
  else if (action == "hidden" && item.status != "hidden")
    return { icon: "custom:eye", color: "text-high-emphasis" };
  else if (action == "hidden" && item.status == "hidden")
    return { icon: "custom:closedEye", color: "text-high-emphasis" };
  else if (action == "published" && item.status != "published")
    return { icon: "custom:publish", color: "text-high-emphasis" };
  else if (action == "certificate")
    return { icon: "custom:certificate", color: "text-high-emphasis" };
  else if (action == "download")
    return { icon: "custom:download", color: "text-high-emphasis" };
  else if (action == "answer")
    return { icon: "custom:reply", color: "text-high-emphasis" };
  else if (action == "profile")
    return { icon: "custom:userEdit", color: "text-high-emphasis" };
  else if (action == "published" && item.status == "published")
    return { icon: "custom:notPublished", color: "text-high-emphasis" };
  else if (action == "active" && item.status == "deactive")
    return { icon: "custom:power", color: "text-hint-success" };
  else if (action == "active" && item.status == "inactive")
    return { icon: "custom:power", color: "text-hint-success" };
  else if (action == "active" && item.status == "active") {
    return { icon: "custom:power", color: "text-primary" };
  } else if (action == "detail")
    return { icon: "custom:infoCircleOutlined", color: "text-high-emphasis" };
  else if (action == "approved")
    return { icon: "custom:circleCheckSolid", color: "text-high-emphasis" };
};
</script>

<style lang="scss">
#listing {
  .search-width {
    width: 320px;
    height: 48px;
  }
  .v-pagination {
    &__next,
    &__prev {
      display: flex;
      align-items: center !important;
    }
  }
  .v-field__input {
    width: 100% !important;
    height: 100% !important;
  }
  .v-input__control {
    width: 140px;
    // height: 36px;
  }
  .rotate-icon {
    transform: scaleY(-1);
  }
  .v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > td,
  .v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > th {
    border: none !important;
  }
  .v-pagination__list {
    justify-content: start;
  }
  .v-pagination__item--is-active {
    .v-btn--border {
      border-color: rgba(var(--v-theme-primary-base)) !important;
    }
  }
}

#search .v-input__control {
  width: 320px;
  height: 48px;
}
</style>
