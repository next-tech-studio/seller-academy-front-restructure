<template>
<v-card flat class="bg-n050 pa-4 rounded-lg social-banner">
    <v-row class="justify-space-between">
        <v-col cols="12" md="5">
            <v-card-title class="title">{{ $t('socials_network') }}</v-card-title>
            <v-card-text class="description">{{ $t('socials_network_description') }}</v-card-text>
            <v-card-text>
                <v-btn color="text-high-emphasis" class="ml-4" density="compact" min-width="auto" size="small" v-for="item in socials" :key="item.icon" thickness="1" :icon="item.title" variant="text"></v-btn>
            </v-card-text>
        </v-col>
        <v-col cols="12" md="auto">
            <v-card-title class="title">{{ $t('newsletter_membership') }}</v-card-title>
            <v-card-text class="description">{{ $t('newsletter_membership_description') }}</v-card-text>
            <v-card-text class="d-flex">
                <v-text-field color="n300" class="py-0" density="compact" label="Email Address" bag-color="white" flat rounded solo type="email" variant="outlined">
                    <template #append-inner>
                        <v-btn style="border: 1px solid rgb(var(--v-theme-primary-base))" flat class="text-button" color="primary-base">{{ $t('write_in') }}</v-btn>
                    </template>
                </v-text-field>
            </v-card-text>
        </v-col>
    </v-row>
</v-card>
</template>

<script setup>
const socials = useSocials()
</script>

<style lang="scss">
.social-banner .v-field__append-inner {
    padding-top: 0 !important;
    align-items: center !important;
    .v-btn.v-btn--density-default {
        height: 100%;
    }
}
.social-banner .v-field--appended {
    padding-inline-end: 0 !important;
}
</style>

<style lang="scss" scoped>
.title {
    font-size: 19px !important;
    color: rgb(var(--v-theme-text-heading)) !important;
    font-weight: 600 !important;
    line-height: 40px;
}
.description {
    font-size: 14px !important;
    color: rgb(var(--v-theme-text-high-emphasis)) !important;
    font-weight: 400 !important;
    line-height: 30px !important;
}
</style>
