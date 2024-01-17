<template>
  <v-container fluid class="pa-8">
    <div class="d-flex align-center justify-end mb-8">
      <v-btn
        variant="text"
        class="me-5"
        :text="$t('editor.save_draft')"
        @click="saveRoom"
      ></v-btn>
      <v-btn
        :text="$t('activate_room')"
        color="button-secondary"
        @click="publishRoom"
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
            :upload-path="UPLOAD_ARTICLE_PATH"
            v-model="room.avatarUrl.url"
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
            :upload-path="UPLOAD_ARTICLE_PATH"
            v-model="room.bannerUrl.url"
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
            v-model="room.maxMemberCount"
            flat
            type="number"
            base-color="n300"
            density="compact"
            variant="outlined"
            :placeholder="$t('count')"
            persistent-placeholder
          ></v-text-field>
        </div>
        <div>
          <p class="text-h3 mb-2">{{ $t("room_members") }}</p>
          <add-member
            @add:member="newMember"
            :has-link="false"
            :users="users"
            @search="getUsers"
          />
        </div>
      </section>
    </v-form>
  </v-container>
</template>

<script setup>
const route = useRoute();
let form = ref(null);
let room = ref({ avatarUrl: { url: "" }, bannerUrl: { url: "" } });
let common = ref({ users: [] });
let users = ref([])
const { $repos } = useNuxtApp();
const getRoomCommon = () => {
  $repos.communityPanel.roomCommon(route.params.id).then((res) => {
    Object.assign(common.value, res);
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
  $repos.communityPanel.roomInfo(route.params.slug).then((res) => {
    Object.assign(room.value, res);
  });
};
const publishRoom = () => {
  $repos.communityPanel.updateRoomStatus({
    status: "active",
    ids: [room.value.roomId],
  });
};
const saveRoom = () => {
  $repos.communityPanel.updateRoomStatus({
    status: "active",
    ids: [room.value.roomId],
  });
};
onMounted(() => {
  getRoomCommon();
  if (route.params.slug) getRoomInfo();
});
definePageMeta({
  middleware: ["auth"],
  layout: false,
});
</script>
