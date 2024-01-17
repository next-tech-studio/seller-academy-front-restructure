import moment from 'moment-jalaali'
import fa from "moment/src/locale/fa";

export default defineNuxtPlugin(nuxtApp => {
    moment.locale("fa", fa);
    moment.loadPersian();

    return {
        provide: {
            moment
        }
    }
})