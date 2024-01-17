<template>
  <v-card class="rounded-lg">
    <v-card-text class="d-flex justify-space-between align-center">
      <div class="text-text-heading text-h2">{{ $t("user_comments") }}</div>
      <div>
        <v-btn
          size="small"
          color="primary-base"
          variant="flat"
          icon="custom:chevronRight"
          class="rounded-xl ml-2"
          @click="() => parent.scrollTo('prev')"
        ></v-btn>
        <v-btn
          size="small"
          color="primary-base"
          variant="flat"
          icon="custom:chevronLeft"
          class="rounded-xl"
          @click="() => parent.scrollTo('next')"
        ></v-btn>
      </div>
    </v-card-text>
    <v-card-text>
      <v-slide-group
        id="course_slider"
        ref="parent"
        class="hide-slider-control"
      >
        <v-slide-group-item
          v-for="(comment, index) in item.comments"
          :key="index"
          :value="comment.id"
        >
          <div>
            <v-card
              variant="outlined"
              color="n200"
              :width="lgAndUp ? 341 : 296"
              height="100%"
              class="ml-4 rounded-lg ms-1"
            >
              <v-list>
                <v-list-item
                  :prepend-avatar="comment.user.avatarUrl"
                  :title="comment.user.name"
                  :subtitle="comment.creationDate"
                ></v-list-item>
              </v-list>
              <v-card-text>
                <div class="text-text-low-emphasis text-body-2">{{ comment.text }}</div>
              </v-card-text>
            </v-card>
          </div>
        </v-slide-group-item>
      </v-slide-group>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { useDisplay } from 'vuetify';

const {lgAndUp} = useDisplay()
const props = defineProps({
  item: Object,
});

const parent = ref(null);
</script>
