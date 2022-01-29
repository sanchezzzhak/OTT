import { createStore } from 'vuex'

export default createStore({
  state: {
    success: '',
    token: localStorage.getItem('token') || '',
    user: {}
  },
  mutations: {},
  actions: {},
  getters: {
    isAuth: state => !!state.token,
    authStatus: state => state.status,
  },
  modules: {
  }
});