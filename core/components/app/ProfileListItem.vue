<template>
  <v-list-item
    id="profile-list-item"
    :prepend-avatar="item.avatarUrl"
    :title="item.name"
    :subtitle="item.subtitle"
    :class="{ hover: hover, active: active }"
  >
    <template v-slot:prepend>
      <slot name="prepend">
        <v-avatar color="n050" :size="avatarSize">
          <v-img cover :alt="item.name" :src="item.avatarUrl"></v-img>
        </v-avatar>
      </slot>
    </template>
    <template v-slot:append>
      <slot name="append">
        <app-avatar-group :members="item.members" size="24px" />
      </slot>
    </template>
    <template v-slot:title>
      <slot name="title">
        <span
          class="text-body-2 text-text-heading font-weight-bold py-0"
          v-if="item.name"
        >
          {{ item.name }}
          <v-icon
            class="mx-2"
            v-if="item.isPrivate"
            size="x-small"
            icon="fas fa-lock"
          ></v-icon>
        </span>
      </slot>
    </template>
    <template v-slot:subtitle>
      <slot name="subtitle">
        <span class="text-text-high-emphasis">{{ item[subtitleKey] }}</span>
      </slot>
    </template>
  </v-list-item>
</template>
<script setup>
const props = defineProps({
  avatarSize: {
    type: String,
  },
  subtitleKey: {
    type: String,
  },
  isPrivate: {
    type: Boolean,
  },
  hover: {
    type: Boolean,
    default: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
  members: {
    type: Array,
  },
  item: {
    type: Object,
  },
});
</script>

<style lang="scss">
#profile-list-item .v-list-item__prepend {
  height: 100%;
  // align-items: flex-end;
}
#profile-list-item .v-list-item-subtitle {
  opacity: 1 !important;
}
#profile-list-item.hover.v-list-item {
  .v-list-item__append {
    position: relative;
    .v-btn {
      background-color: rgba(var(--v-theme-icon-secondary)) !important;
      color: rgba(var(--v-theme-text-light)) !important;
    }
  }
}
#profile-list-item.hover.v-list-item:hover,
#profile-list-item.hover.v-list-item.active {
  .v-list-item-title {
    color: rgba(var(--v-theme-text-light)) !important;
  }
  .v-list-item__append .v-icon {
    opacity: 1;
    color: rgba(var(--v-theme-text-light)) !important;
  }
  [class*="v-list-item-"] {
    position: relative;
    span {
      color: rgba(var(--v-theme-text-light)) !important;
    }
  }
  .v-list-item__append div {
    position: relative;
    color: rgba(var(--v-theme-text-light)) !important;
    div {
      color: rgba(var(--v-theme-text-light)) !important;
    }
    .v-btn {
      background-color: rgba(var(--v-theme-text-light)) !important;
      color: rgba(var(--v-theme-icon-secondary)) !important;
    }
  }
  > .v-list-item__overlay {
    opacity: 1 !important;
    background: rgba(var(--v-theme-button-secondary));
    border-radius: 8px;
  }
}
</style>
