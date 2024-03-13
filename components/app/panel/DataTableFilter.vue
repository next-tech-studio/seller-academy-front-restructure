<template>
  <v-menu v-model="menu">
    <template v-slot:activator="{ props }">
      <v-btn
        flat
        v-bind="props"
        size="large"
        rounded
        class="text-text-high-emphasis border-sm"
      >
        <template v-slot:append>
          <v-icon
            size="x-small"
            :icon="menu ? 'custom:caretDownSolid' : 'custom:caretTopSolid'"
          />
        </template>
        {{ $t(filterTitle) }}
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="(item, i) in fiters"
        :key="i"
        @click="menu = false"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup>
let menu = ref(false)
const props = defineProps({
    filters:Array,
    filterTitle:String
})
</script>