import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    docs: {
      controllers: [],
      paths: {},
      rateLimit: {},
      appVersionInfo: {},
      info: {
        license: {}
      },
      conns: [],
      argResource: {}
    },
    currentServer: {}
  },
  mutations: {
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
