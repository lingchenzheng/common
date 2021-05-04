import { on, off, isContained, isArray } from '@lingcz/shared'

export const clickOutside = (
    eles: Array<HTMLElement> | HTMLElement,
    cb: () => void
): (() => void) => {
    if (!eles) return
    const click = (e: Event) => {
        const target = e.target as HTMLElement
        if (isArray(eles)) {
            for (let i = 0; i < eles.length; i++) {
                const el = eles[i]
                //如果任意一个包含则直接返回
                if (isContained(el, target)) {
                    return
                }
            }
            //全部不包含
            cb()
        } else {
            if (!isContained(eles, target)) {
                cb()
            }
        }
    }
    on(window, 'click', click)
    return () => {
        off(window, 'click', click)
    }
}
