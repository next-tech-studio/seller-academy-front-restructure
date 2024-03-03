<template>
  <v-card id="roomList">
    <v-expansion-panels v-model="expanded" :ripple="false">
      <v-expansion-panel
        elevation="0"
        :expand-icon="mdAndUp ? '' : 'custom:chevronDown'"
        :collapse-icon="mdAndUp ? '' : 'custom:chevronTop'"
      >
        <template #title>
          <v-card-title v-if="title" class="pb-0 pa-0 w-100">
            <div class="d-flex justify-space-between w-100">
              <span class="text-body-1 font-weight-bold">{{ title }}</span>
              <slot name="append-title"></slot>
            </div>
          </v-card-title>
        </template>
        <template #text>
          <v-card-text class="pa-0" v-if="items.length && !showAlternative">
            <v-list color="secondary">
              <template v-for="(item, index) in items" :key="index">
                <app-profile-list-item
                  avatar-size="48px"
                  :item="item"
                  :subtitle-key="subtitle"
                  @click="$emit('to:item', item)"
                  :class="{ blur: blur }"
                  :disabled="blur"
                  class="px-0"
                >
                  <template #title>
                    <span class="text-caption text-text-heading">{{
                      item.name
                    }}</span>
                  </template>
                  <template #subtitle>
                    <app-avatar-group :members="item.members" size="20px" />
                  </template>
                  <template #append>
                    <v-icon
                      size="10"
                      icon="custom:chevronLeft"
                      color="icon-secondary"
                    ></v-icon>
                  </template>
                  <v-divider></v-divider>
                </app-profile-list-item>
                <v-divider
                  class="my-1"
                  color="text-low-emphasis"
                  v-if="items.length != index + 1"
                />
              </template>
              <div class="mt-4">
                <slot name="action">
                  <v-btn
                    v-if="!hideAction"
                    @click="$emit('more')"
                    variant="text"
                    class="text-text-secondary text-button px-0 animated"
                    >{{ $t(actionText) }}
                  </v-btn>
                </slot>
              </div>
            </v-list>
          </v-card-text>
          <p v-if="!items.length" class="text-text-low-emphasis text-caption text-center">{{$t('you_dont_have_any_rooms_right_now')}}</p>
          <v-card-text v-if="showAlternative" class="pb-0 pt-4">
            <div class="text-body-2 text-text-low-emphasis mb-4">
              {{ $t("should_be_digikala_seller") }}
            </div>
            <v-btn
              block
              variant="outlined"
              color="button-primary"
              class="text-button"
            >
              {{ $t("like_to_be_seller") }}
            </v-btn>
          </v-card-text>
        </template>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>
<script setup>
import { useDisplay } from "vuetify";

const { t } = useI18n();
const { mdAndUp } = useDisplay();
const props = defineProps({
  title: {
    type: String,
  },
  subtitle: {
    type: String,
    default: "subtitle",
  },
  subtitleKey: {
    type: String,
    default: "subtitle",
  },
  items: {
    type: Array,
    default: "",
  },
  blur: {
    type: Boolean,
    default: false,
  },
  actionText: {
    type: String,
    default: "see_more",
  },
  hideAction: {
    type: Boolean,
    default: false,
  },
  showAlternative: {
    type: Boolean,
    default: false,
  },
});
let expanded = ref(-1)

watch(mdAndUp, (newValue) => newValue ? expanded.value = 0 : expanded.value = -1)
</script>

<style scoped>
.blur {
  filter: blur(4px);
}
</style>

<style>
#roomList .v-expansion-panel-title--active > .v-expansion-panel-title__overlay,
#roomList
  .v-expansion-panel-title[aria-haspopup="menu"][aria-expanded="true"]
  > #roomList
  .v-expansion-panel-title__overlay {
  opacity: 0 !important;
}
.v-expansion-panel-title__icon {
  margin: -12px !important;
}
</style>
