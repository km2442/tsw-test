const state = {
    snackbarState: false,
    snackbarMsg: null,
    snackbarColor: null,
    snackbarTimeout: 7500
}

const mutations = {
    modifySnackbar(state, snack) {
        state.snackbarState = snack.state;
        state.snackbarMsg = snack.msg;
        state.snackbarColor = snack.color;
    },
    setSnackbarState(state, payload) {
        state.snackbarState = payload;
    }
}

const actions = {
    modifySnackbar({ commit }, snack) {
        commit("modifySnackbar", snack);
    },
    setSnackbarState({ commit }, payload) {
        commit("setSnackbarState", payload);
    }
}

const getters = {
    snackbarState: state => state.snackbarState,
    snackbarMsg: state => state.snackbarMsg,
    snackbarColor: state => state.snackbarColor,
    snackbarTimeout: state => state.snackbarTimeout
}

export default {
    state,
    mutations,
    actions,
    getters
}