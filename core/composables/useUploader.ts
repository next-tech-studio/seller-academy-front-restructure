import { useToastStore } from "@core/stores/toast";
interface upArguments {
  uploadedFiles: Array<Object> | Object;
  blogContent: Boolean;
  caption: String;
  max: number;
  returnUrl: boolean;
  uploadPath: string;
  emit: (arg0: string, arg1: number | never[] | {}) => void;
  uploader: HTMLDivElement;
  align?: string;
  multiple: Boolean;
  singleStep: Boolean;
}
export const useUploader = (uploaderArguments: upArguments) => {
  const toast = useToastStore();
  const { $repos } = useNuxtApp();
  let attachments = ref([]);
  let isSelecting = ref(false);
  let action = ref("");
  let selectedFiles = ref<Array<File>>([]);
  let chooseMultipleFile = ref(true);
  let fileIndex = ref(0);
  let attachmentIds = ref([]);
  let url = ref("");
  let userInputArray = ref<Object>([]);
  let countInput = ref<Number>(0);
  let sendingRequest = ref(false);
  const handleFileImport = (
    isMultiple: boolean,
    index = 0,
    selectedAction = ""
  ) => {
    chooseMultipleFile.value = isMultiple;
    fileIndex.value = index;
    action.value = selectedAction;
    isSelecting.value = true;
    window.addEventListener(
      "focus",
      () => {
        isSelecting.value = false;
      },
      { once: true }
    );
    uploaderArguments.uploader.click();
  };
  const onFileChanged = (e: {
    target: { files: any[] | Iterable<unknown> | ArrayLike<unknown> };
  }) => {
    userInputArray.value = Array.from(e.target.files);
    countInput.value = userInputArray.value.length;

    if (userInputArray?.value?.length === 0) return;
    if (userInputArray?.value?.length > uploaderArguments.max) {
      console.log("mmmasssxx", uploaderArguments.max, chooseMultipleFile.value);
      if (chooseMultipleFile.value)
        toast.show({ text: "validation.max_limit_images" }, "error");
      else if (e.target.files[0]) {
        selectedFiles.value.push(e.target.files[0]);
        submit(action.value);
      }
    } else {
      if (
        chooseMultipleFile.value &&
        uploaderArguments.uploadedFiles?.length === 0
      ) {
        action.value = "";

        //multiple image import
        selectedFiles.value = userInputArray.value;
        // setRemainderImage(selectedFiles?.value?.length);
        for (let item of selectedFiles?.value)
          item.url = URL.createObjectURL(item);
      }
      //choose multiple image after initialization
      else if (
        chooseMultipleFile.value &&
        uploaderArguments.uploadedFiles?.length !== 0
      ) {
        selectedFiles.value = [
          ...selectedFiles?.value,
          ...userInputArray?.value,
        ];
        action.value = "";

        // setRemainderImage(Array.from(e.target.files).length);
        for (let item of selectedFiles?.value)
          item.url = URL.createObjectURL(item);
      }
      //single image change
      else if (e.target.files[0]) {
        selectedFiles.value.push(e.target.files[0]);
      }
      submit(action.value);
    }
  };

  const onDeletePhoto = (index = 0) => {
    action.value = "delete";
    let response;
    if (uploaderArguments.blogContent) {
      response = {
        id: uploaderArguments.uploadedFiles?.id,
        url: null,
        caption: uploaderArguments.caption,
        align: uploaderArguments.align,
      };
      uploaderArguments.emit("update:modelValue", response);
    }
    if (uploaderArguments.multiple)
      uploaderArguments.uploadedFiles.splice(index, 1);
    else {
      console.log("uuuuuuuuuuuye");
      uploaderArguments.emit("update:modelValue", {});
    }

    setRemainderImage(1, action.value);
  };

  async function submit(action = "") {
    sendingRequest.value = true;
    let formData = new FormData();
    if (uploaderArguments.singleStep) {
      formData.append("file", selectedFiles?.value[0]);
    } else {
      for (let i = 0; i < selectedFiles.value.length; i++) {
        formData.append("files[" + i + "]", selectedFiles?.value[i]);
      }
    }
    console.log("HHWWWWWW", formData);
    await $repos.other
      .uploadFiles(
        {
          body: formData,
        },
        uploaderArguments.uploadPath,
        !uploaderArguments.singleStep
      )
      .then((res: []) => {
        sendingRequest.value = false;
        if (!uploaderArguments.singleStep)
          setRemainderImage(res.data.length, action);
        if (uploaderArguments.singleStep) {
          Object.assign(uploaderArguments.uploadedFiles, res);
          uploaderArguments.emit(
            "update:modelValue",
            uploaderArguments.uploadedFiles
          );
        } else if (action == "subs") {
          console.log("mymy1");
          Object.assign(
            uploaderArguments.uploadedFiles[fileIndex.value],
            ...res.data
          );
        } else if (!uploaderArguments.multiple) {
          console.log
          Object.assign(uploaderArguments.uploadedFiles, ...res.data);
          uploaderArguments.emit(
            "update:modelValue",
            res.data[0]
          );
        } else {
          Object.assign(uploaderArguments.uploadedFiles, [
            ...uploaderArguments.uploadedFiles,
            ...res.data,
          ]);
        }
        selectedFiles?.value.splice(0, selectedFiles?.value.length);
        userInputArray.value.splice(0, userInputArray?.value.length);
        if (uploaderArguments.blogContent) {
          Object.assign(uploaderArguments.uploadedFiles, {
            caption: uploaderArguments.caption,
            align: uploaderArguments.align,
          });
          uploaderArguments.emit(
            "update:modelValue",
            uploaderArguments.uploadedFiles
          );
        } else {
          uploaderArguments.emit(
            "update:modelValue",
            uploaderArguments.uploadedFiles
          );
        }
      })
      .catch(() => {
        sendingRequest.value = false;
        url = ref("");
        attachmentIds.value.splice(0, attachmentIds.value.length);
        selectedFiles?.value.splice(0, selectedFiles?.value.length);
        uploaderArguments.emit(
          "update:attachments",
          uploaderArguments.returnUrl ? {} : attachmentIds.value
        );
        uploaderArguments.emit(
          "update:modelValue",
          uploaderArguments.returnUrl ? {} : attachmentIds.value
        );
      });
  }
  watch(
    uploaderArguments.caption,
    () => {
      let response;
      response = {
        url: url.value,
        caption: uploaderArguments.caption,
        align: uploaderArguments.align,
      };
      uploaderArguments.emit("update:modelValue", [response]);
    },
    { deep: true }
  );

  const setRemainderImage = (chosenImagesLength: number, action: string) => {
    if (action == "delete") {
      if (uploaderArguments.multiple) {
        uploaderArguments.emit(
          "update:max",
          (uploaderArguments.max += chosenImagesLength)
        );
      }
      if (!uploaderArguments.multiple) {
        uploaderArguments.emit("update:max", (uploaderArguments.max += 1));
      }
    } else if (action === "subs") {
      return;
    } else {
      uploaderArguments.emit(
        "update:max",
        (uploaderArguments.max -= chosenImagesLength)
      );
    }
  };

  return {
    handleFileImport,
    onFileChanged,
    onDeletePhoto,
    fileIndex,
    // uploadedFiles,
    sendingRequest,
    chooseMultipleFile,
    attachments,
    isSelecting,
    countInput,
  };
};
