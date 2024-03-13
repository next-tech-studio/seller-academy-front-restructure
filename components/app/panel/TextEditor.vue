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
      <div v-for="(item, index) in textActions" :key="index">
        <v-btn
          v-if="item.type == 'btn'"
          icon
          flat
          size="x-small"
          class="mx-2"
          :class="{ active: editor.isActive(item.active) }"
          @click="onActionClick(item.slug, item.option)"
        >
          <v-icon :icon="item.icon" size="18"></v-icon>
        </v-btn>
        <v-menu :location="location" v-if="item.type == 'list'">
          <template v-slot:activator="{ props }">
            <v-btn color="light" icon flat dark v-bind="props" size="small">
              <v-icon :icon="item.icon" :size="25"></v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(item, index) in item.items"
              :key="index"
              @click="onActionClick(item.slug, item.option)"
            >
              <v-list-item-title class="text-caption">{{
                item.title
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

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
const { t } = useI18n();
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
      alignments: ["left", "center", "right"],
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
  { slug: "bold", icon: "custom:bold", active: "bold", type: "btn" },
  { slug: "italic", icon: "custom:italic", active: "italic", type: "btn" },
  {
    slug: "align",
    option: "left",
    icon: "custom:alignLeft",
    active: { textAlign: "left" },
    type: "btn",
  },
  {
    slug: "align",
    option: "justify",
    icon: "custom:justifyCenter",
    active: { textAlign: "justify" },
    type: "btn",
  },
  {
    slug: "align",
    option: "center",
    icon: "custom:justifyCenter",
    active: { textAlign: "center" },
    type: "btn",
  },
  {
    slug: "align",
    option: "right",
    icon: "custom:alignRight",
    active: { textAlign: "right" },
    type: "btn",
  },
  {
    slug: "orderedList",
    icon: "custom:orderedList",
    active: "orderedList",
    type: "btn",
  },
  {
    slug: "bulletList",
    icon: "custom:unorderedList",
    active: "bulletList",
    type: "btn",
  },
  {
    icon: "custom:table",
    type: "list",
    items: [
      {
        slug: "insertTable",
        icon: "custom:unorderedList",
        active: "insertTable",
        title: t("insert_table"),
      },
      {
        slug: "addColumnAfter",
        icon: "custom:unorderedList",
        active: "addColumnAfter",
        title: t("add_column_after"),
      },
      {
        slug: "deleteColumn",
        icon: "custom:unorderedList",
        active: "deleteColumn",
        title: t("delete_column"),
      },
      {
        slug: "addRowAfter",
        icon: "custom:unorderedList",
        active: "addRowAfter",
        title: t("add_row_after"),
      },
      {
        slug: "deleteRow",
        icon: "custom:unorderedList",
        active: "deleteRow",
        title: t("delete_row"),
      },
      {
        slug: "mergeCells",
        icon: "custom:unorderedList",
        active: "mergeCells",
        title: t("merge_cells"),
      },
      {
        slug: "splitCell",
        icon: "custom:unorderedList",
        active: "splitCell",
        title: t("split_cell"),
      },
    ],
  },
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
      insertTable: () => vm.insertTable().run(),
      addColumnAfter: () => vm.addColumnAfter().run(),
      deleteColumn: () => vm.deleteColumn().run(),
      addRowAfter: () => vm.addRowAfter().run(),
      deleteRow: () => vm.deleteRow().run(),
      mergeCells: () => vm.mergeCells().run(),
      splitCell: () => vm.splitCell().run(),
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
  div:nth-child(3) {
    height: 100%;
    div {
      height: 100%;
    }
  }
  :focus-visible {
    outline: none !important;
  }
  table,
  th,
  td,
  tr {
    border: 1px solid black;
    border-collapse: collapse;
  }
  table {
    min-width: 600px !important;
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
.tableWrapper {
  display: flex;
  justify-content: center;
}
</style>
