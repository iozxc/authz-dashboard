import Vue from 'vue'
import Vuex from 'vuex'
import axios from '_axios@0.21.4@axios'
import { removeToken } from '@/utils/token'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    docs: {
      controllers: [],
      paths: {},
      rateLimit: {},
      appVersionInfo: {},
      info: {
        license: {}
      },
      conns: [],
      argResource:{}
    },
    currentServer: {},
    checkStatus: null
  },
  mutations: {
    setUser (state, value) {
      state.user = value
    },
    setServer (state, value) {
      state.currentServer = value
    },
    setDocs (state, value) {
      state.docs = value
    },
    setCheckStatus (state, value) {
      state.checkStatus = value
    }
  },
  actions: {},
  modules: {}
})
