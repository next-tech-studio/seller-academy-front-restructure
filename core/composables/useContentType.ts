export const useContentType = (options = []) => {
  let contentTypes = ref([
    { icon: "custom:uploadPicture", title: "افزودن تصویر", type: "img" },
    { icon: "custom:video", title: "افزودن ویدیو", type: "vid" },
    { icon: "custom:audio", title: "افزودن فایل صوتی", type: "audio" },
    { icon: "custom:text", title: "افزودن متن", type: "html" },
    { icon: "custom:banner", title: "افزودن بنر", type: "banner" },
    { icon: "custom:divider", title: "افزودن جدا‌کننده", type: "divider" },
    { icon: "custom:column", title: "تقسیم ستون", type: "column" },
    { icon: "custom:question", title: "افزودن آزمونک(پرسش)", type: "exam" },
    { icon: "custom:article", title: "ارجاع دادن(مقاله)", type: "reference" },
  ]);
  let filteredContentTypes = contentTypes.value.filter((item) =>
    options.includes(item.type)
  );
  return options.length ? filteredContentTypes : contentTypes;
};
