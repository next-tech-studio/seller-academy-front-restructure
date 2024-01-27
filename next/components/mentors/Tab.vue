<template>
  <v-tabs
    v-model="currentCategory"
    slider-color="primary-base"
    color="primary-base"
    align-tabs="center"
    class="mb-6"
  >
    <v-tab
      v-for="(category, propertyName) in categories"
      :key="propertyName"
      :value="propertyName"
      >{{ category.category.title }}</v-tab
    >
  </v-tabs>
  <v-window v-model="currentCategory">
    <v-window-item
      v-for="category in categories"
      :key="category"
      :value="category"
    >
      <v-container fluid>
        <v-row>
          <v-col
            v-for="(mentor, i) in category.mentors"
            :key="i"
            cols="6"
            lg="2"
            class="pa-2"
          >
            <about-us-member-card
              hide-email
              :item="mentor"
            >
              <template #footer>
                <div class="d-flex justify-space-between">
                  <div>
                    <v-btn
                      tag="a"
                      size="small"
                      density="compact"
                      variant="flat"
                      icon
                      class="me-4"
                      :href="item?.linkedin"
                      target="_blank"
                    >
                      <v-icon
                        :color="dark ? 'text-light' : 'primary-base'"
                        icon="custom:linkedin"
                      ></v-icon>
                    </v-btn>
                    <v-btn
                      size="small"
                      density="compact"
                      variant="flat"
                      icon
                      @click="$emit('click:info', mentor)"
                    >
                      <v-icon
                        :color="dark ? 'text-light' : 'primary-base'"
                        icon="custom:info"
                      ></v-icon>
                    </v-btn>
                  </div>
                  <v-btn
                    size="small"
                    flat
                    color="secondary-base"
                    class="text-text-light"
                    @click="$emit('click:mentorship', mentor)"
                    >{{ $t("mentorship") }}
                  </v-btn>
                </div>
              </template>
            </about-us-member-card>
          </v-col>
        </v-row>
      </v-container>
    </v-window-item>
  </v-window>
</template>

<script setup>
const props = defineProps({
  categories: Array,
});
const currentCategory = ref("");
onUpdated(() => {
  if (!currentCategory.value) currentCategory.value = Object.keys(props?.categories)[0];
});
</script>
