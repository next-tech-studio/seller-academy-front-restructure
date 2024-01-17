import moment from 'moment-jalaali'
export function toIso(dateTime) {
    return moment(dateTime).format('YYYY-MM-DDTHH:mm:ssZ')
}

export function toIsoDuration(seconds) {
    return moment.duration(seconds, 'seconds').toISOString()
}