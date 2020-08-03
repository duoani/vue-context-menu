import Vue from "vue";
import Dev from "./Dev.vue";
import VueContextMenu from '../src/index'

Vue.use(VueContextMenu, {
  zIndex: 78
})

new Vue({
  render: h => h(Dev)
}).$mount("#app");
