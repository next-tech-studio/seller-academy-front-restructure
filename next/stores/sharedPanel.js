import APIHandler from "~/services/APIHandler";
export const useSharedPanelStore = defineStore("sharedPanel", {
  state: () => ({
    step: ref(1),
    steps: {
      article: {
        1: {
          value: 1,
          title: "draft",
          to: "blog-panel-post-id-draft",
        },
        2: {
          value: 2,
          title: "content",
          to: "blog-panel-post-id-content",
        },
        3: {
          value: 3,
          title: "seo",
          to: "blog-panel-post-id-seo",
        },
      },
      podcast: {
        1: {
          value: 1,
          title: "draft",
          to: "blog-panel-podcast-id-draft",
        },
        2: {
          value: 2,
          title: "content",
          to: "blog-panel-podcast-id-content",
        },
        3: {
          value: 3,
          title: "seo",
          to: "blog-panel-podcast-id-seo",
        },
      },
      course: {
        1: {
          value: 1,
          title: "general_info",
          to: "academy-panel-course-id-general",
        },
        2: {
          value: 2,
          title: "supplementary_info",
          to: "academy-panel-course-id-supplementary",
        },
        3: {
          value: 3,
          title: "faq",
          to: "academy-panel-course-id-faq",
        },
        4: {
          value: 4,
          title: "chapters",
          to: "academy-panel-course-id-chapters",
        },
        5: {
          value: 5,
          title: "lesson_content",
          to: "academy-panel-course-id-lessonContent",
        },
      },
      product: {
        1: {
          value: 1,
          title: "general_info",
          to: "academy-panel-product-id-general",
        },
        2: {
          value: 2,
          title: "event_info",
          to: "academy-panel-product-id-eventinfo",
        },
        3: {
          value: 3,
          title: "supplementary_info",
          to: "academy-panel-product-id-faq",
        },
        4: {
          value: 4,
          title: "chapters",
          to: "academy-panel-product-id-chapters",
        },
        5: {
          value: 5,
          title: "payment",
          to: "academy-panel-product-id-payment",
        },
      },
    },
    editForm: ref([]),
    selectedTableItems: ref([]),
    commentRejectForm: ref({}),
    pagination: ref({}),
    listingDialog: ref(false),
    dialog: ref(false),
    edit: ref(false),
    currentItem: ref({}),
    reject: ref(false),
    editorCategories: [],
    editorAuthorOptions: [],
    editorTags: [],
    listInfo: reactive({}),
    listingFilters: reactive([]),
    listItems: reactive({}),
    sortBy: ref([]),
    sendingRequest: false,
    additionalOperation: ref(false),
  }),
  actions: {
    setStep(step) {
      this.step = step;
    },
    editListing(
      action,
      editForm,
      additionalForm = null,
      api = null,
      listingApi = null,
      hasDialog = null,
      listingPayload = null,
      repo = "panel"
    ) {
      if (hasDialog) {
        this.dialog = true;
        if (action === "edit") {
          this.edit = true;
          this.initForm(editForm);
        } else if (action !== "edit" && hasDialog) {
          this.additionalOperation = true;
          this.initForm(additionalForm);
        }
      } else {
        if (action === "deleted") {
          let payload = { action: action, id: [this.currentItem.id] };
          this.changeItemStatus(payload, api, listingApi, listingPayload, repo);
        }
      }
    },
    changeItemStatus(e, api, listingApi, listingPayload, repo = "panel") {
      console.log("-=-=-==-==-=-=-==-=", e, listingPayload);
      let payload = {
        body: { status: e.action || e, ids: e.id, progress: e.action },
        type: listingPayload?.type || "",
      };
      this.$repos[repo][api](payload).then(() => {
        return this.getListingItems(listingApi, listingPayload, repo);
      });
    },
    async getListingCommon(api, repo = "panel", payload = null) {
      this.listInfo = reactive({});
      await this.$repos[repo][api](payload).then((res) => {
        Object.assign(this.listInfo, res);
      });
    },
    async getListingItems(api, payload, repo = "panel") {
      await this.$repos[repo][api](payload).then((res) => {
        this.listItems = {};
        Object.assign(this.listItems, { ...res });
      });
    },
    closeDialog() {
      this.sendingRequest = false;
      this.dialog = false;
      this.editForm = ref([]);
      this.commentRejectForm = ref([]);
      this.edit = false;
      this.reject = false;
    },
    statusColor(status) {
      if (status == "active") return "text-icon-hint-success";
      else if (status == "hidden") return "text-icon-high-emphasis";
      else if (status == "deleted") return "text-icon-hint-error";
      else if (status == "rejected") return "text-background-error";
      else if (status == "draft") return "text-icon-low-emphasis";
      else if (status == "published") return "text-icon-hint-success";
      else if (status == "approved") return "text-icon-hint-success";
      else if (status == "approved") return "text-icon-hint-success";
      else if (status == "not_started") return "icon-high-emphasis";
      else if (status == "in_progress") return "text-icon-secondary";
      else if (status == "done") return "text-icon-hint-success";
      else if (status == "mentor") return "icon-hint-caution";
      else if (status == "user") return "icon-secondary";
      else if (status == "waiting_for_approval")
        return "text-icon-hint-caution";
    },
    initForm(dataForm) {
      console.log("edit current item", this.currentItem);
      dataForm.forEach((element) => {
        element.modelValue =
          typeof element.modelValue == "string"
            ? ""
            : Array.isArray(element.modelValue)
            ? []
            : {};
      });
      if (this.edit == true || this.additionalOperation == true) {
      // for (let field in this.currentItem) {
      //   let findedField = dataForm.find((item) => {
      //     return item.name === field;
      //   });
      //   if (findedField) {
      //     findedField.modelValue = this.currentItem[field];
      //   }
      // }

      const handler = new APIHandler();
      dataForm.forEach((field) => {
        if (field.dataPath) {
          const current = handler.getDeepData(this.currentItem, field.dataPath);
          if (current && current[field.name])
            field.modelValue = current[field.name];
          else if (typeof field.modelValue == "string") field.modelValue = "";
          else if (Array.isArray(field.modelValue)) field.modelValue = [];
          else field.modelValue = {};
        } else {
          if (this.currentItem[field.name])
            field.modelValue = this.currentItem[field.name];
          else if (typeof field.modelValue == "string") field.modelValue = "";
          else if (Array.isArray(field.modelValue)) field.modelValue = [];
          else field.modelValue = {};
        }
      });
      }
      this.editForm.push(...dataForm);
    },
    slugGenerator(str) {
      return str.replace(/\s+/g, "-");
    },
    downloadExcel(api, repo, payload) {
      this.$repos[repo][api](payload).then((res) => {
        console.log("Doooownnlloaaddd", res);
      });
    },
  },

  persist: {
    // storage:  persistedState.sessionStorage,
    paths: ["courseContent"],
  },
});
