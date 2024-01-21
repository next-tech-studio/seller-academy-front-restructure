export const useContentType = () => {
  return ref([
    { icon: "custom:uploadPicture", title: "افزودن تصویر", type: "img" },
    { icon: "custom:video", title: "افزودن ویدیو", type: "vid" },
    { icon: "custom:text", title: "افزودن متن", type: "html" },
    { icon: "custom:banner", title: "افزودن بنر", type: "banner" },
    { icon: "custom:divider", title: "افزودن جدا‌کننده", type: "divider" },
    { icon: "custom:column", title: "تقسیم ستون", type: "column" },
  ]);
};
