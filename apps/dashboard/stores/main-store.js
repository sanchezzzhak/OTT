import { defineStore } from 'pinia';
import { $axios } from '../api';


const AUTH = {
  REQ: 'auth_request',
  SUCCESS: 'auth_success',
  ERROR: 'auth_error',
  LOGOUT: 'auth_logout',
  REG: 'singup_success'
};

const KEY_LANGUAGE = 'language';
const KEY_SIDEBAR = 'language';
const KEY_THEME = 'theme';
const KEY_TOKEN = 'token';
const KEY_USER = 'user';

const URL_LOGIN = 'login';
const URL_REGISTER = 'register';

export const useStore = defineStore('main', {

  state: () => ({
    success: '',
    token: localStorage.getItem(KEY_TOKEN) || '',
    user: {},
    status: '',
    language: localStorage.getItem(KEY_LANGUAGE),
    sidebar: localStorage.getItem(KEY_SIDEBAR) || 'vertical',
    theme: localStorage.getItem(KEY_THEME) || 'dark',
  }),

  getters: {
    isAuth: state => {
      return state.token && state.token.length;
    },
    authStatus: state => state.status
  },
  actions: {
    changeTheme(value) {
      localStorage.setItem(KEY_THEME, value);
      this.theme = value;
    },

    language(value) {
      localStorage.setItem(KEY_LANGUAGE, value);
    },
    login(data) {
      return new Promise((resolve, reject) => {
        this.status = AUTH.REQ;

        $axios.post(URL_LOGIN, data).then(response => {
          let data = response.data;
          if (data.err) {
            this.status = AUTH.ERROR;
            return reject(data);
          }
          const token = data.token;
          const user = data.user;
          localStorage.setItem(KEY_TOKEN, token);
          localStorage.setItem(KEY_USER, JSON.stringify(user));
          $axios.defaults.headers.common['Authorization'] = 'Bearer' + token;

          this.token = token;
          this.user = user;
          this.status = AUTH.SUCCESS;
          return resolve(data);
        }).catch(err => {
          this.status = AUTH.ERROR;
          localStorage.removeItem(KEY_TOKEN);
          return reject(err);
        });
      });
    },
    singup(data) {
      return new Promise((resolve, reject) => {
        this.status = AUTH.REQ;
        $axios.post(URL_REGISTER, data).then(response => {
          let data = response.data;
          if (data.err) {
            this.status = AUTH.ERROR;
            return reject(data);
          }
          this.status = AUTH.REG;
          this.token = '';
          this.user = {};
          return resolve(data);
        }).catch(err => {
          this.status = AUTH.ERROR;
          return reject(err);
        });
      });
    },
    logout() {
      return new Promise((resolve) => {
        this.status = AUTH.LOGOUT;
        this.token = '';
        this.user = {};
        localStorage.removeItem(KEY_TOKEN);
        localStorage.removeItem(KEY_USER);
        delete $axios.defaults.headers.common['Authorization'];
        return resolve();
      });
    }
  }

});
