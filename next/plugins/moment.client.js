import moment from 'moment-jalaali'
import fa from "moment/src/locale/fa";
import en from "moment/src/locale/en-ca";
// import { useLocaleStore } from "@core/stores/locale";
// let langString = useLocaleStore().locale 
// let lang =  useLocaleStore().locale === 'fa'?fa:en
export default defineNuxtPlugin(nuxtApp => {
    moment.locale('fa', fa);
    moment.loadPersian();

    return {
        provide: {
            moment
        }
    }
})