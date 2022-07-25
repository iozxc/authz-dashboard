import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    currentServer: {}
  },
  mutations: {
    setUser (state, value) {
      state.user = value
    },
    setServer (state, value) {
      state.currentServer = value
    },
  },
  actions: {},
  modules: {}
})
