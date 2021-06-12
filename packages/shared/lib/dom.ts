export const on = (
    target: EventTarget,
    type: keyof GlobalEventHandlersEventMap,
    handler: EventListenerOrEventListenerObject,
    useCapture = false
) => {
    target.addEventListener(type, handler, useCapture)
}

export const off = (
    target: EventTarget,
    type: keyof GlobalEventHandlersEventMap,
    handler: EventListenerOrEventListenerObject,
    useCapture = false
) => {
    target.removeEventListener(type, handler, useCapture)
}

export const once = (
    target: EventTarget,
    type: keyof GlobalEventHandlersEventMap,
    handler: EventListenerOrEventListenerObject,
    useCapture = false
) => {
    const fn = (e: Event) => {
        if (typeof handler === 'function') {
            handler.apply(null, e)
        } else {
            handler.handleEvent.apply(null, e)
        }
        target.removeEventListener(type, fn, useCapture)
    }
    target.addEventListener(type, fn, useCapture)
}

export const isContained = (parent: Node, child: Node): boolean => {
    if (!parent || !child) return false
    if (parent.contains) {
        return parent.contains(child)
    }
    let temp = child
    while (temp) {
        if (temp === parent) return true
        temp = child.parentNode
    }
    return false
}

export const hasClass = (el: Element, className: string) => {
    const cls = el.getAttribute('class')
    return new RegExp('\\b' + className + '\\b').test(cls)
}

export const addClass = (el: Element, className: string) => {
    if (hasClass(el, className)) return
    if (el.classList) {
        el.classList.add(className)
    } else {
        let cls = el.getAttribute('class')
        el.setAttribute('class', cls + ' ' + className)
    }
}

export const removeClass = (el: Element, className: string) => {
    if (!hasClass(el, className)) return
    if (el.classList) {
        el.classList.remove(className)
    } else {
        let cls = el.getAttribute('class')
        cls = cls.replace(new RegExp('\\b' + className + '\\b', 'g'), '')
        el.setAttribute('class', cls)
    }
}
export const getStyle = (el: HTMLElement, prop: string): string => {
    if (prop === 'float') {
        prop = 'cssFloat'
    }
    const style = el.style[prop]
    if (style) return style
    const compStyle = el.ownerDocument.defaultView.getComputedStyle(el, null)
    return compStyle ? compStyle[prop] : ''
}

export const getOffsetTop = (el: HTMLElement): number => {
    let top = 0
    let parent = el
    while (parent) {
        top += parent.offsetTop
        parent = parent.offsetParent as HTMLElement
    }
    return top
}

export const getOffsetLeft = (el: HTMLElement): number => {
    let left = 0
    let parent = el
    while (parent) {
        left += parent.offsetLeft
        parent = parent.offsetParent as HTMLElement
    }
    return left
}

export const getTopDistance = (
    child: HTMLElement,
    parent: HTMLElement
): number => {
    return Math.abs(getOffsetTop(child) - getOffsetTop(parent))
}

export const getLeftDistance = (
    child: HTMLElement,
    parent: HTMLElement
): number => {
    return Math.abs(getOffsetLeft(child) - getOffsetLeft(parent))
}

export const isScroll = (
    el: HTMLElement,
    direction: 'x' | 'y' | 'all' = 'all'
): boolean => {
    const prop =
        direction === 'all'
            ? 'overflow'
            : direction === 'x'
            ? 'overflow-x'
            : 'overflow-y'
    const overflow = getStyle(el, prop)
    return /(scroll|auto)/.test(overflow)
}

export const getScrollContainer = (
    el: HTMLElement,
    direction: 'x' | 'y' | 'all'
): HTMLElement => {
    let parent = el
    while (parent) {
        if (isScroll(el, direction)) {
            return parent
        }
        parent = parent.parentElement
    }
    return parent
}

export interface Position {
    x: number
    y: number
}
export const getCenterPosition = (el: HTMLElement): Position => {
    if (!el) return null
    const top = getOffsetTop(el)
    const left = getOffsetLeft(el)
    const x = top + el.offsetHeight / 2
    const y = left + el.offsetLeft / 2
    return { x, y }
}
