import Vue from 'vue'
import Vuex from 'vuex'

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
      conns: []
    },
    currentServer: {}
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
    }
  },
  actions: {},
  modules: {}
})
