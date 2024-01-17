<template>
  <div id="comment">
  <v-card :class="{ 'bordered-r rounded-0 pr-16': bordered }" flat>
    <v-list-item class="px-0">
      <template v-slot:prepend>
        <v-avatar color="grey-darken-3" :image="item?.user?.avatarUrl || '/images/user.jpeg'"></v-avatar>
      </template>
      <v-list-item-title>
        <span class="text-body-2 font-weight-bold text-text-heading">
          {{ item?.user?.displayName }}
        </span>
      </v-list-item-title>
      <v-list-item-subtitle>
        <span class="text-body-2 text-text-low-emphasis">
          <client-only>{{ $moment(item.creationDate).format("LL - ساعت HH:MM") }}</client-only>
        </span>
      </v-list-item-subtitle>
    </v-list-item>
    <v-card-text class="text-text-low-emphasis text-body-1 px-0 py-1 py-md-3">
      {{ item.text }}
    </v-card-text>
    <v-card-actions class="pa-0">
      <v-btn
        v-if="replyable"
        :color="actionColor"
        variant="text"
        class="px-0 text-button"
        @click="$emit('reply', item)"
      >
        <v-icon icon="custom:reply" class="rotate-reply ml-2"></v-icon>
        <span class="text-body-1 font-weight-bold">{{ $t(actionBtnText) }}</span>
      </v-btn>
      <app-feedback
        :item="item"
        hide-text
        @react="$emit('react', { action: $event, item })"
      ></app-feedback>
    </v-card-actions>
  </v-card>
</div>
  <slot name="footer"></slot>
  
</template>

<script setup>
import { useDisplay } from "vuetify";
const { smAndDown } = useDisplay();
const props = defineProps({
  item: Object,
  replyable: {
    type: Boolean,
    default: true,
  },
  bordered: {
    type: Boolean,
    default: false,
  },
  actionBtnText: {
    type: String,
    default: 'reply'
  },
  actionColor: {
    type: String,
    default: 'text-secondary'
  }
});
</script>

<style lang="scss">
#comment {
  .rotate-reply {
    transform: rotateZ(180deg) scaleX(-1);
  }
  .bordered-r {
    border-right: 1px solid rgba(var(--v-theme-n200));
  }
  .v-list-item__content {
    @include respond("sm") {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
