// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import axios from 'axios'

Vue.use(ElementUI)

Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.filter('formatPrice', function (value) {
  if (value) {
    return '历史最低：￥' + value.toFixed(2)
  } else {
    return '暂无价格'
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
