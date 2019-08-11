import Vue from 'vue'
import Vuex from 'vuex'

import snackbar from "./modules/snackbar"

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    navDrawer: false,
    user: null
  },
  mutations: {
    changeUser(state, user) {
      state.user = user
    },
    setNavDrawerState(state, nav) {
      state.navDrawer = nav;
    },
  },
  actions: {
    changeUser({ commit }, user) {
      commit("changeUser", user);
    },
    setNavDrawerState({ commit }, nav) {
      commit("setNavDrawerState", nav);
    },
  },
  getters: {
    navDrawer: state => state.navDrawer,
    user: state => state.user
  },
  modules: {
    snackbar
  }
})