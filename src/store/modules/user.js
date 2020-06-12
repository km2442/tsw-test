import axios from "axios"
import router from '../../router'

axios.defaults.baseURL = "https://identitytoolkit.googleapis.com/v1";
const apiKey = "?key=AIzaSyC7TWgPiFeplz8-ZU8Zl936-vEbL1zPyJk";

const state = {
    idToken: null,
    userId: null,
    user: null,
    logoutTomeout: null,
    loginError: true
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
    },
    setLogoutTimeout(state, payload) {
        state.logoutTomeout = payload;
    },
    setLoginError(state, payload) {
        state.setLoginError = payload;
    }
}

const actions = {
    setLogoutTimer({ commit, dispatch }, expirationTime) {
        const timeout = setTimeout(() => {
            commit('clearAuthData');
            if (router.currentRoute.path.includes("admin")) router.replace({ name: "Index" });
            dispatch("modifySnackbar", {
                state: true,
                msg: "Twoja sesja wygasła. Wylogowano z panelu administracyjnego.",
                color: "info"
            });
        }, expirationTime * 1000);
        commit('setLogoutTimeout', timeout);
    },
    login({ commit, dispatch }, authData) {
        axios.post('/accounts:signInWithPassword' + apiKey, {
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
                router.replace({ name: "Admin" });
            })
            .catch(err => {
                dispatch("modifySnackbar", {
                    state: true,
                    msg: "Wystąpił błąd podczas logowania!",
                    color: "error"
                });
            })
    },
    tryAutoLogin({ dispatch, commit }) {
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
                dispatch('setLogoutTimer', (expirationDate - now) / 1000);
                dispatch('fetchUserData');
            }
        }
    },
    logout({ dispatch, commit, state }) {
        commit('clearAuthData')
        dispatch('clearLocalStorage');
        clearTimeout(state.logoutTomeout);
        commit('setLogoutTimeout', null);
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
            axios.post('/accounts:lookup' + apiKey, { idToken: state.idToken })
                .then(res => {
                    commit('storeUser', res.data);
                })
                .catch(error => console.log(error));
        }
    },
    changeUserPassword({ dispatch, state }, auth) {
        axios.post('/accounts:update' + apiKey, {
            idToken: state.idToken,
            password: auth,
            returnSecureToken: false
        }).then(res => {
            dispatch('logout');
            router.replace('/adminlogin');
            dispatch('modifySnackbar', {
                snackbarState: true,
                snackbarMsg: 'Hasło zostało zmienione',
                snackbarColor: 'info'
            })
        }).catch(error => {
            dispatch('modifySnackbar', {
                snackbarState: true,
                snackbarMsg: error,
                snackbarColor: 'error'
            })
        })
    }
}

const getters = {
    user: state => state.user,
    token: state => state.idToken,
    isAuthenticated: state => state.idToken !== null,
    loginError: state => state.loginError
}

export default {
    state,
    mutations,
    actions,
    getters
}