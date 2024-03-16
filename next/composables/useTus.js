// composables/useTus.js
import { ref } from "vue";
import { Upload } from "tus-js-client"; // Use named import instead of default

export const useTus = () => {
  const uploadProgress = ref(0);

  const createUploader = (file, options) => {
    let upload;
    const defaultOptions = {
      endpoint:
        "https://napi.arvancloud.ir/vod/2.0/channels/0b9bc134-caf3-4887-98eb-4b370c1f381b/files", // Replace with your tus server endpoint
      // your default options
      onError: (error) => {
        console.error("Upload failed:", error);
      },
      onProgress: (bytesUploaded, bytesTotal) => {
        uploadProgress.value = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
      },

      headers: {
        Authorization: "apikey 2787bcfc-a31d-50b6-87d4-4323985d8914",
        // "tus-resumable": "1.0.0",
      },
    };
    const uploadOptions = { ...defaultOptions, ...options };
    return new Upload(file, uploadOptions);
  };

  return { uploadProgress, createUploader };
};
