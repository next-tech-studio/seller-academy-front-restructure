<template>
  <v-card>
    <slot name="title">
      <v-card-title class="text-body-1 font-weight-bold text-text-heading">
        {{ $t(items.title) }}
      </v-card-title>
    </slot>
    <v-card-text>
      <v-item-group
        :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
        :multiple="items.multiple"
        selected-class="bg-purple"
        v-if="items?.items?.length"
      >
        <template v-for="item in items.items" :key="item[itemText]">
          <v-item
            v-slot="{ isSelected, toggle }"
            :value="item[items.itemValue]"
          >
            <v-checkbox
              color="primary-base"
              true-icon="custom:squareCheck"
              false-icon="custom:square"
              variant="compact"
              hide-details
              @click="toggle"
              :model-value="isSelected"
            >
              <template v-slot:label>
                <span class="text-body-1 text-text-low-emphasis">{{
                  item[items.itemText]
                }}</span>
              </template>
            </v-checkbox>
          </v-item>
        </template>
        <v-item> </v-item>
      </v-item-group>
      <!-- <v-card-actions>
          <v-btn class="px-0 animated" color="text-secondary">{{
            $t("see_more")
          }}</v-btn>
        </v-card-actions> -->
    </v-card-text>
  </v-card>
</template>

<script setup>
const emit = defineEmits(["submit", "update:modelValue"]);
defineProps({
  items: Object,
  modelValue: [Object, String, Number],
});

const model = ref();
</script>
