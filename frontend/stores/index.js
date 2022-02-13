import {createStore} from 'vuex';
import {$axios} from '../api';

export default createStore({
  state: {
    success: '',
    token: localStorage.getItem('token') || '',
    user: {},
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading';
    },
    auth_success(state, token, user) {
      state.status = 'success';
      state.token = token;
      state.user = user;
    },
    auth_error(state) {
      state.status = 'error';
    },
    auth_logout(state) {
      state.status = '';
      state.token = '';
    },
  },
  actions: {
    login({commit}, data) {
      return new Promise((resolve, reject) => {
        commit('auth_request');
        $axios.post('login', data).then(response => {
          let data = response.data;
          if(data.err) {
            commit('auth_error');
            return reject(data);
          }
          const token = data.token;
          const user = data.user;
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          $axios.defaults.headers.common['Authorization'] = 'Bearer' +
            token;
          commit('auth_success', token, user);
          return resolve(data);
        }).catch(err => {
          commit('auth_error');
          localStorage.removeItem('token');
          return reject(err);
        });
      });
    },
    logout({commit}) {
      return new Promise((resolve) => {
        commit('auth_logout');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete $axios.defaults.headers.common['Authorization'];
        return resolve();
      });
    },
  },
  getters: {
    isAuth: state => !!state.token,
    authStatus: state => state.status,
  },
  modules: {},
});