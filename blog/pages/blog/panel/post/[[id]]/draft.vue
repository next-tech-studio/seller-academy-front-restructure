<template>
  <v-container fluid class="pa-8">
    <app-stepper v-slot="scope" :store="sharedStore" :type="type">
      <div class="d-flex align-center">
        <v-btn
          variant="text"
          class="me-5"
          :text="$t('editor.save_draft')"
          @click="
            panelStore.validation(
              'draft',
              false,
              scope.next,
              false,
              false,
              false,
              form
            )
          "
        ></v-btn>
        <v-btn
          icon="custom:eye"
          size="small"
          color="text-high-emphasis"
          class="me-5"
          @click="
            panelStore.validation(
              'draft',
              false,
              scope.next,
              false,
              true,
              false,
              form
            )
          "
        ></v-btn>
        <v-btn
          :text="$t('editor.next_step')"
          color="button-secondary"
          @click="
            panelStore.validation(
              'draft',
              true,
              scope.next,
              false,
              false,
              false,
              form
            )
          "
        ></v-btn>
      </div>
    </app-stepper>
    <v-form
      :model-value="panelStore.draftContent"
      class="d-flex justify-space-between"
      ref="form"
      validate-on="blur"
    >
      <section class="bg-background-light rounded-lg pa-6" style="width: 49%">
        <div class="mb-4">
          <p class="mb-2 text-h3">{{ $t(`editor.${type}_title`) }}</p>
          <v-text-field
            v-model="panelStore.draftContent.title"
            flat
            base-color="n300"
            :hint="$t(`editor.article_title_hint`)"
            density="compact"
            :rules="
              $rules({ title: 'required' }, panelStore.draftContent.title)
            "
            variant="outlined"
            :placeholder="$t('title')"
            persistent-placeholder
            persistent-hint
          ></v-text-field>
        </div>
        <div class="mb-4">
          <p class="mb-2 text-h3">
            {{ $t(`editor.choose_${type}_picture`) }}
          </p>
          <div class="mb-4">
            <span class="text-subtitle-2 text-text-low-emphasis">{{
              $t("editor.desktop_version")
            }}</span>
            <app-panel-blog-content-uploader
              :upload-path="UPLOAD_ARTICLE_PATH"
              v-model="panelStore.draftContent.bannerUrl"
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
          <div class="mb-4">
            <span class="text-subtitle-2 text-text-low-emphasis"
              >{{ $t("editor.mobile_version") }}(اختیاری)</span
            >
            <app-panel-blog-content-uploader
              :upload-path="UPLOAD_ARTICLE_PATH"
              v-model="panelStore.draftContent.bannerUrlMobile"
              :area-size="{ width: '40%', height: '183px' }"
              description="editor.mobile_banner_hint"
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
        </div>
      </section>
      <section
        class="bg-background-light rounded-lg pa-6"
        style="width: 49%; height: fit-content"
      >
        <div class="mb-4" v-if="type != 'podcast'">
          <p class="text-h3">{{ $t("choose_category") }}</p>
          <p class="text-body-2 mb-3">{{ $t("editor.category_hint") }}</p>

          <v-select
            :label="$t('editor.category')"
            density="compact"
            :rules="
              $rules({ title: 'required' }, panelStore.draftContent.category)
            "
            base-color="n300"
            v-model="panelStore.draftContent.category"
            hide-details=""
            :items="panelStore.editorCategories"
            item-value="slug"
            variant="outlined"
          >
            <template v-slot:append-inner>
              <v-icon icon="custom:caretDownSolid" size="12" />
            </template>
          </v-select>
        </div>
        <div v-if="type == 'podcast'" class="mb-6">
          <p class="text-h3 mb-2">{{ $t(`editor.listen_in`) }}</p>
          <v-btn
            v-for="(channel, index) in channels"
            :key="channel.id"
            @click="openChannelDialog(index)"
            icon
            flat
            class="me-1"
          >
            <v-img width="40" height="40" cover :src="channel.logo"></v-img>
          </v-btn>

          <v-dialog v-model="dialog" width="auto" min-width="500">
            <v-card>
              <v-card-text>
                <div class="font-weight-bold mb-4">
                  {{ $t("editor.add_link") }}
                  {{ channels[currentChannel].title }}
                </div>
                <v-text-field
                  v-model="
                    panelStore.draftContent.information[currentChannel].link
                  "
                  flat
                  base-color="n300"
                  density="compact"
                  :rules="
                    $rules({ title: 'required' }, panelStore.draftContent.title)
                  "
                  variant="outlined"
                  :placeholder="channels[currentChannel].title"
                  persistent-placeholder
                  persistent-hint
                ></v-text-field>
                <div class="w-100 d-flex justify-end">
                  <v-btn @click="addChannel" flat color="primary-base">{{
                    $t("add")
                  }}</v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-dialog>
        </div>
        <div>
          <p class="text-h3 mb-2">{{ $t(`editor.${type}_summary`) }}</p>
          <v-textarea
            flat
            variant="outlined"
            base-color="n300"
            class="text-low-emphasis pb-3"
            rows="6"
            :rules="
              $rules(
                { summary: 'required|digits_between:1,1000' },
                panelStore.draftContent.summary
              )
            "
            hint="حداکثر ۱۰۰۰ کاراکتر"
            v-model="panelStore.draftContent.summary"
            no-resize
            required
          />
        </div>
        <div class="mb-4" v-if="auth.hasPermission(['blogs'])">
          <span>{{ $t("publish_with_which_role") }}</span>
          <app-category
            v-model="panelStore.draftContent.author.slug"
            :button-style="{
              color: 'rgba(var(--v-theme-text-high-emphasis))',
            }"
            mandatory
            :categories="panelStore.editorAuthorOptions"
            show-item-title
            single
          ></app-category>
        </div>
        <client-only>
          <div class="w-100 d-flex align-center">
            <span
              class="me-2"
            >
              {{ $t("publicationDate") }}
          </span>
            <input
              type="text"
              class="custom-input bg-n050 rounded px-4 py-2"
              style="height: 46px"
              :value="
                $moment(panelStore.draftContent.publicationDate).format(
                  'jYYYY/jMM/jDD'
                )
              "
            />
            <date-picker
              auto-submit
              color="rgba(var(--v-theme-primary-base))"
              v-model="panelStore.draftContent.publicationDate"
              custom-input=".custom-input"
              format="YYYY-MM-DD hh:mm:ss"
              simple
              display-format="hh:mm:ss jYYYY-jMM-jDD"
              popover="bottom-left"
              type="datetime"
            ></date-picker>
          </div>
        </client-only>
      </section>
    </v-form>
  </v-container>
</template>

<script setup>
import { usePanelStore } from "~/stores/panel";
import { useSharedPanelStore } from "~/stores/sharedPanel";
import { useAuthStore } from "@core/stores/auth";
const auth = useAuthStore();
let panelStore = usePanelStore();
const sharedStore = useSharedPanelStore();
import { storeToRefs } from "pinia";
const route = useRoute();
let form = ref(null);
const UPLOAD_ARTICLE_PATH = "/panel/articles/upload_cover";
let dialog = ref(false);
let currentChannel = ref(-1);
const { $moment } = useNuxtApp();
const channels = ref([
  {
    id: 1,
    title: "itunes",
    logo: "/images/channels/itunes.png",
    link: null,
  },
  {
    id: 2,
    title: "castbox",
    logo: "/images/channels/castbox.png",
    link: null,
  },
  {
    id: 3,
    title: "google podcast",
    logo: "/images/channels/googlepodcast.png",
    link: null,
  },
  {
    id: 4,
    title: "spotify",
    logo: "/images/channels/spotify.png",
    link: null,
  },
  {
    id: 5,
    title: "soundcloud",
    logo: "/images/channels/soundcloud.png",
    link: null,
  },
  {
    id: 5,
    title: "shenoto",
    logo: "/images/channels/shenoto.png",
    link: null,
  },
]);
onMounted(() => {
  panelStore.getEditorPanelCommon();
  panelStore.postRouteId = route.params.id;
  sharedStore.setStep(1);
  panelStore.draftContent = {
    title: "",
    summary: "",
    category: "",
    author: { slug: {} },
    bannerUrl: ref([]),
    bannerUrlMobile: ref([]),
    content: [],
    information: channels.value,
  };
  if (route.params.id) {
    panelStore.getDraftInfo();
  }
});
const { draftContent } = storeToRefs(panelStore);
watch(
  draftContent,
  (newDraft) => {
    panelStore.postSavedState = false;
  },
  { deep: true }
);
// definePageMeta({
//   middleware: ["auth"],
//   layout: 'sidebar',
// });
const openChannelDialog = (index) => {
  currentChannel.value = index;
  dialog.value = true;
};
const addChannel = () => {
  panelStore.draftContent.information[currentChannel.value] =
    channels.value[currentChannel.value];
  dialog.value = false;
};
const type = computed(() =>
  route.name.includes("podcast") ? "podcast" : "article"
);
</script>
