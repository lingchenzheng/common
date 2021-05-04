# `@lingcz/vue-click-outside`

> TODO: description

## install

```shell
npm i @lingcz/vue-click-outside --save
#or
yarn add @lingcz/vue-click-outside
```

## usage

### there are three ways to use

-   as a directive

```javascript
import { ClickOutsideDirective } from '@lingcz/vue-click-outside'
//the name of directive default is 'click-outside',but you can pass a name as second param
//register to global
app.use(ClickOutsideDirective, 'click-outside')

// <div v-click-outside="fn" ></div>
//
//  setup() {
//      const fn = () => {}
//      return { fn }
//  }
//
//

//register to local component

export default {
    directives: {
        'click-outside': ClickOutsideDirective.clickOutsideDirective
    }
}
```

-   as a component

```html
<template>
    <ClickOutsideComponent @click-outside="clickOutside">
        <div>test1</div>
        <div>test2</div>
    </ClickOutsideComponent>
</template>
<script>
    import { ClickOutsideComponent } from '@lingcz/vue-click-outside'
    export default {
        components: {
            ClickOutsideComponent
        },
        methods: {
            clickOutside() {}
        }
    }
</script>
```

-   as a function

```javascript
import { clickOutside } from '@lingcz/vue-click-outside'
const dom = document.getElementById('test')
const close = clickOutside(dom, () => {
    //TODO
})

//you also can pass an array
//clickOutside([dom1,dom2,...],() => {})

//then can removeListener

close()
```
