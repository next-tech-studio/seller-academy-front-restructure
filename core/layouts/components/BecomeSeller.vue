<template>
    <v-card flat class="become-seller bg-primary-base pa-md-8 pa-3 rounded-lg">
        <v-card-title class="text-center text-md-h1  text-h4">
            {{ $t('become_a_seller_question') }}
        </v-card-title>
        <v-card-subtitle class="text-center text-body-1 d-md-block d-none">{{ $t('become_a_seller_reason') }}</v-card-subtitle>
        <v-card-actions class="justify-center">
            <v-btn class="bg-white text-button">
                <span class="text-button">{{ $t('want_to_become_seller') }}</span>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
}
</script>

<style>
.become-seller .v-btn__content {
  color: rgb(var(--v-theme-text-primary))
}
</style>
