import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    counter: 100
  },
  mutations: {
    change(state, counter) {
      state.counter = counter
    }
  },
  getters: {
    counter: state => state.counter
  }
})