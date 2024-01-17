
import {
    createVuetify, ThemeDefinition
} from 'vuetify';
import '@fortawesome/fontawesome-free/css/all.css'
import "vuetify/styles";
import FA from './../locales/fa'
import { aliases, fa } from 'vuetify/iconsets/fa'
import { custom } from '@core/assets/iconsets/custom.ts'

const light: ThemeDefinition = {
    variables: {},
    dark: false,
    colors: {
        'primary-base': '#E6123D',
        'primary-lighten1': '#EF4056',
        'primary-lighten2': '#F47383',
        'primary-lighten3': '#FCB4BC',

        'secondary-base': '#0EA3BD',
        'secondary-lighten1': '#19B8D3',
        'secondary-lighten2': '#59D6EC',
        'secondary-lighten3': '#9FE5F2',

        'background-light': '#FFFFFF',
        'background-dark': '#F2F2F2',
        'background-scrim-light': '#FFFFFFd9',
        'background-scrim-dark': '#0000004d',
        'background-caution': '#F27F001a',
        'background-success': '#006E1C',
        'background-neutral': '#5D5E611a',
        'background-error': '#930010',
        'background-primary':'#E6123D',
        'background-secondary':'#0FABC61a',
        'background-homepage': '#FDF1D8',
        'background-banner-blue': '#E8EEFF',
        'background-banner-red': '#FFE1E1',
        'background-banner-pink': '#FBE4FF',
        'background-chat': '#F7F6F2',
        'background-chat-bubbleLight': '#FFE7A6',
        'background-chat-bubbleDark': '#FFDC80',

        'text-light': '#FFFFFF',
        'text-disabled': '#C0C2C5',
        'text-low-emphasis': '#81858B',
        'text-high-emphasis': '#424750',
        'text-heading': '#0C0C0C',
        'text-primary': '#E6123D',
        'text-secondary': '#0EA3BD',
        'text-hint-caution': '#F27F00',
        'text-hint-success': '#006E1C',
        'text-hint-neutral': '#62666D',
        'text-hint-error': '#CE1C2A',

        'icon-light': '#FFFFFF',
        'icon-disabled': '#E0E0E2',
        'icon-low-emphasis': '#A1A3A8',
        'icon-high-emphasis': '#424750',
        'icon-dark': '#0C0C0C',
        'icon-primary': '#EF4056',
        'icon-secondary': '#0FABC6',
        'icon-hint-caution': '#FB9A00',
        'icon-hint-success': '#41A447',
        'icon-hint-neutral': '#81858B',
        'icon-hint-error': '#DD3735',

        'border-grade-0': 'rgba(255, 255, 255, 0)',
        'border-grade-1': '#F0F0F1',
        'border-grade-2': '#E0E0E2',

        'button-primary': '#EF4056',
        'button-secondary': '#0EA3BD',
        'button-disabled': '#E0E0E2',

        'button-content-on-primary': '#FFFFFF',
        'button-content-on-secondary': '#FFFFFF',
        'button-content-on-disabled': '#A1A3A8',

        'button-overlay-hover': '#FFFFFF14',
        'button-overlay-press': '#FFFFFF1E',
        'button-overlay-primary-hover': '#FFD72E14',
        'button-overlay-primary-press': '#FFD72E1E',
        'button-overlay-secondary-hover': '#254FC314',
        'button-overlay-secondary-press': '#254FC31E',

        'n000': '#FFFFFF',
        'n050': '#F7F7F7',
        'n100': '#F0F0F1',
        'n200': '#E0E0E2',
        'n300': '#C0C2C5',
        'n400': '#A1A3A8',
        'n500': '#81858B',
        'n600': '#62666D',
        'n700': '#424750',
        'n800': '#232933',
        'n900': '#0C0C0C',

        'ad-status-pending': '#F8A825',
        'ad-status-approved': '#4CAF50',
        'ad-status-expired': '#62666C',
        'ad-status-rejected': '#D32E2F',

        'partners-digikala': '#EF4056',
        'partners-komoda': '#06B27E',
        'greenish': '#06B27E',
        'error': '#E6123D'
    }
}

const dark: ThemeDefinition = {
    dark: true,
    colors: {}
}
export default defineNuxtPlugin(nuxtApp => {
    const vuetify = createVuetify({
        ssr: true,
        customVariables: ["~/assets/variables.scss"],
        treeShake: true,
        lang: {
            t: (key, ...params) => nuxtApp.i18n.t(key, params)
        },
        theme: {
            options: {
                customProperties: true,
            },
            defaultTheme: 'light',
            themes: {
                light
            }
        },
        locale: {
            locale: 'fa',
            messages: { FA },
            rtl: {
                fa: true,
            }
        },
        icons: {
            defaultSet: 'fa',
            sets: {
                fa,
                custom
            }
        },
        display: {
            thresholds: {
              xs: 0,
              sm: 576,
              md: 768,
              lg: 992,
              xl: 1200,
              xxl: 1400
            },
          },
    })

    nuxtApp.vueApp.use(vuetify)
})
