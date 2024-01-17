<template>
  <v-navigation-drawer
    absolute
    style="top: 0; right: 0; left: 0; bottom: 0; transform:translateX(0%)"
    class="h-100"
    :width="smAndDown ? '100%' : 264"
    :model-value="modelValue"
    :class="{'bg-background-dark': smAndDown}"
  >
    <v-list :max-width="smAndDown ? '100%' : 300" class="pt-4 px-4" color="secondary">
      <template v-for="(item, index) in items" :key="index">
        <app-profile-list-item
          avatar-size="40px"
          :item="item"
          @click="$emit('to:item', item)"
          :class="{'bg-white rounded-md mb-1': smAndDown}"
          :active="item.slug == $route.params.slug"
        >
          <template #title>
            <span class="text-caption text-text-heading font-weight-bold">{{
              item.title
            }}</span>
          </template>
          <template #subtitle>
            <span class="text-caption text-text-high-emphasis">{{
              item?.lastMessage.text || "هیچ پیامی وجود ندارد!"
            }}</span>
          </template>
          <template #append>
            <div class="d-flex flex-column align-end">
              <div class="text-caption text-text-high-emphasis">
                {{ item.lastMessage.since }}
              </div>
              <div style="min-height: 30px">
                <v-btn
                  icon
                  size="16"
                  v-if="item.unreadCount > 0"
                  flat
                  class="text-caption d-flex"
                  >{{ item.unreadCount }}</v-btn
                >
              </div>
            </div>
          </template>
          <v-divider></v-divider>
        </app-profile-list-item>
      </template>
    </v-list>
    <template v-slot:append>
      <div>
        <v-divider></v-divider>
        <v-btn
          @click="$emit('to:rooms')"
          color="text-secondary"
          class="bg-white"
          height="55"
          variant="text"
          block
          rounded="0"
        >
          <span class="text-text-secondary">{{ $t("see_other_channels") }}</span>
          <v-icon icon="custom:arrowLeft" class="mr-3" color="text-secondary"></v-icon>
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { useDisplay } from 'vuetify';

const emit = defineEmits(["submit", "update:modelValue"]);
const {smAndDown} = useDisplay()
defineProps({
  items: Array,
  modelValue: Boolean,
  active: {
    type: Boolean,
    default: true,
  },
});
</script>
