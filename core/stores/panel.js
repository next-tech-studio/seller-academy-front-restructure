export const usePanelStore = defineStore("panel", {
  state: () => ({
    step: ref(1),
    steps: {
      article: {
        1: {
          value: 1,
          title: "draft",
          to: "panel-post-id-draft",
        },
        2: {
          value: 2,
          title: "content",
          to: "panel-post-id-content",
        },
        3: {
          value: 3,
          title: "seo",
          to: "panel-post-id-seo",
        },
      },
      podcast: {
        1: {
          value: 1,
          title: "draft",
          to: "panel-podcast-id-draft",
        },
        2: {
          value: 2,
          title: "content",
          to: "panel-podcast-id-content",
        },
        3: {
          value: 3,
          title: "seo",
          to: "panel-podcast-id-seo",
        },
      },
    },
    selectedTableItems: ref([]),
    editForm: ref([]),
    commentRejectForm: ref({}),
    dialog: ref(false),
    edit: ref(false),
    currentItem: ref({}),
    reject: ref(false),
    postSavedState: ref(true),
    postRouteId: ref(0),
    // localePath: useLocalePath(),
    draftContent: {
      title: "",
      summary: "",
      category: "",
      author: { slug: {} },
      bannerUrl: ref({}),
      bannerUrlMobile: ref({}),
      content: [],
      information: [],
    },
    editorCategories: [],
    editorAuthorOptions: [],
    editorTags: [],
    listInfo: reactive({}),
    listItems: reactive({}),
    headers: ref([]),
    // type: useRoute().name.includes('podcast') ? 'podcast' : 'article'
  }),
  actions: {
    type() {
      const route = useRoute();
      return route.name.includes("podcast") ? "podcast" : "article";
    },
    setStep(step) {
      this.$repos.panel.sa;
      this.step = step;
    },
    editListing(
      action,
      editForm,
      rejectForm = null,
      api = null,
      listingApi = null,
      hasDialog = null,
      listingPayload = null,
      repo = "panel"
    ) {
      console.log("action", action);
      if (hasDialog) {
        this.dialog = true;
        if (action === "edit") {
          this.edit = true;
          this.initForm(editForm);
        } else if (action === "rejected") {
          this.reject = true;
          this.initForm(rejectForm);
        }
      } else {
        if (action === "deleted") {
          let payload = { action: action, id: [this.currentItem.id] };
          this.changeItemStatus(payload, api, listingApi, listingPayload, repo);
        }
      }
    },
    changeItemStatus(e, api, listingApi, listingPayload) {
      let payload = { body: { status: e.action, ids: e.id } };
      this.$repos.panel[api](payload).then(() =>
        this.getListingItems(listingApi, listingPayload)
      );
    },
    async getListingCommon(api, repo = "panel") {
      this.listInfo = reactive({});
      await this.$repos[repo][api]().then((res) => {
        Object.assign(this.listInfo, res);
      });
    },
    async getListingItems(api, payload, headers) {
      await this.$repos.panel[api](payload).then((res) => {
        this.listItems = {};
        Object.assign(this.listItems, { ...res });
      });
    },
    closeDialog() {
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
      else if (status == "waiting_for_approval")
        return "text-icon-hint-caution";
    },
    publishArticle() {
      let localePath = useLocalePath();
      let payload = {
        body: { ids: [this.postRouteId], status: "published" },
        type: this.type(),
      };
      this.$repos.panel.updateArticleStatus(payload).then((res) => {
        navigateTo(
          localePath({
            path: `/blog/panel/listings/${
              this.type() == "podcast" ? "podcasts" : "posts"
            }`,
          }),
          { external: true }
        );
      });
    },
    initForm(dataForm) {
      dataForm.forEach((element) => {
        element.modelValue = ref("");
      });
      if (this.edit == true || this.reject == true) {
        for (let field in this.currentItem) {
          let findedField = dataForm.find((item) => {
            return item.name === field;
          });
          if (findedField) {
            findedField.modelValue = this.currentItem[field];
          }
        }
      }
      console.log(this.editForm, this.dialog);
      this.editForm.push(...dataForm);
    },
    async validation(
      currentState,
      next = false,
      callBackFunction,
      back = false,
      preview = false,
      publish = false,
      form = null
    ) {
      if (form) {
        const { valid } = await form.validate();
        if (valid)
          this.saveDraft(
            currentState,
            next,
            callBackFunction,
            back,
            preview,
            publish
          );
      } else {
        this.saveDraft(
          currentState,
          next,
          callBackFunction,
          back,
          preview,
          publish
        );
      }
    },
    saveDraft(
      currentState,
      next = false,
      callBackFunction,
      back = false,
      preview = false,
      publish = false
    ) {
      let localePath = useLocalePath();
      let date = new Date();
      let finalContent = ref({});
      let contentObject = ref({});
      let sectionsArray = ref([]);
      let bannerUrl = "";
      let bannerUrlMobile = "";
      if (!this.postSavedState) {
        if (typeof this.draftContent?.bannerUrl === "object")
          bannerUrl = this.draftContent?.bannerUrl.url;
        if (typeof this.draftContent?.bannerUrlMobile === "object")
          bannerUrlMobile = this.draftContent?.bannerUrlMobile.url;
        this.draftContent?.content?.forEach((section) => {
          // section.content;
          contentObject = {
            type: section.type,
            content: section.content,
          };
          sectionsArray.value.push(contentObject);
        });
        finalContent = {
          type: this.type(),
          body: {
            id: this.postRouteId || 0,
            title: this.draftContent.title,
            summary: this.draftContent.summary,
            bannerUrl: bannerUrl,
            bannerUrlMobile: bannerUrlMobile,
            category: this.draftContent.category,
            author: this.draftContent.author.slug,
            content: sectionsArray.value,
            seoTitle: this.draftContent.seoTitle,
            seoKeyword: this.draftContent.seoKeyword,
            seoDescription: this.draftContent.seoDescription,
            tags: this.draftContent.tags,
            slug: this.draftContent.slug,
            information: this.draftContent.information,
            publicationDate:
              date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate(),
          },
        };
        this.$repos.panel.saveDraft(finalContent).then((res) => {
          console.log("save draft", res);
          this.postSavedState = true;
          if (next) {
            callBackFunction(true, res.id);
          } else if (back) {
            callBackFunction(false, res.id);
          } else if (preview) {
            navigateTo(
              localePath({
                path: `/article/preview/${res.id}`,
              })
            );
          } else if (!this.postRouteId) {
            navigateTo(
              localePath({
                path: `/blog/panel/${
                  this.type() == "podcast" ? "podcast" : "post"
                }/${res.id}/${currentState}`,
              }),
              { external: true }
            );
          }
        });
      } else if (next) {
        callBackFunction(true, this.postRouteId);
      } else if (back) {
        callBackFunction(false, this.postRouteId);
      } else if (preview) {
        navigateTo(
          localePath({
            path: `/article/preview/${this.postRouteId}`,
          })
        );
      } else if (publish) {
        this.publishArticle();
      }
    },
    getEditorPanelCommon() {
      this.$repos.panel.editorCommon({ type: this.type() }).then((res) => {
        Object.assign(this.editorCategories, res.categories);
        Object.assign(this.editorAuthorOptions, res.authorOptions);
        Object.assign(this.editorTags, res.tags);
        if (!this.postRouteId)
          Object.assign(this.draftContent.author, res.authorOptions[0]);
      });
    },
    getDraftInfo() {
      let payload = { id: this.postRouteId, type: this.type() };
      return this.$repos.panel.articleData(payload).then((res) => {
        Object.assign(this.draftContent, res);
        if (this.draftContent.bannerUrl != null)
          this.draftContent.bannerUrl = { url: this.draftContent.bannerUrl };
        else this.draftContent.bannerUrl = ref({});
        if (this.draftContent.bannerUrlMobile != null)
          this.draftContent.bannerUrlMobile = {
            url: this.draftContent.bannerUrlMobile,
          };
        else this.draftContent.bannerUrlMobile = ref({});
        nextTick(() => {
          if (res.id) {
            this.postSavedState = true;
          }
        });
      });
    },
  },
});
