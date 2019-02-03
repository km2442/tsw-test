import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    changeUser(state, user) {
      state.user = user
    }
  },
  getters: {
    user: state => state.user
  }
})