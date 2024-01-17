<template>
  <p class="text-body-2 font-weight-bold">{{$t('similar_questions') }}</p>
  <template v-for="(item, index) in items" :key="index">
    <app-profile-list-item
      avatar-size="48px"
      :item="item"
      :hover="false"
      :subtitle-key="subtitle"
      @click="$emit('to:item', item)"
      :class="{ blur: blur }"
      :disabled="blur"
    >
      <template #prepend><span></span></template>
      <template #title>
        <span class="text-body-2 text-text-heading">{{ item.text }}</span>
      </template>
      <template #subtitle>
        <app-avatar-group :members="item.answersUsers" size="20px" />
        <span v-if="item.answersUsers.length<1" class="text-text-disabled text-body-2">{{ $t('without_answer') }}</span>
      </template>
      <template #append>
        <app-feedback :colored-icons="true" :hide-text="true" :disabled="true"  :item="item"></app-feedback>
      </template>
      <v-divider></v-divider>
    </app-profile-list-item>
    <v-divider
      class="my-1"
      color="text-low-emphasis"
      v-if="items.length != index + 1"
    />
  </template>
</template>
<script setup>
defineProps({
  items: Array,
});
</script>
