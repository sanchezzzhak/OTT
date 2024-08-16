
import { defineStore } from 'pinia'
import {$axios} from '../api';

export const useStoreSetting = defineStore('setting', {

  state: () => ({
    success: '',
    token: localStorage.getItem('token') || '',
    user: {},
    status: '',
    language:  localStorage.getItem('language'),
  }),

  action: {
    save() {

    },
  }


});