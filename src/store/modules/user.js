import axios from "axios"

const state = {
    user: null
}

const mutations = {
    changeUser(state, user) {
        state.user = user
    }
}

const actions = {
    changeUser({ commit }, user) {
        commit("changeUser", user);
    },
}

const getters = {
    user: state => state.user
}

export default {
    state,
    mutations,
    actions,
    getters
}