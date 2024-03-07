<template>
  <div
    id="message"
    class="mx-auto d-flex flex-column"
    :class="authStore.user.id == item.userId ? 'align-start' : 'align-end'"
  >
    <v-card
      :dir="authStore.user.id == item.userId ? 'rtl' : 'ltr'"
      min-width="20%"
      max-width="75%"
    >
      <v-list-item class="px-0 pb-2">
        <template v-slot:prepend>
          <v-avatar
            :size="smAndDown ? '32' : '48'"
            color="grey-darken-3"
            :image="item?.user?.avatarUrl"
            class="ml-2"
          ></v-avatar>
        </template>

        <v-list-item-title class="d-flex">
          <span class="text-body-2 font-weight-bold text-text-high-emphasis">
            {{ item?.user?.name }}
          </span>
          <div class="justify-self-end">
            <span
              size="x-small"
              class="mx-4 text-icon-low-emphasis text-body-2"
            >
              {{ item.time }}
            </span>
            <v-icon
              size="small"
              :color="
                item.doubleChecks ? 'icon-hint-success' : 'icon-low-emphasis'
              "
              :icon="item.doubleChecks ? 'custom:doubleCheck' : 'custom:check'"
            ></v-icon>
          </div>
        </v-list-item-title>

        <!-- <v-list-item-subtitle>
        <div class="d-flex align-items-center">
          <v-icon
            :color="item.stars ? 'icon-high-emphasis' : 'primary-base'"
            size="x-small"
            icon="fas fa-star"
            class="ml-1 pt-2"
          ></v-icon>
          <span v-if="item.stars" class="text-body-2 text-disabled">۵/</span>
          <span class="text-body-2 text-text-low-emphasis">
            {{ item.stars ? `${item.stars}` : $t("no_stars") }}
          </span>
        </div>
      </v-list-item-subtitle> -->

        <template v-slot:append>
          <div class="d-flex justify-self-end align-center justify-center">
            <!-- <div class="d-md-block d-none">
            <app-reactions @react="$emit('react', $event)" :item="item" />
          </div> -->
            <v-btn
              variant="text"
              @click="$emit('reply', item)"
              size="small"
              color="icon-low-emphasis"
              icon="custom:reply"
            ></v-btn>
            <v-menu
              transition="slide-y-transition"
              content-class="elevation-0"
              offset="4"
              location="bottom"
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
              <template                
               v-for="(item, i) in actions"
              :key="i">
                <v-list-item v-if="item.show"   @click="item.action(item)"
                >
                  <div class="d-flex align-center">
                    <v-icon
                      size="small"
                      class="ml-3"
                      :icon="item.icon"
                      color="icon-low-emphasis"
                    ></v-icon>
                    <v-list-item-title class="text-high-emphasis">{{
                      $t(item.title)
                    }}</v-list-item-title>
                  </div>
                </v-list-item>
              </template>
              </v-list>
            </v-menu>
          </div>
        </template>
      </v-list-item>

      <v-card
        :color="authStore.user.id == item.userId ? 'secondary-base' : 'n050'"
        class="rounded-te-0"
      >
        <v-card-text v-if="item.replyTo" class="pb-0">
          <v-card
            class="rounded-md"
            :color="
              authStore.user.id == item.user.id
                ? 'secondary-lighten3'
                : 'background-light'
            "
          >
            <v-card-text
              class="d-flex"
              :class="
                item.replyTo.userId == authStore.user.id &&
                authStore.user.id != item.user.id
                  ? 'bg-background-secondary'
                  : authStore.user.id == item.user.id
                  ? 'bg-secondary-lighten3'
                  : ''
              "
            >
              <v-avatar
                v-if="item?.attachments?.length"
                :size="smAndDown ? '32' : '48'"
                :color="background - light"
                :image="item?.attachments[0].previewImageUrl"
                class="rounded-md bg-background-light"
                :class="authStore.user.id == item.userId ? 'ml-2' : 'mr-2'"
                variant="outlined"
              ></v-avatar>
              <div dir="rtl" class="d-flex flex-column align-start w-100">
                <span class="d-flex text-body-2">
                  <span class="text-text-low-emphasis">{{
                    $t("reply_to")
                  }}</span>
                  <p class="font-weight-bold pr-1">
                    {{ item?.replyTo?.userDisplayName }}
                  </p>
                </span>
                <span class="truncate-2 text-body-2 text-high-emphasis">{{
                  item?.replyTo?.message
                }}</span>
              </div>
            </v-card-text>
          </v-card>
        </v-card-text>
        <v-card-text
          dir="rtl"
          class="text-body-2"
          :class="{
            'pb-0': item?.attachments?.length,
            'text-text-light': authStore.user.id == item.userId,
            'text-text-high-emphasis': authStore.user.id != item.userId,
          }"
        >
          {{ item.message }}
        </v-card-text>
        <v-card-text v-if="item?.attachments?.length" class="pt-2">
          <v-row class="d-flex">
            <v-col
              v-for="attachment in item?.attachments"
              :key="attachment.id"
              cols="12"
              md=""
            >
              <v-img
                aspect-ratio="1.2"
                cover
                class="rounded-md w-100"
                :src="attachment.previewImageUrl"
                height="230"
              ></v-img>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <app-reactions
        class="mt-3"
        @react="$emit('react', $event)"
        :item="item"
      />

      <v-dialog v-model="dialog.show" max-width="688">
        <v-card>
          <v-card-text>
            <div class="d-flex justify-space-between">
              <span class="text-body-1 font-weight-bold text-text-heading">{{
                $t("remove_message")
              }}</span>
              <v-btn
                variant="text"
                color="icon-high-emphasis"
                flat
                size="small"
                icon="custom:x"
                @click="closeDialog"
              ></v-btn>
            </div>
            <div class="text-center text-body-1 text-text-low-emphasis">
              {{ $t("are_you_sure_to_remove_message") }}
            </div>
            <div>
              <v-card
                class="my-6"
                :color="
                  authStore.user.id == item.userId ? 'secondary-base' : 'n050'
                "
              >
                <v-card-text v-if="item.replyTo">
                  <v-card
                    class="rounded-md"
                    :color="
                      authStore.user.id == item.user.id
                        ? 'secondary-lighten3'
                        : 'background-light'
                    "
                  >
                    <v-card-text class="d-flex">
                      <v-avatar
                        v-if="item?.attachments?.length"
                        :size="smAndDown ? '32' : '48'"
                        color="background-light"
                        :image="tem?.attachments[0].previewImageUrl"
                        class="rounded-md bg-background-light"
                        :class="
                          authStore.user.id == item.userId ? 'ml-2' : 'mr-2'
                        "
                        variant="outlined"
                      ></v-avatar>
                      <div
                        dir="rtl"
                        class="d-flex flex-column align-start w-100"
                      >
                        <span class="d-flex text-body-2">
                          <span class="text-text-low-emphasis">{{
                            $t("reply_to")
                          }}</span>
                          <p class="font-weight-bold pr-1">
                            {{ item?.replyTo?.userDisplayName }}
                          </p>
                        </span>
                        <span
                          class="truncate-2 text-body-2 text-high-emphasis"
                          >{{ item?.replyTo?.message }}</span
                        >
                      </div>
                    </v-card-text>
                  </v-card>
                </v-card-text>
                <v-card-text
                  dir="rtl"
                  class="text-body-2"
                  :class="{
                    'pb-0': item?.attachments?.length,
                    'text-text-light': authStore.user.id == item.userId,
                    'text-text-high-emphasis': authStore.user.id != item.userId,
                  }"
                >
                  {{ item.message }}
                </v-card-text>
                <v-card-text v-if="item?.attachments?.length" class="pt-2">
                  <v-row class="d-flex">
                    <v-col
                      v-for="attachment in item?.attachments"
                      :key="attachment.id"
                      cols="12"
                      md=""
                    >
                      <v-img
                        aspect-ratio="1.2"
                        cover
                        class="rounded-md w-100"
                        :src="attachment.previewImageUrl"
                        height="230"
                      ></v-img>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </div>
            <div class="d-flex justify-space-between">
              <v-btn
                variant="outlined"
                flat
                color="primary-base"
                @click="closeDialog"
                >{{ $t("give_up") }}</v-btn
              >
              <v-btn flat color="primary-base" @click="deleteMessage(item)">{{
                $t("yes_remove_it")
              }}</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script setup>
import { useDisplay } from "vuetify/lib/framework.mjs";
import { useAuthStore } from "@core/stores/auth";
const authStore = useAuthStore();
const { smAndDown } = useDisplay();
const props = defineProps({
  item: Object,
});
const dialog = ref({
  show: false,
});
let emit = defineEmits(["remove"]);
const copy = () => {
  navigator.clipboard.writeText(props.item.message);
};
const remove = (item) => {
  dialog.value = {
    show: true,
    item,
  };
};
const deleteMessage = (item) => {
  emit("remove", item);
  dialog.value.show = false;
};
const closeDialog = () => {
  dialog.value = {
    show: false,
    item: null,
  };
};
const actions = [
  {
    title: "copy",
    action: copy,
    icon: "custom:copy",
    show:true
  },
  {
    title: "remove_msg",
    action: remove,
    icon: "custom:trash",
    show: authStore.hasPermission(["community"]),
  },
];
</script>

<style lang="scss">
#message {
  .v-card-text,
  .v-card-title,
  .v-list-item-title {
    text-align: start !important;
  }
}
</style>
