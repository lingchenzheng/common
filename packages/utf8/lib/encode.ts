import { isArray, isString } from '@lingcz/shared'
const encodeByte2 = (codePoint: number): Array<number> => {
    let byte1: number = 0xc0
    let byte2: number = 0x80
    byte1 |= (codePoint >> 0x6) & 0x1f
    byte2 |= codePoint & 0x3f
    return [byte1, byte2]
}

const encodeByte3 = (codePoint: number): Array<number> => {
    let byte1: number = 0xe0
    let byte2: number = 0x80
    let byte3: number = 0x80
    byte1 |= (codePoint >> 0xc) & 0xf
    byte2 |= (codePoint >> 0x6) & 0x3f
    byte3 |= codePoint & 0x3f
    return [byte1, byte2, byte3]
}

const encodeByte4 = (codePoint: number): Array<number> => {
    let byte1: number = 0xf0
    let byte2: number = 0x80
    let byte3: number = 0x80
    let byte4: number = 0x80
    byte1 |= (codePoint >> 0x12) & 0x7
    byte2 |= (codePoint >> 0xc) & 0x3f
    byte3 |= (codePoint >> 0x6) & 0x3f
    byte4 |= codePoint & 0x3f
    return [byte1, byte2, byte3, byte4]
}

const parse = (arr: Array<number>): Array<number> => {
    let bytes: Array<number> = []
    for (let i = 0; i < arr.length; i++) {
        let codePoint = arr[i]
        if (codePoint <= 0x7f) {
            bytes.push(codePoint)
        } else if (codePoint <= 0x7ff) {
            bytes.push(...encodeByte2(codePoint))
        } else if (codePoint <= 0xffff) {
            bytes.push(...encodeByte3(codePoint))
        } else if (codePoint <= 0x10ffff) {
            bytes.push(...encodeByte4(codePoint))
        } else {
            throw new Error('encode failed')
        }
    }
    return bytes
}
type EncodeTarget = string | Array<number> | ArrayBuffer
interface EncodeResult {
    hexStr: string
    bytes: Array<number>
    buffer: ArrayBuffer
}
export const encode = (target: EncodeTarget): EncodeResult => {
    let arr: Array<number> = []
    if (isString(target)) {
        arr = target.split('').map((o) => o.codePointAt(0))
    } else if (isArray(target)) {
        arr = target
    } else if (target instanceof ArrayBuffer) {
        const uint8: Uint8Array = new Uint8Array(target)
        arr = Array.from(uint8)
    } else {
        console.log('please pass invalid value')
        return null
    }
    const bytes = parse(arr)
    let hexStr = ''
    bytes.forEach((o) => {
        hexStr += o.toString(16)
    })
    let uint8 = new Uint8Array(bytes)
    return {
        hexStr,
        buffer: uint8.buffer,
        bytes
    }
}
