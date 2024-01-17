import { useAuthStore } from "@core/stores/auth";
export const useLastMessageRealTime = (items) => {
  const authStore = useAuthStore();
  let chatSidebarRealTime = useRealtime(
    `user.${authStore.user.id}`,
    "RecentChatsSidebar",
    {}
  );
  onMounted(() => {
    let chatSidebarListen = chatSidebarRealTime.listen;
    chatSidebarListen();
  });
  watch(
    chatSidebarRealTime.response,
    (newChatSidebarRealTime) => {
      Object.assign(items.value, newChatSidebarRealTime.recentChatsSidebar);
    },
    { deep: true }
  );
  return items.value;
};
