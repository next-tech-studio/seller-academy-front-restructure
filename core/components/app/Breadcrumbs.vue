<template>
<v-breadcrumbs :items="breadcrumbs()">
    <template #divider>
        <v-icon :color="color" size="x-small" icon="custom:chevronLeftLight"></v-icon>
    </template>
    <template #title="{ item }">
        <div style="z-index: 10" class="text-caption text-md-body-2 text-truncate" :class="`text-${color}`">
        {{ $t(item?.title || '') }}
        </div>
    </template>
</v-breadcrumbs>
</template>

<script setup>
const props = defineProps({
    page: String,
    data: Object,
    color: String
})
let breadcrumbs = useBreadrumbs(props.data)[props.page]
useShema(breadcrumbs(), "breadcrumb");
</script>
<style lang="scss">
.v-breadcrumbs-divider{
    padding: 0 !important;
}
</style>
