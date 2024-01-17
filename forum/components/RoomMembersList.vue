<template>
  <v-card>
    <!-- <v-list-item>
      <template v-slot:title>
        <div class="d-flex justify-space-between align-center">
          <span
          class="text-body-1 font-weight-bold text-text-heading"
          v-if="title"
          >{{ title }}</span>
        <v-btn flat @click="$emit('close')" size="small" icon="custom:x"></v-btn>
        </div>
      </template>
    </v-list-item> -->
    <app-infinite-loading
      @infinite="infinite"
      :items="items"
      target=".bottom-results"
      :top="false"
      id="height"
    >
      <template v-slot:items="{ item }">
        <app-profile-list-item
          :item="item"
          :title="item.displayName"
          :subtitle="item.secondaryText"
          :avatar="item.avatarUrl"
          :hover="false"
        >
          <template v-slot:append>
            <v-menu
              transition="slide-y-transition"
              content-class="elevation-0"
              offset="4"
            >
              <template v-slot:activator="{ props, isActive }">
                <v-btn
                  v-bind="props"
                  variant="text"
                  size="small"
                  color="icon-high-emphasis"
                  icon="custom:ellipsis"
                />
              </template>
              <v-list
                elevation="0"
                :border="true"
                density="compact"
                class="py-0"
              >
                <v-list-item
                  v-for="(action, i) in actions"
                  :key="i"
                  @click="action.function(item)"
                >
                  <div class="d-flex align-center">
                    <v-icon
                      size="small"
                      class="ml-3"
                      :icon="action.icon"
                      color="icon-low-emphasis"
                    ></v-icon>
                    <v-list-item-title class="text-high-emphasis">{{
                      $t(action.title)
                    }}</v-list-item-title>
                  </div>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </app-profile-list-item>
      </template>
    </app-infinite-loading>
  </v-card>
</template>

<script setup>
import InfiniteLoading from "v3-infinite-loading";
let state = ref()
const emit = defineEmits(["infinite",'remove']);
const props = defineProps({
  title: String,
  items: Array,
});
const infinite = ($state) => {
  state.value = $state
  emit("infinite", $state);
};
const remove = (item) => {
  console.log('itteemmmm',item)
  let userIdAndListState ={id:item.id, state:state.value}
  emit('remove',userIdAndListState)
}
const actions = [
  {
    title: "remove_user",
    function: remove,
    icon: "custom:trash",
  },
];
</script>
