<template>
  <li
    class="context-menu__item clearfix"
    :class="cls"
    @click="handleClick"
  >
    <i
      v-if="icon"
      :class="icon"
    />
    <span>{{ label }}</span>
    <span
      v-if="subLabel"
      class="context-menu__sub"
    >{{ subLabel }}</span>
  </li>
</template>

<script>
export default {

  inject: ['contextMenu'],

  props: {
    icon: String,
    label: String,
    subLabel: String,
    disabled: Boolean,
    onClick: Function,
    className: String
  },

  computed: {
    cls () {
      const cls = []
      if (this.className) {
        cls.push(this.className)
      }
      if (this.disabled) {
        cls.push('context-menu__item--disabled')
      }
      return cls
    }
  },

  methods: {
    handleClick () {
      if (this.disabled) {
        return
      }
      this.onClick && this.onClick()
      this.contextMenu.close()
    }
  }
}
</script>
