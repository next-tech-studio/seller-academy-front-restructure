<template>
  <v-container fluid class="pa-8">
    <div class="d-flex align-center justify-end mb-8">
      <v-btn
        variant="text"
        class="me-5"
        :text="$t('editor.save_draft')"
        @click="saveRoom(false)"
      ></v-btn>
      <v-btn
        :text="$t('activate_room')"
        color="button-secondary"
        @click="saveRoom(true)"
      ></v-btn>
    </div>
    <v-form
      :model-value="room"
      class="d-flex justify-space-between"
      ref="form"
      validate-on="blur"
    >
      <section class="bg-background-light rounded-lg pa-6" style="width: 49%">
        <div class="mb-4">
          <p class="mb-2 text-h3">{{ $t("room_name") }}</p>
          <v-text-field
            v-model="room.title"
            flat
            base-color="n300"
            :hint="$t(`editor.article_title_hint`)"
            density="compact"
            variant="outlined"
            :placeholder="$t('title')"
            persistent-placeholder
            persistent-hint
          ></v-text-field>
        </div>
        <div>
          <p class="text-h3 mb-2">{{ $t("room_description") }}</p>
          <v-textarea
            flat
            variant="outlined"
            base-color="n300"
            class="text-low-emphasis pb-3"
            rows="6"
            hint="حداکثر ۱۰۰۰ کاراکتر"
            v-model="room.description"
            no-resize
            required
          />
        </div>
        <div class="mb-4">
          <p class="mb-2 text-h3">
            {{ $t("room_avatar") }}
          </p>
          <app-panel-blog-content-uploader
            :upload-path="UPLOAD_CHAT_PATH"
            v-model="room.avatarUrl"
            :area-size="{ width: '40%', height: '200px' }"
            description="editor.desktop_banner_hint"
            return-url
          >
            <template v-slot:inlineEdit="scope">
              <div class="d-flex justify-end ma-4">
                <v-btn
                  color="background-dark"
                  class="me-2"
                  @click="scope.fileImport(false)"
                >
                  <span class="text-button text-text-low-emphasis">
                    <v-icon icon="custom:uploadPicture"></v-icon>
                    {{ $t("change_picture") }}</span
                  >
                </v-btn>
                <v-btn color="background-dark" @click="scope.deleteFile()">
                  <span class="text-button text-text-low-emphasis">
                    <v-icon icon="custom:trash"></v-icon>
                    {{ $t("delete_picture") }}</span
                  >
                </v-btn>
              </div>
            </template>
          </app-panel-blog-content-uploader>
        </div>
        <div class="mb-4">
          <p class="mb-2 text-h3">
            {{ $t("room_banner") }}
          </p>
          <app-panel-blog-content-uploader
            :upload-path="UPLOAD_CHAT_PATH"
            v-model="room.bannerUrl"
            :area-size="{ width: '60%', height: '239px' }"
            description="editor.desktop_banner_hint"
            return-url
          >
            <template v-slot:inlineEdit="scope">
              <div class="d-flex justify-end ma-4">
                <v-btn
                  color="background-dark"
                  class="me-2"
                  @click="scope.fileImport(false)"
                >
                  <span class="text-button text-text-low-emphasis">
                    <v-icon icon="custom:uploadPicture"></v-icon>
                    {{ $t("change_picture") }}</span
                  >
                </v-btn>
                <v-btn color="background-dark" @click="scope.deleteFile()">
                  <span class="text-button text-text-low-emphasis">
                    <v-icon icon="custom:trash"></v-icon>
                    {{ $t("delete_picture") }}</span
                  >
                </v-btn>
              </div>
            </template>
          </app-panel-blog-content-uploader>
        </div>
      </section>
      <section class="bg-background-light rounded-lg pa-6" style="width: 49%">
        <div class="mb-4">
          <p class="mb-2 text-h3">{{ $t("maximum_allowed_member") }}</p>
          <v-text-field
            v-model="room.maxMember"
            flat
            type="number"
            base-color="n300"
            density="compact"
            variant="outlined"
            :placeholder="$t('count')"
            persistent-placeholder
          ></v-text-field>
        </div>
        <div class="mb-8">
          <p class="text-h3">{{ $t("choose_category") }}</p>
          <v-select
            :label="$t('editor.category')"
            density="compact"
            :rules="$rules({ categoryId: 'required' }, room.categoryId)"
            base-color="n300"
            v-model="room.categoryId"
            hide-details=""
            :items="common?.categories"
            item-value="id"
            variant="outlined"
          >
            <template v-slot:append-inner>
              <v-icon icon="custom:caretDownSolid" size="12" />
            </template>
          </v-select>
        </div>
        <div class="mb-8">
          <p class="text-h3">{{ $t("is_private") }}</p>
          <v-select
            :label="$t('is_private')"
            density="compact"
            :rules="$rules({ isPrivate: 'required' }, room.isPrivate)"
            base-color="n300"
            v-model="room.isPrivate"
            hide-details=""
            :items="privacyStatus"
            item-value="id"
            variant="outlined"
          >
            <template v-slot:append-inner>
              <v-icon icon="custom:caretDownSolid" size="12" />
            </template>
          </v-select>
        </div>
        <div>
          <p class="text-h3">{{ $t("room_members") }}</p>
          <div class="text-center text-text-low-emphasis" v-if="!room.members">
            {{ $t("this_room_does_not_have_any_members") }}
          </div>
          <v-list
            color="secondary"
            style="max-height: 300px"
            class="mb-4 overflow-auto"
          >
            <template v-for="(item, index) in room.members" :key="index">
              <app-profile-list-item
                :item="item"
                :title="item.displayName"
                subtitle-key="bio"
                :avatar="item.avatarUrl"
                avatar-size="48"
                :hover="false"
                class="mb-4 px-1 rounded"
              >
                <template #append>
                  <v-btn @click="removeMember(item)" icon="custom:x" flat />
                </template>
              </app-profile-list-item>
            </template>
          </v-list>
        </div>
        <div>
          <p class="text-h3 mb-2">{{ $t("choose_room_members") }}</p>
          <div class="h-100">
            <v-text-field
              flat
              base-color="n300"
              v-model="search"
              @update:model-value="onSearch"
              density="compact"
              variant="solo-filled"
              persistent-placeholder
              persistent-hint
              prepend-inner-icon="custom:search"
              :placeholder="`${$t('search')}...`"
              class="mt-6"
            ></v-text-field>
            <div v-for="(item, index) in users" :key="index">
              <app-profile-list-item
                :item="item"
                :title="item.name"
                subtitle-key="bio"
                :avatar="item.avatarUrl"
                @click="addMember(item, index)"
                avatar-size="48"
                :hover="false"
                class="mb-4 px-1 rounded"
                :class="chosenIndex[item.id] ? 'chosen-member' : ''"
              >
                <template #texting>
                  <v-icon icon="custom:x"></v-icon>
                </template>
              </app-profile-list-item>
            </div>
          </div>
        </div>
      </section>
    </v-form>
  </v-container>
</template>

<script setup>
const route = useRoute();
let search = ref([]);
let edit = ref(false);
let form = ref(null);
const UPLOAD_CHAT_PATH = "/community/chat/attachment";
const localePath = useLocalePath();
const { t } = useI18n();
let chosenIndex = ref([]);
let room = ref({
  avatarUrl: { url: "" },
  bannerUrl: { url: "" },
  category: { id: 0 },
});
let common = ref({});
let users = ref([]);
let newMembers = ref([]);
const { $repos } = useNuxtApp();
const addMember = (item, index) => {
  console.log("bbeeffoore", newMembers.value, chosenIndex.value,index,item.id);

  if (!!!chosenIndex.value[item.id]) {
    console.log('838383')
    newMembers.value.push(item.id);
  chosenIndex.value[item.id] = true;
  } else {
    console.log('222222')

    newMembers.value.splice(index,1)
    chosenIndex.value[item.id] = false;
  }
  console.log("cchhoosseennnnn", newMembers.value, chosenIndex.value[index]);
};
let privacyStatus = [
  { id: 1, title: t("private") },
  { id: 0, title: t("public") },
];
const getRoomCommon = () => {
  $repos.communityPanel.roomCommon(route.params.id).then((res) => {
    Object.assign(common.value, res);
  });
};

const removeMember = (member) => {
  let payload = {
    categorySlug: room.value.category.slug,
    chatSlug: room.value.slug,
    body: { memberId: member.id },
  };
  const index = room.value.members.findIndex(
    (chosenMember) => chosenMember.id === member.id
  );
  $repos.community.removeMember(payload).then(() => {
    room.value.members.splice(index, 1);
  });
};
const getUsers = async (e) => {
  let payload = { search: e };
  await $repos.community.getUsersList(payload).then((res) => {
    Object.assign(users.value, res.data);
  });
};
const onSearch = useDebounceFn(async (e) => await getUsers(e), 1000, {
  maxWait: 5000,
});
const getRoomInfo = () => {
  $repos.communityPanel.roomInfo(route.params.id).then((res) => {
    console.log("res", res);

    Object.assign(room.value, res);
  });
};
// const publishRoom = () => {
//   saveRoom();
//   let payload = {
//     body: {
//       status: "active",
//       ids: [room.value.id],
//     },
//   };
//   $repos.communityPanel.updateRoomStatus(payload);
// };
const saveRoom = (publishًRoom = false) => {
  console.log('puubblish',publishًRoom)
  if (edit.value)
    newMembers.value.push(...room.value.members.map((member) => member.id));
  let payload = {
    body: {
      ...room.value,
      avatarUrl: room.value.avatarUrl.url,
      bannerUrl: room.value.bannerUrl.url,
      members: newMembers.value || [],
    },
  };
  console.log('puubblish',publishًRoom,payload,newMembers.value)

  $repos.communityPanel.saveRoom(payload).then((res) => {
    if (!edit.value)
      navigateTo(
        localePath({ path: `/forum/panel/room/create/${res}` })
      );
    if (publishًRoom) {
      let payload = {
        body: {
          status: "active",
          ids: [room.value.id],
        },
      };
      $repos.communityPanel.updateRoomStatus(payload);
    }
  });
};
onMounted(() => {
  getRoomCommon();
  if (route.params.id) {
    edit.value = true;
    getRoomInfo();
  }
});
// definePageMeta({
//   middleware: ["auth"],
//   layout: false,
// });
</script>
<style lang="scss">
.chosen-member {
  background: rgba(var(--v-theme-background-secondary));
}
</style>
