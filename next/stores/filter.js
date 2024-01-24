export const useFilterStore = defineStore("filter", {
  state: () => ({
    filter: {
      category: [""],
      sort: ["recent"],
      tag: "",
    },
    buttonDefault:ref("")
  }),
  actions:{
    statusColor(status) {
      if (status == "active") return "text-icon-hint-success";
      else if (status == "hidden") return "text-icon-high-emphasis";
      else if (status == "deleted") return "text-icon-hint-error";
      else if (status == "rejected") return "text-icon-hint-error";
      else if (status == "draft") return "text-icon-low-emphasis";
      else if (status == "published") return "text-icon-hint-success";
      else if (status == "approved") return "text-icon-hint-success";
      else if (status == "waiting_for_approval")
        return "text-icon-hint-caution";
    },
  }
});
