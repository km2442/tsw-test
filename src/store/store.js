import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: null,
    snackbarState: false,
    snackbarMsg: null,
    snackbarColor: null,
    snackbarTimeout: 7500
  },
  mutations: {
    changeUser(state, user) {
      state.user = user
    },
    modifySnackbar(state, snack) {
      state.snackbarState = snack.state;
      state.snackbarMsg = snack.msg;
      state.snackbarColor = snack.color;
    },
    setSnackbarState(state, payload) {
      state.snackbarState = payload;
    }
  },
  actions: {
    modifySnackbar(context, snack) {
      context.commit("modifySnackbar", snack)
    }
  },
  getters: {
    user: state => state.user,
    snackbarState: state => state.snackbarState,
    snackbarMsg: state => state.snackbarMsg,
    snackbarColor: state => state.snackbarColor,
    snackbarTimeout: state => state.snackbarTimeout
  }
})