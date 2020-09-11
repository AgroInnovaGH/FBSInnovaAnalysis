import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      auth: {},
      details: {}
    }
  },
  getters: {
    hasAccess(state){
      return state.user.details.access
    },
    isSuper(state){
      return state.user.details.super
    }
  },
  mutations: {
    setUser(state, user){
      state.user = user
    }
  },
  actions: {
  },
  modules: {
  }
})
