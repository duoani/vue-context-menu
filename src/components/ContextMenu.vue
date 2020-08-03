<template>
  <div
    class="context-menu"
    :class="customClass"
    :style="cStyles"
  >
    <div
      v-if="mask"
      class="context-menu__mask"
      @mousedown="cancel"
    />
    <div
      class="context-menu__list-wrap"
      :style="menuStyles"
      @mouseleave="handleMouseLeave"
      @contextmenu.prevent="handleContextMenu"
    >
      <ul
        ref="list"
        class="context-menu__list"
        :style="lStyles"
      >
        <component
          :is="getComp(action)"
          v-for="(action, index) in actions"
          :key="index"
          v-bind="action"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import ContextMenuItem from './ContextMenuItem'
import ContextMenuSep from './ContextMenuSep'

export default {

  provide () {
    return {
      contextMenu: this
    }
  },

  components: {
    ContextMenuItem,
    ContextMenuSep
  },

  props: {
    // 列表左
    left: {
      type: Number,
      default: 0
    },
    // 列表右
    top: {
      type: Number,
      default: 0
    },
    // 触发关闭的距离
    wrapperSize: {
      type: Number,
      default: 15
    },
    // 是否有蒙板
    mask: {
      type: Boolean,
      default: true
    },
    // 是否自动关闭
    autoClose: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: Number,
      default: 9999
    },
    // 列表宽
    width: Number,
    // 列表项
    actions: {
      type: Array,
      default: () => []
    },
    // 打开右键菜单前的回调
    onBefore: Function,
    // 取消右键菜单的回调
    onCancel: Function,
    // 自定义类
    customClass: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      menuWidth: 0,
      menuHeight: 0,
      clientWidth: 0,
      clientHeight: 0
    }
  },

  computed: {
    cStyles () {
      return {
        zIndex: this.zIndex
      }
    },
    lStyles () {
      const s = {}
      if (this.width) {
        s.width = `${this.width}px`
      }
      return s
    },
    menuStyles () {
      /* eslint-disable prefer-const */
      let { top, left, wrapperSize = 0, menuWidth, menuHeight, clientWidth, clientHeight } = this
      if (left + menuWidth > clientWidth) {
        left = clientWidth - menuWidth
      }
      if (top + menuHeight > clientHeight) {
        top = clientHeight - menuHeight
      }
      const realLeft = left - wrapperSize
      const realTop = top - wrapperSize

      return {
        padding: `${wrapperSize}px`,
        left: `${realLeft}px`,
        top: `${realTop}px`
      }
    }
  },

  mounted () {
    this._onKeyDown = () => {
      this.cancel()
    }
    document.body.classList.add('context-menu-opend')
    this.onBefore && this.onBefore()
    document.addEventListener('keydown', this._onKeyDown, false)
    this.$nextTick(() => {
      const { width, height } = this.$refs.list.getBoundingClientRect()
      const { clientHeight, clientWidth } = document.body
      this.menuWidth = width
      this.menuHeight = height
      this.clientWidth = clientWidth
      this.clientHeight = clientHeight
    })
  },

  beforeDestroy () {
    document.body.classList.remove('context-menu-opend')
    document.removeEventListener('keydown', this._onKeyDown)
  },

  methods: {
    getComp (action) {
      return action.type === 'sep' ? ContextMenuSep : ContextMenuItem
    },
    close () {
      this.$emit('close')
    },
    cancel () {
      this.close()
      this.onCancel && this.onCancel()
    },
    handleMouseLeave () {
      if (this.autoClose) {
        this.cancel()
      }
    },
    handleContextMenu () {

    }
  }
}

</script>

<style lang="scss">
$colorDark: #333333;
$colorPrimary: #3399ff;
$colorMuted: #BCC1C5;

.context-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
}

.context-menu__mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.context-menu__list-wrap {
  position: absolute;
  padding: 15px;
}
.context-menu__list {
  position: relative;
  display: block;
  width: 150px;
  list-style-type: none;
  background-color: #fff;
  font-size: 14px;
  color: $colorDark;
  overflow: hidden;
  padding: 4px 0;
  border-radius: 3px;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, .2);
}

.context-menu__item {
  position: relative;
  padding: 2px 20px 2px 20px;
  user-select: none;
  min-height: 26px;
  line-height: 26px;
  cursor: pointer;
  &:after {
    display: block;
    content: "";
    height: 0;
    overflow: hidden;
    visibility: hidden;
    clear: both;
  }

  &>i {
    float: left;
    font-size: 16px;
    width: 1.5em;
    margin: 5px 2px 0 0;
  }

  &:hover {
    background-color: lighten($colorPrimary, 35%);
    color: $colorPrimary;
  }
}

.context-menu__item--disabled {
  color: $colorMuted;
  cursor: default;

  &:hover {
    background-color: transparent;
    color: $colorMuted;
  }
}

.context-menu__sub {
  float: right;
  font-size: 13px;
  line-height: 26px;
  color: #a5a5a5;
}

.menu-item--top {
  i {
    transform: rotateZ(180deg);
  }
}

.context-menu__sep {
  border-bottom: 1px solid #f1f0f0;
  height: 0;
  margin: 4px 20px;
}

.context-menu-opend {
  overflow: hidden;
}
</style>
