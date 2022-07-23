import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import router from '@/router'
import axios from 'axios'

import '@/css/index.css'
import '@/css/rewrite.less'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.min.css'
import { IconFont } from '@/utils/common'

Vue.use(Antd)
Vue.component('icon-font', IconFont)

Vue.config.productionTip = false
axios.defaults.withCredentials = true
Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
