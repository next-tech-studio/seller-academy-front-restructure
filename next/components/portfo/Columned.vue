<template>
  <v-container fluid>
    <v-row>
      <v-col :cols="startColSize">
        <div class="d-flex flex-column" :class="{ 'w-75': lgAndUp }">
          <h2 class="text-h3 text-text-heading mb-3 font-weight-bold">
            {{ $t(title) }}
          </h2>
          <span class="text-body-2 text-text-high-emphasis mb-2">
            {{ $t(description) }}</span
          >
          <slot v-if="!addExtraToBottom" name="descriptionExtra">
            <!-- <v-img
              width="190px"
              src="/images/home-investment-fields.png"
            ></v-img> -->
          </slot>
        </div>
      </v-col>
      <v-col cols="12" md="8">
        <v-row>
          <v-col cols="12" lg="4" v-for="(item, index) in items" :key="index">
            <slot name="items" :element="item">
              <v-avatar color="n700" class="me-4" size="x-large">
                <v-icon size="x-large" :icon="item.icon"></v-icon>
              </v-avatar>
              <span class="text-body-1 text-text-dark font-weight-bold">
                {{ $t(item.title) }}</span
              >
            </slot>
          </v-col>
        </v-row>
      </v-col>
      <v-col>
        <slot v-if="addExtraToBottom" name="descriptionExtra"></slot>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { useDisplay } from "vuetify";

const { lgAndUp } = useDisplay();
const props = defineProps({
  items: Array,
  title: String,
  description: String,
  cols: { type: Number, default: 3 },
  startColSize: { type: Number, default: 3 },
  addExtraToBottom: { type: Boolean, default: false },
});

let columns = computed(() => {
  let columns = [];
  let mid = Math.ceil(props.items?.length / props.cols);
  for (let col = 0; col < props.cols; col++) {
    columns.push(props.items?.slice(col * mid, col * mid + mid));
  }
  return columns;
});
onMounted(() => {
  console.log("883838383838388383838", props.items);
});
</script>
<style lang="scss">
.circle {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: rgba(var(--v-theme-n700));
}
</style>
