import { defineStore } from 'pinia'
import {$axios} from '../api';

export const useStore = defineStore('main', {

  state: () => ({
    success: '',
    token: localStorage.getItem('token') || '',
    user: {},
    status: ''
  }),
  
  getters: {
    isAuth: state => {
      return state.token && state.token.length
    },
    authStatus: state => state.status,
  },
  actions: {
    login(data) {
      return new Promise((resolve, reject) => {
        this.status = 'auth_request';
        
        $axios.post('login', data).then(response => {
          let data = response.data;
          if (data.err) {
            this.status = 'auth_error';
            return reject(data);
          }
          const token = data.token;
          const user = data.user;
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          $axios.defaults.headers.common['Authorization'] = 'Bearer' + token;
          
          this.token = token;
          this.user = user;
          this.status = 'auth_success';
          return resolve(data);
        }).catch(err => {
          this.status = 'auth_error';
          localStorage.removeItem('token');
          return reject(err);
        });
      });
    },
    singup(data) {
      return new Promise((resolve, reject) => {
        this.status = 'auth_request';
        $axios.post('register', data).then(response => {
          let data = response.data;
          if (data.err) {
            this.status = 'auth_error';
            return reject(data);
          }
          this.status = 'auth_success';
          this.token = '';
          this.user = {};
          return resolve(data);
        }).catch(err => {
          this.status = 'auth_error';
          return reject(err);
        });
      });
    },
    logout() {
      return new Promise((resolve) => {
        this.status = 'auth_logout';
        this.token = '';
        this.user = {};
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete $axios.defaults.headers.common['Authorization'];
        return resolve();
      });
    },
  }
  
})


