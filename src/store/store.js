import Vue from 'vue'
import Vuex from 'vuex'

import user from "./modules/user"
import snackbar from "./modules/snackbar"

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    navDrawer: false,
  },
  mutations: {
    setNavDrawerState(state, nav) {
      state.navDrawer = nav;
    },
  },
  actions: {
    setNavDrawerState({ commit }, nav) {
      commit("setNavDrawerState", nav);
    },
  },
  getters: {
    navDrawer: state => state.navDrawer
  },
  modules: {
    user,
    snackbar
  }
})