import { isServer, isArray } from './util'

const queryRE = /[?&]([^=&#]+)=([^&#]*)/g

export const qs = (url?: string): Record<string, string | Array<string>> => {
    url = url ? url : isServer ? '' : location.href
    if (!url) return
    const result: Record<string, string | Array<string>> = {}
    const querys: RegExpMatchArray = url.match(queryRE)
    if (querys) {
        querys.forEach((query) => {
            query = query.substr(1)
            const arr = query.split('=')
            const [key, value] = arr
            let has = result[key]
            if (has) {
                if (isArray(has)) {
                    has.push(value)
                } else {
                    result[key] = [has, value]
                }
            } else {
                result[key] = value
            }
        })
    }
    return result
}

export const getParamByName = (
    name: string,
    url?: string
): Array<string> | string => {
    const result = qs(url)
    if (!result) return
    return result[name]
}
