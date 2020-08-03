import contextMenu from './directives/contextMenu'
import openContextMenu from './utils/openContextMenu'

const ContextMenu = {
  install (Vue, options = {}) {
    const { 
      directiveName = 'ContextMenu', // Customizable directive name
      prototypeName = '$contextMenu', // Customizable Vue.prototype method name
      zIndex
    } = options

    if (typeof zIndex === 'number') {
      openContextMenu.DEFAULT_ZINDEX = zIndex
    }
    
    Vue.directive(directiveName, contextMenu)
    // mount to vue prototype chain
    Vue.prototype[prototypeName] = function (options) {
      openContextMenu(Vue, options)
    }
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  ContextMenu.install(window.Vue)
}

export default ContextMenu
