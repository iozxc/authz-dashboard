import Vue from 'vue'
import VueRouter from 'vue-router'
import 'vuex'
import axios from 'axios'
import { getToken, removeToken, saveToken } from '@/utils/token'
import { prefix } from '@/utils/api'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import(/* webpackChunkName: "index" */ './views/Index'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "index" */ './views/Login'),
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "index" */ './views/Home'),
  },
  {
    path: '/request',
    name: 'Request',
    component: () => import(/* webpackChunkName: "request" */ './views/Request'),
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

router.beforeEach((to, from, next) => {
  // chrome
  document.body.scrollTop = 0
  // firefox
  document.documentElement.scrollTop = 0
  // safari
  window.pageYOffset = 0
  if (to.path === '/login') {
    next()
    return
  }
  let uuid = getToken()
  if (!uuid) {
    uuid = to.query['uuid']
  }
  if (!uuid) {
    next('/login')
    return
  }
  axios.get(`/user/check-login?uuid=${uuid}`).then(res => {
    if (res.code === 100) {
      router.app.$options.store.commit('setUser', res.data)
      saveToken(uuid)
      next()
    } else {
      removeToken()
      router.app.$options.store.commit('setUser', null)
      next('/login')
    }
  }).catch(e=>{
    removeToken()
    router.app.$options.store.commit('setUser', null)
    next('/login')
  })

})

export default router
