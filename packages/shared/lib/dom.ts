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

export const hasClass = (el: Element, className: string) => {}

export const addClass = (el: Element, className: string) => {}

export const removeClass = (el: Element, className: string) => {}

export const getStyle = (el: HTMLElement, prop: string): string => {
    el.ownerDocument.defaultView.getComputedStyle
    return el.style.cssFloat
}
