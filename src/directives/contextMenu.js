import Vue from 'vue'
import openContextMenu from '../utils/openContextMenu'

const saveBinding = function (el, binding) {
  el.cmVal = binding.value
  // switch (binding.arg) {
  //   case 'z-index':
  //     el.cmZIndex = binding.value
  //     break
  //   case 'actions':
  //     el.cmActions = binding.value
  //     break
  //   case 'before':
  //     el.cmBefore = binding.value
  //     break
  //   case 'cancel':
  //     el.cmCancel = binding.value
  //     break
  // }
}

export default {
  bind (el, binding, vnode, oldVnode) {
    saveBinding(el, binding)
    el.addEventListener('contextmenu', function (e) {
      e.preventDefault()
      e.stopPropagation()

      const { scrollTop, scrollLeft } = document.documentElement
      openContextMenu(
        Vue,
        Object.assign({
          left: e.pageX - scrollLeft,
          top: e.pageY - scrollTop
        }, el.cmVal)
      )
    })
  },
  update (el, binding, vnode, oldVnode) {
    saveBinding(el, binding)
  }
}
