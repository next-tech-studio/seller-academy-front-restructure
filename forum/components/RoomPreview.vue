<template>
  <div>
    <v-app-bar
      v-if="!showPreview"
      elevation="0"
      order="1"
      absolute
      style="top: 0; border-bottom: 1px solid rgba(var(--v-theme-n200))"
      class="px-4"
    >
      <v-btn
        v-if="smAndDown"
        density="compact"
        size="x-small"
        icon="custom:chevronRight"
        @click="$emit('back')"
      />
      <v-btn
        variant="text"
        height="fit-content"
        width="fit-content"
        class="px-2"
        @click="showPreview = !showPreview"
      >
        <v-avatar :image="item.bannerUrl"></v-avatar>
        <div class="text-caption mr-2">
          <div class="text-text-heading">{{ item?.name }}</div>
          <div class="text-text-low-emphasis text-right">
            {{ item?.membersCount + $t("member") }}
          </div>
        </div>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        density="compact"
        icon="custom:arrowLeft"
        @click="goBack"
      />
    </v-app-bar>
    <v-card
      :style="
        !smAndDown
          ? 'width: calc(100% - 364px); position: absolute; left: 0;'
          : ''
      "
      rounded="0"
      class="preview d-flex flex-column pr-lg-64 pr-0"
      v-if="showPreview"
    >
      <v-img
        :src="item.bannerUrl"
        aspect-ratio="1.98"
        cover
        gradient="180deg, rgba(0, 0, 0, 0) 0%, #000000 100%"
        height="40%"
      >
        <div class="d-flex flex-column h-100">
          <v-card-text
            class="d-flex justify-end mb-auto flex-grow-1"
            v-if="authStore.hasPermission(['community'])"
          >
            <cover-uploader
              :upload-path="UPLOAD_COVER_PATH"
              v-model="uploaderModel"
            ></cover-uploader>
            <v-btn
              @click="showPreview = !showPreview"
              flat
              class="ms-3"
              icon="custom:arrowLeft"
              size="36"
            ></v-btn>
          </v-card-text>
          <v-card-text class="flex-grow-0 h-100 d-flex flex-wrap">
            <app-profile-list-item
              :item="item"
              :avatar="item.avatarUrl"
              :hover="false"
              avatar-size="64"
              class="px-0 w-100"
            >
              <template #title>
                <span class="text-h5 text-text-light">{{ item.name }}</span>
              </template>
              <template #subtitle>
                <app-avatar-group
                  :members="item.membersListSummary"
                  size="20px"
                />
              </template>
            </app-profile-list-item>
            <div class="d-flex justify-space-between w-100 my-2">
              <div class="text-text-light text-body-1 font-weight-bold">
                {{ $t("description") }}
              </div>
              <v-btn
                size="small"
                flat
                variant="text"
                v-if="authStore.hasPermission(['community'])"
                class="text-text-light"
                @click="openDialog('edit')"
              >
                <v-icon class="ml-2" icon="custom:pencil"></v-icon>
                <span class="text-button-1 font-weight-bold">{{
                  $t("edit")
                }}</span>
              </v-btn>
            </div>
            <div class="text-text-light text-body-2 align-self-end">
              {{
                item.description ||
                "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان. لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان."
              }}
            </div>
          </v-card-text>
        </div>
      </v-img>

      <v-card-text class="position-relative h-100">
        <div class="d-flex justify-space-between w-100">
          <span class="text-body-1 font-weight-bold text-text-heading">{{
            $t("members")
          }}</span>
          <v-btn
            variant="text"
            color="button-secondary"
            v-if="authStore.hasPermission(['community'])"
            @click="openDialog('add_member')"
          >
            <v-icon class="ml-2" icon="custom:plus"></v-icon>
            <span class="text-button-1 font-weight-bold">{{
              $t("add_member")
            }}</span>
          </v-btn>
        </div>
        <div class="stick-preview" id="height">
          <slot name="members"></slot>
        </div>
      </v-card-text>

      <v-dialog v-model="dialog.show" max-width="640" :fullscreen="!mdAndUp">
        <v-card>
          <v-card-text class="d-flex flex-column">
            <div class="d-flex justify-space-between">
              <span class="text-body-1 font-weight-bold text-text-heading">{{
                $t(dialog.type)
              }}</span>
              <v-btn
                variant="text"
                color="icon-high-emphasis"
                flat
                size="small"
                icon="custom:arrowLeft"
                @click="closeDialog"
              ></v-btn>
            </div>
            <add-member
              v-if="dialog.type == 'add_member'"
              @add:member="newMember"
              :users="users"
              :join-link = "item.joinLink"
              @search="$emit('search:users', $event)"
            />
            <edit-room-description
              @update:description="closeDialog"
              v-model="item.description"
              v-if="dialog.type == 'edit'"
            />
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script setup>
import { useAuthStore } from "@core/stores/auth";
import { useDisplay } from "vuetify";
const { mdAndUp, smAndDown, lgAndUp } = useDisplay();
const authStore = useAuthStore();
const route = useRoute();
const props = defineProps({
  modelValue: Object,
  users: Array,
});

const router = useRouter();
const goBack = () => {
  router.back();
};

let UPLOAD_COVER_PATH;
const emit = defineEmits(["update:modelValue", "update:members"]);
const actions = ref([]);
const showPreview = ref(false);
const dialog = ref({});
const openDialog = (type) => {
  dialog.value = {
    show: true,
    type,
  };
};
let item = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
const newMember = (e) => {
  emit("update:members", e);
  dialog.value.show = false;
};
let uploaderModel = ref({ bannerUrl: item.bannerUrl });
watch(uploaderModel.value, () => {
  console.log("929229", uploaderModel.value);
  Object.assign(item.value, uploaderModel.value);
});
const closeDialog = () => {
  if (dialog.value.type === "edit") emit("update:roomDesc");
  dialog.value.show = false;
};
onMounted(() => {
  UPLOAD_COVER_PATH = `/community/chat/room/${route.params.slug}/upload_cover`;
});
</script>

<style scoped lang="scss">
.preview {
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  /* height: 100%; */
}
.stick-preview {
  position: absolute;
  top: 64px;
  bottom: 0;
  width: 100%;
  left: 0;
}
</style>
