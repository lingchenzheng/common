import { isArray, isString } from '@lingcz/shared'
const stringFromCodePoint = String.fromCodePoint

//匹配是否有其他字符串
const re = /[^0-9a-fA-F]/g

const decodeByte2 = (byte1: number, byte2: number): string => {
    const codePoint = ((byte1 & 0x1f) << 0x6) | (byte2 & 0x3f)
    return stringFromCodePoint(codePoint)
}

const decodeByte3 = (byte1: number, byte2: number, byte3: number): string => {
    const codePoint =
        ((byte1 & 0xf) << 0xc) | ((byte2 & 0x3f) << 0x6) | (byte3 & 0x3f)
    return stringFromCodePoint(codePoint)
}

const decodeByte4 = (
    byte1: number,
    byte2: number,
    byte3: number,
    byte4: number
): string => {
    const codePoint =
        ((byte1 & 0x7) << 0x12) |
        ((byte2 & 0xf) << 0xc) |
        ((byte3 & 0x3f) << 0x6) |
        (byte4 & 0x3f)
    return stringFromCodePoint(codePoint)
}

function parse(arr: Array<number>): string {
    let index = 0
    let result: string = ''
    let len = arr.length
    while (len > index) {
        let byte = arr[index]
        if (byte >> 7 === 0) {
            result += stringFromCodePoint(byte)
            index++
        } else if (byte >> 3 === 0b11110) {
            result += decodeByte4(
                arr[index],
                arr[index + 1],
                arr[index + 2],
                arr[index + 3]
            )
            index += 4
        } else if (byte >> 4 === 0b1110) {
            result += decodeByte3(arr[index], arr[index + 1], arr[index + 2])
            index += 3
        } else if (byte >> 5 === 0b110) {
            result += decodeByte2(arr[index], arr[index + 1])
            index += 2
        } else {
            throw new Error('decode failed!')
        }
    }
    return result
}
type DecodeTarget = string | Array<number> | ArrayBuffer
export function decode(target: DecodeTarget): string {
    let arr: Array<number>
    if (isArray(target)) {
        arr = target
    } else if (target instanceof ArrayBuffer) {
        const uint8: Uint8Array = new Uint8Array(target)
        arr = Array.from(uint8)
    } else if (isString(target)) {
        if (re.test(target)) {
            const invalid = re.exec(target)[0]
            console.log(` "${invalid}" is a invalid hex string`)
            return
        }
        const hexRE = /.{2}/gi
        arr = target.match(hexRE).map((o) => {
            const num = parseInt(o, 16)
            return num
        })
    } else {
        return
    }
    return parse(arr)
}
