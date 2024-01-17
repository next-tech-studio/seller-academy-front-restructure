<template>
  <v-card-actions class="align-center py-0" id="feedback">
    <span v-if="!hideText" class="text-body-1 text-text-low-emphasis">
      {{ $t("is_this_question_useful") }}
    </span>
    <v-btn
      append-icon="custom:like"
      size="small"
      :disabled="disabled"
      class="d-flex align-center text-body-2 mx-0 px-0"
      :color="
        item?.feedback?.currentUserAction === 'like' || coloredIcons
          ? 'icon-hint-success'
          : 'icon-low-emphasis'
      "
      @click.stop="react('like')"
    >
      {{ item?.feedback?.likesCount }}
    </v-btn>
    <v-btn
      append-icon="custom:dislike"
      size="small"
      :disabled="disabled"
      class="d-flex align-center text-body-2 mx-0 px-0"
      :color="
        item?.feedback?.currentUserAction === 'dislike' || coloredIcons
          ? 'icon-hint-error'
          : 'icon-low-emphasis'
      "
      @click.stop="react('dislike')"
    >
      {{ item?.feedback?.dislikesCount }}
    </v-btn>
  </v-card-actions>
</template>

<script setup>
const emit = defineEmits(["react"]);

const props = defineProps({
  item: {
    type: Object,
  },
  hideText: {
    type: Boolean,
    default: false,
  },
  coloredIcons: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const react = (value) => {
  emit("react", value);
};
</script>

<style lang="scss">
#feedback {
  .v-btn__append {
    font-size: 13px;
  }
}
</style>
