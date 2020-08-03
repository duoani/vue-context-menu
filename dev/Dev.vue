<template>
  <div id="app">
    <div
      v-context-menu="contextMenuOptions"
      style="width: 400px; height: 400px; background-color: gray; text-align: center; margin: 0 auto; box-sizing: border-box; padding: 50px;"
    >
      Right Click This Area.
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    contextMenuOptions () {
      return {
        width: 200, // 200px as default
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
            label: 'Paste',
            subLabel: 'Ctrl + V',
            disabled: true,
            onClick: () => {
              console.log('paste')
            }
          },
          {
            type: 'sep'
          },
          {
            label: 'Delete',
            subLabel: 'Del',
            disabled: false,
            onClick: () => {
              console.log('delete')
            }
          },
        ]
      }
    }
  }
};
</script>

<style>
  html,
  body {
    margin: 0;
    height: 100%;
    font-family: -apple-system, sans-serif;
  }

  #app {
    height: 100%;
  }

  hr {
    border: none;
    border-bottom: 1px solid #cacaca;
    margin-bottom: 1em;
    padding-top: 1em;
    width: 90%;
  }
</style>
