import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import router from '@/router'
import axios from 'axios'

import '@/css/index.css'
import '@/css/rewrite.less'
import '@/utils/iconfont.js'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.min.css'

Vue.use(Antd)

Vue.config.productionTip = false
axios.defaults.withCredentials = true
Vue.prototype.$http = axios

// 屏蔽错误信息
// Vue.config.errorHandler = () => null;
// 屏蔽警告信息
Vue.config.warnHandler = () => null;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
