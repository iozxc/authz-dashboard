import Vue from 'vue'
import VueRouter from 'vue-router'
import 'vuex'
import axios from 'axios'
import { cancelTestTime, getToken, removeToken, saveToken, startTestTime } from '@/utils/token'

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
    path: '/outline',
    name: 'Outline',
    component: () => import(/* webpackChunkName: "index" */ './views/Outline'),
  },
  {
    path: '/blacklist',
    name: 'Blacklist',
    component: () => import(/* webpackChunkName: "sub" */ './views/Blacklist'),
  },
  {
    path: '/device',
    name: 'Device',
    component: () => import(/* webpackChunkName: "sub" */ './views/Device'),
  },
  {
    path: '/data',
    name: 'Data',
    component: () => import(/* webpackChunkName: "sub" */ './views/Data'),
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

  if (to.path === '/login' || to.path === '/outline') {
    next()
    cancelTestTime()
    return
  }

  startTestTime()
  let uuid = getToken()
  if (!uuid) {
    uuid = to.query['uuid']
  }
  if (!uuid) {
    next('/login')
    return
  }
  axios.get(`/user/check-status`, {
    params: {
      uuid
    }
  }).then(res => {
    if (res.code === 100) {
      saveToken(uuid)
      next()
    } else {
      removeToken()
      next('/login')
    }
  }).catch(e => {
    removeToken()
    next('/login')
  })

})

export default router
