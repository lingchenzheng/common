import type { App, Directive, DirectiveBinding } from 'vue'
import { on, off, isContained, isFunction } from '@lingcz/shared'
interface HTMLElement {
    __click_outside_fn__?: (e: Event) => void
}
export const clickOutsideDirective: Directive = {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        if (!el) return
        const fn = (e: Event) => {
            const target = e.target
            if (!isContained(el as Node, target as Node)) {
                isFunction(binding.value) && binding.value(e)
            }
        }
        el.__click_outside_fn__ = fn
        on(window, 'click', fn)
    },
    beforeUnmount(el: HTMLElement) {
        if (!el || !el.__click_outside_fn__) return
        off(window, 'click', el.__click_outside_fn__)
    }
}
export const ClickOutsideDirective = {
    install(app: App, name = 'click-outside') {
        app.directive(name, clickOutsideDirective)
    }
}
