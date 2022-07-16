import Vue from 'vue'
import Vuex from 'vuex'
import role from './modules/role'
import createPersistedState from 'vuex-persistedstate'
import getters from './modules/getters'
const PERSIST_PATHS = ['token']

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: ''
  },
  getters,
  mutations: {
    setToken (state, payload) {
      state.token = payload
    }
  },
  actions: {
  },
  modules: {
    role
  },

  plugins: [createPersistedState({
    paths: PERSIST_PATHS
  })]
})
