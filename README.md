
# Vue Context Menu

Context Menu (Right Click Menu) base on Vue2.x

## Take a glance

<a href="https://duoani.github.io/vue-context-menu/index.html" target="_blank">Online Demo</a>

## Installation

```bash
npm i -S @duoa/vue-context-menu
```

## Usage

Register the component

```js
import Vue from 'vue'
import VueContextMenu from '@duoa/vue-context-menu'
// Because this components has its styles, you must also import the css file.
import '@duoa/vue-context-menu/dist/vue-context-menu.css'

// Register
Vue.use(VueContextMenu)

// You can also pass the options
Vue.use(VueImgPreview, {
  directiveName = 'ContextMenu', // Customizable directive name
  prototypeName = '$contextMenu', // Customizable Vue.prototype method name
  zIndex: 9999 // Context Menu z-index
})
```

You may now use the `v-context-menu` directive in your markup.

```html
<template>
  <button v-context-menu="options">Right Click This Button</button>
</template>
<script>
export default {
  computed: {
    options () {
      return {
        width: 200,
        actions: [
          {
            label: 'Copy',
            subLabel: 'Ctrl + C',
            disabled: false,
            onClick: () => {
              console.log('copy')
            }
          },
          {
            type: 'sep' // seperator with a horizontal line
          },
          ...
        ]
      }
    }
  }
}
</script>
```

That's all you need to do!

If you want to manually open an context menu, you can you `this.$contextMenu` method.

```js
export default {
  methods: {
    handleClick (e) {
      e.preventDefault()
      this.$contextMenu({
        // You must calculate the menu position by yourself.
        left: e.pageX,
        top: e.pageY,
        action: [
          ...
        ]
      })
    }
  }
}
```

## Configuration

|  Name   | Type  | Default Value | Required | Description |
|  ----  | ----  | --- | --- | -- |
| actions | array | [] | -- | menu list |
| autoClose | boolean | false | -- | auto close context menu when mouse leaves. |
| mask  | boolean | true | -- | whether a mask is displayed |
| customClass  | string | -- | -- | custom class names for context menu |
| zIndex  | number | 9999 | -- | menu z-index |
| width  | number | 200 | -- | menu width |
| top  | number | 0 | -- | menu top |
| left  | number | 0 | -- | menu left |
| onBefore  | function | -- | -- | triggers before the context menu opens |
| onCancel  | function | -- | -- | triggers after the context menu is canceled |

## action items configuration

|  Name   | Type  | Default Value | Required | Description |
|  ----  | ----  | --- | --- | -- |
| label  | string | '' | -- | menu item label |
| subLabel  | string | '' | -- | menu item sub label |
| icon  | string | '' | -- | icon class name |
| disabled  | boolean | false | -- | menu item disabled |
| onClick  | function | -- | -- | click handler |