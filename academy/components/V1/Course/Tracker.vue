<template>
  <v-card :width="lgAndUp ? 296 : '100%'" id="tracker" class="rounded-lg mb-4">
    <v-card-text class="text-center pb-0">
      <v-avatar size="80" class="bordered">
        <v-icon size="40" icon="custom:digikala"></v-icon>
      </v-avatar>
      <div class="mb-6 mt-2 text-h5 text-text-heading">
        {{ item?.sidebar?.courseTitle }}
      </div>
    </v-card-text>
    <v-card-text class="py-0">
      <v-divider></v-divider>
    </v-card-text>
    <v-card-text class="pt-0 px-0">
      <v-list v-model:opened="open" open-strategy="single">
        <template v-for="(item, index) in items" :key="item.id">
          <v-list-group
            :value="item.title"
            :subgroup="false"
            height="38px"
            active-class="right-border"
          >
            <template v-slot:activator="{ props, isOpen }">
              <v-list-item
                v-bind="props"
                :prepend-icon="
                  !item?.chapters?.length
                    ? ''
                    : isOpen
                    ? 'custom:chevronTop'
                    : 'custom:chevronDown'
                "
                :title="item.title"
                :active-class="index != 0 && isOpen ? 'right-border' : ''"
                tag="NuxtLink"
                @click="toItem(item)"
              ></v-list-item>
            </template>

            <v-list-group
              v-for="subItem in item?.chapters"
              :key="subItem.id"
              :value="subItem.title"
            >
              <template v-slot:activator="{ props, isOpen }">
                <v-list-item
                  v-bind="props"
                  :title="subItem.title"
                  prepend-icon="custom:circleCheckSolid"
                  :append-icon="
                    isOpen ? 'custom:chevronTop' : 'custom:chevronDown'
                  "
                  tag="NuxtLink"
                  :class="{ 'right-border': isOpen }"
                  :active-class="isOpen ? 'right-border' : ''"
                  @click="toItem(subItem)"
                ></v-list-item>
              </template>

              <v-card-text class="py-0">
                <v-list-item
                  v-for="(lesson, i) in subItem?.lessons"
                  :key="i"
                  :prepend-icon="lesson.icon"
                  :value="lesson.title"
                  class="bg-background-dark text-text-low-emphasis text-caption font-weight-bold"
                  active-class="text-text-hint-success" 
                  :ripple="false"
                  :class="{
                    'rounded-t-lg': i == 0,
                    'rounded-b-lg': i == subItem.lessons.length - 1,
                  }"
                  :to="lesson.url"
                  tag="NuxtLink"
                  exact
                >
                  <span>
                    {{ lesson.title }}
                  </span>
                </v-list-item>
              </v-card-text>
            </v-list-group>
          </v-list-group>
        </template>
      </v-list>
    </v-card-text>
  </v-card>
  <v-card :width="lgAndUp ? 296 : '100%'" class="rounded-lg">
    <v-card-text class="d-flex justify-space-between align-center">
      <span>{{ $t("course_completion_rate") }}</span>
      <v-progress-circular
        size="51"
        :model-value="item?.sidebar?.courseProgress"
        color="icon-hint-success"
        bg-color="n100"
      >
        {{ item?.sidebar?.courseProgress }}%
      </v-progress-circular>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { useDisplay } from 'vuetify';

const {lgAndUp} = useDisplay()
const props = defineProps({
  item: Object,
  items: Array,
});
let open = ref(["syllabus"]);
const localePath = useLocalePath();
const toItem = (item) => {
  if (item.url) navigateTo(localePath(item.url));
};
</script>

<style lang="scss" scoped>
.bordered {
  border: 1px solid rgb(var(--v-theme-n200));
}
</style>

<style lang="scss">
.bordered {
  border: 1px solid rgb(var(--v-theme-n200));
}
#tracker {
  .v-list-group__items .v-list-item {
    -webkit-padding-start: 16px !important;
    padding-inline-start: 16px !important;
  }
  .v-list-item__prepend > .v-icon {
    -webkit-margin-end: 8px !important;
    margin-inline-end: 8px !important;
  }
}

.right-border:before,
.router-link-active:before {
  content: "";
  background: red;
  position: absolute;
  width: 4px;
  height: 38px;
  border-radius: 4px 0 0 4px;
}

#tracker .v-list-item__spacer {
  width: 8px;
}
</style>
