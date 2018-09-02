import Vue from 'vue'
import Demo from './demo/index.js'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#demo',
  render: h => h(Demo)
})
