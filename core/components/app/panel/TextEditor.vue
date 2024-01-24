<template>
  <div id="text-editor" class="bg-background-light rounded-lg overflow-hidden">
    <div class="d-flex align-center border-b py-2" v-if="editor">
      <app-category
        :categories="headings"
        :offset="0"
        single
        button-color="text-text-high-emphasis"
        show-item-title
        :button-title="{ before: 'editor.heading' }"
        v-model="headingsModel"
        :button-style="{
          color: 'rgba(var(--v-theme-text-high-emphasis))',
          fontSize: '20px !important',
        }"
      ></app-category>
      <v-btn
        v-for="({ slug, option, active, icon }, index) in textActions"
        :key="index"
        icon
        flat
        size="x-small"
        class="mx-2"
        :class="{ active: editor.isActive(active) }"
        @click="onActionClick(slug, option)"
      >
        <v-icon :icon="icon" size="18"></v-icon>
      </v-btn>

      <div>
        <v-btn
          @click="setLink"
          size="x-small"
          flat
          class="mx-2"
          :class="{ 'is-active': editor.isActive('link') }"
          icon
        >
          <v-icon icon="custom:link" size="18"></v-icon>
        </v-btn>
      </div>
    </div>
    <div style="height: 300px">
      <editor-content :editor="editor" />
    </div>
  </div>
</template>

<script setup>
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import CharacterCount from "@tiptap/extension-character-count";
import Link from "@tiptap/extension-link";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
let emit = defineEmits(["update:modelValue"]);
let props = defineProps({
  modelValue: {
    type: Object,
    default: {},
  },
  maxLimit: {
    type: Number,
    default: null,
  },
});
const editor = useEditor({
  content: props.modelValue?.model,
  extensions: [
    StarterKit,
    CharacterCount.configure({
      limit: props.maxLimit,
    }),
    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),
    Link.configure({
      openOnClick: false,
    }),
    Table.configure({
      resizable: true,
    }),
    TableRow,
    TableHeader,
    TableCell,
  ],
  onUpdate: () => {
    emit("update:modelValue", { model: editor.value.getHTML() });
  },
});
let headingsModel = ref({});
let textActions = [
  { slug: "bold", icon: "custom:bold", active: "bold" },
  { slug: "italic", icon: "custom:italic", active: "italic" },
  {
    slug: "align",
    option: "left",
    icon: "custom:alignLeft",
    active: { textAlign: "left" },
  },
  {
    slug: "align",
    option: "justify",
    icon: "custom:justifyCenter",
    active: { textAlign: "justify" },
  },
  {
    slug: "align",
    option: "right",
    icon: "custom:alignRight",
    active: { textAlign: "right" },
  },
  { slug: "orderedList", icon: "custom:orderedList", active: "orderedList" },
  { slug: "bulletList", icon: "custom:unorderedList", active: "bulletList" },
  { slug: "insertTable", icon: "custom:unorderedList", active: "insertTable" },
  { slug: "addColumnAfter", icon: "custom:unorderedList", active: "addColumnAfter" },
  { slug: "deleteColumn", icon: "custom:unorderedList", active: "deleteColumn" },
  { slug: "addRowAfter", icon: "custom:unorderedList", active: "addRowAfter" },
  { slug: "deleteRow", icon: "custom:unorderedList", active: "deleteRow" },
  { slug: "mergeCells", icon: "custom:unorderedList", active: "mergeCells" },
  { slug: "splitCell", icon: "custom:unorderedList", active: "splitCell" },


];
let headings = [
  {
    title: "تیتر ۱",
    slug: { level: 1, title: "H1" },
    get customStyle() {
      let fontSize = 30 - 3 * this.slug.level + "px" + " !important";
      return { fontSize };
    },
  },
  {
    title: "تیتر ۲",
    slug: { level: 2, title: "H2" },
    get customStyle() {
      let fontSize = 30 - 3 * this.slug.level + "px" + " !important";
      return { fontSize };
    },
  },
  {
    title: "تیتر ۳",
    slug: { level: 3, title: "H3" },
    get customStyle() {
      let fontSize = 30 - 3 * this.slug.level + "px" + " !important";
      return { fontSize };
    },
  },
  {
    title: "تیتر ۴",
    slug: { level: 4, title: "H4" },
    get customStyle() {
      let fontSize = 30 - 3 * this.slug.level + "px" + " !important";
      return { fontSize };
    },
  },
  {
    title: "تیتر ۵",
    slug: { level: 5, title: "H6" },
    get customStyle() {
      let fontSize = 30 - 3 * this.slug.level + "px" + " !important";
      return { fontSize };
    },
  },
];

watch(
  [headingsModel, props.modelValue.model],
  ([newheading, newModelValue]) => {
    if (newheading != false) onHeadingClick(newheading?.level);
    else onHeadingClick(0);
  },
  { deep: true }
);

let onActionClick = (slug, option = null) => {
  {
    const vm = editor.value.chain().focus();
    const actionTriggers = {
      bold: () => vm.toggleBold().run(),
      italic: () => vm.toggleItalic().run(),
      underline: () => vm.toggleUnderline().run(),
      strike: () => vm.toggleStrike().run(),
      bulletList: () => vm.toggleBulletList().run(),
      orderedList: () => vm.toggleOrderedList().run(),
      align: () => vm.setTextAlign(option).run(),
      subscript: () => vm.toggleSubscript().run(),
      superscript: () => vm.toggleSuperscript().run(),
      undo: () => vm.undo().run(),
      redo: () => vm.redo().run(),
      clear: () => {
        vm.clearNodes().run();
        vm.unsetAllMarks().run();
      },
      code: () => vm.toggleCodeBlock().run(),
      insertTable:()=>vm.insertTable().run(),
      addColumnAfter:()=>vm.insertTable().run(),
      deleteColumn:()=>vm.insertTable().run(),
      addRowAfter:()=>vm.insertTable().run(),
      deleteRow:()=>vm.insertTable().run(),
      mergeCells:()=>vm.insertTable().run(),
      splitCell:()=>vm.insertTable().run(),
    };

    actionTriggers[slug]();
  }
};

let onHeadingClick = (index) => {
  const vm = editor.value.chain().focus();
  if (index > 0) vm.toggleHeading({ level: index }).run();
  else vm.setParagraph().run();
};
let setLink = () => {
  const previousUrl = editor.value.getAttributes("link").href;
  const url = window.prompt("URL", previousUrl);

  // cancelled
  if (url === null) {
    return;
  }

  // empty
  if (url === "") {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();

    return;
  }

  // update link
  editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
};
</script>
<style lang="scss">
#text-editor {
  div:nth-child(2) {
    height: 100%;
    div {
      height: 100%;
    }
  }
  :focus-visible {
    outline: none !important;
  }
}
.ProseMirror {
  overflow: scroll;
  padding: 20px 40px 20px 20px;
  :focus-visible {
    outline: none !important;
  }
}
.ProseMirror-focused {
  :focus-visible {
    outline: none !important;
  }
}
</style>
