const camelizeRE = /-+(\w)/g
export const camelize = (str: string): string => {
    return str.replace(camelizeRE, ($1, c) => (c ? c.toUpperCase() : ''))
}

export const isServer = typeof window === 'undefined'

const hasOwnProperty = Object.prototype.hasOwnProperty
export const hasOwn = (o: object, key: string): key is keyof typeof o => {
    return hasOwnProperty.call(o, key)
}

const toString = Object.prototype.toString
export const isNumber = (val: unknown): val is number => {
    return typeof val === 'number' && !isNaN(val)
}
export const isString = (val: unknown): val is string => {
    return typeof val === 'string'
}
export const isSymbol = (val: unknown): val is symbol => {
    return typeof val === 'symbol'
}
export const isDate = (val: unknown): val is Date => {
    return val instanceof Date
}
export const isArray = Array.isArray
export const isFunction = (val: unknown): val is Function => {
    return toString.call(val) === '[object Function]'
}
export const isPlainObject = (val: unknown): val is object => {
    if (val === null) return false
    return toString.call(val) === '[object Object]'
}
