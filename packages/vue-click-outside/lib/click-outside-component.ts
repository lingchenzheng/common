import {
    defineComponent,
    onMounted,
    onBeforeUnmount,
    getCurrentInstance
} from 'vue'
import { on, off, isContained } from '@lingcz/shared'
export const ClickOutsideComponent = defineComponent({
    emits: ['click-outside'],
    setup(props, { emit }) {
        const instance = getCurrentInstance()
        const eles: HTMLElement[] = []
        const handleClick = (e: Event) => {
            const target = e.target as HTMLElement
            if (!target || eles.length < 1) return
            for (let i = 0; i < eles.length; i++) {
                const ele = eles[i]
                if (isContained(ele, target)) {
                    return
                }
            }
            emit('click-outside')
        }
        onMounted(() => {
            const children = instance.subTree.children
            for (let i = 0; i < children.length; i++) {
                const $el = children[i].el
                if ($el && $el instanceof HTMLElement) {
                    eles.push($el)
                }
            }
            on(window, 'click', handleClick)
        })
        onBeforeUnmount(() => {
            off(window, 'click', handleClick)
        })
    },
    render() {
        if (this.$slots.default && typeof this.$slots.default === 'function') {
            const vnode = this.$slots.default()
            return vnode
        }
        return null
    }
})
