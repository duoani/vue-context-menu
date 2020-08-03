import ContextMenu from '../components/ContextMenu'

function openContextMenu (Vue, options) {
  var vm
  var el
  var menu
  const VueContextMenu = Vue.extend({
    render (h) {
      const props = Object.assign({
        zIndex: openContextMenu.DEFAULT_ZINDEX
      }, options)
      return h(ContextMenu, {
        props,
        on: {
          close () {
            if (el) {
              document.body.removeChild(el)
              menu.$destroy()
              vm = null
            }
          }
        }
      })
    }
  })

  menu = new VueContextMenu()
  vm = menu.$mount()
  el = vm.$el
  document.body.appendChild(el)
}

openContextMenu.DEFAULT_ZINDEX = 9999
export default openContextMenu
