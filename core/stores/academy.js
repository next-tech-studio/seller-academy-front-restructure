export const useAcademyStore = defineStore("academy", {
  state: () => ({
    step: ref(1),
    steps: {
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
    },
    content: {
      title: "",
      description: "",
      category: "",
      features: [],
      level: null,
      bannerUrl: ref({}),
      bannerUrlMobile: ref({}),
      supportItems: ref(["", ""]),
      learningPoints: ref([{ title: "", description: "" }]),
      faq: { type: "faq", content: { faq: [{ question: "", answers: "" }] } },
    },
    courseContent: {
      chaptersList: [],
    },
    keyFeatures: ref([]),
    levels: ref([]),
    instructors: ref([]),
    categories: ref([]),
    skills: ref([]),
    postSavedState: ref(true),
    postRouteId: ref(0),
    quizTrueAnswers: ref([]),
    editForm: ref([]),
    selectedTableItems: ref([]),
    commentRejectForm: ref({}),
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
    headers: ref([]),
    formIsValid: false,
  }),
  actions: {
    type() {
      const route = useRoute();
      return route.name.includes("product") ? "product" : "course";
    },
    setStep(step) {
      this.step = step;
    },
    getCourseCreationCommon() {
      this.$repos.academyPanel.getCourseCreationCommon().then((res) => {
        Object.assign(this.categories, res.category);
        Object.assign(this.skills, res.skills);
        Object.assign(this.instructors, res.instructor);
        Object.assign(this.keyFeatures, res.features);
        Object.assign(this.levels, res.level);
      });
    },
    addNewSupportItem() {
      this.content.supportItems.push("");
    },
    addNewFaq() {
      this.content.faq.content.faq.push({ question: "", answers: "" });
    },
    addNewLearningPoint() {
      this.content.learningPoints.push({ title: "", description: "" });
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
        console.log(this.edit, this.reject);
      } else {
        if (action === "deleted") {
          let payload = { action: action, id: [this.currentItem.id] };
          this.changeItemStatus(payload, api, listingApi, listingPayload, repo);
        }
      }
    },
    changeItemStatus(e, api, listingApi, listingPayload, repo = "panel") {
      let payload = { body: { status: e.action, ids: e.id } };
      this.$repos[repo][api](payload).then(() =>
        this.getListingItems(listingApi, listingPayload, null, repo)
      );
    },
    async getListingCommon(api, repo = "panel") {
      this.listInfo = reactive({});
      await this.$repos[repo][api]().then((res) => {
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
      else if (status == "rejected") return "text-icon-hint-caution";
      else if (status == "draft") return "text-icon-low-emphasis";
      else if (status == "published") return "text-icon-hint-success";
      else if (status == "approved") return "text-icon-hint-success";
      else if (status == "waiting_for_approval")
        return "text-icon-hint-caution";
    },
    publishCourse() {
      let localePath = useLocalePath();
      let payload = { body: { ids: [this.postRouteId], status: "published" } };
      this.$repos.academyPanel.updateCourseStatus(payload).then((res) => {
        navigateTo(
          localePath({
            path: `/academy/panel/listings/courses`,
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
      let finalContent = ref({});
      let bannerUrl = "";
      if (!this.postSavedState) {
        if (typeof this.content?.bannerUrl === "object")
          bannerUrl = this.content?.bannerUrl.url;
        finalContent = {
          body: {
            id: this.postRouteId || 0,
            title: this.content.title,
            slug: this.content.slug,
            description: this.content.description,
            bannerUrl: bannerUrl,
            supportItems: this.content.supportItems.filter(
              (str) => str !== null && str !== ""
            ),
            categoryId: this.content.category.id || this.content.category,
            instructor: this.content.instructor,
            faq: this.content.faq,
            level: this.content.level,
            learningPoints: this.content.learningPoints,
            skillsId: this.content.skills,
            features: this.content.features,
          },
        };
        this.$repos.academyPanel.createCourse(finalContent).then((res) => {
          this.postSavedState = true;
          if (next) {
            callBackFunction(true, res.id);
          } else if (back) {
            callBackFunction(false, res.id);
          } else if (preview) {
            localePath(
              localePath({
                name: "academy-courses-slug",
                params: { slug: res.id },
                query: {
                  preview: true,
                },
                // path: `/academy/courses/${this.content.slug}`,
              })
            );
          } else if (!this.postRouteId) {
            navigateTo(
              localePath({
                path: `/academy/panel/course/${res.id}/${currentState}`,
              }),
              { external: true }
            );
          }else if (publish) {
            this.publishCourse();
          }
        });
      } else if (next) {
        callBackFunction(true, this.postRouteId);
      } else if (back) {
        callBackFunction(false, this.postRouteId);
      } else if (preview) {
        navigateTo(
          localePath({
            name: "academy-courses-slug",
            params: { slug: this.postRouteId },
            query: {
              preview: true,
            },
            // path: `/academy/courses/${this.postRouteId}?preview=true`,
          })
        );
      } else if (publish) {
        this.publishCourse();
      }
    },
    saveLesson(callBackFunction, chapterIndex, lessonIndex) {
      let finalContent = ref({});
      let contentObject = ref({});
      let sectionsArray = ref([]);
      if (!this.postSavedState) {
        this.courseContent.chaptersList[chapterIndex]?.lessons[
          lessonIndex
        ].content.forEach((section) => {
          // section.content;
          contentObject = {
            type: section.type,
            content: section.content,
          };
          sectionsArray.value.push(contentObject);
        });
        let currentLesson =
          this.courseContent.chaptersList[chapterIndex]?.lessons[lessonIndex];
        finalContent = {
          body: {
            id: currentLesson?.id || 0,
            chapterId: currentLesson.chapterId || currentLesson.chapter.id,
            content: sectionsArray.value,
            title: currentLesson.title,
            dominantType: currentLesson.dominantType,
            trueAnswers: this.quizTrueAnswers,
          },
        };

        this.$repos.academyPanel.editCreateLesson(finalContent).then((res) => {
          callBackFunction(false, this.postRouteId);
        });
      }
    },
    getDraftInfo(callBackFunction) {
      let payload = { id: this.postRouteId };
      this.$repos.academyPanel.getCreatedCourse(payload).then((res) => {
        Object.assign(this.content, res);
        if (res.learningPoints?.length < 1) {
          for (let i = 0; i < 1; i++)
            this.content.learningPoints.push({
              title: "",
              description: "",
            });
        }
        if (res.supportItems?.length < 1) {
          for (let i = 0; i < 2; i++) this.content.supportItems.push("");
        }
        if (!res.faq?.hasOwnProperty("type")) {
          for (let i = 0; i < 1; i++) {
            Object.assign(this.content.faq, {
              type: "faq",
              content: { faq: [{ question: "", answers: "" }] },
            });
          }
        }
        if (this.content.bannerUrl != null)
          this.content.bannerUrl = { url: this.content.bannerUrl };
        else this.content.bannerUrl = ref({});
        nextTick(() => {
          if (res.id) {
            this.postSavedState = true;
          }
        });
      });
    },
    getChaptersList(chapterIndex = null, currentLessonIndex = null) {
      let payload = { courseId: this.postRouteId };
      this.$repos.academyPanel.getChaptersList(payload).then((res) => {
        this.courseContent.chaptersList = [...res.data];
        if (chapterIndex) {
          this.courseContent.chaptersList[chapterIndex]?.lessons.push({
            content: [],
            title: "",
            chapterId: this.courseContent.chaptersList[chapterIndex].id,
          });
          let currentLesson =
            this.courseContent.chaptersList[chapterIndex]?.lessons[
              currentLessonIndex
            ];
          if (currentLesson.content.some((item) => item.type == "exam")) {
            this.quizTrueAnswers = currentLesson.trueAnswers;
          }
          let references = currentLesson.content.filter(
            (item) => item.type == "reference"
          );
          if (references) {
            for (let reference of references) {
              this.$repos.other
                .groupSearch({ ids: reference.content })
                .then((res) => {
                  reference["references"] = res;
                });
            }
          }
        }
      });
    },
  },
});
