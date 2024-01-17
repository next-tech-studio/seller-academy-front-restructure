<template>
  <v-card ref="chat" class="pb-0" :class="smAndDown ? 'pt-6' : 'pt-3'">
    <app-infinite-loading
      @infinite="infinite"
      :items="categorisedItem"
      target=".top-results"
      id="parent"
      offset="148"
      :top="true"
    >
      <template v-slot:items="{ item }">
        <v-card-text
          class="text-center py-3"
        >
          <div class="date-divider" v-if="item.divider">
            <v-divider></v-divider>
            <v-chip class="justify-self-center" color="n200" variant="outlined">
              <span class="text-caption text-high-emphasis bg-white w-100">
                {{ item.dateTime }}
              </span>
            </v-chip>
          </div>
          <Message
            v-else
            @reply="reply"
            @react="$emit('react', $event)"
            @remove="$emit('remove', $event)"
            :item="item"
          ></Message>
        </v-card-text>
      </template>
    </app-infinite-loading>
    <chat-text-field
      v-model="message"
      :reply-to="replyedMessage"
      @submit="submit($event)"
    ></chat-text-field>
  </v-card>
</template>

<script setup>
import { useDisplay } from 'vuetify';

const emit = defineEmits(["send", "infinite"]);
const {smAndDown} = useDisplay()
const message = ref();
let replyedMessage = ref({});
const props = defineProps({
  items: Array,
});
const chat = ref(null);
const categorisedItem = computed(() => {
  let arr = [];
  const group = props.items.reduce((group, arr) => {
    const { dateTime } = arr;
    group[dateTime] = group[dateTime] ?? [];
    group[dateTime].push(arr);
    return group;
  }, {});

  Object.keys(group).forEach((dateTime) => {
    arr.push({ dateTime, divider: true });
    for (let item of group[dateTime]) arr.push(item);
  });
  return arr;
});
const submit = ($event) => {
  emit("send", $event);
  message.value = "";
};
const reply = ($event) => {
  replyedMessage.value = { ...$event };
};
const infinite = ($state) => {
  emit("infinite", $state);
};
</script>

<style lang="scss" scoped>
.date-divider {
  position: relative;
  .v-divider {
    position: absolute;
    top: 50%;
    width: 100%;
  }
  .v-chip {
    outline: white solid 32px;
    background-color: white;
  }
}
</style>

<!-- <style lang="scss">
#chat {
  .v-input__append,
  .v-input__prepend {
    margin: auto;
    padding-top: 0;
  }
}
</style>

<style lang="scss" scoped>
.chat-input-elevation {
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.08);
  border-top: 1px solid #e0e0e2;
}
</style> -->
