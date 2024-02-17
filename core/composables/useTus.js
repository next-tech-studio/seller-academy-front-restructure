// composables/useTus.js
import { ref } from "vue";
import { Upload } from "tus-js-client"; // Use named import instead of default

export const useTus = () => {
  const uploadProgress = ref(0);

  const createUploader = (file, options, endpoint) => {
    const defaultOptions = {
      endpoint:endpoint, // Replace with your tus server endpoint
      // your default options
      onError: (error) => {
        console.error("Upload failed:", error);
      },
      onProgress: (bytesUploaded, bytesTotal) => {
        uploadProgress.value = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
      },
      onSuccess: () => {
        console.log("Upload finished:", Upload.url);
      },
    };
    const uploadOptions = { ...defaultOptions, ...options };
    console.log("8383838383838383", file, uploadOptions);
    return new Upload(file, uploadOptions);
  };

  return { uploadProgress, createUploader };
};
