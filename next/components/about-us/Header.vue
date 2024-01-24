<template>
    <v-row justify="space-between" align="center">
        <v-col cols="12" lg="7" sm="12">
            <!-- <div class="text-h3">{{ $t('about_us') }}</div> -->
            <div class="my-2 text-h4">{{ $t('slogan') }}</div>
            <div class="text-body-1">{{ $t('about_us_description') }}</div>
        </v-col>
        <v-col cols="12" lg="4" sm="12">
            <v-img src="/images/team-header.png" />
        </v-col>
        <v-col cols="12" lg="12" sm="12">
            <v-card color="primary-base" class="rounded-lg mt-10">
                <v-card-text class="text-center">
                    <span class="text-body-1 font-weight-bold">{{ $t('about_us_summery')}}</span>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>