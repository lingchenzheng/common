import { pad } from './util'

const token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g

const timezone =
    /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g

const timezoneClip = /[^-+\dA-Z]/g

export const FD = (
    date: Date | string | number,
    template: string,
    utc = false
): string => {
    date = new Date(date)
    if (Number.isNaN(date)) throw SyntaxError('invalid date')
    const $: string = utc ? 'getUTC' : 'get'
    const d = date[$ + 'Date']()
    const D = date[$ + 'Day']()
    const m = date[$ + 'Month']()
    const y = date[$ + 'FullYear']()
    const H = date[$ + 'Hours']()
    const M = date[$ + 'Minutes']()
    const s = date[$ + 'Seconds']()
    const L = date[$ + 'Milliseconds']()
    const offset = utc ? 0 : date.getTimezoneOffset()

    const flags = {
        d,
        dd: pad(d),
        m: m + 1,
        mm: pad(m + 1),
        yy: pad(y),
        yyyy: y,
        H,
        h: H,
        HH: pad(H),
        hh: pad(H),
        M,
        MM: pad(M),
        s,
        ss: pad(s)
    }
    template.replace(token, ($1) => flags[$1])
    return
}
