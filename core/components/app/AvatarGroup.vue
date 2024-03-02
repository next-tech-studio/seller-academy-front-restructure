<template>
  <div style="width: fit-content">
    <v-avatar
      :style="balanceAvatar(index)"
      v-for="(member, index) in maxMemberCount"
      :key="index"
      class="bordered"
      :size="size"
      :class="{'ms-n1': index != 0}"
    >
      <v-img :src="member.avatarUrl" :alt="member.displayName" cover></v-img>
    </v-avatar>
    <v-avatar
      v-if="showRemainingAvatars && members.length > maxAvatarCount"
      :size="size"
      :style="balanceAvatar(maxAvatarCount)"
      class="ms-n1 bordered"
    >
      <v-img
        :src="members[maxAvatarCount]?.avatarUrl"
        :alt="members[maxAvatarCount]?.displayName"
        class="align-center"
        gradient="to bottom, rgba(0, 0, 0,.5), rgba(0, 0, 0,.5)"
      >
        <span class="text-text-light text-caption" v-if="members.length - maxAvatarCount > 0"
          >{{ (membersCount || members.length) - maxAvatarCount }}+</span
        >
      </v-img>
    </v-avatar>
  </div>
</template>
<script setup>
const props = defineProps({
  members: {
    default: () => [],
    type: Array,
  },
  size: {
    type: String,
  },
  maxAvatarCount: {
    default: 4,
    type: Number,
  },
  showRemainingAvatars: {
    type: Boolean,
    default: false,
  },
  membersCount:Number
});


const balanceAvatar = (index) => {
  return {
    "z-index": -index + 10,
  };
};

const maxMemberCount = computed(() => {
  return props.members.slice(0, props.maxAvatarCount);
});
</script>
<style lang="scss" scoped>
.bordered {
  border: 1px solid rgb(var(--v-theme-n100));
}
</style>
