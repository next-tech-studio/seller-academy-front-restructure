<template>
  <v-card class="mx-auto px-4">
    <div
      class="d-flex pt-4"
      :class="smAndDown ? 'flex-column' : 'flex-row justify-space-between'"
    >
      <div class="d-flex justify-space-between">
        <v-card-title
          class="text-body-1 px-0"
          :class="smAndDown ? 'py-0' : ' pt-0'"
        >
          <v-avatar size="36px" class="me-3">
            <v-img :src="item?.user?.avatarUrl" />
          </v-avatar>
          {{ item?.user?.name }}
          <v-chip
            class="mr-4 bg-icon-high-emphasis"
            v-if="item?.status == 'waiting_for_approval'"
            >{{ $t("not_published") }}</v-chip
          >
        </v-card-title>
        <div class="align-center d-md-none text-body-2 d-flex">
          <span class="text-high-emphasis me-2">
            <client-only>
              {{ item?.creationDate }}
            </client-only>
          </span>
          <v-icon color="text-disabled" icon="custom:clock"></v-icon>
        </div>
      </div>

      <slot name="append-title">
        <app-feedback
          v-if="!allInBottom"
          class="px-0 d-none d-md-flex"
          :disabled="!auth.user.loggedIn"
          :item="item"
          @react="react($event)"
        />
      </slot>
    </div>
    <v-card-item class="py-0 px-0">
      <v-card-text class="py-0 px-0">
        <span
          class="text-body-1 py-0 mb-2"
          :class="{ 'font-weight-bold': bold, 'truncate-2': !allInBottom }"
        >
          {{ item?.text }}
        </span>
      </v-card-text>
      <v-card-text class="py-1 px-0" v-if="item?.attachments?.length">
        <v-slide-group class="d-md-none d-block">
          <v-slide-group-item
            v-for="attachment in item?.attachments"
            :key="attachment.id"
            :value="attachment.id"
          >
            <v-card
              color="grey-lighten-1"
              class="me-2 px-0"
              min-height="55"
              min-width="70"
              aspect-ratio="1.2"
            >
              <v-img
                cover
                aspect-ratio="1.2"
                class="rounded-md"
                :alt="item.slug"
                :src="attachment.previewImageUrl"
              ></v-img>
            </v-card>
          </v-slide-group-item>
        </v-slide-group>
        <app-feedback
          v-if="!allInBottom"
          :disabled="!auth.user.loggedIn"
          class="px-0 d-flex d-md-none"
          :item="item"
          @react="react($event)"
        />
        <v-row class="d-none d-md-flex">
          <v-col
            v-for="attachment in item?.attachments"
            :key="attachment.id"
            class="py-2"
            cols="12"
            md="4"
          >
            <v-img
              aspect-ratio="1.2"
              cover
              class="rounded-md w-100"
              :alt="item.slug"
              :src="attachment.previewImageUrl"
              height="230"
            ></v-img>
          </v-col>
        </v-row>
      </v-card-text>
      <slot name="detail">
        <v-card-text class="px-0 py-0 py-md-2">
          <div
            class="d-flex flex-column flex-md-row justify-md-space-between align-md-center"
          >
            <v-chip
              v-if="item?.category"
              class="w-content mt-2 mt-md-0 mb-2 mb-md-0"
              size="small"
            >
              <span class="text-caption pl-2">{{ item?.category?.title }}</span>
            </v-chip>
            <v-spacer></v-spacer>
            <div
              class="d-flex flex-md-row flex-column align-md-center align-start justify-start justify-md-end px-1"
              :class="{ 'divided-footer': divededFooter }"
            >
              <div v-if="allInBottom" class="w-100 order-last">
                <app-feedback
                  :item="item"
                  :disabled="!auth.user.loggedIn"
                  :class="{ 'me-3': !allInBottom }"
                  @react="react($event)"
                />
              </div>
              <template v-if="!hideAvatarGp">
                <app-avatar-group
                  :members="item?.topAnswers"
                  :members-count="item?.answersCount"
                  size="24px"
                  maxAvatarCount="3"
                  showRemainingAvatars
                />
                <span
                  :class="[
                    smAndDown ? 'ma-0 mt-2 mb-3' : 'me-8 ms-4',
                    item?.answersCount > 0 ? 'ms-4' : '',
                  ]"
                >
                  <v-icon size="small" icon="custom:reply"></v-icon>
                  {{
                    item?.answersCount > 0
                      ? $t("answered_by_user_count") +
                        `${item?.answersCount} نفر`
                      : $t("no_answer")
                  }}
                </span>
              </template>
              <div class="align-center d-md-flex text-body-2 d-none">
                <span
                  class="text-high-emphasis me-2"
                  style="white-space: nowrap"
                >
                  <client-only>
                    {{ item?.creationDate }}
                  </client-only>
                </span>
                <v-icon color="text-disabled" icon="custom:clock"></v-icon>
              </div>
            </div>
          </div>
        </v-card-text>
      </slot>
    </v-card-item>
    <v-card-text v-if="$slots.footer" class="px-0">
      <slot name="footer"></slot>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { useDisplay } from "vuetify";
import { useAuthStore } from "@core/stores/auth";
const { smAndDown } = useDisplay();
const emit = defineEmits(["reaction"]);
const auth = useAuthStore();
const props = defineProps({
  item: Object,
  allInBottom: {
    default: false,
    type: Boolean,
  },
  hideAvatarGp: {
    default: false,
    type: Boolean,
  },
  bold: {
    default: true,
    type: Boolean,
  },
  divededFooter: {
    default: true,
    type: Boolean,
  },
});

const react = (reactionType) => {
  emit("reaction", reactionType);
};
</script>

<style scoped>
.divided-footer {
  border-top: 1px solid rgba(var(--v-theme-n100));
}
</style>
