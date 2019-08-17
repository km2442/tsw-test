import axios from "axios"

const state = {
    idToken: null,
    userId: null,
    user: null
}

const mutations = {
    authUser(state, userData) {
        state.idToken = userData.token
        state.userId = userData.userId
    },
    storeUser(state, user) {
        state.user = user
    },
    clearAuthData(state) {
        state.idToken = null
        state.userId = null
    }
}

const actions = {
    changeUser({ commit }, user) {
        commit("changeUser", user);
    },
    setLogoutTimer({ commit }, expirationTime) {
        setTimeout(() => {
            commit('clearAuthData')
        }, expirationTime * 1000)
    },
    login({ commit, dispatch }, authData) {
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC7TWgPiFeplz8-ZU8Zl936-vEbL1zPyJk', {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
        })
            .then(res => {
                const now = new Date()
                const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
                localStorage.setItem('token', res.data.idToken)
                localStorage.setItem('userId', res.data.localId)
                localStorage.setItem('expirationDate', expirationDate)
                commit('authUser', {
                    token: res.data.idToken,
                    userId: res.data.localId
                })
                dispatch('setLogoutTimer', res.data.expiresIn)
            })
            .catch(error => console.log(error))
    },
    logout({ commit }) {
        commit('clearAuthData')
        localStorage.removeItem('expirationDate')
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        router.replace('/')
    },
    fetchUserData({ commit, state }) {
        if (!state.idToken) {
            return
        }
        globalAxios.get('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=' + state.idToken)
            .then(res => {
                const data = res.data
                commit('storeUser', res.data)
            })
            .catch(error => console.log(error))
    }
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