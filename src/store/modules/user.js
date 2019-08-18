import axios from "axios"

const state = {
    idToken: null,
    userId: null,
    user: null
}

const mutations = {
    authUser(state, userData) {
        state.idToken = userData.token;
        state.userId = userData.userId;
    },
    storeUser(state, user) {
        state.user = user.users[0];
    },
    clearAuthData(state) {
        state.idToken = null;
        state.userId = null;
    }
}

const actions = {
    setLogoutTimer({ commit }, expirationTime) {
        setTimeout(() => {
            commit('clearAuthData');
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
                const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('userId', res.data.localId);
                localStorage.setItem('expirationDate', expirationDate);
                commit('authUser', {
                    token: res.data.idToken,
                    userId: res.data.localId
                })
                dispatch('setLogoutTimer', res.data.expiresIn);
                dispatch('fetchUserData');
                router.push({ name: "Admin" });
            })
            .catch(error => console.log(error))
    },
    tryAutoLogin({ commit, dispatch }) {
        const token = localStorage.getItem('token');
        if (!token) return;
        else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            const now = new Date();
            if (now >= expirationDate) {
                dispatch('clearLocalStorage');
                return;
            }
            else {
                const userId = localStorage.getItem('userId');
                commit('authUser', {
                    token: token,
                    userId: userId
                })
                dispatch('setLogoutTimer', expirationDate - now);
                dispatch('fetchUserData');
            }
        }
    },
    logout({ commit }) {
        commit('clearAuthData')
        dispatch('clearLocalStorage');
        router.replace('/');
    },
    clearLocalStorage() {
        localStorage.removeItem('expirationDate');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    },
    fetchUserData({ commit, state }) {
        if (!state.idToken) return;
        else {
            axios.post('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyC7TWgPiFeplz8-ZU8Zl936-vEbL1zPyJk', { idToken: state.idToken })
                .then(res => {
                    const data = res.data;
                    commit('storeUser', res.data);
                })
                .catch(error => console.log(error));
        }
    },
    changeUserPassword({commit}, auth) {

    }
}

const getters = {
    user: state => state.user,
    isAuthenticated: state => state.idToken !== null
}

export default {
    state,
    mutations,
    actions,
    getters
}