<template>
  <v-card
    variant="outlined"
    color="rgba(var(--v-theme-n300), 30%)"
    :class="{ grey: grey }"
    class="rounded-lg"
    height="100%"
  >
    <div class="bg-primary-base pt-lg-4" :style="`height: ${lgAndUp ? 206 : 155}px; position:relative`">
      <v-img
        class=""
        width="100%"
        style="position: absolute; bottom: 0;"
        :src="item.avatar || item.avatarUrl"
        contain
      />
    </div>
    <v-card-text>
      <div class="text-body-1 font-weight-bold text-text-high-emphasis">
        {{ item?.firstName + " " + item?.lastName }}
      </div>
      <div class="text-caption text-text-low-emphasis my-1">
        {{ item?.jobTitle }}
      </div>
      <slot name="footer">
        <div>
          <v-btn
            tag="a"
            size="small"
            density="compact"
            variant="flat"
            icon
            class="me-4"
            :href="item?.linkedin"
            target="_blank"
          >
            <v-icon
              :color="dark ? 'text-light' : 'primary-base'"
              icon="custom:linkedin"
            ></v-icon>
          </v-btn>
          <v-btn
            tag="a"
            size="small"
            density="compact"
            variant="flat"
            icon
            :href="`mailto:${item?.email}`"
            v-if="!hideEmail"
          >
            <v-icon
              :color="dark ? 'text-light' : 'primary-base'"
              icon="custom:smsTracking"
            ></v-icon>
          </v-btn>
        </div>
      </slot>

      <slot name="bottom"></slot>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { useDisplay } from "vuetify";

const { lgAndUp } = useDisplay();
const props = defineProps({
  item: Object,
  grey: {
    type: Boolean,
    default: false,
  },
  hideEmail: {
    type: Boolean,
    default: false,
  },
});
</script>
<style setup>
.grey {
  filter: grayscale(100%);
}
</style>
