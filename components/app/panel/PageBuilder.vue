<template>
  <v-container fluid class="pa-8">
    <app-stepper v-slot="scope" :store="panelStore" :type="type">
      <div class="d-flex align-center">
        <v-btn
          variant="text"
          class="me-5"
          :text="$t('editor.save_draft')"
          @click="
            panelStore.validation(
              'content',
              false,
              scope.next,
              false,
              false,
              false
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
              'content',
              false,
              scope.next,
              false,
              true,
              false
            )
          "
        ></v-btn>
        <v-btn
          :text="$t('editor.previous_step')"
          color="button-secondary"
          @click="
            panelStore.validation(
              'content',
              false,
              scope.next,
              true,
              false,
              false
            )
          "
          class="me-5"
          variant="outlined"
        ></v-btn>
        <v-btn
          :text="$t('editor.next_step')"
          color="button-secondary"
          @click="
            panelStore.validation(
              'content',
              true,
              scope.next,
              false,
              false,
              false
            )
          "
        ></v-btn>
      </div>
    </app-stepper>
  </v-container>
  <v-container>
    <section
      v-if="type != 'podcast'"
      class="bg-background-light rounded-lg pa-6 mb-4"
    >
      <app-panel-draft-summary
        :item="panelStore.draftContent"
        v-if="showSummaryOfPreviousSteps"
      />
    </section>
    <draggable v-model="panelStore.draftContent.content" :move="checkMove">
      <template #item="{ element: section, index }">
        <section
          class="rounded-lg mb-4 position-relative overflow"
          :class="getClassName(section)"
          @click="setFocus(section, true)"
        >
          <div class="d-flex flex-column edit-position" v-if="section.focused">
            <!-- <v-menu :location="location" v-if="section.type == 'img'">
                <template v-slot:activator="{ props }">
                  <v-btn
                    color="icon-secondary"
                    icon
                    class="mb-3"
                    size="40"
                    variant="outlined"
                    v-bind="props"
                  >
                    <v-icon icon="custom:alignWhole"></v-icon>
                  </v-btn>
                </template>
  
                <v-list>
                  <v-list-item
                    v-for="(item, index) in pictureAlignment"
                    :key="index"
                  >
                    <template v-slot:prepend>
                      <v-icon :icon="item.icon" color="icon-secondary"></v-icon>
                    </template>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu> -->
            <v-btn
              v-if="!(type == 'podcast' && index == 0)"
              icon
              variant="outlined"
              @click.stop="onDeleteComponent(index)"
              color="secondary-base"
              size="40"
            >
              <v-icon icon="custom:trash" color="secondary-base" size="24"
            /></v-btn>
          </div>
          <v-icon icon="custom:draggable" size="18" class="drag-position" />
          <component
            :is="section.component || getComponent(section.type)"
            v-model="section.content"
            v-bind="getProps(section.type)"
          >
          </component>
        </section>
      </template>
    </draggable>
    <section
      class="bg-background-light rounded-lg pa-6 mb-4"
      v-if="addNewSection"
    >
      <app-panel-new-section @update:newsection="onNewSection" />
    </section>
    <section class="bg-background-light rounded-lg pa-6 mb-4" v-if="newSection">
      <app-panel-content-type
        @add:content="openSelectedContentSection"
        v-model:toggle="newSection"
        :options="options"
      />
    </section>
  </v-container>
</template>

<script setup>
import { usePanelStore } from "~/stores/panel";
import TextEditor from "~/components/app/panel/TextEditor.vue";
import Divider from "~/components/app/panel/Divider.vue";
import BlogContentUploader from "~/components/app/panel/BlogContentUploader.vue";
import Banner from "~/components/app/panel/Banner.vue";
import Exam from "~/components/app/panel/Exam.vue";
import Reference from "~/components/app/panel/Reference.vue";
import Media from "~/components/app/panel/Media.vue";
import draggable from "vuedraggable";
const UPLOAD_ARTICLE_PATH = "/panel/articles/inline_media";
const props = defineProps({
  showSummaryOfPreviousSteps: {
    type: Boolean,
    Default: True,
  },
  uploadPath: {
    type: String,
    default: UPLOAD_ARTICLE_PATH,
  },
  pageBuilderOptions: {
    type: Array,
    default: [],
  },
  type: {
    type: String,
    default: "article",
  },
});
let contentBasedOptions = computed({
  get() {
    return props.pageBuilderOptions;
  },
  set(newValue) {
    if (panelStore.draftContent.dominantType == "text")
      return ["img", "html", "reference", "audio", "divider"];
    else {
      return ["img", "html", "reference", "audio", "exam", "vid", "divider"];
    }
  },
});
let panelStore = usePanelStore();
import { storeToRefs } from "pinia";
const route = useRoute();
let addNewSection = ref(true);
const fixed = ref(false);
let pictureAlignment = [
  { icon: "custom:alignWhole", title: "هیچ کدام" },
  { icon: "custom:alignRightCard", title: "راست چین" },
  { icon: "custom:alignLeftCard", title: "چپ چین" },
  { icon: "custom:justifyCard", title: "وسط چین" },
  { icon: "custom:alignWhole", title: "تمام صفحه" },
];
let uploaderProps = ref({
  "area-size": { width: "100%", height: "327px" },
  "upload-path": UPLOAD_ARTICLE_PATH,
  "blog-content": true,
});
let audioProps = ref({
  type: "audio",
});
let newSection = ref(false);
let onDeleteComponent = (index) => {
  panelStore.draftContent.content?.splice(index, 1);
};
const onNewSection = () => {
  newSection.value = true;
  addNewSection.value = !addNewSection.value;
};
let singleContentType = computed(() => {
  if (panelStore.draftContent.value?.dominantType == "exam") return true;
  else return false;
});
const openSelectedContentSection = (componentType) => {
  addNewSection.value = true;
  newSection.value = false;
  switch (componentType) {
    case "img":
      panelStore.draftContent.content.push({
        type: "img",
        component: BlogContentUploader,
        content: {},
        fixed: false,
      });
      break;
    case "vid":
      panelStore.draftContent.content.push({
        type: "vid",
        component: Media,
        content: {},
        fixed: false,
      });
      break;
    case "audio":
      panelStore.draftContent.content.push({
        type: "audio",
        component: Media,
        content: {},
        fixed: false,
      });
      break;
    case "html":
      panelStore.draftContent.content.push({
        type: "html",
        component: TextEditor,
        content: {},
        fixed: false,
      });
      break;
    case "banner":
      panelStore.draftContent.content.push({
        type: "banner",
        component: Banner,
        content: {},
        fixed: false,
      });

      break;
    case "divider":
      panelStore.draftContent.content.push({
        type: "divider",
        component: Divider,
        content: {
          html: "<br>",
        },
        fixed: fixed,
      });
      break;
    case "exam":
      panelStore.draftContent.content.push({
        type: "exam",
        component: Exam,
        content: {
          questions: [{ title: "", choices: [], id: 1 }],
          description: "",
        },
        fixed: false,
      });
      panelStore.draftContent.dominantType = "exam";
      singleContentType.value = true;
      contentBasedOptions.value = ["exam"];
      newSection.value = false;

      break;

    case "reference":
      contentModel.value.push({
        type: "reference",
        component: Reference,
        content: [],
        references: [],
        fixed: false,
      });
      panelStore.draftContent.dominantType.dominantType = "text";
      contentBasedOptions.value = ["img", "html", "reference", "divider"];
      break;
    case "column":
      break;
  }

  if (type.value == "podcast") panelStore.draftContent.content[0].fixed = true;
};
// const options = computed(() => {
//   let items = ["audio", "img", "html", "reference", "vid", "divider"];
//   if (type.value == "podcast" && panelStore.draftContent.content.length == 0)
//     items = items.filter((f) => f == "audio");
//   return items;
// });
const options = computed({
  get() {
    return props.pageBuilderOptions;
  },
  set(newValue) {
    if (
      type.value == "podcast" &&
      panelStore.draftContent.content.length == 0
    ) {
      let items = props.pageBuilderOptions.filter((f) => f == "audio");
      return items;
    }
    if (panelStore.draftContent.dominantType == "text")
      return ["img", "html", "reference", "audio", "divider"];
    else {
      return ["img", "html", "reference", "audio", "exam", "vid", "divider"];
    }
  },
});
const setFocus = (section, focused) => {
  section.focused = focused ? true : false;
};

let getComponent = (type) => {
  switch (type) {
    case "img":
      return BlogContentUploader;
    case "vid":
      return Media;
    case "audio":
      return Media;
    case "html":
      return TextEditor;
    case "banner":
      return Banner;
    case "divider":
      return Divider;
    case "column":
      break;
  }
};
let getProps = (type) => {
  let props;
  if (type == "audio") props = audioProps.value;
  if (type === "img") props = uploaderProps.value;
  return props;
};
const getClassName = (section) => {
  let classes = "bg-background-light";
  if (section.focused == true) {
    classes = classes.concat(" border-sm border-secondary");
    return classes;
  } else {
    return classes;
  }
};
const { draftContent } = storeToRefs(panelStore);
watch(
  draftContent,
  () => {
    panelStore.postSavedState = false;
  },
  { deep: true }
);
definePageMeta({
  middleware: ["auth"],
  layout: false,
});

const isDraggable = (context) => {
  const { index, futureIndex } = context;
  return !(
    panelStore.draftContent.content[index].fixed ||
    panelStore.draftContent.content[futureIndex].fixed
  );
};

const checkMove = (e) => {
  return isDraggable(e.draggedContext);
};

onMounted(() => {
  panelStore.setStep(2);
  panelStore.postRouteId = route.params.id;
  panelStore.getDraftInfo(type.value);
});

const type = computed(() =>
  route.name.includes("podcast") ? "podcast" : "article"
);
</script>

<style lang="scss" scoped>
.edit-position {
  position: absolute;
  right: -48px;
}

.drag-position {
  position: absolute;
  right: -36px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}
.v-list-item__prepend > .v-icon {
  margin-inline-end: 16px !important;
}
.v-list-item__prepend > .v-icon {
  opacity: 1;
}
.border-secondary {
  border-color: rgba(var(--v-theme-secondary-base)) !important;
}
.divider-height {
  height: 20px;
}
</style>
