<template>
  <div style="height: 100vh">
    <NuxtLayout name="no-footer">
      <not-logged-in-room-preview
        v-model="common"
        :btn-title="
          !isAMemberOfRoom
            ? 'become_a_member'
            : !authStore.user.loggedIn
            ? 'seller_login_signup'
            : ''
        "
        :info-text="
          !isAMemberOfRoom
            ? 'you_have_to_become_a_member'
            : !authStore.user.loggedIn
            ? 'see_room_seller'
            : ''
        "
        @continue="goTosellerPanel"
        v-if="!authStore.user.loggedIn || !isAMemberOfRoom"
      ></not-logged-in-room-preview>
      <div
        class="bg-background-dark h-100"
        :class="!authStore.user.loggedIn || !isAMemberOfRoom ? 'blur' : ''"
      >
        <v-container class="h-100 pb-0" :class="{ 'pa-0': smAndDown }">
          <v-card class="rounded-md h-100 rounded-b-0 pt-16" id="parent">
            <rooms-list-preview
              v-model="showRoomsList"
              :rail="rail"
              :title="
                authStore.user.loggedIn && authUser?.user?.seller
                  ? `${$t('your_rooms')} (${userChatRoomsCount})`
                  : `${$t('your_rooms')}`
              "
              :items="sidebar"
              :show-alternative="!authUser?.user?.seller"
              @to:item="toRoom"
              @to:rooms="toRooms"
            />
            <div>
              <room-preview
                v-model="common"
                @update:roomDesc="editDescription"
                @update:members="addMember"
                :users="users"
                @search:users="onSearch"
                @back="back"
              >
                <template #members>
                  <room-members-list
                    @infinite="chatMembers"
                    @remove="removeMember($event)"
                    @close="dialog = false"
                    :items="members"
                    :title="`اعضا (${common.membersCount})`"
                    id="height"
                  />
                </template>
              </room-preview>
              <Chat
                :style="
                  !smAndDown
                    ? 'width: calc(100% - 264px); position: absolute; left: 0;'
                    : ''
                "
                @react="react"
                @send="send($event)"
                @remove="remove($event)"
                :items="chat"
                @infinite="getChatData"
              />
            </div>
          </v-card>
        </v-container>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
import chatModel from "@core/mappers/models/schema/chat";
import { useAuthStore } from "@core/stores/auth";
import { useDisplay } from "vuetify";
const { $repos } = useNuxtApp();
const { smAndDown, lgAndUp } = useDisplay();
const common = ref({});
const showRoomsList = ref(true);
const rail = ref(false);
let chat = ref([]);
let members = reactive([]);
let sidebar = ref([]);
let users = ref([]);
let page = reactive(1);
let total_pages = reactive();
let members_page = reactive(1);
let dialog = ref(false);
let loadFirstPage = ref(false);
let isAMemberOfRoom = ref(true);
let members_total_pages = reactive();
const route = useRoute();
const authStore = useAuthStore();
let breadcrumbItem = ref({
  category: route.query.category,
  slug: route.params.slug,
});
const localePath = useLocalePath();
let chatRealTime = useRealtime(`chat.${route.query.roomId}`, "NewChatMessage", {
  name: chatModel,
});
let deleteChatRealTime = useRealtime(
  `chat.${route.query.roomId}`,
  "DeleteChatMessage"
);
let reactRealTime = useRealtime(
  `chat.${route.query.roomId}`,
  "UpdateChatMessage"
);
let descriptionRealTime = useRealtime(
  `chat.${route.query.roomId}`,
  "EditDescriptionChatroom"
);
let coverRealTime = useRealtime(`chat.${route.query.roomId}`, "CoverChatRoom");

let chatSidebarRealTime = useRealtime(
  `user.${authStore.user.id}`,
  "RecentChatsSidebar"
);
const editDescription = () => {
  let payload = {
    chatSlug: route.params.slug,
    body: { description: common.value.description },
    categorySlug: common.value.category.slug,
  };
  $repos.community.editDescription(payload);
};
const getUsers = async (e) => {
  console.log("ussseerss", e);
  let payload = { search: e };
  await $repos.community.getUsersList(payload).then((res) => {
    console.log("resssssssUssee", res);
    Object.assign(users.value, res.data);
  });
};
const onSearch = useDebounceFn(async (e) => await getUsers(e), 1000, {
  maxWait: 5000,
});
const removeMember = (e) => {
  let payload = {
    categorySlug: common.value.category.slug,
    chatSlug: route.params.slug,
    body: { memberId: e.id },
  };
  $repos.community.removeMember(payload).then(() => {
    loadFirstPage.value = true;
    chatMembers(e.state);
  });
};
onMounted(() => {
  let chatListen = chatRealTime.listen;
  let reactListen = reactRealTime.listen;
  let deleteListen = deleteChatRealTime.listen;
  let coverListen = coverRealTime.listen;
  let descriptionListen = descriptionRealTime.listen;
  let chatSidebarListen = chatSidebarRealTime.listen;
  chatListen();
  reactListen();
  deleteListen();
  coverListen();
  descriptionListen();
  chatSidebarListen();
});
const goTosellerPanel = () => {
  window.open(useRuntimeConfig().public.sellerPanelLoginUrl);
};
const getChatCommon = () => {
  $repos.community
    .chatCommon({
      categorySlug: route.query.category,
      chatSlug: route.params.slug,
    })
    .then((res) => {
      Object.assign(common.value, {
        ...common.value,
        ...res,
      });
      Object.assign(breadcrumbItem.value, { name: res.name });
    });
};

function getChatData($state) {
  if (authStore.user.loggedIn) {
    $repos.community
      .chatData({
        categorySlug: route.query.category,
        chatSlug: route.params.slug,
        page,
      })
      .then((res) => {
        console.log(res);
        if (res.data.length) {
          Object.assign(chat.value, [...res.data.reverse(), ...chat.value]);
          isAMemberOfRoom.value = res.loginUserAllowToChat;
          total_pages = res.total;
          page++;
          $state.loaded();
        } else {
          $state.complete();
        }
        if (smAndDown.value) {
          rail.value = true;
          showRoomsList.value = false;
        }
      });
  }else{
    //fake chat
  }
}
const addMember = (e) => {
  let payload = { body: { memberId: e.id }, chatSlug: route.params.slug };
  $repos.community.addNewMember(payload).finally(() => (users.value = []));
};
const getChatSidebar = () => {
  $repos.community.recentChatSideBar().then((res) => {
    console.log("res", res);
    Object.assign(sidebar.value, res.rooms);
  });
};
const remove = (e) => {
  let index = chat.value.findIndex((message) => message.id == e.id);
  $repos.community.removeMessage(e).then((res) => {
    chat.value.splice(index, 1);
  });
};
const chatMembers = ($state) => {
  console.log("heeellooo", $state);
  if (loadFirstPage.value) {
    members_page = 1;
    members.splice(0, members.length);
  }
  members_page = loadFirstPage.value ? 1 : members_page;
  $repos.community
    .chatMembers({
      categorySlug: route.query.category,
      chatSlug: route.params.slug,
      page: members_page,
    })
    .then((res) => {
      if (res.data.length) {
        Object.assign(members, [...members, ...res.data]);
        members_total_pages = res.last_page;
        if (members_page == members_total_pages) $state.complete();
        members_page++;
        console.log("page", members_page);
        loadFirstPage.value = false;
      } else {
        $state.complete();
      }
    });
};
Promise.all([
  useAsyncData(() => getChatSidebar()),
  useAsyncData(() => getChatCommon()),
]);

const send = (e) => {
  $repos.community.sendMessage({
    categorySlug: route.query.category,
    chatSlug: route.params.slug,
    body: e,
  });
};
const toRoom = (item) => {
  navigateTo(
    localePath({
      name: "forum-room-slug",
      params: { slug: item?.slug },
      query: {
        category: item?.category,
        roomId: item?.id,
      },
    }),
    { external: true }
  );
};

const toRooms = (item) => {
  navigateTo(
    localePath({
      name: "forum-room-list",
    }),
    { external: true }
  );
};

const back = () => {
  rail.value = !rail.value;
  showRoomsList.value = !showRoomsList.value;
};

const react = (e) => {
  const index = chat.value.findIndex((x) => x.id == e.id);
  let reaction =
    chat.value[index].reactions.currentUserReaction != e.value
      ? e.value
      : "clear";
  $repos.community
    .reactToMessage({
      body: {
        chatMessageId: e.id,
        reaction: reaction,
      },
    })
    .then((res) => {
      Object.assign(chat.value[index].reactions.totalReactions, [
        ...res.totalReactions,
      ]);
      chat.value[index].reactions.currentUserReaction = res.currentUserReaction;
    });
};

watch(
  [
    chatRealTime.response,
    deleteChatRealTime.response,
    coverRealTime.response,
    descriptionRealTime.response,
    chatSidebarRealTime.response,
  ],
  ([
    newChatRealTime,
    newDeleteChatRealTime,
    newCoverRealTime,
    newDescriptionRealTime,
    newChatSidebarRealTime,
  ]) => {
    if (newDeleteChatRealTime) {
      let index = chat.value.findIndex(
        (item) => item.id === newDeleteChatRealTime.deleteMessage.id
      );
      chat.value.splice(index, 1);
    }
    if (newChatRealTime) {
      if (chat.value[chat.value.length - 1].id != newChatRealTime.id)
        Object.assign(chat.value, [...chat.value, { ...newChatRealTime }]);
    }
    if (newCoverRealTime) {
      Object.assign(common.value, { ...newCoverRealTime.chatRoom });
    }
    if (newDescriptionRealTime) {
      Object.assign(common.value, newDescriptionRealTime.chatRoom);
    }
    if (newChatSidebarRealTime) {
      // sidebar.value.splice(0, sidebar.value.length)
      Object.assign(sidebar.value, newChatSidebarRealTime.recentChatsSidebar);
    }
  },
  { deep: true }
);

watch(
  reactRealTime.response,
  (newReactRealTime, oldReactRealTime) => {
    const index = chat.value.findIndex(
      (message) => message.id == newReactRealTime.updateMessage.id
    );
    // clear user's own reaction
    if (oldReactRealTime) {
      const rectionIndex = chat.value[index].reactions.totalReactions.findIndex(
        (reaction) => (reaction.reaction = oldReactRealTime.reaction)
      );
      chat.value[index].reactions.currentUserReaction = null;
      chat.value[index].reactions?.totalReactions.splice(rectionIndex, 1);
    }
  },
  { deep: true }
);

definePageMeta({
  // middleware: ["auth"],
  layout: false,
});
</script>

<style lang="scss">
.pr-lg-64 {
  @include respond("lg") {
    padding-right: 264px;
  }
}
</style>
