<template>
<v-card class="mb-6">
    <v-row no-gutters>
        <v-col :cols="vertical ? 12 : 6" >
            <video-player small video-src="/videos/video.mp4" :video-poster="content.previewUrl"><video-player small video-src="/videos/video.mp4" :video-poster="content.previewUrl"></video-player>
                <client-only>
                    <v-btn class="type text-whit text-button" rounded="pill" flat :size="mdAndUp ? 'small' : 'x-small'"
                        :color="content.type == 'live' ? 'primary-base' : 'rgba(var(--v-theme-background-scrim-dark), 50%)'">{{ content.type == 'live' ? $t(content.type) : $moment.utc(content.duration*1000).format('HH:mm:ss') }}</v-btn>
                </client-only>
            </video-player>
            <template v-if="vertical">
                <v-chip :size="mdAndUp ? 'default' : 'x-small'" v-if="content.category" color="primary-base" class="my-2 my-md-4 text-caption text-md-body-1">
                    {{ content.category.title }}
                </v-chip>
                <div v-if="content.title" class="text-md-h5 text-caption text-text-heading text-truncate-2">{{ content.title }}</div>
                <div v-if="!hidePublishDetail" class="d-flex align-end text-text-high-emphasis text-body-2 d-md-none">
                    <client-only class="text-caption text-text-low-emphasis">
                        {{ $moment(content.publicationDate).fromNow() }}
                    </client-only>
                    <span class="line mx-2 bg-text-low-emphasis" v-if="content.publisher"></span>
                    <span v-if="content.publisher">{{content.publisher}}</span>
                </div>
            </template>
        </v-col>
        <v-col v-if="!vertical" cols="6" md="6" class="pr-4">
            <span class="text-lg-h5 text-caption text-text-heading truncate-2">{{ content.title }}</span>
            <div class="d-flex align-center text-text-high-emphasis text-body-2 d-md-none"><client-only class="text-caption text-text-low-emphasis">{{ $moment(content.publicationDate).fromNow() }}</client-only> <span class="line mx-2 bg-text-low-emphasis" v-if="content.publisher"></span> <span v-if="content.publisher"> {{content.publisher}}</span>  </div>
        </v-col>
    </v-row>
</v-card>
</template>

<script setup>
import {
    useDisplay
} from 'vuetify'
const props = defineProps({
    content: {
        default: () => {},
        type: Object
    },
    vertical: {
        default: false,
        type: Boolean
    },
    hidePublishDetail: {
        default: false,
        type: Boolean
    }
})
const {
    mdAndUp,md
} = useDisplay()
</script>

<style lang="css" scoped>
.type {
    position: absolute;
    left: 8px;
    top: 8px;
}
</style>
