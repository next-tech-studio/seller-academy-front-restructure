<template>
<v-sheet tag="section" id="content-slide-group" class="mx-auto px-2">
    <h2 class="d-flex justify-space-between pb-4">
        <span class="text-h3 text-md-h2 text-text-heading">{{ $t(title) }}</span>
        <slot name="action">
            <v-btn :to="to" variant="text" class="text-text-button px-0" color="text-secondary">{{ $t('see_more') }}</v-btn>
        </slot>
    </h2>
    <v-slide-group>
        <template #next>
            <v-btn width="24" height="50" class="rounded-md" icon size="x-small" color="rgba(var(--v-theme-background-scrim-dark), 30%)">
                <v-icon color="white">fas fa-chevron-left</v-icon>
            </v-btn>
        </template>

        <template #prev>
            <v-btn width="24" height="50" class="rounded-md" icon size="x-small" color="rgba(var(--v-theme-background-scrim-dark), 30%)">
                <v-icon color="white">fas fa-chevron-right</v-icon>
            </v-btn>
        </template>

        <v-slide-group-item v-for="(item, index) in items" :key="item.slug" v-slot="{ isSelected, toggle }">
            <div :class="{'pa-2': index != 0, 'pr-0 py-2 pl-2': index == 0, 'small': sizeItem == 'small', 'large': sizeItem == 'large', 'default': !sizeItem || 'default'}">
                <slot name="item" :item="item" :index="index" />
            </div>
        </v-slide-group-item>
    </v-slide-group>
</v-sheet>
</template>

<script setup>
import { useDisplay } from 'vuetify'

const { mdAndUp } = useDisplay()

const props = defineProps({
    items: {
        type: Array
    },
    title: {
        type: String
    },
    to: {
        type: String
    },
    sizeItem: {
        type: String,
        default: 'default'
    }
})
</script>

<style lang="scss">
#content-slide-group {
    .v-slide-group {
        position: relative;
        overflow: visible !important;
    }
    .v-slide-group__prev {
        position: absolute;
        top: 100px;
        right: -52px;
    }
    .v-slide-group__next {
        position: absolute;
        top: 100px;
        left: -52px;
    }
}
</style>

<style scoped>
    .default {
        width: 100%!important;
    }
    .small {
        width: 296px!important;
    }
    .large {
        width: 400px!important;
    }
</style>
